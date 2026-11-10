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

## Components

| Class | Role |
|-------|------|
| `lds-site`, `lds-site-hero` | Index page shell + Inter display title |
| `lds-catalog`, `lds-catalog__heading`, `lds-catalog__item` | Projects / writing lists |
| `lds-catalog__link` | Crisp title links |
| `lds-serif` | Optional Newsreader essay block |
| `lds-site-bio` | Closing bio line |

Secondary influences (motion restraint, row hover disabled, etc.) remain from rauno, emil, paco, craigmod, Stripe Press, Are.na—applied only where they match rsms utilitarian tone.
