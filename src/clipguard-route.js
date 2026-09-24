// The endpoints the PC client calls: one URL in, one aggregated verdict out,
// or one wallet address in, one fraud verdict out.
import { checkUrlAcrossMiners, checkWalletAddress } from "./clipguard.js";
import { isValidAddress } from "./mcp.js";

function isCheckableUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Lets other sites (the CheckFirst Anna app) call the two check routes from a
// browser. `*` is safe here: no cookies or credentials, and the rate guard
// still applies to every caller.
export function allowCrossSiteChecks(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  return next();
}

export function createClipguardHandler({ guard }) {
  return async function checkUrlHandler(req, res) {
    const url = req.body?.url;

    if (!isCheckableUrl(url)) {
      return res.status(400).json({ status: "error", message: "Send a full http:// or https:// URL to check." });
    }

    const decision = guard(req.ip);
    if (!decision.allowed) {
      return res.status(decision.status).json({ status: "error", code: decision.code, message: decision.message });
    }

    const result = await checkUrlAcrossMiners(url.trim());
    return res.json(result);
  };
}

const SUPPORTED_CHAINS = new Set(["eth", "base"]);

export function createClipguardWalletHandler({ guard }) {
  return async function checkWalletHandler(req, res) {
    const address = req.body?.address;

    if (!isValidAddress(address)) {
      return res.status(400).json({
        status: "error",
        message: "Send an EVM address: 0x followed by 40 hex characters.",
      });
    }

    const requested = typeof req.body?.chain === "string" ? req.body.chain.trim().toLowerCase() : "eth";
    if (!SUPPORTED_CHAINS.has(requested)) {
      return res.status(400).json({
        status: "error",
        message: "Sentinel only covers eth and base right now.",
      });
    }

    const decision = guard(req.ip);
    if (!decision.allowed) {
      return res.status(decision.status).json({ status: "error", code: decision.code, message: decision.message });
    }

    const result = await checkWalletAddress(address.trim(), { chain: requested });
    return res.json(result);
  };
}
