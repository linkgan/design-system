import {
  DIRECTIONS,
  TYPE_PAIRINGS,
  DEFAULT_TYPE,
  FONT_STYLESHEET,
  applyTheme,
  readThemeFromQuery,
  writeThemeToUrl,
} from "./theme.js";

document.getElementById("lds-fonts").href = FONT_STYLESHEET;

const TRANSACTIONS = [
  { name: "Groceries", cat: "Food", amount: "-$84.20" },
  { name: "Payroll", cat: "Income", amount: "+$3,240.00" },
  { name: "Transit", cat: "Transport", amount: "-$42.00" },
  { name: "Cloud host", cat: "Tools", amount: "-$29.00" },
];

function renderControls(direction, scheme, type) {
  return `
    <div class="lds-container" style="padding-top: var(--lds-space-6)">
      <div class="lds-showcase-bar" role="region" aria-label="Theme controls">
        <span class="lds-caption">Showcase</span>
        <label>
          <span class="lds-caption">Direction</span>
          <select class="lds-select" id="direction" aria-label="Design direction">
            ${DIRECTIONS.map(
              (d) =>
                `<option value="${d.id}" ${d.id === direction ? "selected" : ""}>${d.label} — ${d.note}</option>`
            ).join("")}
          </select>
        </label>
        <label>
          <span class="lds-caption">Type pairing</span>
          <select class="lds-select" id="type" aria-label="Font pairing">
            ${TYPE_PAIRINGS.map(
              (t) =>
                `<option value="${t.id}" ${t.id === type ? "selected" : ""}>${t.label}</option>`
            ).join("")}
          </select>
        </label>
        <label>
          <span class="lds-caption">Scheme</span>
          <select class="lds-select" id="scheme" aria-label="Color scheme">
            <option value="light" ${scheme === "light" ? "selected" : ""}>Light</option>
            <option value="dark" ${scheme === "dark" ? "selected" : ""}>Dark</option>
          </select>
        </label>
        <a class="lds-btn lds-btn--ghost" href="./type-specimen.html">Type</a>
        <a class="lds-btn lds-btn--ghost" href="./color-specimen.html">Colors</a>
        <span class="lds-pill" id="active-pill">${direction} · ${type} · ${scheme}</span>
      </div>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="lds-hero lds-container" aria-labelledby="hero-title">
      <p class="lds-hero__eyebrow">Los Angeles · Analytics &amp; code</p>
      <h1 class="lds-display lds-hero__title" id="hero-title">Notes from the workbench</h1>
      <p class="lds-body lds-hero__lede">
        A personal site built for long-form thinking—projects, chess, and the small systems that keep life legible.
      </p>
      <div class="lds-hero__actions">
        <a class="lds-btn lds-btn--primary" href="#writing">Read latest</a>
        <a class="lds-btn lds-btn--secondary" href="#projects">Projects</a>
      </div>
    </section>
    <section class="lds-section lds-container" id="writing">
      <h2 class="lds-h2">Recent writing</h2>
      <p class="lds-body" style="margin-bottom: var(--lds-space-8); max-width: 48ch">
        Essays and logs—no SEO filler, just things worth keeping.
      </p>
      <article class="lds-card">
        <h3 class="lds-card__title">Why I still keep a lab notebook</h3>
        <p class="lds-card__body">
          Paper fails search; digital fails presence. The compromise is a dated index and one honest paragraph per day.
        </p>
        <p class="lds-caption" style="margin-top: var(--lds-space-4)">Oct 2026 · 6 min</p>
      </article>
    </section>
  `;
}

function renderFinance() {
  return `
    <section class="lds-section lds-container" aria-labelledby="finance-title">
      <h2 class="lds-h2" id="finance-title">October ledger</h2>
      <p class="lds-body" style="margin-bottom: var(--lds-space-6); max-width: 46ch">
        Cashflow at a glance—dense enough for decisions, quiet enough to open daily.
      </p>
      <div class="lds-grid-stats" style="margin-bottom: var(--lds-space-6)">
        <div class="lds-stat">
          <span class="lds-stat__label">Net worth</span>
          <span class="lds-stat__value">$128,420</span>
          <span class="lds-stat__delta lds-stat__delta--up">+2.4% MoM</span>
        </div>
        <div class="lds-stat">
          <span class="lds-stat__label">Cash</span>
          <span class="lds-stat__value">$12,800</span>
          <span class="lds-stat__delta"> runway 4.1 mo</span>
        </div>
        <div class="lds-stat">
          <span class="lds-stat__label">Spend</span>
          <span class="lds-stat__value">$3,920</span>
          <span class="lds-stat__delta lds-stat__delta--down">+$180 vs plan</span>
        </div>
      </div>
      <div class="lds-panel">
        <h3 class="lds-h3" style="margin-top: 0">Recent transactions</h3>
        <div class="lds-table-wrap">
          <table class="lds-table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col" style="text-align: right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${TRANSACTIONS.map(
                (row) => `
                <tr>
                  <td>${row.name}</td>
                  <td class="lds-caption">${row.cat}</td>
                  <td class="lds-table__num">${row.amount}</td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </div>
        <div class="lds-field" style="margin-top: var(--lds-space-6); max-width: 20rem">
          <label class="lds-label" for="filter">Filter</label>
          <input class="lds-input" id="filter" name="filter" placeholder="Search transactions" autocomplete="off" />
        </div>
      </div>
    </section>
  `;
}

function renderApp() {
  const { direction, scheme, type } = readThemeFromQuery();
  applyTheme({ direction, scheme, type });

  const app = document.getElementById("app");
  app.innerHTML = `
    <header class="lds-header">
      <div class="lds-container lds-header__inner">
        <a class="lds-nav__brand" href="#">linkgan</a>
        <nav aria-label="Primary">
          <ul class="lds-nav">
            <li><a class="lds-link lds-link--active" href="#">Showcase</a></li>
            <li><a class="lds-link" href="./type-specimen.html">Type</a></li>
            <li><a class="lds-link" href="./color-specimen.html">Colors</a></li>
            <li><a class="lds-link" href="https://github.com/linkgan/design-system">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </header>
    ${renderControls(direction, scheme, type)}
    <div class="lds-split lds-container" style="padding-bottom: var(--lds-space-16)">
      <div aria-label="Home site mock">${renderHome()}</div>
      <div aria-label="Finance dashboard mock">${renderFinance()}</div>
    </div>
  `;

  const bind = () => {
    const d = document.getElementById("direction").value;
    const s = document.getElementById("scheme").value;
    const t = document.getElementById("type").value;
    writeThemeToUrl(d, s, t);
    applyTheme({ direction: d, scheme: s, type: t });
    document.getElementById("active-pill").textContent = `${d} · ${t} · ${s}`;
  };
  document.getElementById("direction").addEventListener("change", bind);
  document.getElementById("scheme").addEventListener("change", bind);
  document.getElementById("type").addEventListener("change", bind);
}

renderApp();
