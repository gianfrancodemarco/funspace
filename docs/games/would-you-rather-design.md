# Would You Rather — Game Design

Social dilemma game for FunSpace. One phone surfaces paired options; the group debates and picks in person.

**Related:** [Product Vision](../product-vision.md) · [Never Have I Ever Design](./never-have-i-ever-design.md) · [Truth or Dare Design](./truth-or-dare-design.md)

---

## 1. Game Summary

Would You Rather is a **social party game** for 3–20 players around one shared phone. The app displays two options — **A** vs **B** — one dilemma at a time. The group **debates and votes verbally** (show of hands, finger count, or house rules). The app is the **prompt moderator**, not a ballot box: it does not tally votes or declare a winner.

No private information — **no reveal phase**.

---

## 2. Player Limits

| Setting | Value |
|---------|-------|
| Minimum players | **3** |
| Maximum players | **20** |

Players are selected from the shared roster for session/rematch consistency. Gameplay is verbal at the table.

---

## 3. Session End

There is no app-tracked winner. A session ends when:

| Outcome | Condition |
|---------|-----------|
| **End session** | A player taps End session during play |
| **Deck exhausted** | The group advances past the last dilemma in the shuffled deck |

The resolve screen celebrates **session complete** and shows how many dilemmas were played.

---

## 4. Game Flow

```
SETUP → PLAY (shared screen) → RESOLVE
```

### Setup

1. Select 3–20 players from roster
2. Choose preset (Classic, Party mix, All ages) or Custom
3. Select dilemma packs (Classic, Gross, Hypothetical — multi-select; Spicy 18+ opt-in with confirmation)
4. App builds and shuffles a deck from selected locale packs

### Play

- One dilemma displayed with both options at equal visual weight
- Progress indicator (e.g. *Dilemma 3 of 45*)
- **Next** — advance after the group has decided
- **Skip** — advance without discussing (still consumes the dilemma)
- **End session** — finish early and go to resolve

### Resolve

- Session complete headline with win end animation
- Dilemmas played count
- Rematch (same players/config, newly shuffled deck) or exit

---

## 5. Settings & Config

```typescript
WouldYouRatherConfig {
  promptPackIds: string[]   // selected pack IDs; default: all non-adult
  locale: string            // en | it
}
```

### Presets

| Preset | Packs |
|--------|-------|
| **Classic** | Classic |
| **Party mix** | Classic + Gross + Hypothetical |
| **All ages** | Classic + Gross + Hypothetical |
| **Custom** | User-selected checkboxes |

### Dilemma packs

| Pack | Content | Adult (18+) |
|------|---------|-------------|
| Classic | Light hypotheticals, everyday trade-offs | No |
| Gross | Mildly gross or funny dilemmas | No |
| Hypothetical | Big "what if" scenarios | No |
| Spicy | Edgier 18+ dilemmas | Yes — deselected by default, requires confirmation |

Minimum ~25 dilemmas per pack for v1. Options are full phrases without a forced "Would you rather…" prefix on every line — the play UI provides context.

---

## 6. Platform Integration

| Concern | Approach |
|---------|----------|
| Shell phases | `["play", "resolve"]` — no reveal |
| Session state | `wouldYouRatherState` in session secrets |
| Rules | `wouldYouRather.rules` via shared game-rules system |
| End animation | Win variant on session complete |
| i18n | `wouldYouRather.*` keys in en.json / it.json |
| Catalog | `#social` `#quick` tags; teal accent |

---

## 7. Non-Goals (v1)

- In-app voting or tallying which option won
- Turn rotation or per-player skip tracking
- Scoring, leaderboards, or session history
- User-authored custom dilemmas
- Multi-device play
- Debate timer or countdown
