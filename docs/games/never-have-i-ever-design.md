# Never Have I Ever — Game Design

Social prompt game for FunSpace. One phone surfaces prompts; the group responds in person.

**Related:** [Product Vision](../product-vision.md) · [Hangman Design](./hangman-design.md) · [Impostor Design](./impostor-design.md)

---

## 1. Game Summary

Never Have I Ever is a **social party game** for 3–20 players around one shared phone. The app displays *"Never have I ever…"* prompts one at a time. Players who **have** done the thing respond in person — put a finger down, take a sip, or whatever house rules the group uses. The app is the **prompt moderator**, not a referee: it does not track individual players or declare a winner.

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
| **Deck exhausted** | The group advances past the last prompt in the shuffled deck |

The resolve screen celebrates **session complete** and shows how many prompts were played.

---

## 4. Game Flow

```
SETUP → PLAY (shared screen) → RESOLVE
```

### Setup

1. Select 3–20 players from roster
2. Choose preset (Icebreaker, Mixed, All ages) or Custom
3. Select prompt packs (Classic, Travel, Food & Fun — multi-select; Spicy 18+ opt-in with confirmation)
4. App builds and shuffles a deck from selected locale packs

### Play

- One prompt displayed prominently on the shared screen
- Progress indicator (e.g. *3 / 45*)
- **Next** — advance after the group has responded
- **Skip** — advance without discussing (still consumes the prompt)
- **End session** — finish early and go to resolve

### Resolve

- Session complete headline with win end animation
- Prompts played count
- Rematch (same players/config, newly shuffled deck) or exit

---

## 5. Settings & Config

```typescript
NeverHaveIEverConfig {
  promptPackIds: string[]   // selected pack IDs; default: all non-adult
  locale: string            // en | it
}
```

### Presets

| Preset | Packs |
|--------|-------|
| **Icebreaker** | Classic |
| **Mixed** | Classic + Travel + Food & Fun |
| **All ages** | Classic + Travel + Food & Fun |
| **Custom** | User-selected checkboxes |

### Prompt packs

| Pack | Content | Adult (18+) |
|------|---------|-------------|
| Classic | Safe icebreakers | No |
| Travel | Trips and adventure | No |
| Food & Fun | Food, hobbies, silly | No |
| Spicy | Edgier prompts | Yes — deselected by default, requires confirmation |

Minimum ~30 prompts per pack for v1. Prompts include the full sentence prefix (*Never have I ever…* / *Non ho mai…*).

---

## 6. Platform Integration

| Concern | Approach |
|---------|----------|
| Shell phases | `["play", "resolve"]` — no reveal |
| Session state | `neverHaveIEverState` in session secrets |
| Rules | `neverHaveIEver.rules` via shared game-rules system |
| End animation | Win variant on session complete |
| i18n | `neverHaveIEver.*` keys in en.json / it.json |

---

## 7. Non-Goals (v1)

- In-app finger or life tracking per player
- Scoring, leaderboards, or session history
- User-authored custom prompts
- Multi-device play
- Truth or Dare or other prompt formats
