import { test } from "node:test";
import assert from "node:assert/strict";
import { extractAnswer, extractConfidence } from "../src/answer.js";

test("prefers a miner's plain-language summary", () => {
  const r = extractAnswer({ summary: "Gas is 12 gwei on Ethereum.", answer: "12", status: "ok" });
  assert.equal(r.text, "Gas is 12 gwei on Ethereum.");
});

test("falls back to answer when there is no summary", () => {
  assert.equal(extractAnswer({ answer: "42" }).text, "42");
});

test("reads a numeric answer field", () => {
  assert.equal(extractAnswer({ answer: 12.5 }).text, "12.5");
});

test("reads one level of nesting", () => {
  assert.equal(extractAnswer({ data: { summary: "Nested answer." } }).text, "Nested answer.");
});

test("never invents text when the shape is unknown", () => {
  const r = extractAnswer({ gwei: 12, chain: "eth" });
  assert.equal(r.text, null);
  assert.deepEqual(r.raw, { gwei: 12, chain: "eth" });
});

test("handles a bare string result", () => {
  assert.equal(extractAnswer("just text").text, "just text");
});

test("handles null and undefined", () => {
  assert.equal(extractAnswer(null).text, null);
  assert.equal(extractAnswer(undefined).text, null);
});

test("ignores whitespace-only fields", () => {
  assert.equal(extractAnswer({ summary: "   ", answer: "real" }).text, "real");
});

test("confidence passes through 0-1 values", () => {
  assert.equal(extractConfidence({ confidence: 0.95 }), 0.95);
});

test("confidence converts a percentage", () => {
  assert.equal(extractConfidence({ confidence: 95 }), 0.95);
});

test("confidence is null when absent or unusable", () => {
  assert.equal(extractConfidence({}), null);
  assert.equal(extractConfidence({ confidence: "high" }), null);
  assert.equal(extractConfidence({ confidence: 5000 }), null);
});

test("reads the `signal` field Telegraph miners use for their one-line answer", () => {
  const r = extractAnswer({ status: "ok", signal: "0.1962 gwei is the gas price on ethereum", data: { gas_price_gwei: 0.196 } });
  assert.equal(r.text, "0.1962 gwei is the gas price on ethereum");
});

test("summary still wins over signal", () => {
  assert.equal(extractAnswer({ summary: "Plain summary.", signal: "terse signal" }).text, "Plain summary.");
});
