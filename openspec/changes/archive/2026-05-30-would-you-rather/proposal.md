## Why

Would You Rather is the next P0 social prompt game on the [games roadmap](../../../docs/games-roadmap.md) — minimal engine effort, strong party appeal, and it validates a new **paired-option prompt** content shape after NHIE (single prompts) and Truth or Dare (truth/dare pools). It expands the social catalog without new shell infrastructure.

## What Changes

- Implement **Would You Rather** as a shared-screen dilemma game on one phone (two options on screen; group debates and picks verbally)
- Add **locale-specific dilemma decks** (en + it) with paired options and themed packs (Classic, Gross, Hypothetical, Spicy 18+)
- Build **setup UI**: player selection (3–20), pack multi-select, presets, Spicy 18+ confirmation
- Integrate with the **game shell** using phases `setup → play → resolve` (no reveal)
- Build **play UI**: dilemma card showing option A vs option B, progress, Next/Skip/End session
- Build **resolve UI**: session summary (dilemmas played), rematch, exit; win end animation
- Register as **playable** in registry and homepage catalog
- Add **in-app rules** via `wouldYouRather.rules`
- Add **i18n** (en + it) and **`docs/games/would-you-rather-design.md`**

## Capabilities

### New Capabilities

- `would-you-rather-game`: Paired-option deck selection, shuffle engine, play/resolve UI, locale-specific dilemma lists

### Modified Capabilities

- `homepage`: New Would You Rather playable catalog card
- `i18n`: Translation keys for Would You Rather UI, rules, and pack names
- `game-rules`: Would You Rather registers rules content via the shared rules system
- `game-end-animations`: Session-complete resolve uses the win animation variant

## Impact

- New `src/games/would-you-rather/` — engine, config schema, dilemma decks, components
- New `docs/games/would-you-rather-design.md`
- Updates to `src/games/registry.ts`, `src/catalog/games.ts`, `src/catalog/types.ts`, `src/lib/game-accents.ts`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Reuses: `player-roster`, `game-shell`, `game-rules`, `game-end-animations`, NHIE setup/play patterns
