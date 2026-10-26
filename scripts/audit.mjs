// Dev-only overflow audit via Chrome DevTools Protocol.
// Penggunaan: node scripts/audit.mjs <url> [width]

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const [, , url, widthArg = "390"] = process.argv;
const width = Number(widthArg);

if (!url) {
  console.error("Usage: node scripts/audit.mjs <url> [width]");
  process.exit(1);
}

const port = 9600 + Math.floor(Math.random() * 180);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "km-audit-"));
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

let targets = null;
for (let i = 0; i < 60; i += 1) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`);
    const list = await res.json();
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
const metrics1 = await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: 900,
  deviceScaleFactor: 1,
  mobile: width < 768,
  screenWidth: width,
  screenHeight: 900,
});
if (width < 768) {
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });
}
await send("Page.navigate", { url });
await sleep(1800);

const vp = async (label) => {
  const r = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      label: ${JSON.stringify(label)},
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      clientWidth: document.documentElement.clientWidth,
      visualWidth: window.visualViewport && Math.round(window.visualViewport.width),
      screenWidth: window.screen.width,
      dpr: window.devicePixelRatio,
      outerWidth: window.outerWidth,
    })`,
    returnByValue: true,
  });
  console.log(r.result?.result?.value);
};
console.log("setDeviceMetricsOverride:", JSON.stringify(metrics1.result || metrics1));
await vp("after navigate");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: 900,
  deviceScaleFactor: 1,
  mobile: width < 768,
  screenWidth: width,
  screenHeight: 900,
});
await sleep(500);
await vp("after re-override");

const expression = `(() => {
  const w = document.documentElement.clientWidth;
  const offenders = [];
  document.querySelectorAll("*").forEach((el) => {
    if (el.classList && el.classList.contains("hero-ring")) return;
    const r = el.getBoundingClientRect();
    if (r.width > 1 && (r.right > w + 1 || r.left < -1)) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || "",
        cls: typeof el.className === "string" ? el.className : "",
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        scrollW: el.scrollWidth,
      });
    }
  });
  const measure = {};
  [".container", ".catalog-toolbar", ".filter-tabs", ".unit-grid", ".unit-card",
   ".credit-layout", ".credit-copy", ".credit-card", ".table-wrap", ".credit-table",
   ".sell-layout", ".form-card", ".location-layout", ".map-card", ".faq-layout",
   ".testi-grid", ".testi-card"].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      const r = el.getBoundingClientRect();
      measure[sel] = { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
    }
  });
  return JSON.stringify({
    innerWidth: window.innerWidth,
    clientWidth: w,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    measure,
    offenders: offenders.slice(0, 80),
  }, null, 2);
})()`;

const result = await send("Runtime.evaluate", {
  expression,
  returnByValue: true,
});
console.log(result.result?.result?.value ?? JSON.stringify(result, null, 2));

ws.close();
chrome.kill();
await sleep(300);
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {
  // abaikan
}
