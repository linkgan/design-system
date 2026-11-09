#!/usr/bin/env node
/**
 * WCAG contrast audit for bundled direction palettes (better-colors discipline).
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function parseHexBlocks(css, direction) {
  const re = new RegExp(
    `\\[data-lds-direction="${direction}"\\]\\s*\\{([\\s\\S]*?)\\}\\s*\\n`,
    "m"
  );
  const m = css.match(re);
  if (!m) return null;
  const block = m[1];
  const vars = {};
  for (const line of block.split("\n")) {
    const vm = line.match(/(--lds-color-[\w-]+):\s*(#[0-9a-fA-F]{6});/);
    if (vm) vars[vm[1]] = vm[2];
  }
  return vars;
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relLuminance([r, g, b]) {
  const s = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}

function contrast(hexFg, hexBg) {
  const L1 = relLuminance(hexToRgb(hexFg));
  const L2 = relLuminance(hexToRgb(hexBg));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

const directions = ["folio", "grove", "ledger"];
const schemes = ["light", "dark"];
const pairs = [
  ["--lds-color-text-primary", "--lds-color-bg-canvas", 4.5, "body on canvas"],
  ["--lds-color-text-secondary", "--lds-color-bg-surface", 4.5, "secondary on surface"],
  ["--lds-color-on-accent", "--lds-color-accent", 4.5, "on-accent on accent"],
  ["--lds-color-text-primary", "--lds-color-bg-surface", 4.5, "primary on surface"],
];

let failures = 0;
for (const dir of directions) {
  const css = readFileSync(join(root, "tokens", "directions", `${dir}.css`), "utf8");
  for (const scheme of schemes) {
    let vars;
    if (scheme === "light") {
      vars = parseHexBlocks(css, dir);
    } else {
      const re = new RegExp(
        `\\[data-lds-direction="${dir}"\\]\\[data-lds-scheme="dark"\\]\\s*\\{([\\s\\S]*?)\\}`,
        "m"
      );
      const m = css.match(re);
      vars = {};
      if (m) {
        for (const line of m[1].split("\n")) {
          const vm = line.match(/(--lds-color-[\w-]+):\s*(#[0-9a-fA-F]{6});/);
          if (vm) vars[vm[1]] = vm[2];
        }
      }
    }
    if (!vars || Object.keys(vars).length < 4) {
      console.error(`Could not parse ${dir}/${scheme}`);
      failures++;
      continue;
    }
    for (const [fg, bg, min, label] of pairs) {
      if (!vars[fg] || !vars[bg]) continue;
      const ratio = contrast(vars[fg], vars[bg]);
      const ok = ratio >= min;
      const tag = ok ? "PASS" : "FAIL";
      console.log(`${tag} ${dir}/${scheme} ${label}: ${ratio.toFixed(2)} (min ${min})`);
      if (!ok) failures++;
    }
  }
}

if (failures) {
  console.error(`\n${failures} contrast check(s) failed.`);
  process.exit(1);
}
console.log("\nAll measured pairs pass WCAG AA (4.5:1).");
