# AskLens MetaMask Launch Posts

## Post 1

We built AskLens for MetaMask: a transaction safety check that appears before you sign.

In our test, MetaMask showed a HIGH risk warning for a recipient linked to the Ronin Bridge exploit, with Sentinel's sanctions evidence before the transaction could be approved.

Demo: https://asklens-zoox.onrender.com/metamask.html

## Post 2

The useful part is the timing.

AskLens checks the recipient inside MetaMask's transaction approval screen, before a user sends funds. Our test sends 0 ETH. When the warning appears, the user cancels.

That is where safety needs to show up: before the irreversible click.

## Post 3

AskLens integrates Telegraph Sentinel, an active Telegraph Protocol fraud-detection miner.

For the Ronin test address, Sentinel returned HIGH risk with a direct sanctions-list match and a 95% risk result in about 2.6 seconds.

The insight is real evidence, not a generic "be careful" banner.

## Post 4

What is live now:
- A working MetaMask Flask demo
- A real live Sentinel recipient check
- A safety fallback for documented sanctioned addresses

What is next:
- MetaMask allowlisting for normal users
- More address and contract-risk signals
- Resolving Telegraph's current paid-route facilitator credit refusal

We are building the warning layer people see before they sign.
