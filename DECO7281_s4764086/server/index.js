import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { child } from "./routes/child.js";
import { elder } from "./routes/elder.js";
import { style } from "./routes/style.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const t0 = Date.now();
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${Date.now()-t0}ms`
    );
  });
  next();
});

// APIs
app.use("/api/style", style);
app.use("/api/child", child);
app.use("/api/elder", elder);

// health check
app.get("/api/ping", (_req, res) => res.json({ ok: true, t: Date.now() }));
app.post("/api/echo", (req, res) => res.json({ ok: true, got: req.body || null }));

// static page
const webDir = path.join(__dirname, "..", "web");
console.log("Static dir:", webDir);
app.use("/", express.static(webDir));

// 404
app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not Found" });
  return res.status(404).send("Not Found");
});

app.use((err, _req, res, _next) => {
  console.error("[UNCAUGHT ERROR]", err?.message || err);
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
process.on("uncaughtException", (e) => {
  console.error("[uncaughtException]", e);
});
process.on("unhandledRejection", (e) => {
  console.error("[unhandledRejection]", e);
});
