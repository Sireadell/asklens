// A running count of real requests this app has sent, per intent.
//
// The hackathon's prize-eligibility rule turns on real app requests per
// intent, so this is the number that matters, shown on the page rather than
// kept private. Counts are only incremented after Telegraph actually answered
// and settled payment, never on a failed or refused call.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";

let state = { total: 0, byIntent: {}, byMiner: {}, startedAt: new Date().toISOString() };

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
    }
  } catch {
    // No stats file yet — first run.
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
  };
}

// Test hook: clear the counters, in memory and on disk. Since every increment
// now re-reads the file, a reset that left the file behind would not be one.
export function _resetForTests() {
  state = { total: 0, byIntent: {}, byMiner: {}, startedAt: new Date().toISOString() };
  try {
    rmSync(config.statsFile, { force: true });
  } catch {
    // Nothing written yet.
  }
}
