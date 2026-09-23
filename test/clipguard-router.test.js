import { test } from "node:test";
import assert from "node:assert/strict";
import {
  aggregateUrlVerdict,
  checkUrlWithRouter,
  classifyUrlVerdict,
} from "../src/clipguard.js";

function engineResponse(payload) {
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    text: async () => JSON.stringify(payload),
  };
}

test("routes copied link checks through Telegraph's automatic router", async () => {
  const calls = [];
  const result = await checkUrlWithRouter("https://example.com", {
    fetchFn: async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return engineResponse({
        intent: "URL_SCAN",
        miner_id: "7334",
        miner_name: "NetWire URL Scan",
        endpoint: "/url-scan",
        result: { verdict: "safe", confidence: 0.91, reason: "No known threat signals." },
        signal_hash: "0xabc",
      });
    },
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/v1\/ask$/);
  assert.doesNotMatch(calls[0].url, /\/v1\/ask\/\d+/);
  assert.match(calls[0].body.query, /Use the URL_SCAN intent/);
  assert.equal(calls[0].body.context.surface, "clipguard");
  assert.equal(result.router, true);
  assert.equal(result.overall, "safe");
  assert.equal(result.miner, "NetWire URL Scan");
  assert.equal(result.intent, "URL_SCAN");
  assert.equal(result.signalHash, "0xabc");
  assert.equal(result.results[0].ok, true);
});

test("does not call a misrouted copied link safe", async () => {
  const result = await checkUrlWithRouter("https://example.com", {
    fetchFn: async () => engineResponse({
      intent: "WEB_SEARCH",
      miner_name: "General Web Miner",
      result: { verdict: "safe", answer: "The site looks popular." },
      signal_hash: "0xdef",
    }),
  });

  assert.equal(result.overall, "caution");
  assert.equal(result.answeredCount, 0);
  assert.equal(result.results[0].ok, false);
  assert.match(result.results[0].reason, /instead of URL_SCAN/);
});

test("treats ProofGate's incompatible and contradictory verdicts as unknown", () => {
  assert.equal(classifyUrlVerdict({ verdict: "no_threat_signal" }), "unknown");
  assert.equal(classifyUrlVerdict({ verdict: "no_threat_signal", malicious: false }), "unknown");
  assert.equal(classifyUrlVerdict({ verdict: "safe", malicious: true }), "unknown");
});

test("does not call a link safe when a router result is unclear", () => {
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "unknown" },
  ], 1).overall, "caution");
});

test("calls a link safe when the routed URL miner returns safe", () => {
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "safe" },
  ], 1).overall, "safe");
});
