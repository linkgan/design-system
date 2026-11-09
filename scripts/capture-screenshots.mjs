#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = "/opt/cursor/artifacts/design-system";
const combos = [
  ["folio", "light"],
  ["folio", "dark"],
  ["grove", "light"],
  ["grove", "dark"],
  ["ledger", "light"],
  ["ledger", "dark"],
];

function previewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "preview", "--", "--port", "4173", "--host", "127.0.0.1"], {
      cwd: join(root, "showcase"),
      stdio: "pipe",
      shell: true,
    });
    let ready = false;
    const onData = (buf) => {
      const s = buf.toString();
      if (!ready && s.includes("4173")) {
        ready = true;
        resolve(child);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", reject);
    setTimeout(() => {
      if (!ready) reject(new Error("preview server timeout"));
    }, 15000);
  });
}

const server = await previewServer();
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

for (const [direction, scheme] of combos) {
  const url = `http://127.0.0.1:4173/?direction=${direction}&scheme=${scheme}`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const file = join(outDir, `${direction}-${scheme}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", file);
}

await browser.close();
server.kill("SIGTERM");
