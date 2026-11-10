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
    <header class="lds-masthead lds-reveal" aria-labelledby="hero-title">
      <div class="lds-masthead__inner">
        <p class="lds-meta" style="margin: 0 0 var(--lds-space-6)">Los Angeles · linkgan</p>
        <h1 class="lds-display-xl" id="hero-title">
          Notes from the <span class="lds-display-emphasis">workbench</span>
        </h1>
        <p class="lds-prose" style="margin: var(--lds-space-8) 0 var(--lds-space-6)">
          Personal site energy: long-form thinking, chess, and the small systems that keep a life legible—without
          the template glow.
        </p>
        <ul class="lds-tags" aria-label="Topics">
          <li><a class="lds-tag" href="#">writing</a></li>
          <li><a class="lds-tag" href="#">chess</a></li>
          <li><a class="lds-tag" href="#">systems</a></li>
        </ul>
        <div class="lds-hero__actions" style="margin-top: var(--lds-space-8)">
          <a class="lds-btn lds-btn--primary" href="#index">Index</a>
          <a class="lds-btn lds-btn--secondary" href="#now">Now</a>
        </div>
      </div>
    </header>
  <aside class="lds-aside lds-container" id="now">
      <span class="lds-aside__label">Now</span>
      Building in public, guiltlessly following curiosity—a line borrowed from personal-site restraint, not hustle copy.
    </aside>
    <div class="lds-container">
      <div class="lds-section-rule" role="separator"><span>Writing</span></div>
      <ul class="lds-index" id="index">
        <li class="lds-index__item">
          <a class="lds-index__link" href="#">
            <span class="lds-meta">Essay</span>
            <span class="lds-index__title">Why I still keep a lab notebook</span>
            <span class="lds-index__meta">6 min</span>
            <span class="lds-index__desc">Paper fails search; digital fails presence. One honest paragraph per day.</span>
          </a>
        </li>
        <li class="lds-index__item">
          <a class="lds-index__link" href="#">
            <span class="lds-meta">Log</span>
            <span class="lds-index__title">Chess study index, autumn</span>
            <span class="lds-index__meta">2026</span>
            <span class="lds-index__desc">Openings I’m revisiting—not a rating grind post.</span>
          </a>
        </li>
        <li class="lds-index__item">
          <a class="lds-index__link" href="#">
            <span class="lds-meta">Note</span>
            <span class="lds-index__title">Analytics engineering with care</span>
            <span class="lds-index__meta">draft</span>
            <span class="lds-index__desc">Pipelines that stay legible six months later.</span>
          </a>
        </li>
      </ul>
      <p class="lds-body" style="margin-top: var(--lds-space-8); max-width: var(--lds-measure-narrow)">
        More in the <a class="lds-link-text" href="#">archive</a>
        <span class="lds-footnote"><a href="#" aria-label="Footnote 1">1</a></span> when it earns a click—not before.
      </p>
    </div>
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
