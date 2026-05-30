## Context

Player roster and game shell are shipped. The shell demo validates setup → reveal → play → resolve. Impostor is the first real game — a word-based in-person party game where civilians know a secret word, spies get a similar decoy, and impostors get nothing. Gameplay is verbal at the table; the app moderates secrets, tracks eliminations, and detects wins.

Full rules: [`docs/games/impostor-design.md`](../../../docs/games/impostor-design.md).

Current `GameDefinition` provides generic `PlayerSelectSetup` in the shell. Impostor needs additional setup (impostor/spy counts, word packs, presets). Play phase needs elimination UI and win detection before resolve.

## Goals / Non-Goals

**Goals:**

- Playable Impostor at `/[locale]/games/impostor` using the shared game shell
- Role assignment: civilians, impostors (1+), spies (0+)
- Locale-specific word packs (en + it), multi-select, all default
- Presets: Classic, With Spy, Chaos, Custom
- Pass-the-phone reveal via existing `SingleDeviceRevealLoop`
- Free-form play with alive player list and elimination flow
- Win detection after each elimination; full role reveal at resolve
- Rematch with same players, new shuffle, new word
- Homepage Impostor card marked playable; catalog updated to 3–20 players

**Non-Goals:**

- Timer, fixed clue rounds, in-app voting
- Impostor teammate knowledge or impostor word
- Scoring, session history, user-created word packs
- Multi-device play
- Persisting in-progress game to localStorage

## Decisions

### 1. Extend GameDefinition with optional SetupView

Add optional `SetupView?: ComponentType<GameSetupProps>` to `GameDefinition`. When present, shell renders it instead of generic `PlayerSelectSetup`.

Impostor `SetupView` composes player multi-select with impostor/spy counters, preset picker, and word pack checkboxes. On start, it passes player names + config to a custom start handler.

Extend shell machine `START` event to accept optional `gameConfig` stored in session secrets/metadata:

```typescript
type ImpostorSessionSecrets = {
  config: ImpostorConfig;
  roles: Record<playerId, "civilian" | "impostor" | "spy">;
  wordPair: { crewWord: string; spyWord: string };
  alivePlayerIds: string[];
  eliminatedPlayerIds: string[];
};
```

**Why:** Keeps shell generic; Impostor owns its setup UX without forking the shell.

**Alternative considered:** Two-step setup inside generic player select — rejected; too cramped for presets and word packs.

### 2. Impostor engine as pure functions + XState play machine

Core logic in `src/games/impostor/engine/`:

- `assignRoles(players, impostorCount, spyCount)` — shuffle roles
- `pickWordPair(packs, locale)` — random pair from selected packs
- `eliminatePlayer(state, playerId)` — update alive set
- `checkWin(alive, roles)` — return `"civilians" | "impostors" | null`

Play phase uses a nested XState machine: `playing` ↔ `eliminating` → `won` (signals shell `PLAY_DONE`).

**Why:** Testable pure functions; XState for play/eliminate UI flow matches product stack.

### 3. Word packs as static locale data

```typescript
// src/games/impostor/word-packs/en/general.ts
export const generalPackEn = {
  id: "general",
  nameKey: "impostor.packs.general",
  pairs: [{ crewWord: "Pizza", spyWord: "Pasta" }, ...],
};
```

Packs: General, Food, Animals, Places (minimum 4 per locale for v1). Engine unions selected pack pairs.

**Why:** No backend; static data is sufficient for v1. Locale from `useLocale()`.

### 4. Config validation with Zod

```typescript
ImpostorConfigSchema = z.object({
  impostorCount: z.number().int().min(1),
  spyCount: z.number().int().min(0),
  wordPackIds: z.array(z.string()).min(1),
});
```

Validate: `impostorCount + spyCount < playerCount`, optional caps `impostorCount <= floor(n/2)`, `spyCount <= floor(n/3)`.

Presets map to config values; Custom exposes full controls.

### 5. Reveal content by role

`assignSecrets` runs after session creation with config passed via extended start flow:

| Role | Reveal shows |
|------|-------------|
| Civilian | Crew word |
| Spy | Spy word (similar decoy) |
| Impostor | "You are the Impostor" message — no word |

Uses existing reveal loop `renderSecret(playerId)` reading from session secrets.

### 6. Elimination UX

During play:
- Show alive players (names only — roles hidden)
- "Eliminate player" button → select from alive list → confirm
- After elimination, run win check; if game continues, return to play; if won, transition to resolve

Eliminated player's role is NOT shown until resolve.

### 7. Resolve screen

Show winner side, all roles, crew/spy words, eliminated order. Rematch reuses last config + player names.

### 8. Catalog and registry updates

- `src/catalog/games.ts`: Impostor `status: "playable"`, `minPlayers: 3`, `maxPlayers: 20`
- `src/games/registry.ts`: Replace coming-soon entry with playable `impostorDefinition`

## Risks / Trade-offs

- **[Risk] Shell START event change affects shell demo** → Make `gameConfig` optional; shell demo unchanged
- **[Risk] Large setup form on mobile** → Presets as quick-start; Custom collapses advanced options
- **[Risk] Word pack content volume** → Ship ~10–15 pairs per pack, 4 packs per locale; expand later
- **[Trade-off] No mid-game persistence** → Refresh loses session; acceptable for v1 party use
- **[Trade-off] Elimination is facilitator-driven** → One person operates phone; matches IRL design

## Migration Plan

Greenfield game module. Register Impostor as playable; no data migration. Coming-soon placeholder at `/games/impostor` replaced by full game automatically.

## Open Questions

None blocking — all resolved in `docs/games/impostor-design.md`.
