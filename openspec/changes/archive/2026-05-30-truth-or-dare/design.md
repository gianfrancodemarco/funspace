## Context

FunSpace ships four playable games: Impostor, Hangman, Never Have I Ever, and Question Impostor. Truth or Dare is the next P0 social prompt game from the [games roadmap](../../../docs/games-roadmap.md) — named in product vision, same shell shape as NHIE, but with a **binary choice per turn** (Truth or Dare) and **separate Truth and Dare content pools**.

The phone is the moderator: the app surfaces prompts; the group decides verbally who answers or acts. No per-player secrets, no reveal phase, no app-tracked scoring.

Reference: [`docs/games/truth-or-dare-design.md`](../../../docs/games/truth-or-dare-design.md) (to be created during implementation).

## Goals / Non-Goals

**Goals:**

- Playable Truth or Dare at `/[locale]/games/truth-or-dare` using the shared game shell
- Shared-screen prompt facilitator — no reveal phase
- Locale-specific Truth and Dare decks (en + it) with themed packs (Classic, Silly, Spicy 18+)
- Setup: player roster (3–20), pack multi-select, presets, prompt mode (both / truth only / dare only / random), optional player-picker toggle
- Play: per-turn Truth/Dare choice when mode allows, one prompt at a time, shuffled without repeats per deck type, next/skip/end-session, progress counter
- Resolve: session summary (truths and dares played), rematch, exit; win end animation on session complete
- In-app rules via `truthOrDare.rules` on `GameDefinition`
- Homepage catalog entry marked playable
- Design doc in `docs/games/truth-or-dare-design.md`

**Non-Goals:**

- In-app enforcement of completing truths/dares (physical play at the table)
- Scoring, leaderboards, or session history persistence
- User-authored custom prompts
- Multi-device play
- Persisting in-progress session to localStorage
- Timed dares or countdown UI
- Hybrid NHIE / Truth-or-Dare modes

## Decisions

### 1. Shell phases without reveal

```typescript
phases: ["play", "resolve"] as const
```

Shell transitions `setup → play → resolve` — same pattern as NHIE and Hangman.

**Why:** No private information; shared screen from the start.

### 2. App as prompt moderator, not referee

The app displays prompts and optional player names. The group decides who performs each truth or dare in person. The app does not verify completion.

**Alternative considered:** Per-player turn rotation enforced by the app — deferred; optional player picker is a hint, not enforced rotation.

### 3. Separate Truth and Dare pools per pack

Each prompt pack contains **both** truths and dares as separate arrays:

```typescript
type TruthOrDarePack = {
  id: string;
  nameKey: string;
  isAdult: boolean;
  truths: string[];
  dares: string[];
};
```

At game start, `buildDecks(packIds, locale)` merges truths from selected packs into one truth pool and dares into one dare pool, dedupes, and shuffles each independently.

**Why:** Matches real Truth or Dare content structure; allows truth-only and dare-only modes without filtering a unified deck.

**Alternative considered:** Single unified deck with a `type` field — rejected; harder to balance pool sizes and mode filtering.

### 4. Prompt mode configuration

```typescript
type PromptMode = "both" | "truth_only" | "dare_only" | "random";

TruthOrDareConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
  promptMode: z.enum(["both", "truth_only", "dare_only", "random"]),
  showPlayerPicker: z.boolean(),
  locale: z.string().min(2),
});
```

| Mode | Play UX |
|------|---------|
| `both` | Each turn: Truth / Dare buttons, then prompt |
| `truth_only` | Prompt drawn directly from truth deck |
| `dare_only` | Prompt drawn directly from dare deck |
| `random` | App picks truth or dare at random each turn, then shows prompt |

**Why:** Covers classic free-choice and party variants (dares-only night, random spinner).

### 5. Engine as pure functions + React state in PlayView

Core logic in `src/games/truth-or-dare/engine/`:

- `buildDecks(packIds, locale)` — merge and shuffle truth and dare pools separately
- `createGameState(config, truthDeck, dareDeck)` — initial indices, counts, status
- `choosePromptType(state, type)` — set current type when user picks Truth/Dare (both mode)
- `pickRandomType(state)` — pick truth or dare for random mode
- `advancePrompt(state, opts?)` — draw next prompt from active deck, handle skip
- `isSessionExhausted(state)` — both selected decks exhausted for current mode
- `endSession(state)` — mark complete

PlayView holds state locally; on end session or deck exhaustion calls `onComplete()` to enter resolve.

**Why:** Mirrors NHIE engine pattern; linear turn flow with one extra choice step.

### 6. Deck exhaustion rules

- **both / random:** Session ends when **both** truth and dare pools are exhausted (user can still end early)
- **truth_only:** Ends when truth pool exhausted
- **dare_only:** Ends when dare pool exhausted

Skip advances the deck without counting as "played" but consumes the prompt (same as NHIE).

### 7. Optional player picker

When `showPlayerPicker: true`, play UI shows a "Who's up?" row with player names from the roster. Tapping a name highlights them for the current turn; the group uses it as a visual cue. No enforced rotation — next turn resets selection.

**Why:** Roadmap differentiator vs NHIE; low-cost UX addition without turn-order infrastructure.

**Alternative considered:** Automatic round-robin — rejected for v1; needs active-player infrastructure not yet standardized.

### 8. Pack content and 18+ gating

Three packs per locale:

| Pack | Content | Adult flag |
|------|---------|------------|
| Classic | Safe icebreakers | No |
| Silly | Funny, low-stakes | No |
| Spicy | Edgier truths and dares | Yes (18+) |

Minimum ~25 truths and ~25 dares per pack for v1. Spicy deselected by default with confirmation on opt-in (same pattern as NHIE).

Presets:

| Preset | Packs | Mode |
|--------|-------|------|
| Classic | Classic only | both |
| Silly night | Classic + Silly | both |
| Dares only | Classic + Silly | dare_only |
| All ages | All non-adult | both |

Custom exposes full pack checkboxes and mode/picker toggles.

### 9. Play and resolve views

- `TruthOrDareSetupView` — players, presets, pack checkboxes, mode selector, player-picker toggle, Spicy confirmation
- `TruthOrDarePlayView` — optional player picker, Truth/Dare choice (when applicable), large prompt card with type badge, progress, Next/Skip/End session
- `TruthOrDareResolveView` — session complete headline, truths played + dares played counts, rematch/exit, `GameEndAnimation variant="win"`

Session secrets shape:

```typescript
type TruthOrDareSessionSecrets = {
  config: TruthOrDareConfig;
  truthDeck: string[];
  dareDeck: string[];
  truthIndex: number;
  dareIndex: number;
  truthsPlayed: number;
  daresPlayed: number;
  skippedCount: number;
  status: "choosing" | "showing" | "complete";
  currentType?: "truth" | "dare";
  selectedPlayerId?: string;
};
```

### 10. Game rules registration

```typescript
rulesKeyPrefix: "truthOrDare.rules",
rulesRoleKeys: ["group", "player"],
rulesStepCount: 5,
```

Rules explain verbal play, truth vs dare choice, optional player picker, and that there is no app-tracked winner.

### 11. Catalog and theme

- `id`: `truth-or-dare`
- `minPlayers`: 3, `maxPlayers`: 20
- `accentColor`: new token `truth-or-dare` (distinct warm accent)
- `tags`: `["social", "quick"]`
- i18n namespace: `truthOrDare.*`, catalog keys under `games.truthOrDare.*`

### 12. Design documentation

Create `docs/games/truth-or-dare-design.md` following `never-have-i-ever-design.md` structure: summary, player limits, flow, packs, config, shell integration, and i18n notes.

## Risks / Trade-offs

- **[Risk] Dare content too physical for shared phone context** → v1 dares are verbal/social (sing, call someone, tell a secret) not dangerous; Spicy gated behind opt-in
- **[Risk] Truth and dare pool imbalance in random mode** → Random picks from non-exhausted pool only; if one pool empty, auto-picks from the other
- **[Risk] Player picker without enforced rotation confuses groups** → Rules clarify it's optional; group decides who goes
- **[Trade-off] No shared prompt-deck abstraction with NHIE** → Duplicate engine code acceptable for v1; extract factory if Would You Rather / Most Likely To ship next
- **[Trade-off] Hand-authored prompts only** → Faster v1; user-generated content deferred

## Migration Plan

1. Add `src/games/truth-or-dare/` module and `docs/games/truth-or-dare-design.md`
2. Register playable definition; add catalog entry
3. Add i18n keys, accent color token, and rules content
4. No data migration; new route at `/[locale]/games/truth-or-dare`

Rollback: remove registry/catalog entry and module.

## Open Questions

- **Italian dare phrasing:** Imperative vs infinitive (*Canta una canzone* vs *Cantare una canzone*) — pick one convention during content authoring
- **Auto-end when one deck exhausted in both mode:** Continue with remaining deck only (recommended) vs end session — implement continue-with-remaining
- **Progress display:** Show combined count or separate truth/dare counts — show both in footer (e.g. "5 truths · 3 dares")
