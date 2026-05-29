## 1. Design reference

- [x] 1.1 Create `docs/games/never-have-i-ever-design.md` with rules summary, flow, prompt packs, config, and platform integration

## 2. Engine and prompt decks

- [x] 2.1 Create `src/games/never-have-i-ever/types.ts` and `config.schema.ts` (Zod validation for prompt pack selection)
- [x] 2.2 Create `src/games/never-have-i-ever/presets.ts` — Icebreaker, Mixed, and All ages presets
- [x] 2.3 Create `src/games/never-have-i-ever/engine/` — `buildDeck`, `shuffleDeck`, `createGameState`, `nextPrompt`, `skipPrompt`, deck exhaustion
- [x] 2.4 Create locale prompt decks under `src/games/never-have-i-ever/prompt-decks/{en,it}/` — Classic, Travel, Food & Fun, Spicy (30+ prompts each)
- [x] 2.5 Add engine unit tests for shuffle, next/skip, no-repeat, and deck exhaustion

## 3. UI components

- [x] 3.1 Create `NeverHaveIEverSetupView.tsx` — players, presets, pack multi-select, Spicy 18+ confirmation (pattern from Hangman)
- [x] 3.2 Create `NeverHaveIEverPlayView.tsx` — prompt card, progress, Next/Skip/End session; PATCH_SECRETS on navigation
- [x] 3.3 Create `NeverHaveIEverResolveView.tsx` — session summary, `GameEndAnimation variant="win"`, rematch/exit
- [x] 3.4 Create `src/games/never-have-i-ever/index.ts` — game definition, assignSecrets, register views

## 4. Registry and catalog

- [x] 4.1 Register playable Never Have I Ever in `src/games/registry.ts` (remove coming-soon entry)
- [x] 4.2 Update `src/catalog/games.ts` — `status: "playable"` for Never Have I Ever

## 5. i18n

- [x] 5.1 Add `neverHaveIEver.setup`, `neverHaveIEver.play`, `neverHaveIEver.resolve`, `neverHaveIEver.packs` keys to `en.json`
- [x] 5.2 Add matching Italian translations to `it.json`
- [x] 5.3 Add `neverHaveIEver.rules` namespace (goal, roles: group/reader, steps, session end) in en + it

## 6. Game rules registration

- [x] 6.1 Set `rulesKeyPrefix`, `rulesRoleKeys`, and `rulesStepCount` on Never Have I Ever definition

## 7. Tests and verification

- [x] 7.1 Add component tests for NeverHaveIEverSetupView validation (player count, pack selection, Spicy confirmation)
- [x] 7.2 Add component tests for NeverHaveIEverPlayView prompt navigation and end session
- [x] 7.3 Add test that Never Have I Ever definition skips reveal phase (`phases` without `reveal`)
- [x] 7.4 Run `npm test` and `npm run build` — all pass
