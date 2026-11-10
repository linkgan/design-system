import {
  DIRECTIONS,
  TYPE_PAIRINGS,
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
    <div class="lds-site">
      <header class="lds-header lds-header--site">
        <div class="lds-header__inner">
          <a class="lds-nav__brand" href="#">linkgan</a>
          <nav aria-label="Site">
            <ul class="lds-nav">
              <li><a class="lds-link lds-link--active" href="#">Home</a></li>
              <li><a class="lds-link" href="#">Projects</a></li>
              <li><a class="lds-link" href="#">Writing</a></li>
              <li><a class="lds-link" href="#">Lab notes</a></li>
              <li><a class="lds-link" href="#">About</a></li>
              <li><a class="lds-link" href="https://github.com/linkgan">GitHub</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <p class="lds-site-index-line" aria-hidden="true">01 · home / 2026-11 / cobalt · expressive-minimal</p>

      <h1 class="lds-site-hero">Hello, I'm linkgan</h1>
      <p class="lds-site-lede">
        Personal index in the design system—canvas header, tight catalog rhythm, mono index line. Longform can still use Newsreader when needed.
      </p>

      <section class="lds-catalog" aria-labelledby="projects-heading">
        <h2 class="lds-catalog__heading" id="projects-heading">Projects</h2>
        <ul class="lds-catalog__list">
          <li class="lds-catalog__item">
            <h3 class="lds-catalog__title">
              <a class="lds-catalog__link" href="#">design-system</a>
            </h3>
            <p class="lds-catalog__desc">
              Shared tokens and components for personal sites and a finance dashboard—cobalt on white, engineered not decorative.
            </p>
          </li>
          <li class="lds-catalog__item">
            <h3 class="lds-catalog__title">
              <a class="lds-catalog__link" href="#">pgn2data</a>
            </h3>
            <p class="lds-catalog__desc">
              Turn chess games into tabulated datasets. Small tool, sharp edges.
            </p>
          </li>
          <li class="lds-catalog__item">
            <h3 class="lds-catalog__title">
              <a class="lds-catalog__link" href="#">finances-webapp</a>
            </h3>
            <p class="lds-catalog__desc">
              Personal ledger UI—dense tables, quiet chrome, numbers in mono.
            </p>
          </li>
        </ul>
      </section>

      <section class="lds-catalog" aria-labelledby="thoughts-heading">
        <h2 class="lds-catalog__heading" id="thoughts-heading">Thoughts &amp; ideas</h2>
        <ul class="lds-catalog__list">
          <li class="lds-catalog__item">
            <h3 class="lds-catalog__title">
              <a class="lds-catalog__link" href="#">Why keep a lab notebook</a>
            </h3>
            <p class="lds-catalog__desc">
              Paper fails search; digital fails presence. One dated paragraph per day is the compromise.
            </p>
            <span class="lds-catalog__meta">Oct 2026</span>
          </li>
          <li class="lds-catalog__item">
            <h3 class="lds-catalog__title">
              <a class="lds-catalog__link" href="#">Analytics with legible pipelines</a>
            </h3>
            <p class="lds-catalog__desc">
              Models you can re-read six months later without a diagram the size of a wall.
            </p>
            <span class="lds-catalog__meta">Sep 2026</span>
          </li>
        </ul>
      </section>

      <article class="lds-serif" style="margin-top: var(--lds-space-12)">
        <span class="lds-serif__label">Longform · Newsreader</span>
        Optional essay voice—serif body when a piece needs warmth; site chrome stays Inter-first like rsms.me.
      </article>

      <p class="lds-site-bio">
        Los Angeles · analytics engineer. Software is the medium I work in.
        <a class="lds-link-plain" href="#">Home</a>
        ·
        <a class="lds-link-plain" href="https://github.com/linkgan">GitHub</a>
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
