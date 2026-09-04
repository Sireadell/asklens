// One question, two answers: whoever Telegraph's router picked, and our own
// miner for the same intent.
//
// The router chooses by leaderboard score, so most questions go elsewhere.
// Recording both sides is the only way to see whether the miner it preferred
// actually answered better than ours.
import { appendFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";
import { ask, askMiner } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { intentInfo } from "./intents.js";

function summarise(body, settlement) {
  const { text, raw } = extractAnswer(body.result);
  return {
    miner: body.miner_name ?? null,
    minerId: body.miner_id ? String(body.miner_id) : null,
    answer: text,
    hasPlainText: Boolean(text),
    raw: text ? null : raw,
    confidence: extractConfidence(body.result),
    durationMs: typeof body.duration_ms === "number" ? body.duration_ms : null,
    signalHash: body.signal_hash ?? null,
    paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
  };
}

function isOurs(minerId) {
  return Object.values(config.ownMiners).some((m) => m.id === String(minerId));
}

// Runs the routed ask, then — when the router picked someone else and we serve
// that intent — the same question against our own miner.
export async function compareOnce(question, expectedIntent = null) {
  const routedRes = await ask(question);
  const routed = summarise(routedRes.body, routedRes.settlement);
  const intent = routedRes.body.intent ?? expectedIntent ?? null;
  const routedToUs = isOurs(routed.minerId);

  const record = {
    at: new Date().toISOString(),
    question,
    expectedIntent,
    intent,
    routedToUs,
    routedIntentMatched: expectedIntent ? intent === expectedIntent : null,
    reasoning: routedRes.body.reasoning ?? null,
    routed,
    ours: null,
    oursError: null,
  };

  const info = intent ? intentInfo(intent) : null;
  if (!routedToUs && info) {
    const miner = config.ownMiners[info.miner];
    try {
      // The whole question goes through, not a stripped-down term: our miners
      // accept the caller's question in place of the bare parameter, and a
      // bare term reads to them as a malformed request.
      const oursRes = await askMiner(miner.id, {
        method: info.method,
        endpoint: info.endpoint,
        payload: { [info.param]: question },
      });
      record.ours = { ...summarise(oursRes.body, oursRes.settlement), miner: oursRes.body.miner_name ?? miner.name };
    } catch (err) {
      record.oursError = err.message;
    }
  }

  return record;
}

export function appendComparison(record) {
  try {
    mkdirSync(dirname(config.compareFile), { recursive: true });
    appendFileSync(config.compareFile, `${JSON.stringify(record)}\n`);
  } catch (err) {
    console.warn("[compare] could not write:", err.message);
  }
  return record;
}

export function readComparisons() {
  try {
    return readFileSync(config.compareFile, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}
