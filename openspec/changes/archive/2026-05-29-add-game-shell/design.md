## Context

FunSpace uses a single shared phone. The product phase model is:

```
SETUP → PRIVATE (reveal loop) → PLAY → RESOLVE → REMATCH?
```

Player roster (`usePlayerRoster`) persists names globally. Catalog lists games as cards but none are playable yet. [Impostor design](../../../docs/games/impostor-design.md) depends on shell infrastructure for setup, reveal, and phase chrome.

Product vision separates **game engine** (rules) from **secret delivery** (how private info reaches players) from **game shell** (shared UX).

## Goals / Non-Goals

**Goals:**

- Reusable game shell that individual games plug into via a `GameDefinition` interface
- Single-device reveal loop with pass-the-phone UX (cover screen, confirmation)
- Setup flow: select 3–20 players from global roster
- Session model with stable `playerId` values per session
- XState-driven shell phase machine
- Game launch routes and registry
- Shell demo game proving the full lifecycle works end-to-end
- Homepage cards link to game routes

**Non-Goals:**

- Impostor rules, word packs, or win logic (separate change)
- Timer module
- In-app voting
- Multi-device secret delivery
- Persisting in-progress game state to localStorage (session-only for v1)
- Scoring / history

## Decisions

### 1. GameDefinition registry pattern

Each game registers a definition:

```typescript
interface GameDefinition {
  id: string;
  minPlayers: number;
  maxPlayers: number;
  phases: ("setup" | "reveal" | "play" | "resolve")[];
  SetupForm: ComponentType<GameSetupProps>;
  PlayView: ComponentType<GamePlayProps>;
  ResolveView: ComponentType<GameResolveProps>;
  assignSecrets: (session: GameSession) => Record<playerId, unknown>;
}
```

Shell owns phase transitions; games supply content for setup/play/resolve and secret assignment.

**Why:** Keeps Impostor-specific logic out of the shell. Shell demo implements a trivial version.

### 2. GameSession model

```typescript
interface GameSession {
  gameId: string;
  players: { id: string; name: string }[];  // id = crypto.randomUUID() at session start
  shuffledOrder: string[];  // playerIds, shuffled once at session start
  phase: ShellPhase;
  secrets: Record<string, unknown>;  // playerId → game-assigned secret
}
```

Player IDs are session-scoped UUIDs — names come from roster but IDs are stable within a session for reveal tracking.

**Why:** Supports future scoring/history; decouples display name from session identity.

### 3. XState shell machine

Shell machine states: `setup` → `reveal` → `play` → `resolve` → (`rematch` → setup | `exit`).

- Games declare which phases they use via `phases[]`; shell skips unused phases
- Reveal sub-machine tracks `currentPlayerIndex`, `revealedPlayerIds`
- Context holds `GameSession`

**Why:** Product stack mandates XState; explicit phases match product vision.

### 4. Secret delivery — SingleDeviceRevealLoop

Generic component driven by props:

1. *"Pass the phone to [Name]"* — handoff screen
2. Tap to reveal — shows `renderSecret(playerId)` slot
3. *"Got it"* confirmation button
4. Cover/blur overlay — hides secret
5. Advance to next player in `shuffledOrder`

Provider interface for future multi-device swap:

```typescript
interface SecretDeliveryProvider {
  mode: "single-device";
  RevealLoop: ComponentType<RevealLoopProps>;
}
```

v1 implements only `single-device`.

**Why:** Matches product vision reveal steps; extensible without building multi-device now.

### 5. Setup — player multi-select from roster

- Read global roster via `usePlayerRoster()`
- Checkbox list to select participants (default: all roster players selected)
- Validate count against game's `minPlayers` / `maxPlayers`
- Link to `/players` if roster empty or too small
- "Start game" creates session, shuffles order, calls `assignSecrets`, enters first phase

**Why:** Reuses roster; Impostor design requires 3–20 selected players.

### 6. Shell demo game

Minimal game at `shell-demo` in registry:

- Setup: pick players
- Reveal: each player sees *"Your secret number: 42"*
- Play: static *"Discuss freely — this is a demo"*
- Resolve: *"Demo complete"*
- Rematch: restart with same players

Validates shell without Impostor complexity. Homepage Impostor card still shows "Coming soon" until `add-impostor-game`.

**Why:** Shell must be testable in browser before Impostor exists.

### 7. Game routes and layout

- Route: `/[locale]/games/[gameId]`
- Uses AppShell (site header) + `GameShell` inner layout (phase progress, back-to-home)
- Invalid `gameId` → 404
- `impostor` in registry returns "coming soon" placeholder OR not registered yet — only `shell-demo` playable in this change

**Decision:** Register `impostor` with a coming-soon placeholder page using shell setup only, OR leave unregistered. **Register with placeholder** — card links work, shows "Coming soon" after title screen. Actually proposal says homepage links to routes — impostor can show a styled coming-soon within game shell chrome.

Simpler: only `shell-demo` registered; Impostor card links to `/games/impostor` showing coming-soon component (not full shell). Homepage links all games.

### 8. Game shell layout chrome

- Back link to homepage
- Game title from i18n/catalog
- Phase indicator (optional subtle step dots: Setup · Reveal · Play · Done)
- Full-width mobile-first content area

## Risks / Trade-offs

- **[Risk] Shell too abstract** → Shell demo proves the API before Impostor
- **[Risk] Reveal loop UX on 20 players** → Accept slow flow; product vision acknowledges this
- **[Trade-off] No mid-game persistence** → Refresh loses session; acceptable for v1 party use
- **[Trade-off] Session playerIds as UUIDs** → Rename in roster doesn't affect in-flight session

## Migration Plan

Greenfield. After ship, Impostor registers in `games/registry.ts` and replaces placeholder.

## Open Questions

None blocking — Impostor design doc and product vision cover reveal/setup requirements.
