## Why

FunSpace games share a common in-person flow: setup with player names, optional pass-the-phone secret reveals, shared play, and resolution. Without shared **game shell** infrastructure, every game would reimplement routing, phase navigation, roster selection, and the reveal loop. Player roster is done — the shell is the next blocker before Impostor (or any playable game) can ship.

## What Changes

- Introduce **game shell** core modules: phase model, session state, game registry, and shared UI chrome
- Introduce **secret delivery** for single-device pass-the-phone reveal flows
- Add dynamic game routes at `/[locale]/games/[gameId]`
- Build reusable components: player selection setup, reveal loop, phase layout, rematch prompt
- Define a **GameDefinition** interface that individual games (starting with Impostor) plug into
- Include a minimal **shell demo game** (`shell-demo`) to validate the full phase lifecycle in the browser before Impostor ships
- Wire homepage game cards to launch game routes
- Add i18n strings for shell UI (en + it)

## Capabilities

### New Capabilities

- `game-shell`: Shared game lifecycle, session model, phase UI, game registry, and launch routes
- `secret-delivery`: Single-device pass-the-phone reveal loop components and provider interface

### Modified Capabilities

- `homepage`: Game cards link to playable/launchable game routes
- `i18n`: Translation keys for game shell and reveal flow UI
- `player-roster`: Setup flow reads roster via existing hook (no spec change to behavior — consumption only)

## Impact

- New `src/core/game-shell/` and `src/core/secret-delivery/`
- New `src/games/registry.ts` and `src/games/shell-demo/` (reference game)
- New `src/app/[locale]/games/[gameId]/` route
- New shell UI components under `src/components/game-shell/`
- Updates to `GameCard`, message files, sitemap
- XState for shell phase machine
- Depends on: `storage`, `player-roster` (already shipped)
- Unblocks: `add-impostor-game`
