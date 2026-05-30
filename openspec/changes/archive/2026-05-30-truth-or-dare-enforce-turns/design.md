## Context

Truth or Dare v1 deliberately deferred enforced turn rotation — the optional player picker was a visual hint only (`showPlayerPicker` toggle), and `skippedCount` was a single session-wide counter. The group decided verbally who answered each prompt.

Users now want the app to **moderate turns** (round-robin) and **track skips per player** so dodging prompts is visible at session end. Physical completion of truths/dares remains honor-system at the table.

Reference: [`docs/games/truth-or-dare-design.md`](../../../docs/games/truth-or-dare-design.md)

## Goals / Non-Goals

**Goals:**

- Round-robin turn order across session players for every turn (choice step + prompt step)
- Highlight the active player prominently in play UI — not manually selectable
- Increment per-player skip count when Skip is tapped on that player's turn
- Show per-player skip counts on resolve
- Preserve existing prompt modes, deck logic, next/skip/end-session, and rematch behavior

**Non-Goals:**

- Enforcing that the active player physically completes the truth/dare
- Tracking truths/dares completed per player (only skips)
- Re-ordering turns when a player is "skipped" (skip still advances rotation normally)
- Persisting turn stats across sessions
- Multi-device or pass-the-phone private flow

## Decisions

### 1. Turn order at session start

At `createGameState` / session init, build `turnOrder: string[]` from session player IDs in **roster selection order** (same order as `session.players`).

**Alternative considered:** Shuffle turn order at start — fairer but adds setup complexity; can be a follow-up preset option.

**Rationale:** Predictable, matches how players were picked in setup; easy to explain.

### 2. State shape changes

Extend `TruthOrDareGameState`:

```typescript
type TruthOrDareGameState = {
  // ...existing deck/progress fields...
  turnOrder: string[];           // player IDs in rotation order
  currentTurnIndex: number;      // index into turnOrder (0-based)
  skipCountsByPlayerId: Record<string, number>;  // per-player skips
  // REMOVE: selectedPlayerId, skippedCount (global)
};
```

Remove `showPlayerPicker` from `TruthOrDareConfig` — turns always shown.

Initialize `skipCountsByPlayerId` with `0` for every player in `turnOrder`.

### 3. Turn advancement rules

Helper: `getCurrentPlayerId(state) => turnOrder[currentTurnIndex]`

On **Next** (prompt played):
1. Run existing `advancePrompt` deck logic (increment truth/dare index, etc.)
2. Call `advanceTurn(state)` — increment `currentTurnIndex` modulo `turnOrder.length`
3. Clear `currentType` / set `turnPhase` via existing `beginNextTurn`

On **Skip**:
1. Run `advancePrompt(state, { skipped: true })`
2. Increment `skipCountsByPlayerId[currentPlayerId]`
3. Call `advanceTurn(state)`

On **choosePromptType** (both mode): turn does **not** advance — same player chooses then sees prompt.

Turn advances once per completed turn (after Next or Skip), not after Truth/Dare choice alone.

### 4. Play UI — current player banner

Replace optional tap-to-select picker with a read-only banner:

```
┌─────────────────────────────┐
│  Alex's turn                │  ← primary tint, always visible
└─────────────────────────────┘
```

Use `session.players` to resolve name from `getCurrentPlayerId(state)`. No click handler.

Show banner during both **choosing** and **showing** phases.

### 5. Resolve UI — per-player skips

Replace plain name list with rows showing skip count:

```
Alex          2 skips
Jordan        0 skips
Sam           1 skip
```

Only show skip line when count > 0, or always show `0 skips` for clarity — **always show** for consistency.

Keep existing truths/dares session summary headline.

### 6. Rematch behavior

Rematch resets `skipCountsByPlayerId` to zeros, rebuilds decks, resets `currentTurnIndex` to `0`, keeps same `turnOrder` (player roster unchanged).

### 7. Rules and design doc updates

Update `truthOrDare.rules` to explain round-robin turns and skip tracking. Update `docs/games/truth-or-dare-design.md` sections 3–4.

## Risks / Trade-offs

- **[Risk] Groups that ignored turn order may resist enforcement** → Copy clarifies app moderates rotation; table still decides completion
- **[Risk] Breaking config field `showPlayerPicker`** → Remove from schema; presets updated; no persisted sessions in v1
- **[Trade-off] Roster order vs shuffle** → Simpler v1; shuffle can be added later
- **[Trade-off] Skip still consumes prompt** → Unchanged from v1; skip means "pass this prompt" for current player

## Migration Plan

1. Extend types and engine (turn init, advance, skip attribution)
2. Update play UI banner and resolve skip display
3. Remove setup toggle; update presets
4. i18n + rules + design doc
5. Update tests

Rollback: revert engine state shape and UI; restore optional picker.

## Open Questions

- None blocking — roster-order rotation and always-visible skip counts are the default design.
