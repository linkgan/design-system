# Expressive minimal layer

**Primary reference: [rsms.me](https://rsms.me)** — typography-first, engineered personal index.

## Voice

- **Site chrome:** Inter (display optical size, tight tracking, weight hierarchy)—Inter is Rasmus’s typeface; personal sites mirror his catalog layout.
- **Longform (optional):** Newsreader via `.lds-serif` + house `newsreader-modern` tokens.
- **Color:** Unchanged house cobalt on `#fff`.

## Layout

- Narrow column: `--lds-layout-site` (~40rem)
- Sections: `lds-catalog` with `h2` → `h3` title link → description → mono date
- Plain underlined links: `lds-link-plain`, `lds-catalog__link`
- No grain, dot grid, or animated underlines on the default personal-site path

## Site header (replaces home-website overlay)

Inside `.lds-site`, use `lds-header lds-header--site`:

- Canvas background (no tinted band, no blur)
- Hairline bottom rule, short vertical padding
- `.lds-nav__brand` — Inter semibold, tight tracking (`--lds-tracking-brand`)
- Brand stacked above a one-line nav: `flex-wrap: nowrap` + horizontal scroll on narrow viewports

## Fonts

Load Inter, JetBrains Mono, and Newsreader before tokens — see **[FONTS.md](./FONTS.md)** (Google Fonts link or `fonts/house-fonts.mjs` export).

## Components

| Class | Role |
|-------|------|
| `lds-site`, `lds-header--site` | Page shell + canvas-local header |
| `lds-site-hero`, `lds-site-lede`, `lds-site-index-line` | Display title, secondary lede, mono index strip |
| `lds-catalog`, `lds-catalog__heading`, `lds-catalog__item` | Projects / writing lists (tighter vertical rhythm) |
| `lds-catalog__link` | Crisp title links |
| `lds-serif` | Optional Newsreader essay block |
| `lds-site-bio` | Closing bio line |

Secondary influences (motion restraint, row hover disabled, etc.) remain from rauno, emil, paco, craigmod, Stripe Press, Are.na—applied only where they match rsms utilitarian tone.
