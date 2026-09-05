# AskLens MetaMask Snap

This transaction-insight Snap checks the recipient with AskLens and Telegraph
Sentinel before a user signs. High risk produces MetaMask's critical warning.
Low risk produces an informational result. A failed or slow check stops after
3.5 seconds and tells the user the address could not be checked.

## Run locally

1. Run `npm install` in this folder.
2. Run `npm start`.
3. Install the Snap from `local:http://localhost:8080` in MetaMask Flask.

The Snap calls the deployed AskLens server. Deploy the matching server route
before testing the live check.
