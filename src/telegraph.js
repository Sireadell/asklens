// Everything that talks to Telegraph's Engine.
//
// Each /ask call is x402-gated: the first attempt comes back 402 with the
// price and pay-to address, the wrapped fetch signs a payment and retries.
// Settlement only happens on a 2xx, so a request the node refuses (422) is
// free.
import { x402Client, wrapFetchWithPayment, decodePaymentResponseHeader } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "./config.js";

let payFetch = null;
let payerAddress = null;

export function paymentReady() {
  return payFetch !== null;
}

export function getPayerAddress() {
  return payerAddress;
}

export function initPayments() {
  if (!config.privateKey) {
    console.warn("[x402] EVM_PRIVATE_KEY not set — asks will fail with 402 until it is");
    return null;
  }
  const key = config.privateKey.startsWith("0x") ? config.privateKey : `0x${config.privateKey}`;
  const account = privateKeyToAccount(key);
  const client = new x402Client();
  registerExactEvmScheme(client, { signer: account });
  payFetch = wrapFetchWithPayment(fetch, client);
  payerAddress = account.address;
  console.log(`[x402] paying from ${account.address}`);
  return payFetch;
}

export class EngineError extends Error {
  constructor(code, message, status = 502, details = null) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

async function postToEngine(path, body) {
  if (!payFetch) {
    throw new EngineError(
      "PAYMENT_NOT_CONFIGURED",
      "This app cannot pay Telegraph yet: no wallet key is configured. Each answer costs $0.01 in test USDC.",
      503
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.askTimeoutMs);

  let res;
  try {
    res = await payFetch(`${config.engineBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new EngineError("ENGINE_TIMEOUT", `Telegraph took longer than ${config.askTimeoutMs}ms to answer.`, 504);
    }
    throw new EngineError("ENGINE_NETWORK_ERROR", `Could not reach Telegraph: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    /* handled below */
  }

  if (res.status === 402) {
    throw new EngineError("PAYMENT_FAILED", "Payment for this request did not go through. The app's test USDC balance may be empty.", 402, parsed);
  }
  if (res.status === 422) {
    // Telegraph predicted the call would fail and charged nothing.
    const warnings = parsed?.warnings ?? [];
    throw new EngineError("REQUEST_REFUSED", warnings[0] ?? "Telegraph refused this request before running it. You were not charged.", 422, parsed);
  }
  if (!res.ok) {
    throw new EngineError("ENGINE_HTTP_ERROR", `Telegraph returned HTTP ${res.status}.`, 502, parsed ?? text.slice(0, 300));
  }
  if (!parsed) {
    throw new EngineError("ENGINE_INVALID_JSON", "Telegraph returned a response this app could not read.");
  }

  let settlement = null;
  const header = res.headers.get("payment-response") ?? res.headers.get("x-payment-response");
  if (header) {
    try {
      settlement = decodePaymentResponseHeader(header);
    } catch {
      settlement = null;
    }
  }
  return { body: parsed, settlement };
}

// Auto-routed ask: Telegraph's own router reads the question, picks the intent
// and the miner, and tells us why.
export function ask(query, context) {
  const payload = { query };
  if (context && Object.keys(context).length > 0) payload.context = context;
  return postToEngine("/v1/ask", payload);
}

// Direct ask: we name the miner ourselves. Used for the second-opinion panel,
// where the point is to hear from a specific miner rather than the best one.
export function askMiner(minerId, { method, endpoint, payload }) {
  return postToEngine(`/v1/ask/${minerId}`, { method, endpoint, payload });
}
