// A running count of real requests this app has sent, per intent.
//
// The hackathon's prize-eligibility rule turns on real app requests per
// intent, so this is the number that matters, shown on the page rather than
// kept private. Counts are only incremented after Telegraph actually answered
// and settled payment, never on a failed or refused call.
//
// This count lives on the host's disk, which is wiped on every deploy, so it
// only covers the time since the server last started. The lasting count is
// read from the paying wallet's on-chain history (see onchainUsage.js).
//
// It used to start from the 720-request verification run in
// evidence/stats-baseline.json, which made a scripted run read as live
// traffic. That run is now reported on its own, as verificationRun, and is
// never added to the live total.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname } from "node:path";
import { createHash, randomBytes } from "node:crypto";
import { config } from "./config.js";

let state = { total: 0, byIntent: {}, byMiner: {}, startedAt: new Date().toISOString() };

// Distinct visitors since start. Only a salted hash of each visitor is kept,
// never the address itself, and the salt is new each time the server starts.
const visitorSalt = randomBytes(16);
const visitors = new Set();

const BASELINE_FILE = new URL("../evidence/stats-baseline.json", import.meta.url);

export function verificationRun() {
  try {
    const parsed = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
    if (parsed && typeof parsed === "object") {
      return {
        total: Number(parsed.total) || 0,
        byIntent: parsed.byIntent ?? {},
        note: "One scripted run on 7 September 2026 that checked every intent end to end. Not user traffic.",
        proof: "HASHES.md",
      };
    }
  } catch {
    // No record published.
  }
  return null;
}

export function loadStats() {
  try {
    const parsed = JSON.parse(readFileSync(config.statsFile, "utf8"));
    if (parsed && typeof parsed === "object") {
      state = {
        total: Number(parsed.total) || 0,
        byIntent: parsed.byIntent ?? {},
        byMiner: parsed.byMiner ?? {},
        startedAt: parsed.startedAt ?? state.startedAt,
      };
      return state;
    }
  } catch {
    // No local stats file: a first run, or a fresh deploy that wiped the disk.
  }
  return state;
}

function persist() {
  try {
    mkdirSync(dirname(config.statsFile), { recursive: true });
    writeFileSync(config.statsFile, JSON.stringify(state, null, 2));
  } catch (err) {
    console.warn("[stats] could not write stats file:", err.message);
  }
}

export function recordVisitor(clientId) {
  if (!clientId) return;
  visitors.add(createHash("sha256").update(visitorSalt).update(String(clientId)).digest("hex"));
}

export function recordAnswered({ intent, minerName }) {
  // Re-read before incrementing. This count is what the hackathon's
  // prize-eligibility rule turns on, so a second process (a stray dev server,
  // a restart mid-run) must not silently clobber it with a stale in-memory
  // copy. Read-modify-write keeps the file authoritative.
  loadStats();
  state.total += 1;
  if (intent) state.byIntent[intent] = (state.byIntent[intent] ?? 0) + 1;
  if (minerName) state.byMiner[minerName] = (state.byMiner[minerName] ?? 0) + 1;
  persist();
  return state;
}

export function getStats() {
  return {
    total: state.total,
    byIntent: { ...state.byIntent },
    byMiner: { ...state.byMiner },
    startedAt: state.startedAt,
    visitorsSinceStart: visitors.size,
  };
}

// Test hook: clear the counters, in memory and on disk. Since every increment
// now re-reads the file, a reset that left the file behind would not be one.
export function _resetForTests() {
  state = { total: 0, byIntent: {}, byMiner: {}, startedAt: new Date().toISOString() };
  visitors.clear();
  try {
    rmSync(config.statsFile, { force: true });
  } catch {
    // Nothing written yet.
  }
}
