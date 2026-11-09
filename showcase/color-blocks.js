export const COLOR_DIRECTIONS = [
  { id: "folio", label: "Folio", accent: "#b54020", blurb: "Vermillion editorial ink on white." },
  { id: "grove", label: "Grove", accent: "#4d7356", blurb: "Soft moss green with warm neutrals." },
  { id: "ledger", label: "Ledger", accent: "#0d7c84", blurb: "Cool teal built for ledgers and tables." },
  { id: "ink-blue", label: "Ink blue", accent: "#1558c7", blurb: "Near-monochrome ink with one clear blue." },
  { id: "navy", label: "Navy", accent: "#1e3a5f", blurb: "Deep maritime navy, calm and authoritative." },
  { id: "terracotta", label: "Terracotta", accent: "#c24e32", blurb: "Sun-baked clay accent on cool gray." },
  { id: "plum", label: "Plum", accent: "#6e4a78", blurb: "Muted aubergine—earned, not gradient purple." },
  { id: "ochre", label: "Ochre", accent: "#7a6512", blurb: "Mustard gold for quiet confidence." },
  { id: "forest", label: "Forest", accent: "#2e6649", blurb: "Deep forest green, sharper than Grove." },
  { id: "cobalt", label: "Cobalt", accent: "#1f5eff", blurb: "Confident electric blue on crisp neutrals." },
  { id: "graphite", label: "Graphite", accent: "#3d4652", blurb: "Steel-gray monochrome with minimal chrome." },
];

export function renderSwatches() {
  const keys = [
    ["Accent", "--lds-color-accent"],
    ["Surface", "--lds-color-bg-surface"],
    ["Positive", "--lds-color-positive"],
    ["Negative", "--lds-color-negative"],
    ["Warning", "--lds-color-warning"],
    ["Info", "--lds-color-info"],
  ];
  return `
    <div class="lds-swatch-row" aria-label="Core swatches">
      ${keys
        .map(
          ([label, token]) =>
            `<div class="lds-swatch" style="background: var(${token})" title="${label}"><span>${label}</span></div>`
        )
        .join("")}
    </div>
    <div class="lds-swatch-row lds-swatch-row--chart" aria-label="Chart series">
      ${[1, 2, 3, 4, 5, 6]
        .map(
          (i) =>
            `<div class="lds-swatch lds-swatch--chart" style="background: var(--lds-color-chart-${i})" title="Series ${i}"></div>`
        )
        .join("")}
    </div>
  `;
}

export function renderMiniChart() {
  const values = [72, 58, 45, 38, 52, 40];
  return `
    <div class="lds-mini-chart" role="img" aria-label="Sample bar chart using chart series colors">
      ${values
        .map(
          (h, i) => `
        <div class="lds-mini-chart__bar" style="height: ${h}%; background: var(--lds-color-chart-${i + 1})"></div>`
        )
        .join("")}
    </div>
  `;
}

export function renderColorSample(cardId) {
  return `
    ${renderSwatches()}
    <h2 class="lds-display" style="font-size: var(--lds-text-2xl); margin: var(--lds-space-5) 0 var(--lds-space-2)">
      Signal in the noise
    </h2>
    <p class="lds-body" style="margin: 0 0 var(--lds-space-5); max-width: 38ch">
      A hero line and supporting copy on pure white—accent only where it earns a click or a state.
    </p>
    <div class="lds-type-specimen__row">
      <button type="button" class="lds-btn lds-btn--primary">Primary</button>
      <button type="button" class="lds-btn lds-btn--secondary">Secondary</button>
    </div>
    <div class="lds-grid-stats" style="margin: var(--lds-space-5) 0">
      <div class="lds-stat">
        <span class="lds-stat__label">Net</span>
        <span class="lds-stat__value">$4,270</span>
        <span class="lds-stat__delta lds-stat__delta--up">+12.4%</span>
      </div>
      <div class="lds-stat">
        <span class="lds-stat__label">Drawdown</span>
        <span class="lds-stat__value">−$820</span>
        <span class="lds-stat__delta lds-stat__delta--down">−3.1%</span>
      </div>
    </div>
    <div class="lds-table-wrap">
      <table class="lds-table">
        <thead>
          <tr><th scope="col">Line</th><th scope="col" class="lds-table__num">Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Inflow</td><td class="lds-table__num lds-tone-up">+$1,240</td></tr>
          <tr><td>Outflow</td><td class="lds-table__num lds-tone-down">−$480</td></tr>
        </tbody>
      </table>
    </div>
    ${renderMiniChart()}
  `;
}
