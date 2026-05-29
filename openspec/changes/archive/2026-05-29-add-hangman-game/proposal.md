## Why

FunSpace shipped Impostor as the first pass-the-phone deduction game, but the catalog still lists Hangman as coming soon. Hangman is the ideal second game: it validates **shared-screen** gameplay without a reveal phase, diversifies the catalog beyond bluff/deduction, and matches the product vision's v1 goal of one word game plus one shared-screen game.

## What Changes

- Implement **Hangman** as a cooperative shared-screen game on one phone (group guesses letters together)
- Add **word lists** (locale-specific packs, multi-select, all default) — single words, not pairs
- Build Hangman **setup UI**: player selection (2–8), word pack multi-select, max wrong guesses preset
- Integrate with the **game shell** using phases `setup → play → resolve` (no reveal)
- Add **play UI**: blank word display, letter picker, hangman drawing, win/lose detection
- Register Hangman as **playable** in the registry and homepage catalog
- Add **in-app rules** via the shared game-rules system (`hangman.rules`)
- Add **i18n** strings for Hangman UI and word pack names (en + it)

## Capabilities

### New Capabilities

- `hangman-game`: Word selection, letter guessing engine, hangman drawing state, play/resolve UI, and word lists

### Modified Capabilities

- `homepage`: Hangman card shows as playable (remove coming-soon badge)
- `i18n`: Translation keys for Hangman setup, play, resolve, rules, and word packs
- `game-rules`: Hangman registers rules content via the shared rules system

## Impact

- New `src/games/hangman/` — engine, config schema, word lists, components
- New `docs/games/hangman-design.md` — rules and integration reference
- Updates to `src/games/registry.ts` — register playable Hangman definition
- Updates to `src/catalog/games.ts` — `status: "playable"`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Depends on: `player-roster`, `game-shell`, `game-rules` (already shipped)
- No new npm dependencies expected
