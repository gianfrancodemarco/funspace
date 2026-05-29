## 1. Shell Extension

- [x] 1.1 Extend `GameDefinition` with optional `SetupView` and `gameConfig` on session start
- [x] 1.2 Update `GamePageClient` to render game-specific setup when provided
- [x] 1.3 Extend shell machine `START` event to accept optional game config payload
- [x] 1.4 Add unit tests for setup view routing and config passthrough

## 2. Impostor Engine

- [x] 2.1 Create `src/games/impostor/config.schema.ts` — Zod schema and validation helpers
- [x] 2.2 Create `src/games/impostor/presets.ts` — Classic, With Spy, Chaos, Custom
- [x] 2.3 Create `src/games/impostor/engine/` — role assignment, word pair pick, elimination, win check
- [x] 2.4 Add unit tests for role assignment, win detection, and config validation

## 3. Word Packs

- [x] 3.1 Create locale-specific word pack data (en + it): General, Food, Animals, Places
- [x] 3.2 Create word pack registry and union selection helper
- [x] 3.3 Add unit tests for pack selection and locale filtering

## 4. Impostor UI

- [x] 4.1 Create `ImpostorSetupView` — players, presets, impostor/spy counts, word pack multi-select
- [x] 4.2 Create `ImpostorPlayView` — alive list, eliminate flow, win transition
- [x] 4.3 Create `ImpostorResolveView` — full role reveal, words, winner, rematch/exit
- [x] 4.4 Wire reveal secrets by role (civilian/spy/impostor messages)
- [x] 4.5 Add component tests for setup validation and elimination flow

## 5. Registration & Catalog

- [x] 5.1 Create `src/games/impostor/index.ts` — full `GameDefinition` export
- [x] 5.2 Register Impostor as playable in `src/games/registry.ts`
- [x] 5.3 Update `src/catalog/games.ts` — playable status, minPlayers 3, maxPlayers 20

## 6. Internationalization

- [x] 6.1 Add Impostor i18n keys to `messages/en.json`
- [x] 6.2 Add Impostor i18n keys to `messages/it.json`

## 7. Verification

- [x] 7.1 Run `npm test` and `npm run lint`
- [x] 7.2 Verify static export includes `/en/games/impostor` route
- [x] 7.3 Manual smoke: complete Impostor game end-to-end (setup → reveal → play → eliminate → resolve → rematch)
