## 1. Game definition contract

- [x] 1.1 Add optional `rulesKeyPrefix?: string` to `GameDefinition` in `src/core/game-shell/types.ts`
- [x] 1.2 Export any helper types needed by the rules components from `src/core/game-shell/index.ts`

## 2. Shared rules UI

- [x] 2.1 Create `src/components/game-rules/GameRulesPanel.tsx` — renders goal, roles, how-to-play steps, and win conditions from a `rulesKeyPrefix`
- [x] 2.2 Create `src/components/game-rules/GameRulesTrigger.tsx` — "How to play" button that opens a scrollable Dialog containing `GameRulesPanel`
- [x] 2.3 Add `src/components/game-rules/index.ts` barrel export

## 3. Shell integration

- [x] 3.1 Render `GameRulesTrigger` in `GamePageClient` during setup when `game.rulesKeyPrefix` is set (above setup form content)
- [x] 3.2 Verify rules trigger is hidden during reveal, play, and resolve phases

## 4. i18n — shared chrome

- [x] 4.1 Add `gameRules` keys to `src/messages/en.json` (trigger label, dialog close, optional shared section labels if used)
- [x] 4.2 Add matching `gameRules` keys to `src/messages/it.json`

## 5. i18n — Impostor rules content

- [x] 5.1 Add `impostor.rules` namespace to `en.json`: title, goal, roles (civilian/impostor/spy), numbered how-to-play steps, win conditions
- [x] 5.2 Add matching `impostor.rules` namespace to `it.json` with Italian translations
- [x] 5.3 Derive copy from `docs/games/impostor-design.md`; keep language plain and scannable

## 6. Impostor registration

- [x] 6.1 Set `rulesKeyPrefix: "impostor.rules"` on `impostorDefinition` in `src/games/impostor/index.ts`

## 7. Tests and verification

- [x] 7.1 Add unit test for `GameRulesPanel` (renders all four sections when keys exist)
- [x] 7.2 Add test or smoke check that Impostor setup shows the rules trigger
- [x] 7.3 Run `npm test` and `npm run build` — all pass
