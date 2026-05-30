## 1. Design reference

- [x] 1.1 Create `docs/games/would-you-rather-design.md` with rules summary, flow, dilemma packs, config, and platform integration

## 2. Engine and dilemma decks

- [x] 2.1 Create `src/games/would-you-rather/types.ts` and `config.schema.ts` (Zod validation for pack selection)
- [x] 2.2 Create `src/games/would-you-rather/presets.ts` — Classic, Party mix, All ages, Custom
- [x] 2.3 Create `src/games/would-you-rather/engine/` — `buildDeck`, `shuffleDeck`, `createGameState`, `advanceDilemma`, deck exhaustion
- [x] 2.4 Create locale dilemma decks under `src/games/would-you-rather/dilemma-decks/{en,it}/` — Classic, Gross, Hypothetical, Spicy (25+ dilemmas each)
- [x] 2.5 Add engine unit tests for deck building, next/skip, no-repeat, and deck exhaustion

## 3. UI components

- [x] 3.1 Create `WouldYouRatherSetupView.tsx` — players, presets, pack multi-select, Spicy 18+ confirmation
- [x] 3.2 Create `WouldYouRatherPlayView.tsx` — A vs B dilemma card, progress, Next/Skip/End session; PATCH_SECRETS on navigation
- [x] 3.3 Create `WouldYouRatherResolveView.tsx` — dilemmas played summary, `GameEndAnimation variant="win"`, rematch/exit
- [x] 3.4 Create `src/games/would-you-rather/index.ts` — game definition, assignSecrets, register views

## 4. Registry and catalog

- [x] 4.1 Register playable Would You Rather in `src/games/registry.ts`
- [x] 4.2 Add catalog entry to `src/catalog/games.ts` with `status: "playable"`, tags, accent color
- [x] 4.3 Add `would-you-rather` accent token to `src/catalog/types.ts` and `src/lib/game-accents.ts`

## 5. i18n

- [x] 5.1 Add `wouldYouRather.setup`, `wouldYouRather.play`, `wouldYouRather.resolve`, `wouldYouRather.packs` keys to `en.json`
- [x] 5.2 Add matching Italian translations to `it.json`
- [x] 5.3 Add `wouldYouRather.rules` namespace (goal, roles, steps, session end) in en + it
- [x] 5.4 Add `games.wouldYouRather.name` and `games.wouldYouRather.description` catalog keys in en + it

## 6. Game rules registration

- [x] 6.1 Set `rulesKeyPrefix`, `rulesRoleKeys`, and `rulesStepCount` on Would You Rather definition

## 7. Tests and verification

- [x] 7.1 Add component tests for WouldYouRatherSetupView (player count, pack selection, Spicy confirmation)
- [x] 7.2 Add component tests for WouldYouRatherPlayView — dilemma display, next/skip, end session
- [x] 7.3 Add test that definition skips reveal phase
- [x] 7.4 Run `npm test` and `npm run build` — all pass

## 8. Roadmap

- [x] 8.1 Update `docs/games-roadmap.md` — move Would You Rather to Shipped section
