const { app, clipboard, Menu, Notification, Tray } = require("electron");
const fs = require("fs");
const path = require("path");

const ASKLENS_URL = "https://asklens-zoox.onrender.com/api/clipguard/check-url";
const POLL_MS = 800;
const URL_ONLY_RE = /^https?:\/\/\S+$/i;

let lastChecked = "";
let tray;

function startupPreferencePath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function startsWithWindows() {
  try {
    return JSON.parse(fs.readFileSync(startupPreferencePath(), "utf8")).startWithWindows !== false;
  } catch {
    return true;
  }
}

function setStartWithWindows(enabled) {
  fs.mkdirSync(app.getPath("userData"), { recursive: true });
  fs.writeFileSync(startupPreferencePath(), JSON.stringify({ startWithWindows: enabled }));
  app.setLoginItemSettings({ openAtLogin: enabled });
}

function showNotice(title, body) {
  new Notification({ title, body, silent: true }).show();
}

function updateTray(status) {
  tray.setToolTip(`AskLens Clip Guard\n${status}`);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: `Status: ${status}`, enabled: false },
    { type: "separator" },
    {
      label: "Start when I sign in",
      type: "checkbox",
      checked: startsWithWindows(),
      click: (item) => setStartWithWindows(item.checked),
    },
    { type: "separator" },
    { label: "Quit Clip Guard", click: () => app.quit() },
  ]));
}

async function checkUrl(url) {
  updateTray("Checking copied link");
  try {
    const response = await fetch(ASKLENS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "The check service is unavailable right now.");
    }

    const resultLine = data.results
      .filter((result) => result.ok)
      .map((result) => `${result.miner}: ${result.verdict}`)
      .join("  |  ");
    const title = {
      malicious: "Dangerous link copied",
      suspicious: "Suspicious link copied",
      safe: "Link looks safe",
    }[data.overall] || "No clear link verdict";

    showNotice(title, `${data.answeredCount}/${data.totalCount} miners answered${resultLine ? `: ${resultLine}` : ""}`);
    updateTray("Watching your clipboard");
  } catch (error) {
    showNotice("AskLens could not check this link", error.message);
    updateTray("Watching your clipboard");
  }
}

function startWatching() {
  setInterval(() => {
    const text = clipboard.readText().trim();
    if (text === lastChecked) return;
    lastChecked = text;
    if (URL_ONLY_RE.test(text)) checkUrl(text);
  }, POLL_MS);
}

app.whenReady().then(() => {
  app.setAppUserModelId("com.asklens.clipguard");
  app.setLoginItemSettings({ openAtLogin: startsWithWindows() });
  tray = new Tray(process.execPath);
  updateTray("Watching your clipboard");
  startWatching();
  showNotice("AskLens Clip Guard is on", "Copy a link and it will be checked before you paste it.");
});

app.on("window-all-closed", (event) => event.preventDefault());
