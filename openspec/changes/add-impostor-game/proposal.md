## Why

FunSpace has player roster and game shell infrastructure, but no real playable game yet. Impostor is the flagship word-based party game in the product vision and the primary reason users will open the app. Shipping Impostor validates the full platform loop — setup, pass-the-phone reveal, in-person play, elimination tracking, and resolution — with real game rules.

## What Changes

- Implement the **Impostor** game engine: role assignment, word pair selection, win detection, and elimination tracking
- Add **word packs** (locale-specific, multi-select, all default) with crew/spy word pairs
- Build Impostor-specific **setup UI**: player selection, impostor/spy counts, presets (Classic, With Spy, Chaos, Custom), word pack multi-select
- Integrate with existing **game shell** for reveal, play chrome, and rematch
- Register Impostor as a **playable** game in the registry (replace coming-soon placeholder)
- Update catalog metadata to **3–20 players** and mark Impostor as playable on the homepage
- Add **i18n** strings for Impostor UI, role reveals, and word pack names (en + it)

## Capabilities

### New Capabilities

- `impostor-game`: Core engine, config validation, role assignment, word packs, elimination, win detection, and game-specific UI

### Modified Capabilities

- `homepage`: Impostor card shows as playable (remove coming-soon badge)
- `i18n`: Translation keys for Impostor setup, play, elimination, resolve, and word packs
- `game-shell`: Impostor extends shell with game-specific setup form and eliminate sub-phase within play

## Impact

- New `src/games/impostor/` — engine, config schema, presets, word packs, components
- Updates to `src/games/registry.ts` — register playable Impostor definition
- Updates to `src/catalog/games.ts` — `status: "playable"`, `minPlayers: 3`, `maxPlayers: 20`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Depends on: `player-roster`, `game-shell`, `secret-delivery` (already shipped)
- Reference: `docs/games/impostor-design.md`
