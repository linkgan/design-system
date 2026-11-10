# @linkgan/design-system

Shared visual language for [home-website](https://github.com/linkgan/home-website) and [finances-webapp](https://github.com/linkgan/finances-webapp). CSS tokens, `lds-*` components, optional Tailwind preset.

## House default (no setup attributes)

| Layer | Value |
|-------|--------|
| **Color** | `cobalt` — accent `#1f5eff` on `#ffffff` |
| **Type** | `newsreader-modern` — Newsreader + Inter + JetBrains Mono |
| **Scheme** | Light by default; dark via `data-lds-scheme="dark"` or `prefers-color-scheme` |

Details: [docs/HOUSE-DEFAULT.md](./docs/HOUSE-DEFAULT.md).

### Install

```bash
npm install github:linkgan/design-system
```

**Fonts:** load Inter, Newsreader, and JetBrains Mono before tokens — [docs/FONTS.md](./docs/FONTS.md) (HTML link or `@linkgan/design-system/fonts/house-fonts` URL export).

```css
/* app layout or global.css */
@import "@linkgan/design-system/tokens.css";
@import "@linkgan/design-system/components.css";
@import "@linkgan/design-system/expressive.css"; /* rsms-style index: Inter headings, catalog lists */
```

```html
<html lang="en">
  <body class="lds-page">…</body>
</html>
```

No `data-lds-*` required for the house look. Use `lds-btn`, `lds-card`, `lds-table`, etc. from `components.css`.

### Tailwind (Next.js, finances-webapp, etc.)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@linkgan/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};
```

Import `tokens.css` once in your global stylesheet **before** Tailwind layers. Semantic colors map to `accent`, `positive`, `negative`, `chart-1`…`chart-6`, etc.

### Dark mode

```html
<html lang="en" data-lds-scheme="dark">
```

Or omit the attribute and let tokens follow `prefers-color-scheme`. Lock light with `data-lds-scheme="light"`.

### Alternates (comparison only)

- **11 color directions** — `data-lds-direction` (`folio`, `grove`, `ledger`, `ink-blue`, `navy`, `terracotta`, `plum`, `ochre`, `forest`, `cobalt`, `graphite`). Omit attribute for cobalt.
- **8 type pairings** — `data-lds-type`. Omit for `newsreader-modern`.

Browse: `showcase/color-specimen.html`, `showcase/type-specimen.html`.

### Rules for consumer repos

1. **No ad-hoc hex, font, or spacing** in feature code — use tokens or Tailwind preset keys.
2. **One primary filled action** per view.
3. Tabular numbers for money (`lds-mono`, `font-mono`).
4. Run `npm run audit:contrast` after token edits in this repo before publishing.
5. Bump the git dependency tag/version here; then `npm update` in consumers.

Agents: follow [skills/linkgan-design-language/SKILL.md](./skills/linkgan-design-language/SKILL.md).

## Showcase

```bash
cd showcase && npm install && npm run dev
```

Query params: `?direction=folio&type=inter-minimal&scheme=dark` (defaults: cobalt + newsreader + light).

```bash
npm run showcase:build   # static output in showcase/dist/
```

## Agent skills

[`.skills.yaml`](./.skills.yaml) + `./scripts/sync-skills.sh` (see [docs/SKILLS.md](./docs/SKILLS.md)).

## Quality

```bash
npm run audit:contrast
```

## Docs

- [Design principles](./docs/principles.md)
- [House default](./docs/HOUSE-DEFAULT.md)
