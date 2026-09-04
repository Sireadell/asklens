import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "./config.js";
import { initPayments, paymentReady, getPayerAddress, ask, askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { INTENTS, EXAMPLES, intentInfo } from "./intents.js";
import { loadStats, getStats, recordAnswered } from "./stats.js";
import { logAsk, readLog } from "./asklog.js";
import { buildReport } from "./report.js";
import { readComparisons } from "./compare.js";

const here = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.static(join(here, "..", "public")));

const MAX_QUESTION_CHARS = 500;

function shapeResponse(body, settlement) {
  const { text, raw } = extractAnswer(body.result);
  const ourMiner = Object.values(config.ownMiners).some((m) => m.id === String(body.miner_id));
  return {
    answer: text,
    raw: text ? undefined : raw,
    intent: body.intent ?? null,
    intentLabel: body.intent ? intentInfo(body.intent)?.label ?? body.intent : null,
    reasoning: body.reasoning ?? null,
    minerId: body.miner_id ?? null,
    minerName: body.miner_name ?? null,
    ourMiner,
    endpoint: body.endpoint ?? null,
    confidence: extractConfidence(body.result),
    costUsd: typeof body.cost_usd === "number" ? body.cost_usd : null,
    durationMs: typeof body.duration_ms === "number" ? body.duration_ms : null,
    signalHash: body.signal_hash ?? null,
    warnings: body.warnings ?? null,
    paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
    timestamp: body.timestamp ?? new Date().toISOString(),
  };
}

function sendEngineError(res, err) {
  if (err instanceof EngineError) {
    return res.status(err.status).json({ error: err.code, message: err.message, details: err.details });
  }
  console.error("[ask] unexpected error:", err);
  return res.status(500).json({ error: "INTERNAL_ERROR", message: "Something went wrong on our side." });
}

// Ask anything. Telegraph's router picks the intent and the miner.
app.post("/api/ask", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (question.length < 3) {
    return res.status(400).json({ error: "QUESTION_TOO_SHORT", message: "Type a question first." });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(400).json({ error: "QUESTION_TOO_LONG", message: `Keep it under ${MAX_QUESTION_CHARS} characters.` });
  }

  try {
    const { body, settlement } = await ask(question);
    const shaped = shapeResponse(body, settlement);
    recordAnswered({ intent: shaped.intent, minerName: shaped.minerName });
    logAsk({ question, ...shaped });
    return res.json({ question, ...shaped, stats: getStats() });
  } catch (err) {
    return sendEngineError(res, err);
  }
});

// Second opinion: put the same question to one of the miners this project
// runs, named directly rather than chosen by the router.
app.post("/api/second-opinion", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const intent = typeof req.body?.intent === "string" ? req.body.intent : "";
  const info = intentInfo(intent);
  if (!question || !info) {
    return res.status(400).json({ error: "UNSUPPORTED_INTENT", message: "No miner of ours covers that intent." });
  }

  const miner = config.ownMiners[info.miner];
  try {
    const { body, settlement } = await askMiner(miner.id, {
      method: info.method,
      endpoint: info.endpoint,
      payload: { [info.param]: question },
    });
    const shaped = shapeResponse(body, settlement);
    recordAnswered({ intent, minerName: shaped.minerName ?? miner.name });
    logAsk({ question, ...shaped, intent, minerName: shaped.minerName ?? miner.name, direct: true });
    return res.json({ question, askedMiner: miner.name, intent, ...shaped, stats: getStats() });
  } catch (err) {
    return sendEngineError(res, err);
  }
});

app.get("/api/stats", (_req, res) => {
  res.json({ ...getStats(), intents: INTENTS, examples: EXAMPLES });
});

// The last N questions asked, each with the signal hash needed to pull the
// full exchange back from Telegraph and check the answer afterwards.
app.get("/api/log", (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 500);
  res.json({ entries: readLog(limit) });
});

// How your miners are faring against the ones the router prefers.
app.get("/api/report", (_req, res) => {
  res.json(buildReport(readComparisons()));
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    paymentConfigured: paymentReady(),
    payer: getPayerAddress(),
    engine: config.engineBaseUrl,
    miners: config.ownMiners,
  });
});

loadStats();
initPayments();
app.listen(config.port, () => {
  console.log(`AskLens listening on http://localhost:${config.port}`);
});
