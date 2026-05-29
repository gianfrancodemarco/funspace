## Context

FunSpace has playable Impostor (pass-the-phone reveal) and Hangman (cooperative shared screen). Never Have I Ever is the third homepage card — currently a coming-soon placeholder (`3–20 players`, `#social` `#quick`). Product vision targets it as a **social prompt game** where the phone is the moderator, not the whole game: the app surfaces prompts; players respond verbally at the table.

Never Have I Ever has no per-player secrets and no strict win condition in the traditional party format — groups play until they choose to stop or the deck runs out. The digital version should facilitate prompt delivery, not replace physical finger/drink mechanics.

Reference: [`docs/games/never-have-i-ever-design.md`](../../../docs/games/never-have-i-ever-design.md) (to be created during implementation).

## Goals / Non-Goals

**Goals:**

- Playable Never Have I Ever at `/[locale]/games/never-have-i-ever` using the shared game shell
- Shared-screen prompt facilitator — no reveal phase
- Locale-specific prompt decks (en + it) with multi-select packs (Classic, Travel, Food & Fun, Spicy 18+)
- Setup: player roster (3–20), prompt packs, preset defaults
- Play: one prompt at a time, shuffled without repeats, next/skip/end-session, progress counter
- Resolve: session summary, rematch, exit; win end animation on session complete
- In-app rules via `neverHaveIEver.rules` on `GameDefinition`
- Homepage card marked playable
- Design doc in `docs/games/never-have-i-ever-design.md`

**Non-Goals:**

- In-app finger/life tracking per player (physical play at the table)
- Scoring, leaderboards, or session history persistence
- User-authored custom prompts
- Multi-device play
- Persisting in-progress session to localStorage
- Truth or Dare hybrid or other prompt formats

## Decisions

### 1. Shell phases without reveal

```typescript
phases: ["play", "resolve"] as const
```

Shell transitions `setup → play → resolve` — same pattern as Hangman.

**Why:** No private information; shared screen from the start.

### 2. App as prompt moderator, not referee

The app displays prompts. Players who have done the thing respond in person (put a finger down, take a sip, etc.). The app does not track individual player state.

**Alternative considered:** Digital finger counter per player — rejected for v1; adds per-player UI complexity without matching the quick social use case and distracts from conversation.

### 3. Prompt engine as pure functions + React state in PlayView

Core logic in `src/games/never-have-i-ever/engine/`:

- `buildDeck(packIds, locale)` — merge prompts from selected packs, dedupe
- `shuffleDeck(prompts)` — Fisher–Yates shuffle
- `createGameState(deck)` — index, played count, remaining deck
- `nextPrompt(state)` / `skipPrompt(state)` — advance index, mark skipped if needed
- `isDeckExhausted(state)` — triggers auto-resolve

PlayView holds state locally; on end session or deck exhausted calls `onComplete()` to enter resolve.

**Why:** Linear prompt flow; matches Hangman engine pattern.

### 4. Prompt lists as static locale data

```typescript
// src/games/never-have-i-ever/prompt-decks/en/classic.ts
export const classicDeckEn = {
  id: "classic",
  nameKey: "neverHaveIEver.packs.classic",
  isAdult: false,
  prompts: [
    "Never have I ever been skydiving.",
    ...
  ],
};
```

Four packs per locale:

| Pack | Content | Adult flag |
|------|---------|------------|
| Classic | Safe icebreakers | No |
| Travel | Trips, adventure | No |
| Food & Fun | Food, hobbies, silly | No |
| Spicy | Edgier prompts | Yes (18+) |

Minimum ~30 prompts per pack for v1. Prompts stored as full sentences including "Never have I ever…" prefix for consistent display.

**Why:** Mirrors Hangman/Impostor pack pattern; adult flag enables setup gating.

### 5. Spicy 18+ pack opt-in

Spicy pack is **deselected by default**. Selecting it shows a brief confirmation in setup (i18n copy). If user deselects all non-adult packs and only Spicy remains, start is allowed after confirmation.

**Why:** Product vision open question on 18+ content — explicit opt-in is safer for a public web app.

### 6. Config validation with Zod

```typescript
NeverHaveIEverConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
});
```

Presets map to default pack selections:

| Preset | Packs |
|--------|-------|
| Icebreaker | Classic only |
| Mixed | Classic + Travel + Food & Fun |
| All ages | All non-adult packs |

Custom exposes full pack checkboxes.

### 7. Play and resolve views

- `NeverHaveIEverSetupView` — player multi-select + preset picker + pack checkboxes (pattern from Hangman setup)
- `NeverHaveIEverPlayView` — large prompt card, progress (e.g. "12 / 45"), Next, Skip, End session
- `NeverHaveIEverResolveView` — session complete headline, prompts played count, rematch/exit, `GameEndAnimation variant="win"`

`assignSecrets` stores session state:

```typescript
type NeverHaveIEverSessionSecrets = {
  config: NeverHaveIEverConfig;
  deck: string[];           // shuffled prompt IDs or text
  currentIndex: number;
  promptsPlayed: number;
  skippedCount: number;
  status: "playing" | "complete";
};
```

PlayView updates via `PATCH_SECRETS` on each next/skip; calls `PLAY_DONE` when user ends session or deck is exhausted.

### 8. Game rules registration

```typescript
rulesKeyPrefix: "neverHaveIEver.rules",
rulesRoleKeys: ["group", "reader"],
rulesStepCount: 4,
```

Rules explain verbal response (fingers/drinks), reader role, and that there is no app-tracked winner.

### 9. Design documentation

Create `docs/games/never-have-i-ever-design.md` following the structure of `hangman-design.md` and `impostor-design.md`: summary, player limits, flow, packs, config, shell integration, and i18n notes.

## Risks / Trade-offs

- **[Risk] Prompt content too bland or too edgy** → Curate v1 decks conservatively; Spicy gated behind opt-in; document expansion path
- **[Risk] Small deck feels repetitive** → 30+ prompts per pack; shuffle without repeat until exhausted
- **[Risk] No digital win condition feels incomplete** → Resolve celebrates session complete; rules set expectations that the group decides when to stop
- **[Trade-off] No per-player tracking** → Simpler UX; finger tracking is a follow-up if requested
- **[Trade-off] Hand-authored prompts only** → Faster v1; user-generated content deferred

## Migration Plan

1. Add `src/games/never-have-i-ever/` module and `docs/games/never-have-i-ever-design.md`
2. Register playable definition; update catalog status
3. Add i18n keys and rules content
4. No data migration; route replaces coming-soon placeholder

Rollback: revert registry/catalog to coming-soon; remove module.

## Open Questions

- **Italian prompt tone:** Match English pack themes; native phrasing review during translation (e.g. *Non ho mai…*).
- **Auto-end on deck exhaustion:** Default to auto-resolve when last prompt is shown — confirm during implementation (recommended: yes, with option to rematch).
