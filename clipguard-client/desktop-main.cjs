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

const ASKLENS_URL = "https://asklens-zoox.onrender.com/api/clipguard/check-url";
const POLL_MS = 800;
const URL_ONLY_RE = /^https?:\/\/\S+$/i;

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

async function checkUrl(url) {
  updateTray("Checking copied link");
  sendToStatusWindow("checking", url);
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
    sendToStatusWindow("result", data);
    updateTray("Ready — checking links you copy");
  } catch (error) {
    showNotice("AskLens could not check this link", error.message);
    sendToStatusWindow("error", { url, message: error.message });
    updateTray("Ready — checking links you copy");
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
      updateTray("Ready — checking links you copy");
      startWatching();
      openStatusWindow();
      showNotice("AskLens Clip Guard is on", "Copy a link and it will be checked before you paste it.");
    } catch (err) {
      logToFile(`startup failed: ${err.stack || err.message}`);
    }
  });
}

app.on("window-all-closed", (event) => event.preventDefault());
