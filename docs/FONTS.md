# House fonts

The default pairing **newsreader-modern** uses three families. Tokens reference them by name; the host app must load the files.

## Google Fonts (recommended)

Add to your document `<head>` **before** `tokens.css`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
/>
```

| Family | Role |
|--------|------|
| **Inter** | UI, site headings, wordmark (`.lds-nav__brand` in `.lds-site`) |
| **Newsreader** | Optional longform (`.lds-serif`, essay pages) |
| **JetBrains Mono** | Meta, dates, finance figures |

### Node / bundler

```js
import { HOUSE_GOOGLE_FONTS_URL } from "@linkgan/design-system/fonts/house-fonts.mjs";
// inject HOUSE_GOOGLE_FONTS_URL into your layout <link href={...} />
```

Showcase sets `#lds-fonts` from the same URL in `showcase/theme.js`.

## Self-hosted

If you ship WOFF2 files locally, keep the same `font-family` names in CSS (`Inter`, `Newsreader`, `JetBrains Mono`) or override `--lds-font-family-*` on `:root`.

## OpenType

Expressive site chrome enables `liga` and `calt` on `.lds-site` (Inter’s contextual punctuation). No extra setup required when using Google’s Inter build.
