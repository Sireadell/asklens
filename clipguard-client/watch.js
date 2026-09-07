// AskLens Clip Guard — watches the clipboard, and the instant a URL is
// copied, checks it against several independent Telegraph miners and shows
// a Windows notification with the verdict, before the link is pasted
// anywhere.
import clipboardy from "clipboardy";
import notifier from "node-notifier";

const ASKLENS_URL = process.env.ASKLENS_URL ?? "https://asklens-zoox.onrender.com/api/clipguard/check-url";
const POLL_MS = 800;

// Matches a whole clipboard entry that IS a URL, not a URL somewhere inside
// a longer copied paragraph — pasting a document with a link in it should
// not trigger a check on every copy.
const URL_ONLY_RE = /^https?:\/\/\S+$/i;

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

const VERDICT_DISPLAY = {
  malicious: { title: "⚠ Dangerous link copied", icon: null },
  suspicious: { title: "⚠ Suspicious link copied", icon: null },
  safe: { title: "✓ Link looks safe", icon: null },
  unavailable: { title: "AskLens: could not check this link", icon: null },
  unknown: { title: "AskLens: no clear verdict", icon: null },
};

async function checkUrl(url) {
  console.log(`\nCopied: ${url}`);
  console.log("Checking with Telegraph miners...");
  notify("AskLens Clip Guard", `Checking: ${url}`);
  try {
    const res = await fetch(ASKLENS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("Could not check:", data.message);
      notify("AskLens: could not check this link", data.message ?? "The check service is unavailable right now.");
      return;
    }
    const display = VERDICT_DISPLAY[data.overall] ?? VERDICT_DISPLAY.unknown;
    const line = data.results
      .filter((r) => r.ok)
      .map((r) => `${r.miner}: ${r.verdict}`)
      .join("  ·  ");
    console.log(`Verdict: ${data.overall} (${data.answeredCount}/${data.totalCount} answered) — ${line}`);
    notify(
      display.title,
      `${data.answeredCount}/${data.totalCount} miners answered — ${line || "no results"}`
    );
  } catch (err) {
    console.log("Error:", err.message);
    notify("AskLens: could not reach the check service", err.message);
  }
}

async function poll() {
  try {
    const text = (await clipboardy.read()).trim();
    if (text && text !== lastChecked && URL_ONLY_RE.test(text)) {
      lastChecked = text;
      await checkUrl(text);
    } else if (text !== lastChecked && !URL_ONLY_RE.test(text)) {
      // Not a URL — remember it so a later copy of the SAME non-URL text
      // doesn't accidentally get treated as "new" once a real URL is copied
      // and then something is copied back.
      lastChecked = text;
    }
  } catch {
    // Clipboard can briefly be locked by another app mid-copy; just retry
    // on the next poll rather than crashing the watcher.
  }
}

console.log("AskLens Clip Guard is ready — checking links you copy.");
console.log(`Checking against: ${ASKLENS_URL}`);
console.log("Copy a link to see it checked. Press Ctrl+C to stop.");
setInterval(poll, POLL_MS);
