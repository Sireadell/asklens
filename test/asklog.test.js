import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { rmSync, mkdirSync } from "node:fs";
import { logAsk, readLog } from "../src/asklog.js";
import { config } from "../src/config.js";

beforeEach(() => {
  mkdirSync("data", { recursive: true });
  rmSync(config.askLogFile, { force: true });
});

test("keeps the signal hash so an answer can be checked later", () => {
  logAsk({ question: "What is gas on Ethereum?", intent: "GAS_PRICE", minerName: "TxLens", answer: "0.16 gwei", signalHash: "0xabc", ourMiner: true });
  const [entry] = readLog();
  assert.equal(entry.signalHash, "0xabc");
  assert.equal(entry.miner, "TxLens");
  assert.equal(entry.ourMiner, true);
  assert.equal(entry.plainText, true);
});

test("records that a miner returned nothing readable", () => {
  logAsk({ question: "Aave TVL?", intent: "TVL_LOOKUP", minerName: "TVL Oracle", answer: null, signalHash: "0xdef" });
  assert.equal(readLog()[0].plainText, false);
});

test("returns newest first and respects the limit", () => {
  logAsk({ question: "first", signalHash: "0x1" });
  logAsk({ question: "second", signalHash: "0x2" });
  logAsk({ question: "third", signalHash: "0x3" });
  const entries = readLog(2);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].question, "third");
  assert.equal(entries[1].question, "second");
});

test("an empty log reads as no entries, not an error", () => {
  assert.deepEqual(readLog(), []);
});

test("marks a direct ask so it is distinguishable from a routed one", () => {
  logAsk({ question: "gas?", minerName: "TxLens", direct: true, signalHash: "0x9" });
  assert.equal(readLog()[0].direct, true);
});
