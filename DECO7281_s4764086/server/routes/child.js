import express from "express";
import { generateText } from "../services/gemini.js";

export const child = express.Router();

// child page chat box
child.post("/message", async (req, res) => {
  const { text } = req.body || {};
  const systemInstruction = `
You are the "Companion Assistant (Child Training End)", helping users (children) record their schedules and preferences,
and reminding them of which information may affect the tone and content of communication with elders when necessary.
When encountering sensitive topics, prioritize support and respect, and provide referral suggestions when necessary.`; // 系统指令。:contentReference[oaicite:6]{index=6}

  const reply = await generateText({
    systemInstruction,
    messages: [{ role: "user", parts: [{ text }] }],
    config: { maxOutputTokens: 300, temperature: 0.7 }
  });

  res.json({ reply });
});
