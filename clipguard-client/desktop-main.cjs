const { app, clipboard, Menu, Notification, Tray, nativeImage, BrowserWindow } = require("electron");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ClipGuard's normal state is an invisible tray app. A background safety
// watcher should not need a visible window, and disabling GPU work avoids
// keeping a graphics process alive merely to read the clipboard and notify.
app.disableHardwareAcceleration();

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
const BACKGROUND_ARG = "--background";

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

function startedInBackground() {
  return process.argv.includes(BACKGROUND_ARG);
}

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
  // The protection service stays alive in the tray, but the optional status
  // window is discarded when closed so it does not keep browser memory alive.
  statusWindow.on("closed", () => {
    statusWindow = undefined;
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
  app.setLoginItemSettings({
    openAtLogin: enabled,
    path: process.execPath,
    args: [BACKGROUND_ARG],
  });

  // Electron's Windows auto-start API is not reliably creating a Run entry
  // for this packaged app. Write the same explicit command as a fallback so
  // the safety watcher starts after every sign-in, not only after the user
  // opens it by hand.
  if (app.isPackaged) {
    const key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run";
    try {
      if (enabled) {
        execFileSync("reg.exe", [
          "add", key, "/v", "AskLens Clip Guard", "/t", "REG_SZ",
          "/d", `\"${process.execPath}\" ${BACKGROUND_ARG}`, "/f",
        ], { windowsHide: true });
      } else {
        execFileSync("reg.exe", ["delete", key, "/v", "AskLens Clip Guard", "/f"], { windowsHide: true });
      }
    } catch (err) {
      logToFile(`could not update Windows startup: ${err.message}`);
    }
  }
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

// Context only, so it is fine that this rarely has a value.
// Telegraph's price router took 20-60s+ in live testing, longer than this
// app waits, so most checks simply run without it.
function formatPriceUsd(price) {
  if (typeof price !== "number" || !Number.isFinite(price)) return null;
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  return price.toPrecision(3);
}

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
  const formattedPrice = formatPriceUsd(data.priceUsd);
  const base = data.reason ? `${data.miner}: ${data.reason}` : `Checked by ${data.miner}.`;
  return {
    title: ADDRESS_TITLES[data.overall] || "No clear wallet verdict",
    detail: formattedPrice ? `${base} Trading at $${formattedPrice}.` : base,
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

logToFile(`launch requested (background=${startedInBackground()})`);
const gotLock = app.requestSingleInstanceLock();
logToFile(`single-instance lock=${gotLock}`);
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // A normal launch while ClipGuard is already protecting in the tray
    // should bring the status window back, not silently do nothing.
    if (app.isReady()) openStatusWindow();
  });
  app.whenReady().then(() => {
    try {
      logToFile("Electron ready");
      app.setAppUserModelId("com.asklens.clipguard");
      setStartWithWindows(startsWithWindows());
      const icon = nativeImage.createFromPath(ICON_PATH);
      tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
      tray.on("click", openStatusWindow);
      tray.on("double-click", openStatusWindow);
      updateTray(READY_STATUS);
      startWatching();
      logToFile("tray watcher started");
      if (!startedInBackground()) {
        openStatusWindow();
        showNotice("AskLens Clip Guard is on", "Copy a link or a wallet address and it gets checked before you paste it.");
      }
    } catch (err) {
      logToFile(`startup failed: ${err.stack || err.message}`);
    }
  });
}

app.on("window-all-closed", (event) => event.preventDefault());
// Electron otherwise exits when no BrowserWindow exists. ClipGuard deliberately
// starts without one, so veto implicit quit requests and only exit through the
// explicit tray command, which sets isQuitting first.
app.on("before-quit", (event) => {
  if (!isQuitting) event.preventDefault();
});
app.on("activate", openStatusWindow);
