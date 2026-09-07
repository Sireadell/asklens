// Telling a contract address from a wallet address. Both look identical as
// text (0x + 40 hex), so the only way to tell them apart is to ask the chain
// itself whether code is deployed there. This is a free, direct RPC read,
// not a Telegraph call, and it settles nothing and costs nothing.
import { createPublicClient, http } from "viem";
import { mainnet, base } from "viem/chains";
import { config } from "./config.js";

const CHAINS = {
  eth: { chain: mainnet, rpcUrl: config.rpcUrls.eth },
  base: { chain: base, rpcUrl: config.rpcUrls.base },
};

const clients = {};

function clientFor(chain) {
  if (!clients[chain]) {
    const entry = CHAINS[chain];
    if (!entry) return null;
    clients[chain] = createPublicClient({ chain: entry.chain, transport: http(entry.rpcUrl) });
  }
  return clients[chain];
}

// EIP-7702 (Pectra) lets a wallet temporarily delegate to contract code.
// getCode then returns a marker, 0xef0100 followed by the implementation
// address, instead of empty. The account is still an EOA someone holds a
// private key for, not an independent contract, so this must not be read as
// "it's a token contract" — Sentinel's own wallet-balance endpoint reports
// these accounts by type for the same reason.
const EIP7702_DELEGATION_PREFIX = "0xef0100";

// An EOA (wallet) has no code at its address; getCode returns "0x" or
// undefined. Any other value, except a 7702 delegation marker, means a real
// contract is deployed there.
export function hasDeployedCode(code) {
  if (typeof code !== "string" || code === "0x") return false;
  if (code.toLowerCase().startsWith(EIP7702_DELEGATION_PREFIX)) return false;
  return true;
}

// Returns true for a contract, false for a wallet (EOA), or null if the
// chain read itself failed (RPC down, bad address) rather than guessing.
export async function isContractAddress(address, chain = "eth") {
  const client = clientFor(chain);
  if (!client) return null;
  try {
    const code = await client.getCode({ address });
    return hasDeployedCode(code);
  } catch {
    return null;
  }
}
