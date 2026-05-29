## Context

FunSpace games need 3–20 player names per session. The [Impostor design doc](../../../docs/games/impostor-design.md) requires names to persist across games via browser storage. Product vision mandates a **StoragePort** abstraction — no scattered `localStorage` calls.

No `src/core/` implementation exists yet (only scaffold placeholders). This change delivers storage infrastructure and the first persisted feature: the player roster.

## Goals / Non-Goals

**Goals:**

- StoragePort interface + LocalStorageAdapter
- Global roster: add, remove, rename player names
- Persist roster across sessions and page reloads
- Players management page accessible from app nav
- Export a hook/service games will consume at setup time
- i18n for all roster UI copy (en + it)
- Tests for storage and roster operations

**Non-Goals:**

- Per-game player selection UI (comes with game shell / Impostor setup)
- Player avatars, colors, or IDs (plain string names for v1)
- Roster order persistence (order is shuffled per game at runtime)
- Backend sync or multi-device roster sharing
- Import/export roster
- Duplicate name validation (optional nice-to-have, not required v1)

## Decisions

### 1. StoragePort abstraction

```typescript
interface StoragePort {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}
```

- `LocalStorageAdapter` implements via `window.localStorage`
- JSON serialize/deserialize; return `null` on missing or parse error
- Keys namespaced in `src/core/storage/keys.ts` (e.g. `funspace:playerRoster`)
- Singleton default instance exported for app use; injectable in tests via mock

**Why:** Matches product vision; games and roster never touch `localStorage` directly.

### 2. Roster data shape

```typescript
type PlayerRoster = string[];  // ordered list of unique display names
```

Stored at key `funspace:playerRoster`. Empty array when no players saved.

**Why:** Simplest model for v1. Games shuffle at session start; stored order is only the management UI order.

### 3. Roster repository + React hook

- `PlayerRosterRepository` — CRUD operations on top of StoragePort
- `usePlayerRoster()` — client hook exposing `{ players, addPlayer, removePlayer, renamePlayer, isLoading }`
- Hook hydrates from storage on mount, writes on every mutation

**Why:** Single API for Players page now and game setup later.

### 4. Dedicated Players page

Route: `/[locale]/players`

UI:
- List of saved names with remove action
- Text input + add button for new names
- Inline rename (tap name → edit → save) or edit icon
- Empty state when roster is empty
- Mobile-first layout consistent with app shell

**Why:** Games aren't playable yet — users need a way to manage names before first game ships. Page doubles as discoverable entry point.

### 5. Navigation integration

Add "Players" link to header nav (desktop + mobile sheet), between Home and About or after About.

**Why:** Roster is a first-class platform feature, not buried in settings.

### 6. SSR / static export safety

Storage access only in client components (`"use client"`). Hook returns empty roster + `isLoading: true` until hydrated to avoid SSR mismatch.

**Why:** Next.js static export + GitHub Pages; no server-side localStorage.

## Risks / Trade-offs

- **[Risk] localStorage unavailable** (private mode quota) → Catch errors, show toast/message; roster works in-memory for session
- **[Risk] Duplicate names** → Allow for v1; games can dedupe at setup if needed later
- **[Trade-off] No player IDs** → Rename updates string in array; fine until scoring/history needs stable IDs

## Migration Plan

Greenfield — no migration. Ship Players page; roster populates as users add names.

## Open Questions

None — scope is well defined by Impostor design doc §10.
