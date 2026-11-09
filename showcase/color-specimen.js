import { FONT_STYLESHEET, applyTheme } from "./theme.js";
import { COLOR_DIRECTIONS, renderColorSample } from "./color-blocks.js";

document.getElementById("lds-fonts").href = FONT_STYLESHEET;

applyTheme({ direction: "folio", scheme: "light", type: "newsreader-modern" });

function renderCard(dir) {
  return `
    <article
      class="lds-color-specimen-card"
      data-lds-direction-preview="${dir.id}"
      data-lds-direction="${dir.id}"
      data-lds-scheme="light"
      data-lds-type="newsreader-modern"
      aria-labelledby="color-${dir.id}"
    >
      <header class="lds-type-specimen-card__meta">
        <h2 class="lds-type-specimen-card__title" id="color-${dir.id}">${dir.label}</h2>
        <p class="lds-type-specimen-card__fonts">Accent ${dir.accent} · ${dir.blurb}</p>
      </header>
      ${renderColorSample(dir.id)}
    </article>
  `;
}

document.getElementById("app").innerHTML = `
  <header class="lds-header">
    <div class="lds-container lds-header__inner">
      <a class="lds-nav__brand" href="./index.html">linkgan</a>
      <nav aria-label="Primary">
        <ul class="lds-nav">
          <li><a class="lds-link" href="./index.html">Showcase</a></li>
          <li><a class="lds-link" href="./type-specimen.html">Type</a></li>
          <li><a class="lds-link lds-link--active" href="./color-specimen.html">Color</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="lds-container" style="padding-bottom: var(--lds-space-16)">
    <h1 class="lds-h1" style="margin-top: var(--lds-space-8)">Color direction comparison</h1>
    <p class="lds-body" style="max-width: 52ch; margin-bottom: var(--lds-space-4)">
      Eleven palettes on <strong>#ffffff</strong> with <strong>Newsreader + Inter + JetBrains Mono</strong>.
      Each card sets its own <code>data-lds-direction</code>.
    </p>
    <div class="lds-color-specimen-grid" id="color-grid">
      ${COLOR_DIRECTIONS.map((d) => renderCard(d)).join("")}
    </div>
  </main>
`;
