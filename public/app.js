const form = document.getElementById("ask-form");
const input = document.getElementById("question");
const submit = document.getElementById("submit");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const verdictEl = document.getElementById("verdict");
const metaEl = document.getElementById("meta");
const rawWrap = document.getElementById("raw-wrap");
const rawEl = document.getElementById("raw");
const secondWrap = document.getElementById("second-wrap");
const secondBtn = document.getElementById("second-btn");
const secondResult = document.getElementById("second-result");
const examplesEl = document.getElementById("examples");
const counterEl = document.getElementById("counter");

let lastAsk = null;

function setStatus(message, isError) {
  if (!message) {
    statusEl.hidden = true;
    return;
  }
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.classList.toggle("error", Boolean(isError));
}

function row(label, value, extraClass) {
  if (value === null || value === undefined || value === "") return "";
  const cls = extraClass ? ` ${extraClass}` : "";
  return `<dt>${label}</dt><dd class="val${cls}">${value}</dd>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderMeta(data) {
  const ours = data.ourMiner ? '<span class="badge ours">our miner</span>' : "";
  const conf = data.confidence === null || data.confidence === undefined
    ? null
    : `${Math.round(data.confidence * 100)}%`;
  metaEl.innerHTML = "<dl>" + [
    row("Answered by", escapeHtml(data.minerName ?? "unknown") + ours),
    row("Question type", escapeHtml(data.intentLabel ?? data.intent ?? "not classified")),
    row("Why this miner", data.reasoning ? escapeHtml(data.reasoning) : null),
    row("Miner confidence", conf),
    row("Took", data.durationMs ? `${data.durationMs} ms` : null),
    row("Cost", data.costUsd !== null ? `$${data.costUsd}` : null),
    row("On-chain record", data.signalHash ? escapeHtml(data.signalHash) : null),
    row("Payment tx", data.paymentTx ? escapeHtml(data.paymentTx) : null),
  ].join("") + "</dl>";
}

function renderAnswer(data) {
  resultEl.hidden = false;
  verdictEl.textContent = data.answer ?? "The miner answered, but not in plain text. The full response is below.";
  renderMeta(data);

  if (data.raw !== undefined && data.raw !== null) {
    rawWrap.hidden = false;
    rawEl.textContent = JSON.stringify(data.raw, null, 2);
  } else {
    rawWrap.hidden = true;
  }

  secondResult.hidden = true;
  secondResult.innerHTML = "";
  const canSecond = Boolean(data.intent) && !data.ourMiner;
  secondWrap.hidden = !canSecond;
  lastAsk = data;

  if (data.stats) renderCounter(data.stats);
  // The examples row pushes the answer below the fold on shorter screens.
  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCounter(stats) {
  // The counter resets to 0 whenever the server restarts (a redeploy, a
  // free-tier sleep/wake cycle). Showing "0 real requests" on a page whose
  // whole pitch is live, paid, real answers reads as broken, so it is left
  // out until there is a real number to show, rather than shown at zero.
  if (!stats.total) {
    counterEl.hidden = true;
    return;
  }
  const intents = Object.keys(stats.byIntent ?? {}).length;
  counterEl.hidden = false;
  counterEl.innerHTML =
    `<strong>${stats.total}</strong> real request${stats.total === 1 ? "" : "s"} sent to Telegraph miners ` +
    `across <strong>${intents}</strong> question type${intents === 1 ? "" : "s"}.`;
}

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? `Request failed (${res.status}).`);
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (question.length < 3) return;

  submit.disabled = true;
  resultEl.hidden = true;
  setStatus("Asking the network. A miner is working on it, this can take a few seconds.");
  try {
    const data = await post("/api/ask", { question });
    setStatus(null);
    renderAnswer(data);
  } catch (err) {
    setStatus(err.message, true);
  } finally {
    submit.disabled = false;
  }
});

secondBtn.addEventListener("click", async () => {
  if (!lastAsk) return;
  secondBtn.disabled = true;
  secondResult.hidden = false;
  secondResult.textContent = "Asking our own miner…";
  try {
    const data = await post("/api/second-opinion", { question: lastAsk.question, intent: lastAsk.intent });
    secondResult.innerHTML =
      `<p><strong>${escapeHtml(data.askedMiner)} says:</strong></p>` +
      `<p>${escapeHtml(data.answer ?? "No plain-text answer returned.")}</p>`;
    if (data.stats) renderCounter(data.stats);
  } catch (err) {
    secondResult.textContent = err.message;
  } finally {
    secondBtn.disabled = false;
  }
});

(async function boot() {
  try {
    const res = await fetch("/api/stats");
    const stats = await res.json();
    renderCounter(stats);
    if (Array.isArray(stats.examples) && stats.examples.length) {
      examplesEl.hidden = false;
      for (const ex of stats.examples) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = ex;
        b.addEventListener("click", () => {
          input.value = ex;
          input.focus();
        });
        examplesEl.appendChild(b);
      }
    }
  } catch {
    /* the page still works without the counter */
  }
})();
