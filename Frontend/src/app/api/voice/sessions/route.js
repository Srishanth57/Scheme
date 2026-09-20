import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import VoiceSession from "modals/VoiceSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isObjectId = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);

// GET /api/voice/sessions          -> the signed-in user's recent conversations
// GET /api/voice/sessions?id=<id>  -> one conversation with its messages
export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();

  const id = new URL(request.url).searchParams.get("id");
  if (id) {
    if (!isObjectId(id)) return Response.json({ message: "Bad id" }, { status: 400 });
    const s = await VoiceSession.findOne({ _id: id, userId }).lean();
    if (!s) return Response.json({ message: "Not found" }, { status: 404 });
    return Response.json({ id: String(s._id), title: s.title, messages: s.messages });
  }

  const list = await VoiceSession.find({ userId }, { title: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 })
    .limit(20)
    .lean();
  return Response.json(list.map((s) => ({ id: String(s._id), title: s.title, updatedAt: s.updatedAt })));
}

// DELETE /api/voice/sessions?id=<id>  -> users can delete their own conversations
export async function DELETE(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ message: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!isObjectId(id)) return Response.json({ message: "Bad id" }, { status: 400 });
  await connectDB();
  await VoiceSession.deleteOne({ _id: id, userId });
  return Response.json({ ok: true });
}
