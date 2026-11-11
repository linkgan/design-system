# Chat components (`chat.css`)

Conversation UI for [home-website Miles chat](https://github.com/linkgan/home-website) (`public/miles-chat/`). Same rsms.me-inspired column as `expressive.css` — engineered, token-only, no decorative chrome.

## Import

```css
@import "@linkgan/design-system/tokens.css";
@import "@linkgan/design-system/components.css";
@import "@linkgan/design-system/expressive.css";
@import "@linkgan/design-system/chat.css";
```

Static sites: run `./scripts/sync-static-css.sh /path/to/vendor/lds` from this repo (or from a consumer script); `components/chat.css` is listed in [`static-css.manifest`](../static-css.manifest).

## Page skeleton

```html
<div class="lds-site lds-chat">
  <header class="lds-header lds-header--site">…site nav…</header>

  <div class="lds-chat__chrome">
    <div class="lds-chat__chrome-inner">
      <div>
        <h1 class="lds-chat__title">Miles</h1>
        <p class="lds-chat__meta">exported · indexed</p>
      </div>
      <nav class="lds-chat__scrubber" aria-label="Jump to date">
        <span class="lds-chat__scrubber-label">Dates</span>
        <a class="lds-chip" href="#2026-11-08">Nov 8</a>
        <a class="lds-chip lds-chip--active" href="#2026-11-09" aria-current="true">Nov 9</a>
      </nav>
      <div class="lds-chat__filters" role="group" aria-label="Filter messages">
        <button type="button" class="lds-chip lds-chip--filter lds-chip--active" aria-pressed="true">All</button>
        <button type="button" class="lds-chip lds-chip--filter" aria-pressed="false">Miles</button>
        <button type="button" class="lds-chip lds-chip--filter" aria-pressed="false">You</button>
      </div>
    </div>
  </div>

  <ol class="lds-chat__log">
    <li class="lds-chat__day" id="2026-11-09">
      <div class="lds-chat__day-marker"><time datetime="2026-11-09">9 Nov 2026</time></div>
      <article class="lds-chat__message lds-chat__message--incoming lds-chat__message--group-start">
        <span class="lds-chat__sender">Miles</span>
        <p class="lds-chat__bubble">…</p>
        <time class="lds-chat__time" datetime="2026-11-09T14:02">14:02</time>
      </article>
      <article class="lds-chat__message lds-chat__message--incoming lds-chat__message--grouped">…</article>
      <article class="lds-chat__message lds-chat__message--outgoing lds-chat__message--group-start">…</article>
    </li>
  </ol>
</div>
```

## Class reference

| Class | Role |
|-------|------|
| `lds-site lds-chat` | Narrow site column; chat layout root |
| `lds-chat__chrome` | Sticky scrubber + filters (canvas bg, hairline) |
| `lds-chip`, `lds-chip--active` | Date chips and filter tags (`--lds-radius-sm`, not pill) |
| `lds-chat__scrubber` | Horizontal date timeline |
| `lds-chat__gap` | Missing coverage marker — uses `--lds-color-warning` |
| `lds-chat__message--incoming` / `--outgoing` | Neutral surface vs cobalt accent bubble |
| `lds-chat__message--group-start` / `--grouped` | Sender label + tighter stacking |
| `lds-chat__sender`, `lds-chat__bubble`, `lds-chat__time` | Message anatomy |

## Light / dark

Uses semantic tokens only. Toggle with `data-lds-scheme="dark"` on `<html>` (or OS preference when tokens follow `prefers-color-scheme`).

## Showcase

`showcase/miles-chat.html` — full mock at ~390px-friendly gutters; open from the main showcase toolbar.
