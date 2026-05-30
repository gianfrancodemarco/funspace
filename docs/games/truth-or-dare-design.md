# Truth or Dare — Game Design

Social prompt game for FunSpace. One phone surfaces Truth or Dare prompts; the group picks who answers or acts.

**Related:** [Product Vision](../product-vision.md) · [Never Have I Ever Design](./never-have-i-ever-design.md) · [Games Roadmap](../games-roadmap.md)

---

## 1. Game Summary

Truth or Dare is a **social party game** for 3–20 players around one shared phone. Each turn the app offers a **Truth** or **Dare** prompt (or picks one at random). The group decides who must answer honestly or perform the dare in person. The app is the **prompt moderator**, not a referee.

No private information — **no reveal phase**.

---

## 2. Player Limits

| Setting | Value |
|---------|-------|
| Minimum players | **3** |
| Maximum players | **20** |

Players are selected from the shared roster. Optional player picker highlights who is up for the current turn — the group decides, not the app.

---

## 3. Session End

There is no app-tracked winner. A session ends when:

| Outcome | Condition |
|---------|-----------|
| **End session** | A player taps End session during play |
| **Deck exhausted** | All applicable truth and/or dare pools are used up for the selected mode |

The resolve screen celebrates **session complete** and shows truths and dares played.

---

## 4. Game Flow

```
SETUP → PLAY (shared screen) → RESOLVE
```

### Setup

1. Select 3–20 players from roster
2. Choose preset (Classic, Silly night, Dares only, All ages) or Custom
3. Select prompt packs (Classic, Silly — multi-select; Spicy 18+ opt-in with confirmation)
4. Choose prompt mode: Both, Truth only, Dare only, or Random
5. Toggle optional player picker
6. App builds and shuffles separate truth and dare decks from selected locale packs

### Play

- **Both mode:** Truth / Dare choice each turn, then prompt
- **Truth only / Dare only:** Prompt drawn automatically each turn
- **Random mode:** App picks truth or dare each turn from non-exhausted pools
- Optional player picker row when enabled
- Progress indicator (truths and dares played)
- **Next** — advance after the group has responded
- **Skip** — advance without playing (still consumes the prompt)
- **End session** — finish early and go to resolve

### Resolve

- Session complete headline with win end animation
- Truths played and dares played counts
- Rematch (same players/config, newly shuffled decks) or exit

---

## 5. Settings & Config

```typescript
TruthOrDareConfig {
  promptPackIds: string[]       // selected pack IDs; default: all non-adult
  promptMode: "both" | "truth_only" | "dare_only" | "random"
  showPlayerPicker: boolean
  locale: string                // en | it
}
```

### Presets

| Preset | Packs | Mode |
|--------|-------|------|
| **Classic** | Classic | both |
| **Silly night** | Classic + Silly | both |
| **Dares only** | Classic + Silly | dare_only |
| **All ages** | Classic + Silly | both |
| **Custom** | User-selected | User-selected |

### Prompt packs

| Pack | Content | Adult (18+) |
|------|---------|-------------|
| Classic | Safe icebreakers | No |
| Silly | Funny, low-stakes | No |
| Spicy | Edgier truths and dares | Yes — deselected by default, requires confirmation |

Minimum ~25 truths and ~25 dares per pack for v1.

---

## 6. Platform Integration

| Concern | Approach |
|---------|----------|
| Shell phases | `["play", "resolve"]` — no reveal |
| Session state | `truthOrDareState` in session secrets |
| Rules | `truthOrDare.rules` via shared game-rules system |
| End animation | Win variant on session complete |
| i18n | `truthOrDare.*` keys in en.json / it.json |

---

## 7. Non-Goals (v1)

- In-app enforcement of completing truths or dares
- Scoring, leaderboards, or session history
- User-authored custom prompts
- Multi-device play
- Timed dares or countdown UI
