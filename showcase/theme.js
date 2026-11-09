import { COLOR_DIRECTIONS } from "./color-blocks.js";

export const DIRECTIONS = COLOR_DIRECTIONS.map((d) => ({
  id: d.id,
  label: d.label,
  note: d.blurb,
  accent: d.accent,
}));

export const TYPE_PAIRINGS = [
  {
    id: "literata-editorial",
    label: "Literata editorial",
    display: "Literata",
    body: "Source Sans 3",
    mono: "Source Code Pro",
    category: "Serif display + sans body",
  },
  {
    id: "fraunces-grove",
    label: "Fraunces warm",
    display: "Fraunces",
    body: "Nunito Sans",
    mono: "IBM Plex Mono",
    category: "Old-style serif + humanist sans",
  },
  {
    id: "plex-ledger",
    label: "IBM Plex",
    display: "IBM Plex Sans",
    body: "IBM Plex Sans",
    mono: "IBM Plex Mono",
    category: "Neo-grotesk (uniform)",
  },
  {
    id: "inter-minimal",
    label: "Inter minimal",
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
    category: "Neo-grotesk all-sans",
  },
  {
    id: "outfit-geometric",
    label: "Outfit geometric",
    display: "Outfit",
    body: "Outfit",
    mono: "Roboto Mono",
    category: "Geometric sans",
  },
  {
    id: "work-humanist",
    label: "Work Sans",
    display: "Work Sans",
    body: "Work Sans",
    mono: "Inconsolata",
    category: "Humanist sans",
  },
  {
    id: "newsreader-modern",
    label: "Newsreader modern",
    display: "Newsreader",
    body: "Inter",
    mono: "JetBrains Mono",
    category: "Modern serif + neo-grotesk",
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    display: "DM Sans",
    body: "DM Sans",
    mono: "DM Mono",
    category: "Low-contrast geometric sans",
  },
];

export const DEFAULT_DIRECTION = "cobalt";
export const DEFAULT_TYPE = "newsreader-modern";

export const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=DM+Mono:wght@400;500",
    "family=DM+Sans:wght@400;500;600;700",
    "family=Fraunces:opsz,wght@9..144,500;9..144,600",
    "family=IBM+Plex+Mono:wght@400;500;600",
    "family=IBM+Plex+Sans:wght@400;500;600;700",
    "family=Inconsolata:wght@400;500;600",
    "family=Inter:wght@400;500;600;700",
    "family=JetBrains+Mono:wght@400;500;600",
    "family=Literata:opsz,wght@7..72,500;7..72,600",
    "family=Newsreader:opsz,wght@6..72,500;6..72,600",
    "family=Nunito+Sans:wght@400;500;600;700",
    "family=Outfit:wght@400;500;600;700",
    "family=Roboto+Mono:wght@400;500",
    "family=Source+Code+Pro:wght@400;500",
    "family=Source+Sans+3:wght@400;500;600;700",
    "family=Work+Sans:wght@400;500;600;700",
  ].join("&") +
  "&display=swap";

export function applyTheme({ direction, scheme, type }) {
  const el = document.documentElement;
  const dir = direction ?? DEFAULT_DIRECTION;
  const pairing = type ?? DEFAULT_TYPE;

  if (dir === DEFAULT_DIRECTION) delete el.dataset.ldsDirection;
  else el.dataset.ldsDirection = dir;

  if (pairing === DEFAULT_TYPE) delete el.dataset.ldsType;
  else el.dataset.ldsType = pairing;

  if (scheme === "light") delete el.dataset.ldsScheme;
  else if (scheme === "dark") el.dataset.ldsScheme = "dark";
}

export function readThemeFromQuery() {
  const q = new URLSearchParams(location.search);
  const el = document.documentElement;
  return {
    direction: q.get("direction") || el.dataset.ldsDirection || DEFAULT_DIRECTION,
    scheme: q.get("scheme") || el.dataset.ldsScheme || "light",
    type: q.get("type") || el.dataset.ldsType || DEFAULT_TYPE,
  };
}

export function writeThemeToUrl(direction, scheme, type) {
  const url = new URL(location.href);
  if (direction) url.searchParams.set("direction", direction);
  if (scheme) url.searchParams.set("scheme", scheme);
  if (type) url.searchParams.set("type", type);
  history.replaceState(null, "", url);
}
