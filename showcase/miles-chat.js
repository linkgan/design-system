import { FONT_STYLESHEET, applyTheme, readThemeFromQuery } from "./theme.js";

document.getElementById("lds-fonts").href = FONT_STYLESHEET;

const MESSAGES = [
  {
    day: "2026-11-08",
    dayLabel: "8 Nov 2026",
    gap: null,
    items: [
      {
        dir: "incoming",
        group: "start",
        sender: "Miles",
        text: "I archived the November lab notes under /thoughts — want a one-line summary on the index?",
        time: "09:14",
      },
      {
        dir: "outgoing",
        group: "start",
        sender: "You",
        text: "Yes — keep it utilitarian. Link the raw export too.",
        time: "09:18",
      },
    ],
  },
  {
    day: "2026-11-09",
    dayLabel: "9 Nov 2026",
    gap: "14h gap · messages before 09:00 not in this export",
    items: [
      {
        dir: "incoming",
        group: "start",
        sender: "Miles",
        text: "Chat page is moving into design-system/chat.css. No more site-local overlay.",
        time: "14:02",
      },
      {
        dir: "incoming",
        group: "grouped",
        sender: "Miles",
        text: "Sticky chrome sits under your site header; scrubber uses chips, not pills.",
        time: "14:02",
      },
      {
        dir: "outgoing",
        group: "start",
        sender: "You",
        text: "Ship it on a fresh branch — home-website adopts after merge.",
        time: "14:05",
      },
    ],
  },
];

function renderMessage(msg) {
  const classes = [
    "lds-chat__message",
    `lds-chat__message--${msg.dir}`,
    msg.group === "start" ? "lds-chat__message--group-start" : "lds-chat__message--grouped",
  ].join(" ");
  return `
    <article class="${classes}">
      <span class="lds-chat__sender">${msg.sender}</span>
      <p class="lds-chat__bubble">${msg.text}</p>
      <time class="lds-chat__time" datetime="">${msg.time}</time>
    </article>
  `;
}

function renderApp() {
  const { direction, scheme, type } = readThemeFromQuery();
  applyTheme({ direction, scheme, type });

  const days = MESSAGES.map(
    (block) => `
    <li class="lds-chat__day" id="${block.day}">
      <div class="lds-chat__day-marker"><time datetime="${block.day}">${block.dayLabel}</time></div>
      ${
        block.gap
          ? `<div class="lds-chat__gap" role="note"><span class="lds-chat__gap-label">Gap</span><span>${block.gap}</span></div>`
          : ""
      }
      ${block.items.map(renderMessage).join("")}
    </li>`
  ).join("");

  document.getElementById("app").innerHTML = `
    <div class="lds-site lds-chat">
      <header class="lds-header lds-header--site">
        <div class="lds-header__inner">
          <a class="lds-nav__brand" href="./index.html">linkgan</a>
          <nav aria-label="Site">
            <ul class="lds-nav">
              <li><a class="lds-link" href="./index.html">Showcase</a></li>
              <li><a class="lds-link lds-link--active" href="#">Miles chat</a></li>
              <li><a class="lds-link" href="./type-specimen.html">Type</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="lds-chat__chrome">
        <div class="lds-chat__chrome-inner">
          <div>
            <h1 class="lds-chat__title">Miles</h1>
            <p class="lds-chat__meta">design-system preview · cobalt · ${scheme}</p>
          </div>
          <nav class="lds-chat__scrubber" aria-label="Jump to date">
            <span class="lds-chat__scrubber-label">Dates</span>
            <a class="lds-chip" href="#2026-11-08">Nov 8</a>
            <a class="lds-chip lds-chip--active" href="#2026-11-09" aria-current="true">Nov 9</a>
            <a class="lds-chip" href="#2026-11-10">Nov 10</a>
          </nav>
          <div class="lds-chat__filters" role="group" aria-label="Filter messages">
            <button type="button" class="lds-chip lds-chip--filter lds-chip--active" aria-pressed="true">All</button>
            <button type="button" class="lds-chip lds-chip--filter" aria-pressed="false">Miles</button>
            <button type="button" class="lds-chip lds-chip--filter" aria-pressed="false">You</button>
            <button type="button" class="lds-chip lds-chip--filter" aria-pressed="false">Links</button>
          </div>
        </div>
      </div>

      <ol class="lds-chat__log" aria-label="Conversation">
        ${days}
      </ol>
    </div>
  `;
}

renderApp();
