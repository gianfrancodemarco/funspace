## 1. Design reference

- [x] 1.1 Create `docs/games/hangman-design.md` with rules summary, flow, config, and platform integration

## 2. Engine and word lists

- [x] 2.1 Create `src/games/hangman/types.ts` and `config.schema.ts` (Zod validation for word packs + max wrong guesses)
- [x] 2.2 Create `src/games/hangman/presets.ts` — Classic (6) and Forgiving (8) presets
- [x] 2.3 Create `src/games/hangman/engine/` — `pickWord`, `createGameState`, `guessLetter`, win/loss detection
- [x] 2.4 Create locale word lists under `src/games/hangman/word-lists/{en,it}/` — General, Food, Animals, Places (50+ words each)
- [x] 2.5 Add engine unit tests for guessing, win, loss, and duplicate-letter handling

## 3. UI components

- [x] 3.1 Create `HangmanFigure.tsx` — SVG drawing with stages 0…maxWrongGuesses
- [x] 3.2 Create `HangmanSetupView.tsx` — players, presets, word pack multi-select (pattern from Impostor)
- [x] 3.3 Create `HangmanPlayView.tsx` — masked word, A–Z letter grid, figure, wrong-count; PATCH_SECRETS on guess
- [x] 3.4 Create `HangmanResolveView.tsx` — win/loss message, revealed word, rematch/exit
- [x] 3.5 Create `src/games/hangman/index.ts` — game definition, assignSecrets, register views

## 4. Registry and catalog

- [x] 4.1 Register playable Hangman in `src/games/registry.ts` (remove coming-soon entry)
- [x] 4.2 Update `src/catalog/games.ts` — `status: "playable"` for Hangman

## 5. i18n

- [x] 5.1 Add `hangman.setup`, `hangman.play`, `hangman.resolve`, `hangman.packs` keys to `en.json`
- [x] 5.2 Add matching Italian translations to `it.json`
- [x] 5.3 Add `hangman.rules` namespace (goal, roles: group/phone, 4 steps, win conditions) in en + it

## 6. Game rules registration

- [x] 6.1 Set `rulesKeyPrefix`, `rulesRoleKeys`, and `rulesStepCount` on hangman definition

## 7. Tests and verification

- [x] 7.1 Add component tests for HangmanSetupView validation and HangmanPlayView letter guessing
- [x] 7.2 Add test that hangman definition skips reveal phase (`phases` without `reveal`)
- [x] 7.3 Run `npm test` and `npm run build` — all pass
