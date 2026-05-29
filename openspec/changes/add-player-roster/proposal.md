## Why

Every FunSpace game needs player names at setup. Re-entering the same group each session is friction. A **shared player roster** persisted in the browser lets returning groups start faster and is required before Impostor and other games can ship.

## What Changes

- Introduce **StoragePort** abstraction with a **LocalStorageAdapter** (no raw `localStorage` in feature code)
- Implement **player roster** persistence (`funspace:playerRoster`) — a global list of player names shared across all games
- Add a **Players** page (`/[locale]/players`) to view, add, rename, and remove roster names
- Add **Players** link to app navigation (header + mobile menu)
- Provide a **`usePlayerRoster` hook** (or equivalent) for future game setup flows to read/write the roster
- Add i18n strings (English + Italian) for roster UI
- Add unit tests for storage adapter and roster logic

## Capabilities

### New Capabilities

- `storage`: StoragePort interface and localStorage implementation for typed, namespaced persistence
- `player-roster`: Global player name list, CRUD UI, and hook for consumers

### Modified Capabilities

- `app-shell`: Add Players navigation link to header and mobile menu
- `i18n`: Add translation keys for player roster UI

## Impact

- New `src/core/storage/` module (port, adapter, keys)
- New `src/core/player-roster/` module (types, repository, hook)
- New `src/app/[locale]/players/` page and components
- Updates to `Header.tsx`, `en.json`, `it.json`
- `project-scaffold` placeholder `core/storage/` becomes real implementation
- No backend, no auth — localStorage only
- Foundation for `add-game-shell` and `add-impostor-game` changes
