// /api/gemini-sort/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createHash } from "crypto";

// 1. Create a simple in-memory cache
const cache = new Map();

export async function POST(Request) {
  const { schemes, fetchPrompt } = await Request.json();

  // 2. Create a unique key from the request body
  const cacheKey = createHash("sha256")
    .update(JSON.stringify({ schemes, fetchPrompt }))
    .digest("hex");

  // 3. Check if the result is in our cache
  if (cache.has(cacheKey)) {
    console.log("✅ Returning result from in-memory cache.");
    return new Response(JSON.stringify(cache.get(cacheKey)));
  }

  console.log("❌ No cache found. Calling Gemini API...");
  // 4. If not in cache, call the API
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `From the provided JSON array of schemes,filter them based on the following user query. Return ONLY the filtered and sorted JSON array. User query: "${fetchPrompt}". Schemes: ${JSON.stringify(
    schemes
  )}`;

  const result = await model.generateContent(prompt);
  const textResponse = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();
  const parsedResult = JSON.parse(textResponse);
  console.log(parsedResult);
  // 5. Save the new result to the cache before returning
  cache.set(cacheKey, parsedResult);

  return new Response(JSON.stringify(parsedResult));
}
