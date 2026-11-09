/** Shared UI sample for type specimen cards (tokens only). */
export function renderSpecimenSample({ tableId = "amt", inputId = "q" } = {}) {
  return `
    <div class="lds-type-specimen__sample">
      <nav class="lds-type-specimen__mini-nav" aria-label="Sample navigation">
        <span class="lds-nav__brand">linkgan</span>
        <a class="lds-link lds-link--active" href="#">Overview</a>
        <a class="lds-link" href="#">Ledger</a>
      </nav>
      <div class="lds-type-specimen__row">
        <button type="button" class="lds-btn lds-btn--primary">Save</button>
        <button type="button" class="lds-btn lds-btn--secondary">Cancel</button>
      </div>
      <div class="lds-field">
        <label class="lds-label" for="${inputId}">Amount</label>
        <input class="lds-input" id="${inputId}" placeholder="0.00" inputmode="decimal" />
      </div>
      <div class="lds-table-wrap">
        <table class="lds-table" aria-label="Sample figures">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" class="lds-table__num">Q1</th>
              <th scope="col" class="lds-table__num">Q2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenue</td>
              <td class="lds-table__num">$12,480</td>
              <td class="lds-table__num">$13,902</td>
            </tr>
            <tr>
              <td>Spend</td>
              <td class="lds-table__num">$8,210</td>
              <td class="lds-table__num">$7,640</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td class="lds-table__num">$4,270</td>
              <td class="lds-table__num">$6,262</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderSpecimenTypography() {
  return `
    <h2 class="lds-display" style="font-size: var(--lds-text-3xl); margin: 0 0 var(--lds-space-3)">
      Balance sheet rhythm
    </h2>
    <p class="lds-body" style="margin: 0 0 var(--lds-space-5); max-width: 42ch">
      Typography should make hierarchy obvious before color does. This paragraph shows body scale,
      line height, and secondary ink on a white canvas.
    </p>
  `;
}
