import express from "express";
import { db } from "../services/memory.js";
import { generateText } from "../services/gemini.js";

export const elder = express.Router();

/**
 * elder page：use child's styleGuide + facts generate reply
 */
elder.post("/message", async (req, res) => {
  const { childId, text } = req.body || {};
  const prof = db.profiles[childId];
  if (!prof) return res.status(400).json({ error: "No style learned yet." });

  const systemInstruction = `
You are currently acting as the communication agent for [${childId}] with the family.
You must reply in accordance with the following "tone style guidelines" and "fact cards":
[ Tone Style Guidelines ]
${prof.styleGuide}

[Fact Card] (Only mentioned when relevant, and no personal information is disclosed)
${JSON.stringify(prof.facts, null, 2)}

Communication Principles:
- Be friendly, respectful, and avoid creating anxiety; if unsure of the facts, be honest and confirm.
- Do not discuss professional advice such as medical or legal matters; refer to genuine resources.
- Be concise and natural, suitable for daily conversation; use their usual titles and expressions when necessary.`;

  const reply = await generateText({
    systemInstruction,
    messages: [{ role: "user", parts: [{ text }]}],
    config: { maxOutputTokens: 300, temperature: 0.6 }
  });

  res.json({ reply });
});
