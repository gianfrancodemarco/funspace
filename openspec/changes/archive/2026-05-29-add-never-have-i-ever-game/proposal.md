## Why

FunSpace already ships Impostor (deduction with reveal) and Hangman (cooperative word game). Never Have I Ever is the third catalog card and the natural next step: it validates **social prompt games** on the shared-screen shell without private secrets, completes the v1 trio on the homepage, and matches the product vision's goal of catalog diversity beyond word and bluff games.

## What Changes

- Implement **Never Have I Ever** as a shared-screen prompt game on one phone (group reads prompts aloud and responds in person)
- Add **locale-specific prompt decks** (en + it) with multi-select packs and optional 18+ content opt-in
- Build **setup UI**: player selection (3–20), prompt pack multi-select, preset for pack defaults
- Integrate with the **game shell** using phases `setup → play → resolve` (no reveal)
- Build **play UI**: one prompt at a time, shuffle without repeats, next/skip/end-session controls, progress indicator
- Build **resolve UI**: session summary (prompts played), rematch, exit; celebratory end animation on session complete
- Register Never Have I Ever as **playable** in the registry and homepage catalog
- Add **in-app rules** via the shared game-rules system (`neverHaveIEver.rules`)
- Add **i18n** strings for setup, play, resolve, rules, and prompt pack names (en + it)
- Create **`docs/games/never-have-i-ever-design.md`** — rules, flow, deck structure, and platform integration reference

## Capabilities

### New Capabilities

- `never-have-i-ever-game`: Prompt deck selection, shuffle engine, play/resolve UI, and locale-specific prompt lists

### Modified Capabilities

- `homepage`: Never Have I Ever card shows as playable (remove coming-soon badge)
- `i18n`: Translation keys for Never Have I Ever UI, rules, and prompt pack names
- `game-rules`: Never Have I Ever registers rules content via the shared rules system
- `game-end-animations`: Session-complete resolve uses the win animation variant

## Impact

- New `src/games/never-have-i-ever/` — engine, config schema, prompt decks, components
- New `docs/games/never-have-i-ever-design.md` — rules and integration reference
- Updates to `src/games/registry.ts` — register playable definition (remove coming-soon entry)
- Updates to `src/catalog/games.ts` — `status: "playable"`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Depends on: `player-roster`, `game-shell`, `game-rules`, `game-end-animations` (already shipped)
- No new npm dependencies expected
