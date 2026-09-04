// Turning a miner's raw output into one sentence a person can read.
//
// Every miner defines its own response shape, so there is no schema to rely
// on. We look for the fields miners actually use, in the order that gives the
// most readable sentence, and fall back to showing the raw JSON rather than
// inventing an answer.
// `signal` is what several Telegraph miners call their one-line answer.
const TEXT_FIELDS = ["summary", "signal", "answer", "result", "response", "text", "message", "output", "verdict"];

function firstString(obj, fields) {
  for (const f of fields) {
    const v = obj[f];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return null;
}

export function extractAnswer(result) {
  if (result === null || result === undefined) {
    return { text: null, raw: null };
  }
  if (typeof result === "string") {
    return { text: result.trim() || null, raw: result };
  }
  if (typeof result === "number" || typeof result === "boolean") {
    return { text: String(result), raw: result };
  }
  if (Array.isArray(result)) {
    return { text: null, raw: result };
  }

  const direct = firstString(result, TEXT_FIELDS);
  if (direct) return { text: direct, raw: result };

  // Some miners nest the payload one level down (data, body, output).
  for (const key of ["data", "body", "payload"]) {
    const nested = result[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      const inner = firstString(nested, TEXT_FIELDS);
      if (inner) return { text: inner, raw: result };
    }
  }

  return { text: null, raw: result };
}

// Confidence, where the miner reports one, normalised to 0-1 or null.
export function extractConfidence(result) {
  if (!result || typeof result !== "object") return null;
  const c = result.confidence;
  if (typeof c !== "number" || Number.isNaN(c)) return null;
  if (c < 0) return 0;
  if (c > 1) return c > 100 ? null : c / 100;
  return c;
}
