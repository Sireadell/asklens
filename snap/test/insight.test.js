import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRecipient, resultToView } from "../src/insight.js";

const BAD = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";

test("known-bad recipient returns a clear risk warning", () => {
  const insight = resultToView({ status: "critical", reason: "Known exploiter." }, BAD);
  assert.equal(insight.title, "Critical wallet warning");
  assert.match(insight.message, /Do not sign/);
  assert.equal(insight.severity, undefined);
});

test("low risk remains informational", () => {
  const insight = resultToView({ status: "safe", reason: "No known fraud signals." }, BAD);
  assert.equal(insight.severity, undefined);
});

test("HTTP errors become a could-not-check result", async () => {
  const result = await checkRecipient(BAD, "eip155:1", async () => ({ ok: false }), 20);
  assert.equal(result.status, "unavailable");
});

test("timeout finishes without waiting on the remote service", async () => {
  const hangingFetch = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
  });
  const started = Date.now();
  const result = await checkRecipient(BAD, "eip155:1", hangingFetch, 20);
  assert.equal(result.status, "unavailable");
  assert.ok(Date.now() - started < 500);
});
