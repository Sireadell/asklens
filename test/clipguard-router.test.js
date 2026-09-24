import { test } from "node:test";
import assert from "node:assert/strict";
import {
  aggregateUrlVerdict,
  checkUrlWithRouter,
  classifyUrlVerdict,
  selectVerifierMiners,
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
      if (/\/v1\/ask\/5001$/.test(url)) {
        return engineResponse({
          miner_id: "5001",
          miner_name: "URL Sentinel",
          result: { verdict: "safe", confidence: 0.88, reason: "No phishing signal." },
          signal_hash: "0xabc-sentinel",
        });
      }
      if (/\/v1\/ask\/20260828$/.test(url)) {
        return engineResponse({
          miner_id: "20260828",
          miner_name: "Preflight",
          result: { verdict: "safe", confidence: 0.86, reason: "No blocklist match." },
          signal_hash: "0xabc-preflight",
        });
      }
      return engineResponse({
        intent: "URL_SCAN",
        miner_id: "7334",
        miner_name: "NetWire URL Scan",
        endpoint: "/url-scan",
        result: { verdict: "safe", confidence: 0.91, reason: "No known threat signals." },
        signal_hash: "0xabc-router",
      });
    },
    verifierStaggerMs: 0,
    random: () => 0,
  });

  assert.equal(calls.length, 3);
  assert.match(calls[0].url, /\/v1\/ask$/);
  assert.doesNotMatch(calls[0].url, /\/v1\/ask\/\d+/);
  assert.doesNotMatch(calls[1].url, /\/v1\/ask\/7334$/);
  assert.doesNotMatch(calls[2].url, /\/v1\/ask\/7334$/);
  const verifierUrls = calls.slice(1).map((call) => call.url).sort();
  assert.match(verifierUrls[0], /\/v1\/ask\/20260828$|\/v1\/ask\/5001$/);
  assert.match(verifierUrls[1], /\/v1\/ask\/20260828$|\/v1\/ask\/5001$/);
  assert.notEqual(verifierUrls[0], verifierUrls[1]);
  assert.match(calls[0].body.query, /Use the URL_SCAN intent/);
  assert.equal(calls[0].body.context.surface, "clipguard");
  assert.equal(result.router, true);
  assert.equal(result.overall, "safe");
  assert.equal(result.miner, "NetWire URL Scan");
  assert.equal(result.intent, "URL_SCAN");
  assert.equal(result.signalHash, "0xabc-router");
  assert.equal(result.results[0].ok, true);
  assert.equal(result.results.length, 3);
});

test("does not call a misrouted copied link safe", async () => {
  const result = await checkUrlWithRouter("https://example.com", {
    fetchFn: async () => engineResponse({
      intent: "WEB_SEARCH",
      miner_name: "General Web Miner",
      result: { verdict: "safe", answer: "The site looks popular." },
      signal_hash: "0xdef",
    }),
    verifierStaggerMs: 0,
    miners: [],
  });

  assert.equal(result.overall, "caution");
  assert.equal(result.answeredCount, 0);
  assert.equal(result.results[0].ok, false);
  assert.match(result.results[0].reason, /instead of URL_SCAN/);
});

test("selects two verifier miners from the top three and excludes the routed miner", () => {
  const selected = selectVerifierMiners("7334", { random: () => 0 }).map((miner) => miner.id);
  assert.deepEqual(selected.sort(), ["20260828", "5001"].sort());
});

test("selects two verifier miners when Telegraph routes to a miner outside the top three", () => {
  const selected = selectVerifierMiners("9002", { random: () => 0 }).map((miner) => miner.id);
  assert.equal(selected.length, 2);
  assert.equal(new Set(selected).size, 2);
  assert.equal(selected.includes("9002"), false);
});

test("does not call one routed safe answer enough for a copied link", async () => {
  const result = await checkUrlWithRouter("https://example.com", {
    fetchFn: async (url) => {
      if (/\/v1\/ask\/7334$/.test(url)) {
        return engineResponse({
          miner_id: "7334",
          miner_name: "NetWire",
          result: { verdict: "safe" },
        });
      }
      if (/\/v1\/ask\/5001$/.test(url)) {
        return engineResponse({
          miner_id: "5001",
          miner_name: "URL Sentinel",
          result: { verdict: "suspicious" },
        });
      }
      return engineResponse({
        intent: "URL_SCAN",
        miner_id: "9999",
        miner_name: "Routed Miner",
        result: { verdict: "safe" },
      });
    },
    verifierStaggerMs: 0,
    miners: [
      { id: "7334", name: "NetWire", method: "GET", endpoint: "/url-scan", payload: (url) => ({ url }) },
      { id: "5001", name: "URL Sentinel", method: "POST", endpoint: "/scan", payload: (url) => ({ url }) },
    ],
  });

  assert.equal(result.overall, "suspicious");
  assert.equal(result.safe, 2);
  assert.equal(result.suspicious, 1);
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

test("calls a link safe only when enough URL miners agree", () => {
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "safe" },
  ], 1).overall, "caution");
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "safe" },
    { ok: true, verdict: "safe" },
  ], 2).overall, "safe");
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "malicious" },
  ], 1).overall, "suspicious");
  assert.equal(aggregateUrlVerdict([
    { ok: true, verdict: "malicious" },
    { ok: true, verdict: "malicious" },
  ], 2).overall, "malicious");
});
