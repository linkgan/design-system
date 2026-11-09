# House default

**Color:** `cobalt` — accent `#1f5eff` (light), `#5a8cff` (dark)  
**Type:** `newsreader-modern` — Newsreader · Inter · JetBrains Mono  
**Canvas:** `#ffffff` (light)

## No attributes required

Import tokens and components; the default look applies on `:root`:

```css
@import "@linkgan/design-system/tokens.css";
@import "@linkgan/design-system/components.css";
```

```html
<html lang="en">
  <body class="lds-page">…</body>
</html>
```

## Scheme

- **Light** — default (omit `data-lds-scheme`).
- **Dark** — `data-lds-scheme="dark"` on `<html>`, or follow OS via `prefers-color-scheme` unless you set `data-lds-scheme="light"` to lock light mode.

## Overrides (alternates)

| Attribute | When to set |
|-----------|-------------|
| `data-lds-direction="folio"` | Non-cobalt palette (see `color-specimen.html`) |
| `data-lds-type="inter-minimal"` | Non-default typography (see `type-specimen.html`) |
| `data-lds-scheme="light"` | Force light when OS is dark |

Load fonts: Newsreader, Inter, JetBrains Mono (showcase uses Google Fonts).
