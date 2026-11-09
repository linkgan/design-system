#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = "/opt/cursor/artifacts/design-system";

function previewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "preview", "--", "--port", "4173", "--host", "127.0.0.1"], {
      cwd: join(root, "showcase"),
      stdio: "pipe",
      shell: true,
    });
    let ready = false;
    const onData = (buf) => {
      if (!ready && buf.toString().includes("4173")) {
        ready = true;
        resolve(child);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    setTimeout(() => !ready && reject(new Error("preview timeout")), 15000);
  });
}

const server = await previewServer();
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

for (const scheme of ["light", "dark"]) {
  await page.emulateMedia({ colorScheme: scheme });
  const qs = scheme === "light" ? "?scheme=light" : "?scheme=dark";
  await page.goto(`http://127.0.0.1:4173/${qs}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const file = join(outDir, `cobalt-showcase-${scheme}-full.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", file);
}

await page.emulateMedia({ colorScheme: "light" });
await page.goto("http://127.0.0.1:4173/?scheme=light", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const home = page.locator('[aria-label="Home site mock"]');
await home.scrollIntoViewIfNeeded();
await page.screenshot({
  path: join(outDir, "cobalt-mock-home-light.png"),
  clip: (await home.boundingBox()) ?? undefined,
});
console.log("wrote cobalt-mock-home-light.png");

const finance = page.locator('[aria-label="Finance dashboard mock"]');
await finance.scrollIntoViewIfNeeded();
await page.screenshot({
  path: join(outDir, "cobalt-mock-finance-dashboard-light.png"),
  clip: (await finance.boundingBox()) ?? undefined,
});
console.log("wrote cobalt-mock-finance-dashboard-light.png");

await browser.close();
server.kill("SIGTERM");
