## Why

FunSpace ships Impostor, Hangman, Never Have I Ever, and Question Impostor — but **Truth or Dare** is named in the product vision and games roadmap as the next P0 social prompt game. It completes the social prompt trilogy alongside NHIE, reuses the proven prompt-deck pipeline (packs, shuffle, 18+ gating, presets), and adds a lightweight **truth-or-dare choice per turn** that differentiates it from linear prompt games without new infrastructure.

## What Changes

- Implement **Truth or Dare** (*Obbligo o verità*) as a shared-screen prompt game on one phone (group picks who answers or acts; app surfaces prompts)
- Add **locale-specific Truth and Dare decks** (en + it) with themed packs (Classic, Silly, Spicy 18+) and multi-select
- Build **setup UI**: player selection (3–20), pack multi-select, presets, prompt mode (truth only / dare only / both / random), optional player-picker toggle
- Integrate with the **game shell** using phases `setup → play → resolve` (no reveal)
- Build **play UI**: per-turn Truth or Dare choice (when mode allows), one prompt at a time, shuffle without repeats per deck type, next/skip/end-session, progress indicator
- Build **resolve UI**: session summary (prompts played by type), rematch, exit; celebratory end animation on session complete
- Register Truth or Dare as **playable** in the registry and homepage catalog (new catalog entry)
- Add **in-app rules** via the shared game-rules system (`truthOrDare.rules`)
- Add **i18n** strings for setup, play, resolve, rules, and pack names (en + it)
- Create **`docs/games/truth-or-dare-design.md`** — rules, flow, deck structure, and platform integration reference

## Capabilities

### New Capabilities

- `truth-or-dare-game`: Separate Truth and Dare deck selection, per-turn prompt mode, shuffle engine, play/resolve UI, and locale-specific prompt lists

### Modified Capabilities

- `homepage`: Truth or Dare card added as playable; catalog grid includes a fifth shipped game
- `i18n`: Translation keys for Truth or Dare UI, rules, pack names, and Spicy 18+ confirmation
- `game-rules`: Truth or Dare registers rules content via the shared game rules system
- `game-end-animations`: Session-complete resolve uses the win animation variant (same pattern as NHIE)

## Impact

- New `src/games/truth-or-dare/` — engine, config schema, truth/dare decks, components
- New `docs/games/truth-or-dare-design.md` — rules and integration reference
- Updates to `src/games/registry.ts` — register playable definition
- Updates to `src/catalog/games.ts` — new entry with `status: "playable"`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Depends on: `player-roster`, `game-shell`, `game-rules`, `game-end-animations` (already shipped)
- No new npm dependencies expected
