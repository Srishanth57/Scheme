// src/app/api/chat/agent-schemes/route.js
import { fetchRelevantSchemes } from "lib/schemeSearch";

export async function POST(req) {
  try {
    const { query, language = "en" } = await req.json();
    const schemes = await fetchRelevantSchemes(query, language);

    const formatted = schemes.map((s) => ({
      name: s.name?.[language] || s.name?.en || s.name,
      description: s.description?.[language] || s.description?.en || s.description,
      eligibility: s.eligibility?.[language] || s.eligibilityCriterias?.[language] || "N/A",
      benefits: s.benefits?.[language] || s.benefitsProvided?.[language] || "N/A",
      link: s.link || "N/A",
    }));

    return new Response(JSON.stringify({ schemes: formatted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}