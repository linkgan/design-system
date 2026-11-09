---
name: linkgan-design-language
description: Use Linkgan's shared design system (@linkgan/design-system) for every UI task in consumer repos. Never introduce ad-hoc colors, fonts, spacing, or radii.
---

# Linkgan design language

You are building UI for **linkgan** personal projects (`home-website`, `finances-webapp`, and future apps). Visual consistency comes from this repo's tokens and components—not from improvised styles.

## Before you write UI code

1. Install or link `@linkgan/design-system` (see root README).
2. Import `tokens/index.css` and `components/components.css` (or wire the Tailwind preset and map utilities to semantic tokens).
3. Set theme on a root element:
   - `data-lds-direction="folio" | "grove" | "ledger"` (accent + radius character)
   - `data-lds-type="<pairing-id>"` (default **`newsreader-modern`** — Newsreader / Inter / JetBrains Mono)
   - `data-lds-scheme="light" | "dark"` (light mode canvas is `#ffffff`)
4. Read `docs/principles.md` once per project.

## Hard rules

- **No raw hex/rgb in components** — use `--lds-*` semantic tokens or Tailwind theme keys from the preset.
- **No new font families** without adding them to the token layer for all directions.
- **No spacing outside the scale** — use `--lds-space-*` or preset spacing keys.
- **One primary filled action per view** (no-ai-design-slop / design principles).
- Run `npm run audit:contrast` after token changes; fix failures before shipping.

## Components

Use `lds-*` classes from `components/components.css`:

- Layout: `lds-page`, `lds-container`, `lds-header`, `lds-section`
- Actions: `lds-btn`, `lds-btn--primary|secondary|ghost`, `lds-link`
- Forms: `lds-field`, `lds-label`, `lds-input`
- Content: `lds-card`, `lds-stat`, `lds-table`, typography primitives (`lds-display`, `lds-h1`–`lds-h3`, `lds-body`, `lds-caption`, `lds-mono`)

Extend patterns by composing these classes or wrapping them in framework components that **only** forward token-based styles.

## Directions (do not blend)

| ID | Character | Typical use |
|----|-----------|-------------|
| `folio` | Editorial ink & paper, serif display | Personal site, writing-forward pages |
| `grove` | Warm stone & moss, soft depth | Lifestyle, calm dashboards |
| `ledger` | Cool slate & teal, tabular density | Finance tables, metrics |

Pick **one** direction per product unless the showcase explicitly compares them.

## Review checklist

Apply `design-critique`, `critique-visual-hierarchy`, `better-accessibility`, and `audit-ai-design-slop` before merge:

- Hierarchy readable without color alone
- Focus visible on all interactive elements
- Tables use `lds-mono` / tabular nums for amounts
- Motion ≤ 220ms; honor `prefers-reduced-motion`

## Updating the system

Token or component changes happen **in this repo first**, then consumers bump the package version. Never fork tokens into consumer repos.
