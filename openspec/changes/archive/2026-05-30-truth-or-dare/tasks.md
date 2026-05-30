## 1. Design reference

- [x] 1.1 Create `docs/games/truth-or-dare-design.md` with rules summary, flow, truth/dare packs, config, and platform integration

## 2. Engine and prompt decks

- [x] 2.1 Create `src/games/truth-or-dare/types.ts` and `config.schema.ts` (Zod validation for pack selection, prompt mode, player picker toggle)
- [x] 2.2 Create `src/games/truth-or-dare/presets.ts` — Classic, Silly night, Dares only, and All ages presets
- [x] 2.3 Create `src/games/truth-or-dare/engine/` — `buildDecks`, `shuffleDeck`, `createGameState`, `choosePromptType`, `pickRandomType`, `advancePrompt`, deck exhaustion per mode
- [x] 2.4 Create locale prompt decks under `src/games/truth-or-dare/prompt-decks/{en,it}/` — Classic, Silly, Spicy (25+ truths and 25+ dares each)
- [x] 2.5 Add engine unit tests for deck building, mode filtering, next/skip, no-repeat, random mode pool fallback, and deck exhaustion

## 3. UI components

- [x] 3.1 Create `TruthOrDareSetupView.tsx` — players, presets, pack multi-select, prompt mode selector, player-picker toggle, Spicy 18+ confirmation
- [x] 3.2 Create `TruthOrDarePlayView.tsx` — optional player picker, Truth/Dare choice (both mode), prompt card with type badge, progress, Next/Skip/End session; PATCH_SECRETS on navigation
- [x] 3.3 Create `TruthOrDareResolveView.tsx` — session summary (truths + dares played), `GameEndAnimation variant="win"`, rematch/exit
- [x] 3.4 Create `src/games/truth-or-dare/index.ts` — game definition, assignSecrets, register views

## 4. Registry and catalog

- [x] 4.1 Register playable Truth or Dare in `src/games/registry.ts`
- [x] 4.2 Add Truth or Dare entry to `src/catalog/games.ts` with `status: "playable"`, tags, and accent color token

## 5. i18n

- [x] 5.1 Add `truthOrDare.setup`, `truthOrDare.play`, `truthOrDare.resolve`, `truthOrDare.packs`, `truthOrDare.modes` keys to `en.json`
- [x] 5.2 Add matching Italian translations to `it.json`
- [x] 5.3 Add `truthOrDare.rules` namespace (goal, roles: group/player, steps, session end) in en + it
- [x] 5.4 Add `games.truthOrDare.name` and `games.truthOrDare.description` catalog keys in en + it

## 6. Game rules registration

- [x] 6.1 Set `rulesKeyPrefix`, `rulesRoleKeys`, and `rulesStepCount` on Truth or Dare definition

## 7. Tests and verification

- [x] 7.1 Add component tests for TruthOrDareSetupView validation (player count, pack selection, mode selection, Spicy confirmation)
- [x] 7.2 Add component tests for TruthOrDarePlayView — Truth/Dare choice, prompt navigation, random mode, end session
- [x] 7.3 Add test that Truth or Dare definition skips reveal phase (`phases` without `reveal`)
- [x] 7.4 Run `npm test` and `npm run build` — all pass
