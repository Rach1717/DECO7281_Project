import express from "express";
import { db } from "../services/memory.js";
import { generateText } from "../services/gemini.js";

export const elder = express.Router();

elder.post("/message", async (req, res) => {
  try {
    const { childId, text, wantBriefReason } = req.body || {};
    if (!text) return res.status(400).json({ error: "Empty text." });

    const prof = db.profiles?.[childId];
    if (!prof) return res.status(400).json({ error: "No style learned yet." });

    const systemInstruction = `
You are currently acting as the communication agent for [${childId}] with the family.
You must reply in accordance with the following "tone style guidelines" and "fact cards":

[ Tone Style Guidelines ]
${prof.styleGuide}

[ Fact Card ] (Mention facts only when relevant; do not leak personal/sensitive info.)
${JSON.stringify(prof.facts, null, 2)}

Communication Principles:
- Be friendly, respectful, and avoid creating anxiety; if unsure of the facts, be honest and confirm.
- Do NOT provide professional advice (medical/legal); suggest consulting real professionals.
- Keep responses concise and natural for daily conversation; use the child's typical address/phrases when appropriate.
`;

    // 1) main reply
    const reply = await generateText({
      systemInstruction,
      messages: [{ role: "user", parts: [{ text }]}],
      config: { maxOutputTokens: 300, temperature: 0.6 }
    });

    // 2) optional brief reason
    let reason = "";
    if (wantBriefReason) {
      const reasonPrompt = `User message: """${text}"""
Assistant reply: """${reply}"""

In 1-2 short sentences, explain (for transparency) why this reply fits the user's message and the child's tone/facts. 
Do NOT reveal hidden chain-of-thought or internal step-by-step reasoning.`;
      reason = await generateText({
        systemInstruction: "You are a concise explainer that writes short, public-safe rationales.",
        messages: [{ role: "user", parts: [{ text: reasonPrompt }]}],
        config: { maxOutputTokens: 80, temperature: 0.4 }
      });
    }

    return res.json({ reply, ...(reason ? { reason } : {}) });
  } catch (err) {
    console.error("[elder.message] error:", err);
    return res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
});
