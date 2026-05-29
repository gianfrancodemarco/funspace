# FunSpace — Games Roadmap

Living document for **candidate games**, prioritization, and fit with the platform. Not a commitment order — revisit as games ship and patterns emerge.

**Related:** [Product Vision](./product-vision.md) · [Impostor Design](./games/impostor-design.md) · [Hangman Design](./games/hangman-design.md) · [Never Have I Ever Design](./games/never-have-i-ever-design.md)

*Last updated: 2026-05-29*

---

## Shipped (v1 lineup)

| Game | Players | Phases | Category | Content |
|------|---------|--------|----------|---------|
| **Impostor** | 3–20 | reveal → play → resolve | Deduction / bluff | Word packs (en, it) |
| **Hangman** | 2–8 | play → resolve | Word / cooperative | Word lists (en, it) |
| **Never Have I Ever** | 3–20 | play → resolve | Social / prompt | Prompt decks (en, it) |

---

## What shapes every suggestion

FunSpace is **one shared phone**, **frontend-only**, **no accounts**. Games that work best:

- Use the phone as **moderator** or **prompt surface** — play stays verbal at the table
- Fit the shell lifecycle: `setup → (reveal?) → play → resolve → rematch`
- Reuse **content packs** (words, prompts) and **i18n**
- Avoid **anonymous voting** and **real-time sync** until multi-device exists

```
                    PLATFORM FIT SPECTRUM
    ─────────────────────────────────────────────────────
    Native ◄──────────────────────────────────────► Awkward

    Prompt moderator     Pass-the-phone secrets     In-app voting
    (NHIE, Truth/Dare)   (Impostor, Taboo turn)     (Mafia ballots)
         │                      │                         │
         ✓ shipped              ✓ shipped                 ✗ deferred
```

### Infrastructure gaps (block or unlock games)

| Capability | Status | Unlocks |
|------------|--------|---------|
| Pass-the-phone reveal | ✓ | Impostor, Taboo turn, Twenty Questions picker |
| Prompt / word decks | ✓ | Truth or Dare, Would You Rather, Charades |
| Shared word packs | ✓ | Taboo, Twenty Questions, new Impostor/Hangman packs |
| Turn order + active player | Partial (session order exists) | Hot Seat, Taboo rotation, Heads Up rounds |
| Timer module | ✗ | Categories, timed Taboo, Speed Charades |
| In-app voting | ✗ | Mafia, Werewolf, hidden ballot games |
| Per-player state tracking | ✗ (by design for NHIE) | Finger-count NHIE, elimination tally games |

---

## Priority tiers

### P0 — Next up (high fit, reuses existing patterns)

| ID | Game | Why now | Effort | Reuses |
|----|------|---------|--------|--------|
| `truth-or-dare` | **Truth or Dare** | Named in product vision; same shape as NHIE | **M** | Prompt deck pipeline, 18+ pack gating, presets |
| `would-you-rather` | **Would You Rather** | Minimal engine; strong party appeal | **S** | NHIE play UI pattern (next/skip/end) |
| `taboo` | **Taboo** (*Non dire*) | Word game gap; reuses word packs | **M** | Word packs, reveal for clue-giver, turn rotation |
| `charades-prompts` | **Charades Prompts** | App as category/word picker; zero referee logic | **S** | Word lists or dedicated act-out deck |

### P1 — Strong candidates (moderate new logic)

| ID | Game | Why | Effort | Notes |
|----|------|-----|--------|-------|
| `twenty-questions` | **Twenty Questions** | Simple secret + shared play | **S–M** | One reveal per round; word packs |
| `most-likely-to` | **Most Likely To** | NHIE-adjacent social prompts | **S** | New prompt deck content |
| `hot-seat` | **Hot Seat** | Rotating target + question prompts | **M** | Needs clear active-player UX |
| `spyfall` | **Spyfall / Undercover** | Location-based Impostor cousin | **L** | Risk of catalog redundancy with Impostor |
| `contact` | **Contact** | Word chain; verbal play | **M** | Word packs; light state for current word |

### P2 — Needs new infrastructure or careful UX

| ID | Game | Blocker | Effort |
|----|------|---------|--------|
| `categories` | **Categories / Scattergories** | Timer module | **M** |
| `heads-up` | **Heads Up!** (word on forehead) | Physical phone placement awkward; needs round timer | **M–L** |
| `mafia-lite` | **Mafia / Werewolf Lite** | Night/day phases + voting | **L** |
| `who-am-i` | **Who Am I?** (sticky-note on forehead) | Pass-phone reveal per player each round | **M** |

### P3 — Variants & content (not new catalog entries)

| Item | Type | Notes |
|------|------|-------|
| Impostor + Hangman hybrid | Variant / module | Open question in product vision — impostor guesses word hangman-style |
| New word packs | Content | Movies, sports, kids, holidays — benefits Impostor, Hangman, Taboo |
| New prompt packs | Content | Couples, travel, workplace — benefits NHIE, Truth or Dare |
| Impostor presets | Variant | Already supported; more named presets (e.g. Speed round, No eliminations) |

---

## Game briefs (candidates)

### Truth or Dare (`truth-or-dare`) — P0

**Pitch:** Classic party game — app shows Truth or Dare prompts; group picks who answers or acts.

| | |
|---|---|
| **Players** | 3–20 |
| **Phases** | setup → play → resolve |
| **Shell fit** | Same as NHIE — moderator only |
| **Content** | Separate Truth and Dare decks; themed packs (Classic, Spicy 18+, Silly) |
| **Settings** | Pack multi-select, truth/dare/both mode, optional “pick random” |
| **Differentiator vs NHIE** | Binary choice per turn (truth **or** dare); optional player picker UI |

---

### Would You Rather (`would-you-rather`) — P0

**Pitch:** Two options on screen — group debates and votes verbally.

| | |
|---|---|
| **Players** | 3–20 |
| **Phases** | setup → play → resolve |
| **Content** | Paired-option prompt deck (Classic, Gross, Hypothetical, 18+) |
| **Settings** | Pack filter, skip allowed |
| **Effort driver** | Content curation (quality > quantity) |

---

### Taboo (`taboo`) — P0

**Pitch:** Clue-giver sees a word + forbidden words; team guesses before time runs out (or untimed v1).

| | |
|---|---|
| **Players** | 4–12 (teams of 2+) |
| **Phases** | setup → play (rotating reveal per clue-giver) → resolve |
| **Content** | Word + taboo list per card; can derive from word packs + generated taboo words |
| **Settings** | Untimed v1; packs; team names optional |
| **v1 simplification** | Skip timer; pass phone to next clue-giver manually |

---

### Charades Prompts (`charades-prompts`) — P0

**Pitch:** Random thing to act out — no scoring, no teams required.

| | |
|---|---|
| **Players** | 3–20 |
| **Phases** | setup → play → resolve |
| **Content** | Nouns/phrases by category (Animals, Movies, Actions, Hard) |
| **Settings** | Category multi-select, difficulty |
| **Play UX** | Big prompt, Next, Skip — identical engine to NHIE with different copy |

---

### Twenty Questions (`twenty-questions`) — P1

**Pitch:** One player secretly picks a word; others ask yes/no questions.

| | |
|---|---|
| **Players** | 3–8 |
| **Phases** | setup → reveal (picker sees word) → play → resolve |
| **Content** | Word packs (shared) |
| **App role** | Shows word to picker; optional question counter (1–20) |

---

### Most Likely To (`most-likely-to`) — P1

**Pitch:** *“Who is most likely to…”* — group points or shouts names.

| | |
|---|---|
| **Players** | 4–20 |
| **Phases** | setup → play → resolve |
| **Content** | Prompt deck (Classic, Friends, Spicy 18+) |
| **Engine** | Nearly identical to NHIE |

---

### Hot Seat (`hot-seat`) — P1

**Pitch:** One player in the “hot seat” answers rapid-fire questions; rotate each round.

| | |
|---|---|
| **Players** | 3–10 |
| **Phases** | setup → play → resolve |
| **Content** | Question deck |
| **UX need** | Clear “current player” indicator + “next player” action |

---

### Spyfall / Undercover (`spyfall`) — P1

**Pitch:** Everyone gets a location except the spy; one round of questions then accuse.

| | |
|---|---|
| **Players** | 4–10 |
| **Phases** | setup → reveal → play → resolve |
| **Content** | Location sets (not word pairs) |
| **Risk** | Overlaps Impostor mentally — position as “quick rounds” or “location theme” |

---

### Categories (`categories`) — P2

**Pitch:** Letter + categories — fill answers before time runs out.

| | |
|---|---|
| **Players** | 2–8 |
| **Blocker** | Timer module |
| **v1 option** | Untimed “letter + categories” prompt only; verbal scoring |

---

### Mafia Lite (`mafia-lite`) — P2

**Pitch:** Moderator app for roles, night instructions, day discussion — eliminations verbal.

| | |
|---|---|
| **Players** | 6–15 |
| **Blocker** | Phase complexity + voting UX on single device |
| **v1 option** | “Moderator script” only — no win detection |

---

## Content reuse matrix

| Content asset | Impostor | Hangman | NHIE | Taboo | Truth/Dare | Charades | 20 Q |
|---------------|:--------:|:-------:|:----:|:-----:|:----------:|:--------:|:----:|
| Word packs | ✓ | ✓ | | ✓ | | ✓ | ✓ |
| Prompt decks | | | ✓ | | ✓ | | |
| Paired options | | | | | | | |
| Location sets | | | | | | | |

**Build order insight:** Ship **Truth or Dare** and **Would You Rather** soon after NHIE — they validate the prompt-deck factory once, then each new social game is mostly content + copy.

---

## Suggested build sequence

```
Now ──────────────────────────────────────────────────────────► Later

  Truth or Dare ──► Would You Rather ──► Charades Prompts
         │                                      │
         └──────────────► Taboo ◄── word pack depth
                                │
                    Twenty Questions / Most Likely To
                                │
              (timer spike) ──► Categories
                                │
              (voting spike) ──► Mafia Lite
```

1. **Truth or Dare** — completes the “social prompt trilogy” with NHIE; product vision already names it
2. **Would You Rather** or **Charades Prompts** — quick win, catalog breadth
3. **Taboo** — proves word games beyond Hangman; stress-tests turn + reveal together
4. **Content expansion** — packs for all word/prompt games in en + it
5. Revisit **Spyfall** vs new **Impostor location variant** before building both

---

## Catalog tags (for future cards)

| Tag | Games |
|-----|-------|
| `#words` | Hangman, Taboo, Charades, Twenty Questions, Categories |
| `#social` | NHIE, Truth or Dare, Would You Rather, Most Likely To, Hot Seat |
| `#deduction` | Impostor, Spyfall, Mafia Lite |
| `#quick` | Most prompt games, Charades |
| `#18+` | Spicy packs (NHIE, Truth or Dare, Would You Rather) |
| `#2-players` | Hangman (co-op) |
| `#large-group` | NHIE, Impostor, Truth or Dare (3–20) |

---

## Open questions

| Topic | Question |
|-------|----------|
| **Spyfall vs Impostor** | Separate game or Impostor “location mode” variant? |
| **Taboo taboo lists** | Hand-authored per word vs algorithmic from word pack? |
| **Timer** | Which game justifies building the timer module first? |
| **Scoring** | Any game track scores in v1, or stay session-only everywhere? |
| **Kids mode** | Cross-game “family safe” filter or per-pack only? |

---

## Decision log

| Date | Decision |
|------|----------|
| 2026-05-29 | Initial roadmap — P0: Truth or Dare, Would You Rather, Taboo, Charades Prompts |
| 2026-05-29 | Shipped themed word packs: anime (incl. Western animation), movies, music — Impostor + Hangman, en + it |

---

*Update this file when prioritization changes or a game moves to shipped / cancelled.*
