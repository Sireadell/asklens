// Turns the head-to-head log into a standing you can act on.
//
// Two different things are worth knowing per intent, and they are easy to
// confuse: how often the router *picked* us (a reputation problem) and how
// often our answer was *better* when it did not (a quality argument). This
// keeps them apart.
import { readComparisons } from "./compare.js";

// A rough, honest quality check. It does not claim to know which answer is
// true — only whether an answer is usable at all. Anything more would be us
// grading ourselves.
export function answerQuality(side) {
  if (!side) return "none";
  if (!side.hasPlainText) return "unreadable";
  const text = side.answer.toLowerCase();
  const refusals = [
    "not served", "does not serve", "cannot", "can not", "unable", "unavailable",
    "does not appear to ask", "no supported", "not supported", "i'm unable", "i am unable",
    "not found", "no data", "temporarily unavailable",
  ];
  if (refusals.some((r) => text.includes(r))) return "refused";
  // "no DefiLlama protocol found for ..." and "no stock quote found for ..."
  // are refusals too, however politely they are worded. Counting these as
  // answers would have this report telling us we beat a rival when in fact
  // both sides failed. The phrase has to lead the sentence: a real answer can
  // mention what it found without that making it a refusal.
  if (text.startsWith("no ") && text.includes("found")) return "refused";
  if (side.answer.trim().split(/\s+/).length <= 2) return "terse";
  return "answered";
}

export function buildReport(records = readComparisons()) {
  const byIntent = new Map();

  for (const r of records) {
    const key = r.intent ?? r.expectedIntent ?? "UNCLASSIFIED";
    if (!byIntent.has(key)) {
      byIntent.set(key, {
        intent: key,
        asked: 0,
        routedToUs: 0,
        misroutedFromExpected: 0,
        competitors: {},
        theirs: { answered: 0, terse: 0, refused: 0, unreadable: 0, none: 0 },
        ours: { answered: 0, terse: 0, refused: 0, unreadable: 0, none: 0 },
        headToHead: { weAnsweredTheyDidNot: 0, theyAnsweredWeDidNot: 0, bothAnswered: 0 },
        examples: [],
      });
    }
    const row = byIntent.get(key);
    row.asked += 1;
    if (r.routedToUs) row.routedToUs += 1;
    if (r.routedIntentMatched === false) row.misroutedFromExpected += 1;

    if (!r.routedToUs && r.routed?.miner) {
      row.competitors[r.routed.miner] = (row.competitors[r.routed.miner] ?? 0) + 1;
    }

    const theirQ = answerQuality(r.routed);
    const ourQ = r.routedToUs ? answerQuality(r.routed) : answerQuality(r.ours);
    row.theirs[theirQ] += 1;
    row.ours[ourQ] += 1;

    if (!r.routedToUs) {
      const weUsable = ourQ === "answered";
      const theyUsable = theirQ === "answered";
      if (weUsable && !theyUsable) row.headToHead.weAnsweredTheyDidNot += 1;
      else if (theyUsable && !weUsable) row.headToHead.theyAnsweredWeDidNot += 1;
      else if (weUsable && theyUsable) row.headToHead.bothAnswered += 1;

      if (row.examples.length < 5) {
        row.examples.push({
          at: r.at,
          question: r.question,
          theirMiner: r.routed?.miner ?? null,
          theirAnswer: r.routed?.answer ?? null,
          theirQuality: theirQ,
          ourAnswer: r.ours?.answer ?? null,
          ourQuality: ourQ,
          theirSignalHash: r.routed?.signalHash ?? null,
          ourSignalHash: r.ours?.signalHash ?? null,
        });
      }
    }
  }

  const intents = [...byIntent.values()].sort((a, b) => b.asked - a.asked);
  const totals = {
    asked: records.length,
    routedToUs: records.filter((r) => r.routedToUs).length,
    intentsSeen: intents.length,
    firstAt: records[0]?.at ?? null,
    lastAt: records[records.length - 1]?.at ?? null,
  };
  totals.routedShare = totals.asked ? totals.routedToUs / totals.asked : 0;
  return { totals, intents };
}
