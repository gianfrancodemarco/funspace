## 1. Engine and state

- [x] 1.1 Extend `TruthOrDareGameState` with `turnOrder`, `currentTurnIndex`, `skipCountsByPlayerId`; remove `selectedPlayerId` and global `skippedCount`
- [x] 1.2 Remove `showPlayerPicker` from `TruthOrDareConfig`, schema, and presets
- [x] 1.3 Initialize turn order and skip counts in `createGameState` / session init from `session.players`
- [x] 1.4 Add `getCurrentPlayerId`, `advanceTurn`, and integrate turn advance into `advancePrompt` (Next and Skip paths)
- [x] 1.5 Attribute skip to active player in `skipCountsByPlayerId` when Skip is used
- [x] 1.6 Reset turn index and skip counts on rematch; add/update engine unit tests

## 2. Play UI

- [x] 2.1 Replace optional player picker with read-only current-turn banner in `TruthOrDarePlayView`
- [x] 2.2 Show banner during both choosing and showing phases
- [x] 2.3 Remove `selectPlayer` usage and dead code paths

## 3. Setup and resolve

- [x] 3.1 Remove player-picker toggle from `TruthOrDareSetupView` and update preset tooltips
- [x] 3.2 Display per-player skip counts in `TruthOrDareResolveView`
- [x] 3.3 Update setup/play/resolve component tests

## 4. i18n, rules, and docs

- [x] 4.1 Add/update `truthOrDare.play.currentTurn` and `truthOrDare.resolve.skips` in en.json and it.json
- [x] 4.2 Update `truthOrDare.rules` how-to-play steps for enforced turns and skip tracking
- [x] 4.3 Update `docs/games/truth-or-dare-design.md` (flow, config, non-goals)
