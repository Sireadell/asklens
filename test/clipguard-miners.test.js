import { test } from "node:test";
import assert from "node:assert/strict";
import {
  chooseRankedUrlMiners,
  classifyUrlVerdict,
  createUrlMinerSelector,
} from "../src/clipguard.js";

const definitions = {
  "7334": { path: "/url-scan", method: "GET" },
  "5001": { path: "/scan", method: "POST" },
  "20260828": { path: "/url-scan", method: "GET" },
};

function registry(ranks) {
  return Object.entries(ranks).map(([id, rank]) => ({
    id,
    activation_status: "active",
    supported_intents: ["URL_SCAN"],
    endpoints: definitions[id],
    scores: [{ intent_id: "URL_SCAN", rank }],
  }));
}

function jsonResponse(payload) {
  return { ok: true, json: async () => payload };
}

test("selects exactly the three reviewed active compatible URL miners", () => {
  const selected = chooseRankedUrlMiners(registry({
    "7334": 3,
    "5001": 4,
    "20260828": 2,
    "7402": 1,
  }));

  assert.deepEqual(selected.map((miner) => miner.id), ["20260828", "7334", "5001"]);
});

test("keeps the original complete set when registry discovery is unavailable", async () => {
  const selector = createUrlMinerSelector({
    fetchFn: async () => { throw new Error("offline"); },
    now: () => 1,
  });

  const selected = selector.refreshIfDue();
  assert.deepEqual(selected.map((miner) => miner.id), ["7334", "5001", "20260828"]);
});

test("starts an expired registry refresh without delaying the current snapshot", async () => {
  let currentTime = 10;
  let calls = 0;
  let finishRefresh;
  const selector = createUrlMinerSelector({
    now: () => currentTime,
    fetchFn: async () => {
      calls += 1;
      await new Promise((resolve) => { finishRefresh = resolve; });
      return jsonResponse(registry({ "7334": 1, "5001": 3, "20260828": 2 }));
    },
  });

  const firstSnapshot = selector.refreshIfDue();
  assert.deepEqual(firstSnapshot.map((miner) => miner.id), ["7334", "5001", "20260828"]);
  assert.equal(calls, 1);
  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "5001", "20260828"]);
  finishRefresh();
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "20260828", "5001"]);
  currentTime += (6 * 60 * 60 * 1000) - 1;
  selector.refreshIfDue();
  assert.equal(calls, 1);

  currentTime += 1;
  selector.refreshIfDue();
  assert.equal(calls, 2);
});

test("excludes inactive miners and endpoint or method mismatches", () => {
  const entries = registry({ "7334": 1, "5001": 2, "20260828": 3 });
  entries[0].activation_status = "inactive";
  entries[1].endpoints = { path: "/scan", method: "GET" };
  entries[2].endpoints = { path: "/wrong", method: "GET" };
  assert.deepEqual(chooseRankedUrlMiners(entries), []);
});

test("keeps the stable snapshot when registry refresh times out or fails", async () => {
  let currentTime = 1;
  const selector = createUrlMinerSelector({
    now: () => currentTime,
    discoveryTimeoutMs: 5,
    fetchFn: () => new Promise(() => {}),
  });
  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "5001", "20260828"]);
  await new Promise((resolve) => setTimeout(resolve, 15));
  currentTime += 6 * 60 * 60 * 1000;
  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "5001", "20260828"]);
});

test("times out a registry response whose JSON body never resolves and permits a later refresh", async () => {
  let calls = 0;
  let aborts = 0;
  const selector = createUrlMinerSelector({
    cacheMs: 0,
    discoveryTimeoutMs: 5,
    fetchFn: async (_url, { signal }) => {
      calls += 1;
      signal.addEventListener("abort", () => { aborts += 1; });
      return { ok: true, json: () => new Promise(() => {}) };
    },
  });

  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "5001", "20260828"]);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(aborts, 1);

  // A second request proves the timed-out JSON body did not leave the
  // selector stuck behind its previous refresh.
  assert.deepEqual(selector.refreshIfDue().map((miner) => miner.id), ["7334", "5001", "20260828"]);
  assert.equal(calls, 2);
});

test("treats ProofGate's incompatible and contradictory verdicts as unknown", () => {
  assert.equal(classifyUrlVerdict({ verdict: "no_threat_signal" }), "unknown");
  assert.equal(classifyUrlVerdict({ verdict: "no_threat_signal", malicious: false }), "unknown");
  assert.equal(classifyUrlVerdict({ verdict: "safe", malicious: true }), "unknown");
});
