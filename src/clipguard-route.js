// The endpoint the PC client calls: one URL in, one aggregated verdict out.
import { checkUrlAcrossMiners } from "./clipguard.js";

function isCheckableUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
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
