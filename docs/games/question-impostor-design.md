# Question Impostor — Game Design

Rules reference for **Question Impostor** (*Impostore con domande*): a question-based social deduction game on one shared phone.

**Related:** [Impostor Design](./impostor-design.md) · [Product Vision](../product-vision.md)

---

## 1. Game Summary

Everyone answers a **personal question** out loud. Civilians share the same question; impostors receive a **different** question whose answer is the same *kind* (e.g. both numbers in a similar range). The group discusses and eliminates suspects. The app holds secrets, tracks eliminations, and detects wins.

**No spy role** in this game — use word Impostor for spy variants.

---

## 2. Roles

| Role | Reveal | Wins with |
|------|--------|-----------|
| **Civilian** | Crew question + answer-type hint | Civilians |
| **Impostor** | Impostor question + answer-type hint | Other impostors |

- **Impostors:** 1+ (configurable)
- At least **1 civilian** required: `impostorCount < playerCount`
- Impostors do not know each other

---

## 3. Win Conditions

| Side | Condition |
|------|-----------|
| **Civilians** | All impostors eliminated |
| **Impostors** | Only impostors alive |

---

## 4. Player Limits

3–20 players. Optional cap: `impostorCount <= floor(playerCount / 2)`.

---

## 5. Game Flow

`SETUP → REVEAL → PLAY → ELIMINATE → RESOLVE → REMATCH?`

Verbal discussion at the table; facilitator eliminates players in the app.

---

## 6. Question Pairs (content)

Each pack entry is a **pair**:

```typescript
{
  crewQuestion: string;
  impostorQuestion: string;
  answerType: "number" | "year" | "yes_no" | "duration";
  crewAnswer?: string;      // resolve only (host)
  impostorAnswer?: string;
}
```

Authoring guideline: impostor answers should be **plausibly confusable** when players give short spoken answers (same type, comparable magnitude).

---

## 7. Presets

| Preset | Impostors |
|--------|-----------|
| Classic | 1 |
| Two Impostors | 2 |
| Chaos | 2 |
| Custom | User-defined |

---

## 8. Platform Integration

- Game id: `question-impostor`
- Phases: `reveal`, `play`, `resolve`
- Module: `src/games/question-impostor/`
- i18n: `questionImpostor.*`, `games.questionImpostor.*`
