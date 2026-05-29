# Hangman — Game Design

Cooperative shared-screen Hangman for FunSpace. One phone, one secret word, group letter guessing.

**Related:** [Product Vision](../product-vision.md) · [Impostor Design](./impostor-design.md)

---

## 1. Game Summary

Hangman is a **word guessing game** for 2–8 players around one shared phone. The app picks a secret word from selected category packs. The group discusses aloud and taps guessed letters on the device. Wrong guesses build the hangman drawing; the group wins by completing the word before running out of guesses.

No private information — **no reveal phase**.

---

## 2. Player Limits

| Setting | Value |
|---------|-------|
| Minimum players | **2** |
| Maximum players | **8** |

Players are selected from the shared roster for session/rematch consistency. Gameplay is cooperative — all players share one guess pool.

---

## 3. Win Conditions

| Outcome | Condition |
|---------|-----------|
| **Win** | All letters of the secret word have been guessed |
| **Loss** | Wrong-guess count reaches the configured maximum |

---

## 4. Game Flow

```
SETUP → PLAY (shared screen) → RESOLVE
```

### Setup

1. Select 2–8 players from roster
2. Choose preset (Classic: 6 wrong guesses, Forgiving: 8) or Custom
3. Select word packs (General, Food, Animals, Places — multi-select, all default)
4. App picks a random word from selected locale lists

### Play

- Masked word display (revealed letters + blanks)
- A–Z letter picker; guessed letters disabled
- Hangman SVG advances on wrong guesses
- Word never shown in full until resolve

### Resolve

- Win or loss headline
- Full secret word revealed
- Rematch (same players/config, new word) or exit

---

## 5. Settings & Config

```typescript
HangmanConfig {
  wordPackIds: string[]      // selected pack IDs; default: all
  maxWrongGuesses: number    // 4–10; Classic=6, Forgiving=8
  locale: string             // en | it
}
```

### Presets

| Preset | Max wrong guesses |
|--------|-------------------|
| **Classic** | 6 |
| **Forgiving** | 8 |
| **Custom** | 4–10 (stepper) |

---

## 6. Word Lists

Four packs per locale (General, Food, Animals, Places). Words are lowercase `a–z` only (Italian uses unaccented forms). Sourced initially from Impostor crew-word vocabulary.

---

## 7. Platform Integration

| Concern | Approach |
|---------|----------|
| Shell phases | `["play", "resolve"]` — no reveal |
| Session state | `hangmanState` in session secrets |
| Rules | `hangman.rules` via shared game-rules system |
| i18n | `hangman.*` keys in en.json / it.json |

---

## 8. Non-Goals (v1)

- Competitive turn-based hangman
- Custom word entry
- Host-only word peek
- Timer or scoring
- Impostor + Hangman hybrid
