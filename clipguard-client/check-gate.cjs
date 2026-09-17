function normaliseCheckKey(kind, value) {
  return `${kind}:${String(value || "").toLowerCase()}`;
}

function createCheckGate() {
  const active = new Set();
  return {
    tryStart(kind, value) {
      const key = normaliseCheckKey(kind, value);
      if (active.has(key)) return false;
      active.add(key);
      return true;
    },
    finish(kind, value) {
      active.delete(normaliseCheckKey(kind, value));
    },
    size() {
      return active.size;
    },
  };
}

module.exports = { createCheckGate, normaliseCheckKey };
