import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { recordAnswered, getStats, _resetForTests } from "../src/stats.js";

beforeEach(() => _resetForTests());

test("counts a request once, against its intent and miner", () => {
  recordAnswered({ intent: "GAS_PRICE", minerName: "TxLens" });
  const s = getStats();
  assert.equal(s.total, 1);
  assert.equal(s.byIntent.GAS_PRICE, 1);
  assert.equal(s.byMiner.TxLens, 1);
});

test("accumulates across intents", () => {
  recordAnswered({ intent: "GAS_PRICE", minerName: "TxLens" });
  recordAnswered({ intent: "GAS_PRICE", minerName: "TxLens" });
  recordAnswered({ intent: "CRYPTO_PRICE", minerName: "TxLens" });
  const s = getStats();
  assert.equal(s.total, 3);
  assert.equal(s.byIntent.GAS_PRICE, 2);
  assert.equal(s.byIntent.CRYPTO_PRICE, 1);
});

test("an unclassified answer still counts toward the total", () => {
  recordAnswered({ intent: null, minerName: null });
  const s = getStats();
  assert.equal(s.total, 1);
  assert.deepEqual(s.byIntent, {});
});

test("getStats hands back a copy, not the live object", () => {
  recordAnswered({ intent: "GAS_PRICE", minerName: "TxLens" });
  const s = getStats();
  s.byIntent.GAS_PRICE = 999;
  assert.equal(getStats().byIntent.GAS_PRICE, 1);
});

test("an increment builds on what is already on disk, not on stale memory", async () => {
  const { writeFileSync, mkdirSync, rmSync } = await import("node:fs");
  const { config } = await import("../src/config.js");
  mkdirSync("data", { recursive: true });
  // Another process got there first and wrote a higher count.
  writeFileSync(config.statsFile, JSON.stringify({ total: 41, byIntent: { GAS_PRICE: 41 }, byMiner: {} }));
  recordAnswered({ intent: "GAS_PRICE", minerName: "TxLens" });
  assert.equal(getStats().total, 42);
  assert.equal(getStats().byIntent.GAS_PRICE, 42);
  rmSync(config.statsFile, { force: true });
});
