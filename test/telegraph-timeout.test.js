import { test } from "node:test";
import assert from "node:assert/strict";
import { postToEngine } from "../src/telegraph.js";

test("paid Telegraph request aborts at its supplied deadline", async () => {
  let aborted = false;
  const hangingFetch = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      aborted = true;
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
    }, { once: true });
  });

  const started = Date.now();
  await assert.rejects(
    postToEngine("/v1/ask/test", {}, { timeoutMs: 30, fetchFn: hangingFetch }),
    (error) => error.code === "ENGINE_TIMEOUT",
  );
  const elapsed = Date.now() - started;
  assert.equal(aborted, true);
  assert.ok(elapsed < 1000, `request continued for ${elapsed}ms`);
});
