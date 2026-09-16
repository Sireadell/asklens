const DEFAULT_WINDOW_MS = 2 * 60 * 1000;

function didAddressChange(previous, nextAddress, now = Date.now(), windowMs = DEFAULT_WINDOW_MS) {
  if (!previous || typeof previous.address !== "string" || typeof nextAddress !== "string") return false;
  if (!Number.isFinite(previous.copiedAt) || now < previous.copiedAt) return false;
  if (now - previous.copiedAt > windowMs) return false;
  return previous.address.toLowerCase() !== nextAddress.toLowerCase();
}

module.exports = { DEFAULT_WINDOW_MS, didAddressChange };
