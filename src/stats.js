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
let baselineApplied = false;

// Requests already made and independently verifiable: every one of these is
// a settled Telegraph call whose signal hash is published in HASHES.md, so
// anyone can resolve them at the Engine rather than take the number on faith.
//
// This exists because the host's filesystem does not survive a deploy. Without
// a committed floor the live counter silently restarted at zero on every push,
// reporting a handful of requests for an app that had made hundreds. The
// baseline is the audited floor; live traffic accumulates on top of it.
const BASELINE_FILE = new URL("../evidence/stats-baseline.json", import.meta.url);

function readBaseline() {
  try {
    const parsed = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // No baseline published yet.
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
    // No local stats file: either a genuine first run, or a fresh deploy on a
    // host that wiped the disk. Fall through to the published baseline.
  }

  // Seeded at most once per process. Re-applying it on every miss would let
  // the floor reappear after a deliberate reset, and would re-add itself on
  // top of counts already recorded.
  if (baselineApplied) return state;
  baselineApplied = true;

  const baseline = readBaseline();
  if (baseline) {
    state = {
      total: Number(baseline.total) || 0,
      byIntent: baseline.byIntent ?? {},
      byMiner: baseline.byMiner ?? {},
      startedAt: baseline.startedAt ?? state.startedAt,
    };
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
  baselineApplied = true;
  try {
    rmSync(config.statsFile, { force: true });
  } catch {
    // Nothing written yet.
  }
}
