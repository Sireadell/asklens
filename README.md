# AskLens

> **Live safety checks where you act.**

Live safety checks for the copied link, copied wallet address, or AI answer
you're about to trust. AskLens brings live Telegraph intelligence to those
moments without making you leave the workflow you are in.

## Watch AskLens work

- [ClipGuard on Windows: copy a link and receive a live Telegraph safety result](https://x.com/Sireadell/status/2097041436650676576?s=20)
- [AskLens MCP: bring live Telegraph intelligence into Claude and ChatGPT](https://x.com/Sireadell/status/2096357846019346633?s=20)

| Start here | Link |
|---|---|
| ClipGuard for Windows | [Open ClipGuard](https://asklens-zoox.onrender.com/pc.html) |
| Wallet safety in MetaMask | [Open the Snap guide](https://asklens-zoox.onrender.com/metamask.html) |
| Use from Claude or Cursor | [Open the MCP setup guide](https://asklens-zoox.onrender.com/connect.html) |
| Source code | [github.com/Sireadell/asklens](https://github.com/Sireadell/asklens) |
| Hackathon | Telegraph Season I, Track 3 Applications |

**AskLens is not another search website.** It puts live Telegraph intelligence
in the clipboard, wallet, and AI tools where people already decide what to
trust.

## The dangerous moment is the copy

Copying an address is often the last pause before money moves. Clipboard
hijacking can replace a copied address, and address-poisoning scams use a
lookalike address to tempt someone into copying the wrong one. A copied link
has the same problem: by the time a person thinks to check it, they may already
have opened it.

ClipGuard checks a complete copied web link or `0x` wallet address and sends a
Windows notification when the result is ready.

### Background protection

ClipGuard starts with Windows and runs quietly in the system tray. Closing the
status window does not stop protection. The watcher keeps checking complete
links and wallet addresses copied to the clipboard, then shows a Windows
notification when the result is ready.

In an idle Windows Task Manager check on September 9, 2026, the three ClipGuard
background processes used 9.6 MB combined. That is an observed test result, not
a guaranteed amount for every computer.

## One link, three live opinions

For a copied web link, ClipGuard asks **NetWire, URL Sentinel, and Preflight**
through Telegraph. Their answers become one result, and ClipGuard shows which
miners answered. Disagreement is visible. It is not hidden behind a single
confident label.

## The right check for a copied address

A copied `0x` address gets checked one of two ways, chosen automatically. A
wallet address and a token contract address are the same text shape, so
ClipGuard asks the chain itself which one it is (a free, instant
`eth_getCode` read, not a Telegraph call) before deciding what to do with it:

- **Wallet** gets a live Telegraph fraud check for sanctions, scam clusters,
  and funding patterns.
- **Token contract** gets a different question: is there a real, distributed
  token here, or a shell nobody holds. ClipGuard combines a live holder-count
  check with a fraud signal into one SAFE / CAUTION / DANGEROUS verdict. Zero
  holders is treated as dangerous outright, a healthy holder count with a
  clean fraud signal is safe, and anything thin or partially unreadable is
  caution rather than a false safe.

Only an item that is exactly a web link or `0x` address is sent for checking.
Other copied text is ignored and never sent anywhere.

## Why some checks go straight to a miner, and some let Telegraph choose

Telegraph can pick the miner for you. You describe what you need and its router
sends the request to whichever miner currently ranks best for that job. That is
the network working as intended, and it is what we want to use wherever we can.

Two of our checks do not use it, and the reason is measured rather than
preferred. On 2026-09-04 we sent ten wallet-fraud requests through Telegraph's
automatic routing and all ten failed before a miner was chosen. The same ten
addresses, asked of Telegraph Sentinel by ID, returned ten answers. A day
earlier, when routing did complete, fraud questions reached a documentation
miner and a prompt-injection detector, neither of which can assess a wallet.

So the rule is simple. A signal the safety verdict rests on goes to a miner we
know answers it. A signal that adds context around that verdict goes through
Telegraph's router.

| Signal | How it is called | Why |
|---|---|---|
| Fraud check, wallet and token | Direct to Telegraph Sentinel | Automatic routing returned nothing on all ten of our test requests. This is the signal a dangerous verdict rests on. |
| Holder count | Direct to TxLens | The same category of risk. We did not move a safety-critical signal onto a path we had not proven. |
| Token price | Telegraph's router (`CRYPTO_PRICE`) | Context only, never changes the verdict, so the router's own reliability is an acceptable risk here. |

We also looked for two more signals a token check could use, and neither made
it in:

**Total value locked, dropped.** We asked the router for USDC's TVL by contract
address on 2026-09-08. It answered with confidence 1 and no visible error, and
the number it returned was Ethereum's TVL, labelled `token_symbol: "ETH"`, not
USDC's. A router that fails is a nuisance. A router that answers the wrong
question with full confidence is worse, since it looks exactly like a correct
answer. We are not shipping a signal that can do that.

**Honeypot detection, not available at all.** Exactly one miner on the live
network claims this, TrustGate (registered id 8421), described as detecting
"honeypot patterns, wash trading, holder concentration." Telegraph lists it as
active and scored it as recently as this morning, ranked 12th on
`FRAUD_DETECTION`. Its declared endpoint, and the one in its own published
spec, both return HTTP 404. It is being ranked and shown as available while
unable to answer a single request. We checked our own reachability against it
in the same minute with Sentinel, which answered normally, so this is
TrustGate's outage, not ours.

**The router itself, retested same-day.** On 2026-09-08 we ran the price and
TVL calls above seven times through automatic routing. Two succeeded quickly.
Five failed, four of them timing out at 61 to 62 seconds before returning
HTTP 504. That is the real number worth knowing if you are building on
Telegraph: a path that can take over a minute to fail cannot sit anywhere on
a product that has to answer before someone finishes pasting, no matter how
good the eventual answer is. This is why the new price signal above is capped
at 6 seconds client-side and simply omitted if it does not make it back in
time, rather than left to run its full course.

The fix we would suggest is to let a request declare the evidence it needs, such
as a sanctions lookup or a funding-pattern check, so the router can drop miners
that cannot provide it before ranking the rest. Competition stays exactly as it
is, and a wallet investigation stops landing on a miner that reads text for
prompt injection or one whose endpoint no longer exists.

## Telegraph team feedback

Before shipping ClipGuard, we asked the Telegraph team how a multi-miner URL
safety check should use the network. Their guidance was to keep miner selection
organic, rather than hardcoding a script to keep calling the same miners. The
screenshots below are the original conversation.

![Telegraph team feedback on ClipGuard, part one](evidence/telegraph-team-confirmation-1.png)

![Telegraph team feedback on ClipGuard, part two](evidence/telegraph-team-confirmation-2.png)

## Three places, one intelligence layer

| Where you are | What AskLens does |
|---|---|
| Windows clipboard | ClipGuard checks a copied link or wallet address. |
| Claude, Cursor, or another MCP tool | AskLens brings live, source-backed information into the answer. |
| MetaMask | The AskLens Snap shows a live wallet-risk warning before approval. |

The person still decides what to do. AskLens supplies the live signal and its
reason.

## What a reviewer can verify

- ClipGuard fans a copied web link out to three live Telegraph URL-scan miners.
- ClipGuard tells a copied `0x` wallet address from a token contract address
  with a direct on-chain read, then sends it to Telegraph for the matching
  check: a fraud request for a wallet, or a holder-count and fraud check for
  a contract.
- AskLens ships a Windows client, MetaMask Snap, and MCP setup flow.
- The same three checks (link, wallet, token contract) are also MCP tools:
  `check_link_safety`, `check_wallet_safety`, `check_token_safety`.
- We run two Telegraph miners: TxLens (ID 9002) and Telegraph Sentinel
  (ID 94217603).
- The repository test suite passes with `npm test`.

## Run it locally

AskLens needs Node.js 20 or later.

```bash
npm ci
cp .env.example .env
# Add a Base Sepolia private key with testnet USDC to .env
npm start
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

Run the tests with:

```bash
npm test
```

To run ClipGuard from source:

```bash
cd clipguard-client
npm install
npm run watch
```

## Next: Solana token checks for traders

EVM token contracts (Ethereum, Base) are checked today, holder count and
fraud signal combined into one verdict. Traders also copy Solana token
addresses just before buying, and that chain isn't covered yet. The next
ClipGuard check will recognise a Solana address and ask Telegraph for live
token-risk signals: rug-risk indicators, mint or freeze authority, and holder
concentration where a specialist miner can provide it.

The goal is simple: make the easiest safety check happen at the exact moment a
trader is deciding whether to buy.

## Network

AskLens uses Base Sepolia and testnet USDC, the Telegraph Season I test
environment. It does not move real money.

## Honest limits

- **AskLens informs decisions.** It does not block a browser, wallet, or AI
  action on its own.
- **Telegraph is the intelligence layer.** AskLens presents the live result
  returned by Telegraph, together with the supporting reason. It does not add
  certainty beyond the network response.
- **The Windows prototype is not code-signed yet.** Windows may warn about it,
  and Smart App Control can block it.

## License

[MIT](LICENSE)
