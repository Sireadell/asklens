import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { allowCrossSiteChecks, createClipguardHandler } from "../src/clipguard-route.js";

let server;
let base;
let guardCalls = 0;

before(async () => {
  const app = express();
  app.use(["/api/clipguard/check-url", "/api/clipguard/check-wallet"], allowCrossSiteChecks);
  app.use(express.json());
  app.post("/api/clipguard/check-url", createClipguardHandler({
    guard: () => {
      guardCalls += 1;
      return { allowed: false, status: 429, code: "RATE_LIMITED", message: "slow down" };
    },
  }));
  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server?.close());

test("a browser on another site may ask to call a check, without spending a check", async () => {
  const res = await fetch(`${base}/api/clipguard/check-wallet`, {
    method: "OPTIONS",
    headers: {
      origin: "https://anna.partners",
      "access-control-request-method": "POST",
      "access-control-request-headers": "content-type",
    },
  });
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("access-control-allow-origin"), "*");
  assert.match(res.headers.get("access-control-allow-headers"), /content-type/);
  assert.equal(guardCalls, 0);
});

test("the real answer carries the header, and the rate guard still applies", async () => {
  const res = await fetch(`${base}/api/clipguard/check-url`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://anna.partners" },
    body: JSON.stringify({ url: "https://example.com" }),
  });
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("access-control-allow-origin"), "*");
  assert.equal(guardCalls, 1);
});

test("cross-site access stops at the two check routes", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.headers.get("access-control-allow-origin"), null);
});
