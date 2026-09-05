import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import express from "express";
import { createSnapRequestGuard } from "../src/snap-guard.js";
import { createSnapWalletSafetyHandler } from "../src/snap-route.js";

const ADDRESS = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";

async function withRoute({ perClientLimit = 2, dailyPaidLimit = 10, enabled = true } = {}, run) {
  const folder = mkdtempSync(join(tmpdir(), "asklens-snap-"));
  let paidCalls = 0;
  const app = express();
  app.set("trust proxy", 1);
  app.use(express.json());
  const guard = createSnapRequestGuard({
    usageFile: join(folder, "usage.json"),
    perClientLimit,
    windowMs: 60_000,
    dailyPaidLimit,
  });
  app.post("/api/snap/wallet-safety", createSnapWalletSafetyHandler({
    guard,
    assessWallet: async () => {
      paidCalls += 1;
      return { status: "safe", label: "LOW" };
    },
    enabled,
  }));
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  try {
    const url = `http://127.0.0.1:${server.address().port}/api/snap/wallet-safety`;
    await run({ url, paidCalls: () => paidCalls });
  } finally {
    await new Promise((resolve) => server.close(resolve));
    rmSync(folder, { recursive: true, force: true });
  }
}

function check(url, address = ADDRESS) {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ address, chainId: "eip155:1" }),
  });
}

function checkFrom(url, forwardedFor) {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": forwardedFor },
    body: JSON.stringify({ address: ADDRESS, chainId: "eip155:1" }),
  });
}

test("disabled public demo fails closed without making a paid lookup", async () => {
  await withRoute({ enabled: false }, async ({ url, paidCalls }) => {
    const response = await check(url);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, "SNAP_DEMO_DISABLED");
    assert.equal(paidCalls(), 0);
  });
});

test("one trusted Render proxy gives separate visitors separate limits", async () => {
  await withRoute({ perClientLimit: 1 }, async ({ url, paidCalls }) => {
    assert.equal((await checkFrom(url, "198.51.100.10")).status, 200);
    assert.equal((await checkFrom(url, "198.51.100.11")).status, 200);
    assert.equal((await checkFrom(url, "198.51.100.10")).status, 429);
    assert.equal(paidCalls(), 2);
  });
});

test("extra spoofed proxy hops cannot create a new visitor identity", async () => {
  await withRoute({ perClientLimit: 1 }, async ({ url, paidCalls }) => {
    assert.equal((await checkFrom(url, "203.0.113.1, 198.51.100.20")).status, 200);
    assert.equal((await checkFrom(url, "203.0.113.2, 198.51.100.20")).status, 429);
    assert.equal(paidCalls(), 1);
  });
});

test("route stops repeated calls before another paid lookup", async () => {
  await withRoute({ perClientLimit: 2 }, async ({ url, paidCalls }) => {
    assert.equal((await check(url)).status, 200);
    assert.equal((await check(url)).status, 200);
    const blocked = await check(url);
    assert.equal(blocked.status, 429);
    assert.equal((await blocked.json()).error, "SNAP_RATE_LIMITED");
    assert.equal(paidCalls(), 2);
  });
});

test("route enforces the server-wide daily paid-call allowance", async () => {
  await withRoute({ perClientLimit: 10, dailyPaidLimit: 2 }, async ({ url, paidCalls }) => {
    assert.equal((await check(url)).status, 200);
    assert.equal((await check(url)).status, 200);
    const blocked = await check(url);
    assert.equal(blocked.status, 503);
    assert.equal((await blocked.json()).error, "SNAP_DAILY_LIMIT_REACHED");
    assert.equal(paidCalls(), 2);
  });
});

test("invalid route input does not consume the paid-call allowance", async () => {
  await withRoute({ perClientLimit: 1, dailyPaidLimit: 1 }, async ({ url, paidCalls }) => {
    assert.equal((await check(url, "not-an-address")).status, 503);
    assert.equal((await check(url)).status, 200);
    assert.equal(paidCalls(), 1);
  });
});
