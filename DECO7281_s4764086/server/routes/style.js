import express from "express";
import { db } from "../services/memory.js";
import { generateText } from "../services/gemini.js";

export const style = express.Router();

style.post("/learn", async (req, res) => {
  const t0 = Date.now();
  try {
    const { childId, samples, facts } = req.body || {};
    console.log("[style.learn] hit", { childId, samplesLen: samples?.length ?? 0 });

    if (!childId || !Array.isArray(samples) || samples.length === 0) {
      return res.status(400).send("lack of childId or samples");
    }

    const promptText = `You are a style analyzer. Given several chat samples, please extract a "tone style guide" (no more than 10 short sentences): 
${JSON.stringify(samples, null, 2)}`;

    console.log("[style.learn] calling generateText…");
    const styleGuide = await generateText({
      messages: [{ role: "user", parts: [{ text: promptText }]}],
      config: { maxOutputTokens: 220, temperature: 0.6 }
    });
    console.log("[style.learn] generateText done in", Date.now()-t0, "ms");

    db.profiles[childId] = db.profiles[childId] || { facts: {}, styleGuide: "" };
    db.profiles[childId].styleGuide = styleGuide;
    db.profiles[childId].facts = { ...(db.profiles[childId].facts), ...(facts || {}) };

    return res.json({ styleGuide });
  } catch (e) {
    console.error("[style.learn][ERR]", e?.message || e, "cost", Date.now()-t0, "ms");
    return res.status(500).send(e?.message || "Internal server error");
  }
});

