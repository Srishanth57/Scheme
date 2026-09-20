import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import VoiceSession from "modals/VoiceSession";
import AnswerCache from "modals/AnswerCache";
import { checkUserLimits, checkGlobalLimits } from "lib/voice/rateLimit";
import { retrieveSchemes } from "lib/voice/retrieve";
import { streamAnswer, isQuotaError } from "lib/voice/gemini";
import { MSG, buildContext, buildSystemPrompt, detectLang, hashQuestion } from "lib/voice/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_INPUT_CHARS = 500;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const enc = new TextEncoder();

function jsonError(status, code, message, retryAfter) {
  return Response.json(
    { code, message, retryAfter },
    { status, headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined }
  );
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return jsonError(401, "unauthorized", MSG.unauthorized.en);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "bad_request", "Invalid JSON");
  }

  const text = String(body?.text ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_INPUT_CHARS);
  if (!text) return jsonError(400, "empty", "Empty message");
  const uiLang = body?.lang === "ml" ? "ml" : "en";
  const sessionId =
    typeof body?.sessionId === "string" && /^[a-f\d]{24}$/i.test(body.sessionId)
      ? body.sessionId
      : null;

  await connectDB();

  const user = await checkUserLimits(userId);
  if (!user.ok) return jsonError(429, "rate_limited", MSG.rate_limited[uiLang], user.retryAfter);

  // History always comes from the DB (never from the client), so it can't be forged.
  const session = sessionId
    ? await VoiceSession.findOne({ _id: sessionId, userId }, { messages: { $slice: -8 } }).lean()
    : null;

  const lang = detectLang(text, uiLang);
  const history = (session?.messages ?? []).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text.slice(0, 800) }],
  }));
  while (history[0]?.role === "model") history.shift(); // Gemini wants user-first

  const isFirstTurn = history.length === 0;
  const cacheKey = isFirstTurn ? hashQuestion(lang, text) : null;
  const cached = cacheKey ? await AnswerCache.findById(cacheKey).lean() : null;

  if (!cached) {
    const global = await checkGlobalLimits();
    if (!global.ok) return jsonError(503, "busy", MSG.busy[uiLang], global.retryAfter);
  }

  let closed = false;
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => {
        if (closed) return;
        try {
          controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));
        } catch {
          closed = true;
        }
      };

      let full = "";
      let sources = [];
      let sid = session?._id ?? null;

      try {
        if (!sid) {
          const created = await VoiceSession.create({ userId, title: text.slice(0, 60), lang, messages: [] });
          sid = created._id;
        }
        send({ type: "meta", sessionId: String(sid), lang });

        if (cached) {
          full = cached.text;
          sources = cached.sources ?? [];
          send({ type: "sources", sources });
          send({ type: "delta", text: full });
        } else {
          const docs = await retrieveSchemes(text, { k: 4 });
          sources = docs.map((d) => ({
            name: d.name?.[lang] || d.name?.en,
            link: d.link || undefined,
            category: d.category,
          }));
          send({ type: "sources", sources });

          const system = buildSystemPrompt(lang, buildContext(docs, lang));
          for await (const piece of streamAnswer({ system, history, text, signal: request.signal })) {
            full += piece;
            send({ type: "delta", text: piece });
          }

          if (!full.trim()) {
            full = MSG.empty[lang]; // e.g. blocked by safety filters
            send({ type: "delta", text: full });
          } else if (cacheKey && docs.length) {
            AnswerCache.updateOne(
              { _id: cacheKey },
              { $set: { lang, text: full, sources, expireAt: new Date(Date.now() + CACHE_TTL_MS) } },
              { upsert: true }
            ).catch((e) => console.warn("[voice] cache write failed:", e?.message));
          }
        }

        send({ type: "done" });
      } catch (err) {
        console.error("[voice] chat error:", err);
        const busy = isQuotaError(err);
        send({ type: "error", code: busy ? "busy" : "error", message: MSG[busy ? "busy" : "error"][lang] });
      }

      // Persist the turn (also when the client hung up mid-answer).
      if (sid && full.trim()) {
        try {
          await VoiceSession.updateOne(
            { _id: sid, userId },
            {
              $push: {
                messages: {
                  $each: [
                    { role: "user", text, lang },
                    { role: "assistant", text: full, lang, sources },
                  ],
                  $slice: -100,
                },
              },
            }
          );
        } catch (e) {
          console.warn("[voice] failed to save messages:", e?.message);
        }
      }

      if (!closed) {
        closed = true;
        controller.close();
      }
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
