const isLocalDemo = new URLSearchParams(window.location.search).get("demo") === "local";
const SNAP_ID = isLocalDemo ? "local:http://localhost:8080" : "npm:asklens-metamask-snap";
const KNOWN_DANGEROUS_ADDRESS = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";

const status = document.querySelector("#wallet-status");
const installButton = document.querySelector("#install-snap");
const testButton = document.querySelector("#test-warning");
let flaskProvider = null;

function setStatus(message, kind = "") {
  status.textContent = message;
  status.className = `notice ${kind}`.trim();
}

async function refreshInstalledState() {
  if (!flaskProvider) return;
  const snaps = await flaskProvider.request({ method: "wallet_getSnaps" });
  const installed = Boolean(snaps?.[SNAP_ID]?.enabled);
  testButton.disabled = !installed;
  setStatus(installed ? "AskLens Safety is ready." : "MetaMask Flask found. Add AskLens Safety to continue.", installed ? "ready" : "");
}

window.addEventListener("eip6963:announceProvider", async (event) => {
  if (!["io.metamask", "io.metamask.flask"].includes(event.detail?.info?.rdns) || flaskProvider) return;
  flaskProvider = event.detail.provider;
  installButton.disabled = false;
  try {
    await refreshInstalledState();
  } catch {
    setStatus("MetaMask was found, but AskLens could not read its Snap list.", "error");
  }
});

window.dispatchEvent(new Event("eip6963:requestProvider"));

setTimeout(() => {
  if (!flaskProvider) {
    setStatus("MetaMask is not installed in this browser.", "error");
  }
}, 1200);

installButton.addEventListener("click", async () => {
  installButton.disabled = true;
  setStatus("Approve AskLens Safety in MetaMask.");
  try {
    await flaskProvider.request({
      method: "wallet_requestSnaps",
      params: { [SNAP_ID]: {} },
    });
    await refreshInstalledState();
  } catch (error) {
    setStatus(error?.code === 4001 ? "Installation cancelled." : "AskLens Safety could not be installed.", "error");
  } finally {
    installButton.disabled = false;
  }
});

testButton.addEventListener("click", async () => {
  testButton.disabled = true;
  setStatus("Approve account access and the Ethereum network, then read the AskLens warning.");
  try {
    const accounts = await flaskProvider.request({ method: "eth_requestAccounts" });
    if (!accounts?.[0]) throw new Error("No account available");
    await flaskProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
    await flaskProvider.request({
      method: "eth_sendTransaction",
      params: [{ from: accounts[0], to: KNOWN_DANGEROUS_ADDRESS, value: "0x0" }],
    });
    setStatus("Test transaction was submitted. This was not expected; review the wallet activity.", "error");
  } catch (error) {
    setStatus(error?.code === 4001 ? "Test cancelled safely." : "The test could not start. Check the selected network and account.", error?.code === 4001 ? "ready" : "error");
  } finally {
    testButton.disabled = false;
  }
});
