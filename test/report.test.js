import { test } from "node:test";
import assert from "node:assert/strict";
import { buildReport, answerQuality } from "../src/report.js";

const rec = (o) => ({ at: "2026-09-02T14:00:00Z", question: "q", intent: "GAS_PRICE", routedToUs: false, routed: null, ours: null, ...o });

test("spots a refusal dressed up as an answer", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "A holder count is not served for that." }), "refused");
});

test("a one-word answer counts as terse, not a real answer", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "valid" }), "terse");
});

test("a miner returning no readable text is unreadable", () => {
  assert.equal(answerQuality({ hasPlainText: false, answer: null }), "unreadable");
});

test("a full sentence counts as answered", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "Gas on Ethereum is 0.16 gwei right now." }), "answered");
});

test("counts how often the router picked us", () => {
  const r = buildReport([
    rec({ routedToUs: true, routed: { miner: "TxLens", hasPlainText: true, answer: "Gas is 0.16 gwei right now." } }),
    rec({ routed: { miner: "Rival", hasPlainText: true, answer: "Gas is 0.20 gwei right now." } }),
  ]);
  assert.equal(r.totals.asked, 2);
  assert.equal(r.totals.routedToUs, 1);
  assert.equal(r.totals.routedShare, 0.5);
});

test("names the competitors that won the routing", () => {
  const r = buildReport([
    rec({ routed: { miner: "Rival A", hasPlainText: true, answer: "a full sentence answer here" } }),
    rec({ routed: { miner: "Rival A", hasPlainText: true, answer: "another full sentence answer" } }),
    rec({ routed: { miner: "Rival B", hasPlainText: true, answer: "yet another full answer here" } }),
  ]);
  assert.deepEqual(r.intents[0].competitors, { "Rival A": 2, "Rival B": 1 });
});

test("records a win when we answered and the routed miner refused", () => {
  const r = buildReport([
    rec({
      routed: { miner: "Rival", hasPlainText: true, answer: "This miner does not serve that." },
      ours: { miner: "TxLens", hasPlainText: true, answer: "DAI has 754,063 holders on Ethereum." },
    }),
  ]);
  assert.equal(r.intents[0].headToHead.weAnsweredTheyDidNot, 1);
  assert.equal(r.intents[0].headToHead.theyAnsweredWeDidNot, 0);
});

test("counts a misrouted question against the intent it landed on", () => {
  const r = buildReport([
    rec({ intent: "WALLET_BALANCE_CHECK", expectedIntent: "FRAUD_DETECTION", routedIntentMatched: false, routed: { miner: "Rival", hasPlainText: true, answer: "holds 101 ETH in total" } }),
  ]);
  assert.equal(r.intents[0].misroutedFromExpected, 1);
});

test("an empty log produces an empty report, not a crash", () => {
  const r = buildReport([]);
  assert.equal(r.totals.asked, 0);
  assert.deepEqual(r.intents, []);
});

test("a politely worded 'nothing found' is a refusal, not a win", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "no DefiLlama protocol found for 'How much value is locked in Uniswap?'" }), "refused");
  assert.equal(answerQuality({ hasPlainText: true, answer: "no stock quote found for 'What is Tesla stock trading at?'" }), "refused");
});

test("'temporarily unavailable' is a refusal", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "ETH price data temporarily unavailable from upstream sources." }), "refused");
});

test("a real answer that happens to contain the word found still counts", () => {
  assert.equal(answerQuality({ hasPlainText: true, answer: "Here are 5 peer-reviewed papers, found among 42,433 matching articles." }), "answered");
});

test("both sides failing is not scored as a win for either", () => {
  const r = buildReport([
    rec({
      routed: { miner: "Rival", hasPlainText: false, answer: null },
      ours: { miner: "TxLens", hasPlainText: true, answer: "no stock quote found for that question" },
    }),
  ]);
  assert.equal(r.intents[0].headToHead.weAnsweredTheyDidNot, 0);
  assert.equal(r.intents[0].headToHead.theyAnsweredWeDidNot, 0);
});
