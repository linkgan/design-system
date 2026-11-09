import {
  DIRECTIONS,
  TYPE_PAIRINGS,
  FONT_STYLESHEET,
  applyTheme,
  readThemeFromQuery,
  writeThemeToUrl,
} from "./theme.js";
import { renderSpecimenSample, renderSpecimenTypography } from "./specimen-blocks.js";

document.getElementById("lds-fonts").href = FONT_STYLESHEET;

function renderCard(pairing, index) {
  return `
    <article
      class="lds-type-specimen-card"
      data-lds-type-preview="${pairing.id}"
      aria-labelledby="spec-${pairing.id}"
    >
      <header class="lds-type-specimen-card__meta">
        <h2 class="lds-type-specimen-card__title" id="spec-${pairing.id}">${pairing.label}</h2>
        <p class="lds-type-specimen-card__fonts">${pairing.category} · ${pairing.display} / ${pairing.body} / ${pairing.mono}</p>
      </header>
      <div data-lds-type-scope="${pairing.id}">
        ${renderSpecimenTypography()}
        ${renderSpecimenSample({ inputId: `amt-${index}`, tableId: `t-${index}` })}
      </div>
    </article>
  `;
}

function renderApp() {
  const { direction, scheme } = readThemeFromQuery();
  applyTheme({ direction, scheme, type: "newsreader-modern" });

  const app = document.getElementById("app");
  app.innerHTML = `
    <header class="lds-header">
      <div class="lds-container lds-header__inner">
        <a class="lds-nav__brand" href="./index.html">linkgan</a>
        <nav aria-label="Primary">
          <ul class="lds-nav">
            <li><a class="lds-link" href="./index.html">Showcase</a></li>
            <li><a class="lds-link lds-link--active" href="./type-specimen.html">Type specimen</a></li>
            <li><a class="lds-link" href="https://github.com/linkgan/design-system">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="lds-container">
      <div class="lds-showcase-bar" style="margin-top: var(--lds-space-6)">
        <span class="lds-caption">Comparison on white — each card sets its own <code>data-lds-type</code></span>
        <label>
          <span class="lds-caption">Accent direction (borders &amp; buttons)</span>
          <select class="lds-select" id="direction" aria-label="Color direction for specimen">
            ${DIRECTIONS.map(
              (d) =>
                `<option value="${d.id}" ${d.id === direction ? "selected" : ""}>${d.label}</option>`
            ).join("")}
          </select>
        </label>
      </div>
      <h1 class="lds-h1" style="margin-top: var(--lds-space-8)">Font pairing specimen</h1>
      <p class="lds-body" style="max-width: 50ch; margin-bottom: var(--lds-space-4)">
        Eight pairings on a pure white canvas. Pairing is independent of color direction — switch direction
        to preview accents with any typography.
      </p>
      <div class="lds-type-specimen-grid">
        ${TYPE_PAIRINGS.map((p, i) => renderCard(p, i)).join("")}
      </div>
    </main>
  `;

  TYPE_PAIRINGS.forEach((p) => {
    const card = document.querySelector(`[data-lds-type-preview="${p.id}"]`);
    if (card) card.setAttribute("data-lds-type", p.id);
  });

  document.getElementById("direction").addEventListener("change", (e) => {
    writeThemeToUrl(e.target.value, "light", null);
    applyTheme({ direction: e.target.value, scheme: "light" });
    DIRECTIONS.forEach(() => {});
    TYPE_PAIRINGS.forEach((p) => {
      const card = document.querySelector(`[data-lds-type-preview="${p.id}"]`);
      if (card) {
        card.setAttribute("data-lds-direction", e.target.value);
        card.dataset.ldsScheme = "light";
      }
    });
  });

  TYPE_PAIRINGS.forEach((p) => {
    const card = document.querySelector(`[data-lds-type-preview="${p.id}"]`);
    if (card) {
      card.setAttribute("data-lds-direction", direction);
      card.dataset.ldsType = p.id;
      card.dataset.ldsScheme = "light";
    }
  });
}

renderApp();
