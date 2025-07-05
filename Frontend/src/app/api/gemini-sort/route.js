import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(Request) {
  const { schemes } = await Request.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite-preview-06-17",
  });
  const prompt = `From the provided array of schemes: ${JSON.stringify(
    schemes
  )},
filter and return only those schemes that are intended for 'students'.
A scheme is considered for students if its description, title, or target audience mentions students, education, or school-aged individuals.
The output must be a pure JSON array containing the filtered scheme objects.
Ensure the response contains no introductory or concluding text, explanations, or any characters that would prevent it from being parsed directly as a JSON string (e.g., no backticks, no newlines outside the JSON structure).`;
  const result = await model.generateContent(prompt);

  let parsedResult;
  try {
    parsedResult = JSON.parse(result.response.text());
  } catch (e) {
    parsedResult = {
      error: "Gemini did not return valid JSON",
      raw: result.response.text(),
    };
  }

  return new Response(JSON.stringify(parsedResult), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
