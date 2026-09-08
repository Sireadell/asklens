// AskLens Clip Guard — watches the clipboard, and the instant a URL is
// copied, checks it against several independent Telegraph miners and shows
// a Windows notification with the verdict, before the link is pasted
// anywhere.
import clipboardy from "clipboardy";
import notifier from "node-notifier";

const ASKLENS_BASE = process.env.ASKLENS_URL ?? "https://asklens-zoox.onrender.com/api/clipguard";
const POLL_MS = 800;

// Matches a whole clipboard entry that IS a URL or an address, not one buried
// inside a longer copied paragraph — pasting a document with a link in it
// should not trigger a check on every copy.
const URL_ONLY_RE = /^https?:\/\/\S+$/i;
const ADDRESS_ONLY_RE = /^0x[a-fA-F0-9]{40}$/;

let lastChecked = "";

function notify(title, message, icon) {
  notifier.notify({
    appID: "AskLens Clip Guard",
    title,
    message,
    icon,
    sound: false,
    wait: false,
  });
}

const LINK_TITLES = {
  malicious: "⚠ Dangerous link copied",
  suspicious: "⚠ Suspicious link copied",
  safe: "✓ Link looks safe",
  unavailable: "AskLens: could not check this link",
  unknown: "AskLens: no clear verdict",
};

const ADDRESS_TITLES = {
  dangerous: "⚠ Dangerous address copied",
  caution: "⚠ Proceed carefully — thin or unclear signal",
  safe: "✓ Address looks clean",
  unavailable: "AskLens: could not check this address",
};

// Best-effort context only, so it is fine that this rarely has a value —
// Telegraph's price router took 20-60s+ in live testing, longer than this
// app waits, so most checks simply run without it.
function formatPriceUsd(price) {
  if (typeof price !== "number" || !Number.isFinite(price)) return null;
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  return price.toPrecision(3);
}

// A link verdict comes from several miners voting, a wallet verdict from
// Sentinel alone, so each is flattened into one title and one detail line.
function summarise(kind, data) {
  if (kind === "link") {
    const line = (data.results || [])
      .filter((r) => r.ok)
      .map((r) => `${r.miner}: ${r.verdict}`)
      .join("  ·  ");
    return {
      title: LINK_TITLES[data.overall] ?? LINK_TITLES.unknown,
      detail: `${data.answeredCount}/${data.totalCount} miners answered — ${line || "no results"}`,
    };
  }
  const formattedPrice = formatPriceUsd(data.priceUsd);
  const base = data.reason ? `${data.miner}: ${data.reason}` : `Checked by ${data.miner}.`;
  return {
    title: ADDRESS_TITLES[data.overall] ?? "AskLens: no clear wallet verdict",
    detail: formattedPrice ? `${base} Trading at $${formattedPrice}.` : base,
  };
}

async function check(kind, value) {
  const isLink = kind === "link";
  console.log(`\nCopied ${isLink ? "link" : "address"}: ${value}`);
  console.log("Checking with Telegraph miners...");
  try {
    const res = await fetch(`${ASKLENS_BASE}/${isLink ? "check-url" : "check-wallet"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isLink ? { url: value } : { address: value }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("Could not check:", data.message);
      notify("AskLens: could not check this", data.message ?? "The check service is unavailable right now.");
      return;
    }
    const { title, detail } = summarise(kind, data);
    console.log(`Verdict: ${data.overall} — ${detail}`);
    notify(title, detail);
  } catch (err) {
    console.log("Error:", err.message);
    notify("AskLens: could not reach the check service", err.message);
  }
}

async function poll() {
  try {
    const text = (await clipboardy.read()).trim();
    const kind = URL_ONLY_RE.test(text) ? "link" : ADDRESS_ONLY_RE.test(text) ? "address" : null;
    if (text && text !== lastChecked && kind) {
      lastChecked = text;
      await check(kind, text);
    } else if (text !== lastChecked && !kind) {
      // Not something we check — remember it anyway, so that copying the SAME
      // ordinary text again later isn't mistaken for a fresh copy after a real
      // link or address has been through in between.
      lastChecked = text;
    }
  } catch {
    // Clipboard can briefly be locked by another app mid-copy; just retry
    // on the next poll rather than crashing the watcher.
  }
}

console.log("AskLens Clip Guard is ready — checking links and wallet addresses you copy.");
console.log(`Checking against: ${ASKLENS_BASE}`);
console.log("Copy a link or a 0x wallet address to see it checked. Press Ctrl+C to stop.");
setInterval(poll, POLL_MS);
