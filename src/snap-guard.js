import { dirname } from "node:path";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

function utcDay(now) {
  return new Date(now).toISOString().slice(0, 10);
}

export function createSnapRequestGuard({
  usageFile,
  perClientLimit,
  windowMs,
  dailyPaidLimit,
  now = Date.now,
}) {
  const clients = new Map();

  function readDaily(at) {
    try {
      const saved = JSON.parse(readFileSync(usageFile, "utf8"));
      if (saved.day === utcDay(at) && Number.isInteger(saved.paidCalls) && saved.paidCalls >= 0) return saved;
    } catch {}
    return { day: utcDay(at), paidCalls: 0 };
  }

  function writeDaily(value) {
    mkdirSync(dirname(usageFile), { recursive: true });
    const temporary = `${usageFile}.${process.pid}.tmp`;
    writeFileSync(temporary, JSON.stringify(value));
    renameSync(temporary, usageFile);
  }

  return function allow(clientId) {
    const at = now();
    const key = clientId || "unknown";
    const recent = (clients.get(key) ?? []).filter((time) => at - time < windowMs);
    if (recent.length >= perClientLimit) {
      return { allowed: false, status: 429, code: "SNAP_RATE_LIMITED", message: "Too many wallet checks. Please try again later." };
    }

    const daily = readDaily(at);
    if (daily.paidCalls >= dailyPaidLimit) {
      return { allowed: false, status: 503, code: "SNAP_DAILY_LIMIT_REACHED", message: "AskLens has reached today's wallet-check limit. Please try again tomorrow." };
    }

    recent.push(at);
    clients.set(key, recent);
    writeDaily({ day: daily.day, paidCalls: daily.paidCalls + 1 });
    return { allowed: true };
  };
}
