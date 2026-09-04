// An append-only record of every question this app has asked.
//
// Telegraph gives back a `signal_hash` that can be replayed later
// (GET /engine/v1/signal/{hash}) to recover the exact question, the miner that
// answered, and its full response. That is the only way to check afterwards
// whether the answers were any good, so the hash is worth keeping rather than
// showing once and dropping.
import { appendFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";

export function logAsk(entry) {
  const line = {
    at: new Date().toISOString(),
    question: entry.question,
    intent: entry.intent ?? null,
    miner: entry.minerName ?? null,
    ourMiner: Boolean(entry.ourMiner),
    answer: entry.answer ?? null,
    plainText: entry.answer !== null && entry.answer !== undefined,
    signalHash: entry.signalHash ?? null,
    paymentTx: entry.paymentTx ?? null,
    durationMs: entry.durationMs ?? null,
    direct: Boolean(entry.direct),
  };
  try {
    mkdirSync(dirname(config.askLogFile), { recursive: true });
    appendFileSync(config.askLogFile, `${JSON.stringify(line)}\n`);
  } catch (err) {
    console.warn("[asklog] could not write:", err.message);
  }
  return line;
}

export function readLog(limit = 50) {
  try {
    const lines = readFileSync(config.askLogFile, "utf8").trim().split("\n").filter(Boolean);
    return lines
      .slice(-limit)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse();
  } catch {
    return [];
  }
}
