const { app, clipboard, Menu, Notification, Tray, nativeImage, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

const ICON_PATH = path.join(__dirname, "icon.png");
const STATUS_HTML_PATH = path.join(__dirname, "status.html");

function logToFile(message) {
  try {
    const logPath = path.join(app.getPath("userData"), "clipguard.log");
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
  } catch {
    // If we can't even write a log, there's nothing left to do about it.
  }
}

process.on("uncaughtException", (err) => logToFile(`uncaughtException: ${err.stack || err.message}`));
process.on("unhandledRejection", (err) => logToFile(`unhandledRejection: ${err?.stack || err}`));

const ASKLENS_BASE = "https://asklens-zoox.onrender.com/api/clipguard";
const POLL_MS = 800;

// Both patterns match a clipboard entry that IS the thing, not one that merely
// contains it somewhere inside a longer copied paragraph, so copying a page of
// text with a link or an address in it does not fire a check.
const URL_ONLY_RE = /^https?:\/\/\S+$/i;
const ADDRESS_ONLY_RE = /^0x[a-fA-F0-9]{40}$/;

const READY_STATUS = "Ready — checking links and wallet addresses you copy";

let lastChecked = "";
let tray;
let statusWindow;
let isQuitting = false;

function openStatusWindow() {
  if (statusWindow && !statusWindow.isDestroyed()) {
    statusWindow.show();
    statusWindow.focus();
    return;
  }
  statusWindow = new BrowserWindow({
    width: 380,
    height: 520,
    title: "AskLens Clip Guard",
    icon: ICON_PATH,
    backgroundColor: "#0a0a0a",
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  statusWindow.loadFile(STATUS_HTML_PATH);
  statusWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      statusWindow.hide();
    }
  });
}

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
    { label: "Open Clip Guard", click: openStatusWindow },
    {
      label: "Start when I sign in",
      type: "checkbox",
      checked: startsWithWindows(),
      click: (item) => setStartWithWindows(item.checked),
    },
    { type: "separator" },
    {
      label: "Quit Clip Guard",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]));
}

function sendToStatusWindow(channel, payload) {
  if (statusWindow && !statusWindow.isDestroyed()) {
    statusWindow.webContents.send(channel, payload);
  }
}

const LINK_TITLES = {
  malicious: "Dangerous link copied",
  suspicious: "Suspicious link copied",
  safe: "Link looks safe",
};

const ADDRESS_TITLES = {
  dangerous: "Dangerous address copied",
  caution: "Proceed carefully — thin or unclear signal",
  safe: "Address looks clean",
};

// A link verdict comes from several miners voting, a wallet verdict from
// Sentinel alone, so each is flattened here into the one shape the status
// window and the notification both read.
function summarise(kind, data) {
  if (kind === "link") {
    const line = (data.results || [])
      .filter((result) => result.ok)
      .map((result) => `${result.miner}: ${result.verdict}`)
      .join("  |  ");
    return {
      title: LINK_TITLES[data.overall] || "No clear link verdict",
      detail: `${data.answeredCount}/${data.totalCount} miners answered${line ? `: ${line}` : ""}`,
    };
  }
  return {
    title: ADDRESS_TITLES[data.overall] || "No clear wallet verdict",
    detail: data.reason ? `${data.miner}: ${data.reason}` : `Checked by ${data.miner}.`,
  };
}

async function check(kind, value) {
  const isLink = kind === "link";
  updateTray(isLink ? "Checking copied link" : "Checking copied address");
  sendToStatusWindow("checking", { key: value, kind });

  try {
    const response = await fetch(`${ASKLENS_BASE}/${isLink ? "check-url" : "check-wallet"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isLink ? { url: value } : { address: value }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "The check service is unavailable right now.");
    }

    const { title, detail } = summarise(kind, data);
    showNotice(title, detail);
    sendToStatusWindow("result", { key: value, kind, overall: data.overall, detail });
  } catch (error) {
    showNotice(
      isLink ? "AskLens could not check this link" : "AskLens could not check this address",
      error.message
    );
    sendToStatusWindow("error", { key: value, kind, message: error.message });
  }
  updateTray(READY_STATUS);
}

function startWatching() {
  setInterval(() => {
    const text = clipboard.readText().trim();
    if (text === lastChecked) return;
    lastChecked = text;
    if (URL_ONLY_RE.test(text)) check("link", text);
    else if (ADDRESS_ONLY_RE.test(text)) check("address", text);
  }, POLL_MS);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.whenReady().then(() => {
    try {
      app.setAppUserModelId("com.asklens.clipguard");
      app.setLoginItemSettings({ openAtLogin: startsWithWindows() });
      const icon = nativeImage.createFromPath(ICON_PATH);
      tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
      tray.on("click", openStatusWindow);
      tray.on("double-click", openStatusWindow);
      updateTray(READY_STATUS);
      startWatching();
      openStatusWindow();
      showNotice("AskLens Clip Guard is on", "Copy a link or a wallet address and it gets checked before you paste it.");
    } catch (err) {
      logToFile(`startup failed: ${err.stack || err.message}`);
    }
  });
}

app.on("window-all-closed", (event) => event.preventDefault());
