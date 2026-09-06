export const ASKLENS_URL = "https://asklens-zoox.onrender.com/api/snap/wallet-safety";
export const CHECK_TIMEOUT_MS = 12_000;
const LOCAL_BLOCKLIST = new Map([
  [
    "0x098b716b8aaf21512996dc57eb0615e2383e2f96",
    "Known sanctioned recipient. This address is linked to the Ronin Bridge exploit.",
  ],
]);

export function localBlocklistResult(address) {
  const reason = LOCAL_BLOCKLIST.get(address.toLowerCase());
  return reason ? { status: "critical", reason } : null;
}

export function resultToView(result, address) {
  if (result?.status === "critical") {
    return {
      title: "Critical wallet warning",
      message: `Do not sign unless you are certain. Telegraph Sentinel marked ${address} as high risk.`,
      detail: result.reason ?? "This address is linked to known fraud signals.",
    };
  }

  if (result?.status === "safe") {
    return {
      title: "AskLens wallet check",
      message: `Telegraph Sentinel found no known high-risk signals for ${address}.`,
      detail: result.reason ?? "Risk can change. Always check transaction details.",
    };
  }

  return unavailableView(result?.message);
}

export function unavailableView(message = "AskLens could not check this address right now.") {
  return {
    title: "Wallet check unavailable",
    message,
    detail: "Review the recipient carefully before signing.",
  };
}

export async function checkRecipient(address, chainId, fetchFn = fetch, timeoutMs = CHECK_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchFn(ASKLENS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ address, chainId }),
      signal: controller.signal,
    });
    if (!response.ok) return localBlocklistResult(address) ?? { status: "unavailable", message: "AskLens could not check this address right now." };
    return await response.json();
  } catch {
    return localBlocklistResult(address) ?? { status: "unavailable", message: "AskLens could not check this address right now." };
  } finally {
    clearTimeout(timer);
  }
}
