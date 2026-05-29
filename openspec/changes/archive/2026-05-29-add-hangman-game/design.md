## Context

FunSpace has a playable Impostor game with pass-the-phone reveal, word packs, and in-app rules. Hangman is the next catalog entry — currently a coming-soon placeholder (`2–8 players`, `#words` `#quick`). Product vision targets Hangman as the first **shared-screen** game to prove the shell works without private reveal phases.

Hangman on one phone works best as **cooperative group play**: the app picks a secret word, everyone discusses aloud, and one person taps guessed letters on the shared device. No player needs private information.

Reference: [`docs/games/hangman-design.md`](../../../docs/games/hangman-design.md) (to be created during implementation).

## Goals / Non-Goals

**Goals:**

- Playable Hangman at `/[locale]/games/hangman` using the shared game shell
- Cooperative gameplay on a single shared screen — no reveal phase
- Locale-specific word lists (en + it) with multi-select packs (General, Food, Animals, Places)
- Setup: player roster (2–8), word packs, max-wrong-guesses preset (Classic: 6, Forgiving: 8)
- Play: word blanks, A–Z letter grid, hangman drawing, win/lose detection
- Resolve: reveal word, outcome message, rematch
- In-app rules via `hangman.rules` on `GameDefinition`
- Homepage Hangman card marked playable

**Non-Goals:**

- Competitive turn-based hangman (individual wrong-guess budgets per player)
- Custom word entry by players
- Host-only word peek / private reveal for a word-setter
- Timer, scoring, or session history
- Impostor + Hangman hybrid variant
- Multi-device play
- Persisting in-progress game to localStorage

## Decisions

### 1. Shell phases without reveal

```typescript
phases: ["play", "resolve"] as const
```

Shell transitions `setup → play → resolve` using existing `getPhaseAfterSetup` logic (skips reveal when absent).

**Why:** Hangman has no per-player secrets; shared screen from the start.

### 2. Cooperative group guessing

The app selects a random word. All selected players are "in the session" for rematch/roster consistency, but gameplay is one shared letter-guess pool. Wrong guesses increment a shared counter toward the configured maximum.

**Alternative considered:** Turn-based competitive hangman — rejected for v1; adds turn order UX without matching the quick party use case.

### 3. Hangman engine as pure functions + React state in PlayView

Core logic in `src/games/hangman/engine/`:

- `pickWord(packIds, locale)` — random word from selected packs
- `createGameState(word, maxWrongGuesses)` — initial guessed letters set, wrong count
- `guessLetter(state, letter)` — returns updated state + `{ kind: "continue" | "won" | "lost" }`
- `getDisplayWord(word, guessedLetters)` — masked word for UI

PlayView holds state locally; on win/loss calls `onComplete()` to enter resolve. Rematch reuses last config via shell.

**Why:** Simpler than nested XState for linear guess flow; matches shell demo pattern.

### 4. Word lists as static locale data

```typescript
// src/games/hangman/word-lists/en/general.ts
export const generalListEn = {
  id: "general",
  nameKey: "hangman.packs.general",
  words: ["apple", "bridge", ...],
};
```

Four packs per locale (General, Food, Animals, Places). Words are lowercase a–z only (no spaces/hyphens in v1) for reliable blank rendering. Minimum ~50 words per pack for v1; expand later like Impostor.

Build/validate scripts optional for v1 — can start with hand-authored lists and add validation script in a follow-up.

**Why:** Mirrors Impostor word-pack pattern; reuses category names players already know.

### 5. Config validation with Zod

```typescript
HangmanConfigSchema = z.object({
  wordPackIds: z.array(z.string()).min(1),
  maxWrongGuesses: z.number().int().min(4).max(10),
});
```

Presets map to `maxWrongGuesses`:

| Preset | Max wrong |
|--------|-----------|
| Classic | 6 |
| Forgiving | 8 |

Custom exposes full slider/stepper.

### 6. Hangman drawing component

SVG stick-figure with discrete stages `0 … maxWrongGuesses`. Component `HangmanFigure` receives `wrongCount` and `maxWrongGuesses` — draws proportional stages (head at 1, body parts through max).

**Why:** SVG scales cleanly on mobile; no image assets to maintain.

### 7. Setup and resolve views

- `HangmanSetupView` — player multi-select + preset picker + word pack checkboxes (pattern from Impostor setup)
- `HangmanPlayView` — letter grid, word display, figure, wrong-count label
- `HangmanResolveView` — win/loss headline, revealed word, player list, rematch/exit

`assignSecrets` stores session state:

```typescript
type HangmanSessionSecrets = {
  config: HangmanConfig;
  word: string;
  guessedLetters: string[];
  wrongCount: number;
  status: "playing" | "won" | "lost";
};
```

PlayView updates via `PATCH_SECRETS` on each guess so rematch/refresh preserves state if needed; calls `PLAY_DONE` when status is won/lost.

### 8. Game rules registration

```typescript
rulesKeyPrefix: "hangman.rules",
rulesRoleKeys: ["group", "phone"],
rulesStepCount: 4,
```

Roles section describes cooperative play (group guesses aloud; phone tracks letters). Not traditional "roles" but fits the shared rules schema.

## Risks / Trade-offs

- **[Risk] Word lists too small** → Start with 50+ words per pack; document expansion path
- **[Risk] Accidental word peek** → Word never rendered until resolve; only blanks shown during play
- **[Risk] Non-ASCII words in Italian** → Restrict v1 lists to letters compatible with A–Z picker (Italian words without accents, or normalize à→a in display)
- **[Trade-off] No custom words** → Faster v1; custom entry is a follow-up
- **[Trade-off] Cooperative only** → Simpler UX; competitive mode later

## Migration Plan

1. Add `src/games/hangman/` module and design doc
2. Register playable definition; update catalog status
3. Add i18n keys and rules content
4. No data migration; Hangman route replaces coming-soon placeholder

Rollback: revert registry/catalog to coming-soon; remove hangman module.

## Open Questions

- **Italian diacritics:** Use unaccented word forms in v1 lists (e.g. `citta` not `città`) so the A–Z keyboard covers all letters — confirm during word list authoring.
- **Hybrid Impostor + Hangman:** Explicitly deferred (product vision open question).
