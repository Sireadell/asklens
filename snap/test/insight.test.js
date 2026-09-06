import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRecipient, localBlocklistResult, resultToView } from "../src/insight.js";

const BAD = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";
const ORDINARY = "0x0000000000000000000000000000000000000001";

test("known-bad recipient returns a clear risk warning", () => {
  const insight = resultToView({ status: "critical", reason: "Known exploiter." }, BAD);
  assert.equal(insight.title, "Critical wallet warning");
  assert.match(insight.message, /Do not sign/);
  assert.equal(insight.severity, undefined);
});

test("known sanctioned recipient is blocked if the live check is unavailable", async () => {
  const result = localBlocklistResult(BAD);
  assert.equal(result.status, "critical");
  assert.match(result.reason, /Ronin Bridge/);

  const checked = await checkRecipient(BAD, "eip155:1", async () => {
    throw new Error("live check unavailable");
  });
  assert.equal(checked.status, "critical");
});

test("low risk remains informational", () => {
  const insight = resultToView({ status: "safe", reason: "No known fraud signals." }, BAD);
  assert.equal(insight.severity, undefined);
});

test("HTTP errors become a could-not-check result", async () => {
  const result = await checkRecipient(ORDINARY, "eip155:1", async () => ({ ok: false }), 20);
  assert.equal(result.status, "unavailable");
});

test("timeout finishes without waiting on the remote service", async () => {
  const hangingFetch = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
  });
  const started = Date.now();
  const result = await checkRecipient(ORDINARY, "eip155:1", hangingFetch, 20);
  assert.equal(result.status, "unavailable");
  assert.ok(Date.now() - started < 500);
});
