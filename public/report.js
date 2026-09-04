const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function pct(n) {
  return `${Math.round(n * 100)}%`;
}

function qualityBadge(q) {
  const cls = q === "answered" ? "good" : q === "refused" || q === "unreadable" ? "bad" : "warn";
  return `<span class="q ${cls}">${esc(q)}</span>`;
}

function renderTotals(t) {
  document.getElementById("totals").innerHTML = `
    <div class="verdict">Your miners were picked <strong>${t.routedToUs}</strong> out of <strong>${t.asked}</strong> questions (${pct(t.routedShare)}).</div>
    <div class="meta"><dl>
      <dt>Question types seen</dt><dd class="val">${t.intentsSeen}</dd>
      <dt>First recorded</dt><dd class="val">${esc(t.firstAt ?? "-")}</dd>
      <dt>Last recorded</dt><dd class="val">${esc(t.lastAt ?? "-")}</dd>
    </dl></div>`;
}

function renderIntents(rows) {
  const body = rows.map((r) => {
    const top = Object.entries(r.competitors).sort((a, b) => b[1] - a[1]).slice(0, 2)
      .map(([name, n]) => `${esc(name)} (${n})`).join("<br>") || "-";
    return `<tr>
      <td>${esc(r.intent)}</td>
      <td class="num">${r.asked}</td>
      <td class="num ${r.routedToUs ? "good" : "bad"}">${r.routedToUs}</td>
      <td class="num good">${r.headToHead.weAnsweredTheyDidNot}</td>
      <td class="num bad">${r.headToHead.theyAnsweredWeDidNot}</td>
      <td class="num">${r.headToHead.bothAnswered}</td>
      <td>${top}</td>
    </tr>`;
  }).join("");

  document.getElementById("intents").innerHTML = `
    <div class="scroller"><table>
      <thead><tr>
        <th>Question type</th><th>Asked</th><th>Router chose you</th>
        <th>You answered, they didn't</th><th>They answered, you didn't</th>
        <th>Both answered</th><th>Who is winning the routing</th>
      </tr></thead>
      <tbody>${body || '<tr><td colspan="7">Nothing recorded yet. Run <code>npm run watch</code>.</td></tr>'}</tbody>
    </table></div>`;
}

function renderPairs(rows) {
  const cards = [];
  for (const r of rows) {
    for (const ex of r.examples) {
      cards.push(`<div class="card pair">
        <div class="pair-q">${esc(ex.question)}</div>
        <div class="pair-grid">
          <div>
            <div class="who">${esc(ex.theirMiner ?? "routed miner")} ${qualityBadge(ex.theirQuality)}</div>
            <div class="pair-a">${esc(ex.theirAnswer ?? "[no plain text returned]")}</div>
          </div>
          <div>
            <div class="who">Your miner ${qualityBadge(ex.ourQuality)}</div>
            <div class="pair-a">${esc(ex.ourAnswer ?? "[not asked, or no plain text]")}</div>
          </div>
        </div>
        <div class="hashes">${ex.theirSignalHash ? `theirs: ${esc(ex.theirSignalHash)}` : ""} ${ex.ourSignalHash ? `<br>yours: ${esc(ex.ourSignalHash)}` : ""}</div>
      </div>`);
    }
  }
  document.getElementById("pairs").innerHTML = cards.join("") || '<p class="hint">No head-to-heads recorded yet.</p>';
}

(async function boot() {
  try {
    const report = await (await fetch("/api/report")).json();
    renderTotals(report.totals);
    renderIntents(report.intents);
    renderPairs(report.intents);
  } catch (err) {
    document.getElementById("totals").textContent = `Could not load the report: ${err.message}`;
  }
})();
