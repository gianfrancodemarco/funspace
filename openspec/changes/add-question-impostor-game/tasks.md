## 1. Design reference

- [x] 1.1 Create `docs/games/question-impostor-design.md` — rules, two roles (civilian/impostor), pair authoring guidelines, flow, win conditions
- [x] 1.2 Update `docs/games-roadmap.md` — move Question Impostor to shipped / note as new catalog entry

## 2. Question Impostor engine

- [x] 2.1 Create `src/games/question-impostor/types.ts` and `config.schema.ts` — Zod schema (impostor count only, no spy), validation helpers
- [x] 2.2 Create `presets.ts` — Classic, Two Impostors, Chaos, Custom (no With Spy)
- [x] 2.3 Create `engine/` — assign two roles, pick pair, eliminate, check win, initialize session, assign secrets
- [x] 2.4 Add unit tests for role assignment, pair pick, win detection, and config validation

## 3. Question packs

- [x] 3.1 Author locale-specific pairs (en + it): minimum 4 packs, ~8–12 pairs each with `answerType` and optional reference answers
- [x] 3.2 Create question pack registry and union selection helper
- [x] 3.3 Add unit tests for pack selection and locale filtering

## 4. Question Impostor UI

- [x] 4.1 Create `QuestionImpostorSetupView` — players, presets, impostor count only, pack multi-select, rules link
- [x] 4.2 Create `QuestionImpostorPlayView` — alive list, eliminate flow, win transition
- [x] 4.3 Create `QuestionImpostorResolveView` — roles, both questions, reference answers toggle, rematch/exit
- [x] 4.4 Wire reveal secrets by role (civilian crew question / impostor question + answer-type hint)
- [x] 4.5 Add component tests for setup validation and elimination flow

## 5. Registration & catalog

- [x] 5.1 Create `src/games/question-impostor/index.ts` — full `GameDefinition` export (`rulesRoleKeys`: civilian, impostor only)
- [x] 5.2 Register Question Impostor as playable in `src/games/registry.ts`
- [x] 5.3 Update `src/catalog/games.ts` — playable status, minPlayers 3, maxPlayers 20, accent color
- [x] 5.4 Add theme/accent token for Question Impostor card if required by catalog UI

## 6. Internationalization & rules

- [x] 6.1 Add Question Impostor i18n keys to `src/messages/en.json`
- [x] 6.2 Add Question Impostor i18n keys to `src/messages/it.json`
- [x] 6.3 Add `questionImpostor.rules` content (civilian and impostor roles only) in both locales

## 7. Verification

- [x] 7.1 Run `npm test` and `npm run lint`
- [x] 7.2 Verify static export includes `/en/games/question-impostor` route
- [x] 7.3 Manual smoke: setup → reveal (civilian + impostor) → play → eliminate → resolve → rematch
