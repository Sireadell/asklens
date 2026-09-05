import { isValidAddress } from "./mcp.js";
import { snapChain } from "./snap-wallet.js";

export function createSnapWalletSafetyHandler({ assessWallet, guard, enabled = true }) {
  return async function snapWalletSafety(req, res) {
    if (!enabled) {
      return res.status(503).json({
        status: "unavailable",
        error: "SNAP_DEMO_DISABLED",
        message: "AskLens wallet checks are available only during a supervised demo.",
      });
    }
    const address = req.body?.address;
    const chainId = req.body?.chainId;

    if (!isValidAddress(address)) {
      return res.status(503).json({ status: "unavailable", message: "This transaction has no valid recipient address to check." });
    }
    if (!snapChain(chainId)) {
      return res.status(503).json({ status: "unavailable", message: "Sentinel does not support this network yet." });
    }

    const decision = guard(req.ip);
    if (!decision.allowed) {
      return res.status(decision.status).json({
        status: "unavailable",
        error: decision.code,
        message: decision.message,
      });
    }

    const result = await assessWallet({ address, chainId });
    return res.status(result.status === "unavailable" ? 503 : 200).json(result);
  };
}
