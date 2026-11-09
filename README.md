# @linkgan/design-system

Shared visual language for personal projects ([home-website](https://github.com/linkgan/home-website), [finances-webapp](https://github.com/linkgan/finances-webapp)). CSS-token-first, framework-agnostic components, optional Tailwind preset.

## Directions

Three minimalist themes—switch with one attribute:

| `data-lds-direction` | Feel | Fonts (OFL / open) |
|----------------------|------|---------------------|
| `folio` | Editorial ink & warm paper, hairline rules | Literata + Source Sans 3 |
| `grove` | Stone & moss, soft elevation | Fraunces + Nunito Sans |
| `ledger` | Cool slate & teal, dense tables | IBM Plex Sans + Mono |

Set `data-lds-scheme="light" | "dark"` on `<html>` (or `:root`).

Light mode uses a **pure white** canvas (`#ffffff`); cards/surfaces use very subtle neutrals. Typography is independent: `data-lds-type` (see `tokens/type-pairings.css`).

| `data-lds-type` | Display / body / mono |
|-----------------|------------------------|
| `literata-editorial` | Literata · Source Sans 3 · Source Code Pro |
| `fraunces-grove` | Fraunces · Nunito Sans · IBM Plex Mono |
| `plex-ledger` | IBM Plex Sans · IBM Plex Sans · IBM Plex Mono |
| `inter-minimal` | Inter · Inter · JetBrains Mono |
| `outfit-geometric` | Outfit · Outfit · Roboto Mono |
| `work-humanist` | Work Sans · Work Sans · Inconsolata |
| `newsreader-modern` | Newsreader · Inter · JetBrains Mono |
| `dm-sans` | DM Sans · DM Sans · DM Mono |

## Install in a consumer repo

```bash
npm install github:linkgan/design-system
```

```css
@import "@linkgan/design-system/tokens.css";
@import "@linkgan/design-system/components.css";
```

```html
<html data-lds-direction="ledger" data-lds-type="plex-ledger" data-lds-scheme="light">
```

### Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require("@linkgan/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

Load direction fonts in the host app (Google Fonts or self-hosted). Showcase lists the full stack.

### React / Next.js

Wrap the app shell with the `data-lds-*` attributes and use `lds-*` classes or map them in your component library. Do not duplicate hex values in CSS modules.

## Showcase (local)

```bash
cd showcase && npm install && npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`). Use the direction/type/scheme selects—or query params `?direction=folio&type=inter-minimal&scheme=light`.

**Type specimen comparison:** `showcase/type-specimen.html` (all pairings side by side on white).

Static build (deployable):

```bash
npm run showcase:build
# output: showcase/dist/
```

## Agent skills

This repo keeps an allowlist in [`.skills.yaml`](./.skills.yaml). Sync from the owner's library:

```bash
chmod +x scripts/sync-skills.sh
./scripts/sync-skills.sh --list
./scripts/sync-skills.sh
```

When `linkgan/agent-skills` is unavailable, bootstrap once from public upstreams:

```bash
./scripts/bootstrap-skills-from-upstream.sh
```

House skill for agents: [`skills/linkgan-design-language/SKILL.md`](./skills/linkgan-design-language/SKILL.md).

## Quality

```bash
npm run audit:contrast
```

Re-run after editing files in `tokens/directions/`.

## Docs

- [Design principles](./docs/principles.md)

## Updating consumers

1. Change tokens/components here and bump `package.json` version.
2. Publish or tag on GitHub.
3. In consumer repos: `npm update @linkgan/design-system` and re-run visual QA in both light and dark.
