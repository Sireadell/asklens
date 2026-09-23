const { app, clipboard, ipcMain, Menu, Notification, Tray, nativeImage, BrowserWindow } = require("electron");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { didAddressChange } = require("./address-change.cjs");
const { createCheckGate } = require("./check-gate.cjs");

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

const READY_STATUS = "Clipboard checks on";
const PAUSED_STATUS = "Clipboard checks off";
const MAX_ACTIVITY_ITEMS = 50;

let lastChecked = "";
let tray;
let statusWindow;
let isQuitting = false;
let latestAddressCopy = null;
let protectionEnabled = false;
let clipboardChoiceMade = false;
let lastCheckStatus = "waiting";
let lastCheckMessage = "Choose automatic clipboard checks, or paste a link or address to check it manually.";
const checkGate = createCheckGate();

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
  statusWindow.webContents.once("did-finish-load", () => {
    sendAppState();
    sendToStatusWindow("history", { entries: readActivity() });
  });
  // The protection service stays alive in the tray, but the optional status
  // window is discarded when closed so it does not keep browser memory alive.
  statusWindow.on("closed", () => {
    statusWindow = undefined;
  });
}

function startupPreferencePath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function readSettings() {
  try {
    const parsed = JSON.parse(fs.readFileSync(startupPreferencePath(), "utf8"));
    const clipboardChoice = parsed.clipboardChoiceMade === true;
    return {
      startWithWindows: parsed.startWithWindows !== false,
      protectionEnabled: clipboardChoice ? parsed.protectionEnabled === true : false,
      clipboardChoiceMade: clipboardChoice,
    };
  } catch {
    return { startWithWindows: true, protectionEnabled: false, clipboardChoiceMade: false };
  }
}

function writeSettings(nextSettings) {
  fs.mkdirSync(app.getPath("userData"), { recursive: true });
  fs.writeFileSync(startupPreferencePath(), JSON.stringify(nextSettings, null, 2));
}

function startsWithWindows() {
  return readSettings().startWithWindows;
}

function setStartWithWindows(enabled) {
  writeSettings({ ...readSettings(), startWithWindows: enabled });
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
  const notification = new Notification({ title, body, silent: true });
  notification.on("click", openStatusWindow);
  notification.show();
}

function currentStatus() {
  return protectionEnabled ? READY_STATUS : PAUSED_STATUS;
}

function appState() {
  return {
    protectionEnabled,
    clipboardChoiceMade,
    startWithWindows: startsWithWindows(),
    status: currentStatus(),
    lastCheckStatus,
    lastCheckMessage,
  };
}

function sendAppState() {
  sendToStatusWindow("app-state", appState());
}

function setProtectionEnabled(enabled) {
  protectionEnabled = Boolean(enabled);
  clipboardChoiceMade = true;
  writeSettings({ ...readSettings(), protectionEnabled, clipboardChoiceMade });
  updateTray(currentStatus());
  sendAppState();
  showNotice(
    protectionEnabled ? "AskLens Clip Guard is on" : "AskLens Clip Guard is paused",
    protectionEnabled ? "New copied links and wallet addresses will be checked." : "Clipboard checks are off until you turn protection back on."
  );
}

function updateTray(status) {
  tray.setToolTip(`AskLens Clip Guard\n${status}`);
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: `Status: ${status}`, enabled: false },
    { type: "separator" },
    { label: "Open Clip Guard", click: openStatusWindow },
    {
      label: "Protection on",
      type: "checkbox",
      checked: protectionEnabled,
      click: (item) => setProtectionEnabled(item.checked),
    },
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

function activityPath() {
  return path.join(app.getPath("userData"), "activity.json");
}

function readActivity() {
  try {
    const parsed = JSON.parse(fs.readFileSync(activityPath(), "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => (
      entry
      && typeof entry.key === "string"
      && (entry.kind === "link" || entry.kind === "address")
      && typeof entry.overall === "string"
      && typeof entry.detail === "string"
      && typeof entry.checkedAt === "string"
    )).slice(0, MAX_ACTIVITY_ITEMS);
  } catch {
    return [];
  }
}

function saveActivity(entry) {
  try {
    const next = [entry, ...readActivity()].slice(0, MAX_ACTIVITY_ITEMS);
    fs.writeFileSync(activityPath(), JSON.stringify(next, null, 2));
    return next;
  } catch (error) {
    logToFile(`could not save activity: ${error.message}`);
    return null;
  }
}

function clearActivity() {
  try {
    fs.rmSync(activityPath(), { force: true });
    sendToStatusWindow("history", { entries: [] });
    return true;
  } catch (error) {
    logToFile(`could not clear activity: ${error.message}`);
    return false;
  }
}

function inferCheckKind(value) {
  const text = typeof value === "string" ? value.trim() : "";
  if (URL_ONLY_RE.test(text)) return { kind: "link", value: text };
  if (ADDRESS_ONLY_RE.test(text)) return { kind: "address", value: text };
  return null;
}

function proofItems(kind, data) {
  if (kind === "link") {
    return (Array.isArray(data.results) ? data.results : [])
      .filter((result) => result?.ok)
      .map((result) => ({ miner: result.miner ?? "Unknown miner", signalHash: result.signalHash ?? null }));
  }
  if (Array.isArray(data.proofs)) return data.proofs;
  return [{ miner: data.miner ?? "Unknown miner", signalHash: data.signalHash ?? null }];
}

const LINK_TITLES = {
  malicious: "Dangerous link copied",
  suspicious: "Suspicious link copied",
  caution: "Link needs a second look",
  safe: "Link looks safe",
  unavailable: "Link could not be checked",
};

const ADDRESS_TITLES = {
  dangerous: "Dangerous address copied",
  caution: "Proceed carefully, thin or unclear signal",
  safe: "Address looks clean",
  unavailable: "Address could not be checked",
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

// A link verdict comes from Telegraph routing, a wallet verdict from a wallet
// safety check, so each is flattened here into the one shape the status window
// and the notification both read.
function summarise(kind, data) {
  if (kind === "link") {
    const line = (data.results || [])
      .filter((result) => result.ok)
      .map((result) => `${result.miner}: ${result.verdict}`)
      .join("  |  ");
    return {
      title: LINK_TITLES[data.overall] || "No clear link verdict",
      detail: `Telegraph routed this link to ${data.miner || "a URL safety miner"}${data.overall === "caution" ? ". Do not treat an unclear route as safe." : ""}${line ? `: ${line}` : ""}`,
    };
  }
  const formattedPrice = formatPriceUsd(data.priceUsd);
  const base = data.reason ? `${data.miner}: ${data.reason}` : `Checked by ${data.miner}.`;
  return {
    title: ADDRESS_TITLES[data.overall] || "No clear wallet verdict",
    detail: formattedPrice ? `${base} Trading at $${formattedPrice}.` : base,
  };
}

async function check(kind, value, { addressChanged = false } = {}) {
  if (!checkGate.tryStart(kind, value)) {
    lastCheckStatus = "checking";
    lastCheckMessage = "Already checking this item.";
    sendAppState();
    return;
  }
  const isLink = kind === "link";
  updateTray(isLink ? "Checking copied link" : "Checking copied address");
  lastCheckStatus = "checking";
  lastCheckMessage = isLink ? "Checking copied link with Telegraph miners." : "Checking copied address with Telegraph miners.";
  sendAppState();
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
    const entry = {
      key: value,
      kind,
      overall: data.overall,
      title,
      detail,
      addressChanged,
      proofs: proofItems(kind, data),
      checkedAt: new Date().toISOString(),
    };
    const entries = saveActivity(entry);
    lastCheckStatus = "ok";
    lastCheckMessage = "Last check reached Telegraph and returned a result.";
    showNotice(title, detail);
    sendAppState();
    sendToStatusWindow("result", entry);
    if (entries) sendToStatusWindow("history", { entries });
  } catch (error) {
    const entry = {
      key: value,
      kind,
      overall: "unavailable",
      title: isLink ? "Link could not be checked" : "Address could not be checked",
      detail: error.message,
      addressChanged,
      proofs: [],
      checkedAt: new Date().toISOString(),
    };
    const entries = saveActivity(entry);
    lastCheckStatus = "error";
    lastCheckMessage = "Last check could not reach a result. Use Check again after the connection settles.";
    showNotice(
      entry.title,
      error.message
    );
    sendAppState();
    sendToStatusWindow("error", { key: value, kind, message: error.message });
    if (entries) sendToStatusWindow("history", { entries });
  } finally {
    checkGate.finish(kind, value);
    updateTray(currentStatus());
  }
}

ipcMain.on("recheck", (_event, { key, kind }) => {
  if ((kind === "link" && URL_ONLY_RE.test(key)) || (kind === "address" && ADDRESS_ONLY_RE.test(key))) {
    check(kind, key);
  }
});

ipcMain.on("set-protection-enabled", (_event, enabled) => {
  setProtectionEnabled(enabled);
});

ipcMain.on("manual-check", (_event, value) => {
  const parsed = inferCheckKind(value);
  if (!parsed) {
    sendToStatusWindow("manual-check-error", {
      message: "Paste a full http:// or https:// link, or a 0x wallet address.",
    });
    return;
  }
  check(parsed.kind, parsed.value);
});

ipcMain.on("clear-history", () => {
  clearActivity();
});

ipcMain.on("request-app-state", () => {
  sendAppState();
});

function startWatching() {
  setInterval(() => {
    if (!protectionEnabled) {
      return;
    }
    const text = clipboard.readText().trim();
    if (text === lastChecked) return;
    lastChecked = text;
    if (URL_ONLY_RE.test(text)) check("link", text);
    else if (ADDRESS_ONLY_RE.test(text)) {
      const now = Date.now();
      const addressChanged = didAddressChange(latestAddressCopy, text, now);
      latestAddressCopy = { address: text, copiedAt: now };
      if (addressChanged) {
        showNotice("Copied address changed", "Verify the recipient before sending. AskLens is checking the new address.");
      }
      check("address", text, { addressChanged });
    }
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
      const settings = readSettings();
      protectionEnabled = settings.protectionEnabled;
      clipboardChoiceMade = settings.clipboardChoiceMade;
      setStartWithWindows(settings.startWithWindows);
      const icon = nativeImage.createFromPath(ICON_PATH);
      tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
      tray.on("click", openStatusWindow);
      tray.on("double-click", openStatusWindow);
      updateTray(currentStatus());
      startWatching();
      logToFile("tray watcher started");
      if (!startedInBackground()) {
        openStatusWindow();
        showNotice("AskLens Clip Guard is ready", "Choose automatic clipboard checks, or paste a link or wallet address into the app.");
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
