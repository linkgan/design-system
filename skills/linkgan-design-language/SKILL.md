---
name: linkgan-design-language
description: Use @linkgan/design-system for linkgan UI. House default cobalt + newsreader-modern on white; no ad-hoc colors or fonts.
---

# Linkgan design language

You build UI for **home-website**, **finances-webapp**, and other linkgan projects using **@linkgan/design-system** only.

## House default (use unless the user picks an alternate)

| | |
|--|--|
| **Color** | Cobalt — accent `#1f5eff` (light), white `#fff` canvas |
| **Type** | `newsreader-modern` — Newsreader display, Inter body, JetBrains Mono for figures |
| **Scheme** | Light default; dark with `data-lds-scheme="dark"` or OS preference |

**Do not set** `data-lds-direction` or `data-lds-type` when shipping the standard look—they are optional overrides.

## Consumer setup

```bash
npm install github:linkgan/design-system
```

```css
@import "@linkgan/design-system/tokens.css";
@import "@linkgan/design-system/components.css";
```

Load fonts: Newsreader, Inter, JetBrains Mono.

**Tailwind projects:**

```js
presets: [require("@linkgan/design-system/tailwind-preset")],
```

Import `tokens.css` in global CSS before `@tailwind` directives.

## Hard rules

- No raw hex/rgb/hsl in components — only `--lds-*` or preset theme keys.
- No font stacks outside the active `data-lds-type` (default: newsreader-modern).
- Spacing: `--lds-space-*` scale only.
- One filled primary action per screen.
- Finance: positive/negative via `--lds-color-positive` / `--lds-color-negative`; amounts in mono tabular figures.
- Charts: `--lds-color-chart-1` … `--lds-color-chart-6`.
- After editing tokens here, run `npm run audit:contrast`.

## Components (prefer these classes)

`lds-page`, `lds-container`, `lds-header`, `lds-section`, `lds-display`, `lds-h1`–`lds-h3`, `lds-body`, `lds-btn` (+ variants), `lds-link`, `lds-field`, `lds-input`, `lds-card`, `lds-stat`, `lds-table`.

## Alternates (explicit opt-in only)

- Color: `data-lds-direction` — see `docs/HOUSE-DEFAULT.md` and `showcase/color-specimen.html` (11 options; cobalt is default).
- Type: `data-lds-type` — see `type-specimen.html` (8 options).

Never mix directions or invent a one-off palette.

## Review before merge

Run mentally: `better-accessibility`, `better-colors`, `audit-ai-design-slop`, `critique-visual-hierarchy` — focus visible, contrast, no template slop.

## Source of truth

Change tokens/components **in the design-system repo**; consumers update the package. Do not copy token files into home-website or finances-webapp.
