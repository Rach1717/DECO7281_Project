import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY (.env)");

const MODEL_ID = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const genAI = new GoogleGenerativeAI(apiKey);

function withTimeout(promise, ms = 15000) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`TIMEOUT_${ms}ms`)), ms))
  ]);
}

export function getModel(systemInstruction) {
  return genAI.getGenerativeModel({ model: MODEL_ID, systemInstruction });
}

export async function generateText({ systemInstruction, messages, config }) {
  const model = getModel(systemInstruction);
  const start = Date.now();
  try {
    const result = await withTimeout(
      model.generateContent({
        contents: messages,
        generationConfig: { maxOutputTokens: 220, temperature: 0.6, ...config }
      }),
      15000
    );
    const text = result.response.text();
    console.log(`[gen OK] ${MODEL_ID} ${Date.now()-start}ms, len=${text?.length ?? 0}`);
    return text;
  } catch (e) {
    console.error(`[gen ERR] ${MODEL_ID} ${Date.now()-start}ms`, e?.message || e);
    throw e;
  }
}
