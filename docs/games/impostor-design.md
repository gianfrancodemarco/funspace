# Impostor — Game Design

This document captures the agreed rules, settings, variations, and platform integration for the **Impostor** game (*Impostore*). It is the source of truth for OpenSpec proposals and implementation.

**Related:** [Product Vision](../product-vision.md) · Player roster is a **platform feature** shared across all games.

---

## 1. Game Summary

Impostor is a **word-based in-person party game**. One or more players are impostors who **do not know the secret word**. Everyone else (civilians and optional spies) knows a word — or a similar decoy word. The group gives clues and discusses **verbally**; the app moderates secrets, tracks eliminations, and detects when the game ends.

The phone is the **moderator**, not the whole game. Gameplay happens at the table.

---

## 2. Roles

| Role | Secret word on reveal | Knows other roles? | Wins with |
|------|----------------------|--------------------|-----------|
| **Civilian** | The secret word | No | Civilians (and spy) |
| **Impostor** | Nothing — told they are the impostor | No — **impostors do not know each other** | Other impostors |
| **Spy** (optional) | A **similar** word (same pair logic as crew/spy decoy) | No | Civilians |

### Example

Crew word: **Pizza**

| Role | Sees on reveal |
|------|----------------|
| Civilian | `Pizza` |
| Spy | `Pasta` (similar word from the word pack) |
| Impostor | *"You are the Impostor — you don't know the word"* |

### Role counts

- **Impostors:** 1 or more (required)
- **Spies:** 0 or more (optional)
- At least **1 civilian** must remain possible at setup (`impostorCount + spyCount < playerCount`)

---

## 3. Win Conditions

| Side | Condition |
|------|-----------|
| **Civilians (+ spy)** | All impostors have been eliminated |
| **Impostors** | **Only impostors are alive** (all civilians and spies eliminated) |
| **Spy** | Same as civilians — wins **with** the civilian side, not solo |

After each in-app elimination, the engine checks:

```
if (aliveImpostors === 0)       → Civilians win
if (aliveNonImpostors === 0)     → Impostors win
else                             → Game continues
```

---

## 4. Player Limits

| Setting | Value |
|---------|-------|
| Minimum players | **3** |
| Maximum players | **20** |

Catalog metadata should reflect `minPlayers: 3`, `maxPlayers: 20`.

### Validation examples

| Players | Impostors | Spies | Valid? | Notes |
|---------|-----------|-------|--------|-------|
| 3 | 1 | 0 | ✅ | 2 civilians |
| 3 | 1 | 1 | ✅ | 1 civilian — very swingy |
| 4 | 2 | 0 | ✅ | 2 civilians |
| 4 | 1 | 1 | ✅ | 2 civilians |
| 20 | 3 | 2 | ✅ | 15 civilians |

Invalid: `impostorCount + spyCount >= playerCount` (no civilians left at start).

Optional caps (tune during playtesting):

- `impostorCount <= floor(playerCount / 2)`
- `spyCount <= floor(playerCount / 3)`

---

## 5. Game Flow

```
SETUP → REVEAL (pass-the-phone) → PLAY → ELIMINATE → CHECK WIN → RESOLVE
                                      ↑         │            │
                                      └─ continue ──────────┘
                                      (if game not over)
```

### Phase: Setup

1. Select players from the **shared roster** (see §10)
2. Configure impostor count, spy count, word packs
3. App assigns roles and picks a word pair from selected packs
4. App shuffles player order for this session

### Phase: Reveal (private, sequential)

For each player in shuffled order:

1. *"Pass the phone to [Name]"*
2. Player taps to reveal role + word (or impostor message)
3. Player confirms (*"Got it"*)
4. Cover / blur — secret hidden
5. Next player

**Impostor can be first** in the shuffled order. No rule prevents it.

### Phase: Play

- **No timer**
- **No fixed clue rounds** — group clues and discusses at their own pace
- App shows alive players and brief instructions
- **Voting is in real life** — the app does not run votes
- Suggested speaking order may follow the shuffled list (soft hint, not enforced)

### Phase: Eliminate

When the group decides someone is out (IRL):

1. Facilitator opens elimination in the app
2. Selects the eliminated player → confirms
3. **Role stays hidden** until game end
4. App removes player from alive set and runs win check

### Phase: Resolve

When win condition is met:

- Reveal all roles, words, and who was what
- Option to rematch (same players, new shuffle, new word)

---

## 6. Settings & Config

### Config shape

```typescript
ImpostorConfig {
  players: string[]        // 3–20, selected from shared roster
  impostorCount: number    // >= 1
  spyCount: number         // >= 0
  wordPacks: string[]      // selected pack IDs; default: all packs
}
```

### Explicitly out of scope (v1)

| Removed | Reason |
|---------|--------|
| Timer | Play is fully verbal |
| Fixed clue rounds | Free-form discussion |
| In-app voting | Voting is IRL |
| Impostor word | Impostor always gets nothing |
| `roles.spy: boolean` | Replaced by `spyCount` |

### Presets (UX shortcuts)

Presets are named configs — not separate games.

| Preset | Impostors | Spies | Notes |
|--------|-----------|-------|-------|
| **Classic** | 1 | 0 | Default, teachable |
| **With Spy** | 1 | 1 | Introduces spy |
| **Chaos** | 2 | 0 | Larger groups |
| **Custom** | * | * | Full control |

Ship **2–3 presets + Custom** in v1.

### Word packs

- Multiple packs (e.g. General, Food, Animals, Places, …)
- **Multi-select; all packs selected by default**
- Engine picks a random word pair from the **union** of selected packs
- Packs are **locale-specific** (English pairs for `en`, Italian pairs for `it`)
- At least one pack must remain selected

Word pair structure:

```
{ crewWord: "Pizza", spyWord: "Pasta" }   // impostor gets neither
```

---

## 7. Turn Order

- Player order is **shuffled each game** from the selected roster
- Shuffled order drives reveal sequence and optional speaking hints
- **Impostor may start** (first in shuffled order)
- Roster storage has no persistent order — shuffle happens at game start

---

## 8. Single-Device UX Split

| In real life | In the app |
|--------------|------------|
| Clues & descriptions | Assign roles & words |
| Discussion & accusations | Pass-the-phone reveal flow |
| Deciding who to eliminate | Track alive / eliminated |
| Bluffing | Win detection |
| | Final role reveal |
| | Word pack selection |

---

## 9. Architecture Notes

Follows the FunSpace game model from [Product Vision](../product-vision.md):

```
SETUP → PRIVATE (reveal loop) → PLAY → RESOLVE → REMATCH?
```

### Suggested engine modules

```
Impostor Core Engine
        │
        ├── MultiImpostorModule   (count > 1, no teammate reveal)
        ├── SpyRoleModule         (spyCount > 0, similar word)
        └── WordPackModule        (multi-select packs)
```

- **XState** for phases (setup, reveal, play, eliminate, resolve)
- **Zod** for config validation
- **Secret delivery** via single-device reveal loop (game shell)
- Domain events: `RoleAssigned`, `PlayerEliminated`, `GameEnded`, etc.

### Per-game file layout (convention)

```
src/games/impostor/
  meta.ts
  config.schema.ts
  presets.ts
  machine.ts
  modules/
  components/
```

---

## 10. Platform Dependency: Player Roster

Player names are **not Impostor-specific**. They are a shared platform feature:

- Stored in browser local storage via **StoragePort**
- Shared across **all games**
- New names entered during setup are auto-saved
- Select a subset (3–20) for each session
- Key example: `funspace:playerRoster`

**Build order recommendation:**

1. **Player roster** — StoragePort + global name list + setup UI
2. **Game shell** — phases, reveal loop, rematch chrome
3. **Impostor** — engine, word packs, elimination, resolve

---

## 11. Player-Facing Rules (short)

> **Civilians:** You know the secret word. Find and eliminate all impostors.
>
> **Spy:** You have a similar — but wrong — word. You're on the civilians' side.
>
> **Impostors:** You don't know the word. Stay hidden until you're the only ones left.
>
> Discuss and decide eliminations together. The app keeps track.

---

## 12. v1 Scope

### In scope

- Classic + With Spy presets + Custom
- 3–20 players, flexible impostor/spy counts
- Pass-the-phone reveal
- Free-form play, no timer
- IRL elimination → app win detection
- Hidden roles until resolve
- Word packs (multi-select, all default)
- English + Italian word pack content
- Rematch

### Out of scope (v1)

- Timer / discussion clock
- Fixed clue rounds
- In-app or pass-the-phone voting
- Impostor teammate reveal
- Scoring / session history
- User-created word packs
- Multi-device play

---

## 13. Open Questions (resolved)

| Topic | Decision |
|-------|----------|
| Impostor word | None — impostor gets no word |
| Spy word | Similar word (decoy from pair) |
| Spy win | With civilians |
| Multi-impostor knowledge | Private reveals only — no teammate knowledge |
| Min / max players | 3 / 20 |
| Timer | None |
| Clue rounds | Free-form, no fixed count |
| Voting | IRL; app handles elimination only |
| Role on elimination | Hidden until game end |
| Impostor win | Only impostors alive |
| Word packs default | All selected |
| Turn order | Shuffled each game; impostor can start |
| Player names | Shared roster in localStorage |

---

## 14. Next Steps

When ready to implement:

1. `/opsx-propose add-player-roster`
2. `/opsx-propose add-game-shell`
3. `/opsx-propose add-impostor-game`

Reference this document in proposals, design artifacts, and specs.
