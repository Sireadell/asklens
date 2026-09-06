# AskLens

Ask any question in plain English. A live miner on the
[Telegraph Protocol](https://telegraphprotocol.com) network answers it, and you
see which miner answered, why it was picked, what it cost, and the on-chain
record of the answer.

Built for Telegraph Season I, Track 3 (Applications).

## Try it in under a minute

**Live app:** [asklens-zoox.onrender.com](https://asklens-zoox.onrender.com)

1. Open the live app.
2. Ask a question such as `What is the current ETH price?` or `Is this wallet safe?`.
3. Read the answer alongside the miner that supplied it, the route chosen by
   Telegraph, the request cost, and the on-chain signal hash.

The hosted app pays for the request. You do not need a wallet, account, or
testnet funds to try it. The service has limits to prevent unexpected spending.

## Run it yourself

AskLens needs Node.js 20 or later.

```bash
npm ci
cp .env.example .env
# Add a Base Sepolia private key with testnet USDC to .env
npm start
```

Open http://localhost:3000. On Windows PowerShell, use this instead of `cp`:

```powershell
Copy-Item .env.example .env
```

Run the automated checks at any time. They do not make paid Telegraph calls or
need a private key:

```bash
npm test
```

## What a reviewer can verify

- A real request goes through Telegraph's live testnet Engine. There are no
  fake answers or local stand-ins.
- Every completed answer shows its supplier, route, cost, elapsed time, and
  `signal_hash`, so it can be checked later.
- `data/` contains the recorded routing work behind the project claims.
- `docs/ROUTING_STUDY.md` explains the method, results, and limits of that
  field work.
- The same service is also available as an MCP connector at
  `https://asklens-zoox.onrender.com/mcp`.

## What it does

You type a question. AskLens sends it to Telegraph's Engine, which reads the
question, classifies it into one of the network's intents, picks a miner that
serves that intent, and returns that miner's answer. Nothing is cached and
nothing is mocked: every answer on the page is a fresh, paid request to a real
miner, at $0.01 per call in testnet USDC on Base Sepolia.

The page shows, for every answer:

| Shown | Why it is there |
|---|---|
| The answer | The point of the app |
| Which miner answered | So you know who to credit or blame |
| Which intent it was classified as | Shows how the router read your question |
| The router's reasoning | Telegraph explains its own routing choice |
| Cost and time taken | Real numbers, not estimates |
| `signal_hash` | The on-chain record the answer was filed under |

## Second opinion

When the router sends a question somewhere else, you can put the same question
directly to one of the miners this project runs, by name rather than by
routing. That costs another cent and is a separate, clearly labelled request.

Our miners on the network:

| Miner | ID | Covers |
|---|---|---|
| TxLens | 9002 | 13 intents: transactions, gas, balances, holders, TVL, crypto and stock prices, SSL, weather, storms, IP location, academic and web search |
| Telegraph Sentinel | 94217603 | FRAUD_DETECTION |

## Running it

```bash
npm install
cp .env.example .env   # then put a Base Sepolia key with testnet USDC in it
npm start
```

Open http://localhost:3000.

The wallet named in `.env` pays for each request. It is a testnet-only wallet
and needs testnet USDC from [Circle's faucet](https://faucet.circle.com); it
does not need testnet ETH, because x402 payments are signed offline and
submitted by Telegraph's facilitator.

```bash
npm test
```

## Honest limits

- **Testnet only.** Payments settle in Base Sepolia USDC. Nothing here moves
  real money.
- **Answer quality is the miners', not ours.** AskLens routes, pays, and
  presents. If a miner answers badly, you see the bad answer, its confidence,
  and its name.
- **Not every response is plain text.** Miners define their own output shapes.
  When there is no readable sentence in the response, the app says so and shows
  the raw JSON rather than guessing at a summary.
- **The request counter counts what actually happened.** It increments only
  after Telegraph answered and payment settled, never on a failed or refused
  call, and it is shown on the page rather than kept private.

## Using it from Claude, Cursor, or any MCP app

AskLens also runs as an MCP server, so the same live miners answer from inside
an editor or chat app instead of from the web page. There's no separate
dashboard to open for any of this, it's all reachable from wherever you
already work.

Two verdict tools, which return a judgment with evidence, not just a number:

| Tool | What you get |
|---|---|
| `check_wallet_safety` | A safety verdict on an EVM wallet: risk level, risk percentage, the reason in plain English, the signals behind it, and which miner answered |
| `check_link_safety` | Whether a link's certificate is valid and where the site is hosted, merged into one answer |

And thirteen plain lookups, one per intent our own miner serves, each
answered directly rather than routed:

| Tool | What it answers |
|---|---|
| `check_transaction` | Did this transaction go through, and what happened |
| `check_gas_price` | What a transaction costs right now |
| `check_wallet_balance` | How much a wallet holds |
| `check_token_holders` | How many wallets hold a token |
| `check_tvl` | How much money is locked in a protocol |
| `check_crypto_price` | What a coin is worth |
| `check_stock_price` | What a share is trading at |
| `check_ssl_certificate` | Whether a site's certificate is real |
| `check_weather` | The forecast somewhere |
| `check_storm_alert` | Active storm or severe weather alerts |
| `check_ip_location` | Where an IP address is |
| `search_academic_papers` | Real published research on a topic |
| `search_web` | Anything answerable from the live web |

### Add it to Claude with one link

In Claude, open **Customize**, then **Connectors**, then **Add custom
connector**. Paste this link and choose **Add**:

```
https://asklens-zoox.onrender.com/mcp
```

There is no wallet or payment setup for the person adding the connector.

### Run it locally instead

Run it once by hand to check it starts:

```bash
npm run mcp
```

It should print a ready line and then sit there waiting. That is correct: it
talks over stdin and stdout, not to a terminal. Press Ctrl+C to stop it.

**Claude Code**

```bash
claude mcp add asklens -- node /absolute/path/to/asklens/src/mcp.js
```

**Claude Desktop, Cursor, Windsurf, and others** take the same JSON. Add this
to the app's MCP config file:

```json
{
  "mcpServers": {
    "asklens": {
      "command": "node",
      "args": ["/absolute/path/to/asklens/src/mcp.js"]
    }
  }
}
```

Use a full path, not a relative one, since the app starts the server from its
own working directory. On Windows, escape the backslashes:
`"C:\Users\you\asklens\src\mcp.js"`.

The server reads the same `.env` as the web app, so the wallet that pays for
web requests pays for these too. If no key is set, the tools return a clear
message saying so rather than failing silently.

### Two notes for anyone reading the code

- **The wallet check posts, it does not get.** Sentinel offers both, but
  Telegraph delivers the request as a body, which only the POST route reads.
  Over GET the wallet never arrives and the engine returns a 500. There is a
  test pinning this so it cannot be changed back by accident.
- **Nothing is ever written to stdout except protocol messages.** An MCP server
  talks over stdout, so one stray print would corrupt it. All logging goes to
  stderr, including the payment client's startup line.

## Project map

| Location | Purpose |
|---|---|
| `src/server.js` | Web app, live Telegraph requests, and MCP endpoint |
| `src/mcp.js` | Tools exposed to Claude and other MCP-compatible apps |
| `src/telegraph.js` | Paid request and settlement connection to Telegraph |
| `public/` | Browser interface |
| `test/` | Automated checks |
| `data/` | Recorded routing and comparison evidence |
| `docs/` | Submission notes and field-study write-up |

## License

[MIT](LICENSE)
