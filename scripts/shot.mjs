// Dev-only screenshot helper via Chrome DevTools Protocol.
// Penggunaan: node scripts/shot.mjs <url> <output.png> [width] [height] [viewport|full]

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const [, , url, out, widthArg = "390", heightArg = "844", mode = "viewport"] = process.argv;
const width = Number(widthArg);
const height = Number(heightArg);

if (!url || !out) {
  console.error("Usage: node scripts/shot.mjs <url> <output.png> [width] [height] [viewport|full]");
  process.exit(1);
}

const port = 9400 + Math.floor(Math.random() * 180);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "km-shot-"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" }
);

async function getTargets() {
  const res = await fetch(`http://127.0.0.1:${port}/json/list`);
  return res.json();
}

let targets = null;
for (let i = 0; i < 60; i += 1) {
  try {
    const list = await getTargets();
    if (list.length) {
      targets = list;
      break;
    }
  } catch {
    // Chrome belum siap
  }
  await sleep(250);
}

if (!targets) {
  console.error("Chrome tidak merespons.");
  chrome.kill();
  process.exit(1);
}

const target = targets.find((t) => t.type === "page") || targets[0];
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let nextId = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 768,
  screenWidth: width,
  screenHeight: height,
});
if (width < 768) {
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });
}
await send("Page.navigate", { url });
await sleep(1800);

const hash = decodeURIComponent(new URL(url).hash || "");
if (hash) {
  await send("Runtime.evaluate", {
    expression: `(() => { const el = document.querySelector(${JSON.stringify(
      hash
    )}); if (el) el.scrollIntoView({ block: "start", behavior: "instant" }); })()`,
  });
  await sleep(600);
}

if (mode === "full") {
  const metrics = await send("Page.getLayoutMetrics");
  const content = metrics.result.cssContentSize;
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: Math.ceil(content.height),
    deviceScaleFactor: 1,
    mobile: width < 768,
    screenWidth: width,
    screenHeight: Math.ceil(content.height),
  });
  await sleep(900);
}

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: mode === "full",
});
fs.writeFileSync(out, Buffer.from(screenshot.result.data, "base64"));

ws.close();
chrome.kill();
await sleep(300);
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {
  // abaikan
}

console.log(`Screenshot: ${out}`);
