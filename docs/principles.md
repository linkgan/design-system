# Linkgan design language — principles

Opinionated rules for personal sites and tools. Every surface shares one token layer; direction (Folio, Grove, Ledger) changes character, not structure.

## 1. Quiet first, accent once

Each viewport gets **one** filled accent action. Everything else stays neutral. Color names a state or category, never decoration. If two accents compete, demote one to outline or text.

## 2. Type does the hierarchy

Size and weight carry structure before pills, badges, or containers. Display type is sparse—hero, page title, one metric. Body copy stays in the sans rhythm; monospace is only for figures, code, and tables.

## 3. Space is the grid

We use an 4px base and a 12-column mental model: related items sit closer than unrelated ones (proximity beats boxes). Section breaks use whitespace and type, not endless card stacks.

## 4. Tokens, not taste in components

Components reference semantic tokens only (`--lds-color-text-primary`, never hex in CSS). Themes remap semantics; components never branch on direction.

## 5. Motion with purpose

Transitions ≤ 220ms, ease-out for entrances, no animation on keyboard-heavy paths. Respect `prefers-reduced-motion`.

## 6. Light and dark are designed, not inverted

Dark modes reduce chroma, lift surfaces for elevation, and re-check every text pair. OS `color-scheme` follows `data-lds-scheme`.

## 7. No template slop

No purple gradients, generic hero blurbs, or three equal cards “because landing pages.” Sections earn their place from the product story (home narrative vs. ledger density).
