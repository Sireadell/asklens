const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

function normaliseAddress(address) {
  const text = typeof address === "string" ? address.trim() : "";
  const lowered = text.toLowerCase();
  return ADDRESS_RE.test(lowered)
    ? lowered
    : null;
}

function shortAddress(address) {
  const normalised = normaliseAddress(address);
  if (!normalised) return "";
  return `${normalised.slice(0, 6)}...${normalised.slice(-4)}`;
}

function visiblePartsMatch(a, b) {
  const first = normaliseAddress(a);
  const second = normaliseAddress(b);
  if (!first || !second || first === second) return false;
  return first.slice(0, 6) === second.slice(0, 6) && first.slice(-4) === second.slice(-4);
}

function findRecipientMatch(address, recipients = []) {
  const normalised = normaliseAddress(address);
  if (!normalised) return { type: "none" };

  const exact = recipients.find((recipient) => normaliseAddress(recipient?.address) === normalised);
  if (exact) {
    return { type: "trusted", recipient: exact };
  }

  const lookalike = recipients.find((recipient) => visiblePartsMatch(normalised, recipient?.address));
  if (lookalike) {
    return { type: "lookalike", recipient: lookalike };
  }

  return { type: "none" };
}

module.exports = {
  ADDRESS_RE,
  findRecipientMatch,
  normaliseAddress,
  shortAddress,
  visiblePartsMatch,
};
