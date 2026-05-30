## Context

FunSpace ships Impostor, Hangman, Never Have I Ever, Question Impostor, and Truth or Dare. **Would You Rather** is P0 on the [games roadmap](../../../docs/games-roadmap.md): two options on screen, group debates and votes verbally — the app is moderator only, no in-app ballot.

The engine is closest to **Never Have I Ever** (linear deck, next/skip/end, no reveal). The content shape is new: each item is a **pair** `{ optionA, optionB }` rather than a single prompt string.

Reference: [`docs/games/would-you-rather-design.md`](../../../docs/games/would-you-rather-design.md) (created during implementation).

## Goals / Non-Goals

**Goals:**

- Playable at `/[locale]/games/would-you-rather` using the shared game shell
- Shared-screen dilemma facilitator — no reveal phase
- Locale-specific dilemma decks (en + it) with multi-select packs
- Setup: roster (3–20), pack presets, Spicy 18+ opt-in
- Play: one dilemma at a time (A vs B), shuffled without repeats, next/skip/end-session, progress
- Resolve: dilemmas played count, rematch, exit; win end animation
- In-app rules via `wouldYouRather.rules`
- Homepage catalog entry with `#social` `#quick` tags

**Non-Goals:**

- In-app voting or tallying which option won
- Turn rotation or per-player skip tracking (group debate is free-form)
- Scoring, leaderboards, session history
- User-authored custom dilemmas
- Multi-device play
- Timer or debate countdown

## Decisions

### 1. Shell phases without reveal

```typescript
phases: ["play", "resolve"] as const
```

Same as NHIE and Truth or Dare — shared screen from the start.

### 2. Paired-option content model

```typescript
type WouldYouRatherDilemma = {
  optionA: string;
  optionB: string;
};

type WouldYouRatherPack = {
  id: string;
  nameKey: string;
  isAdult: boolean;
  dilemmas: WouldYouRatherDilemma[];
};
```

Display copy as full phrases (e.g. "Live without music" vs "Live without movies") — no forced "Would you rather…" prefix in every line; the play UI provides context via title/instructions.

**Why:** Readable cards; avoids redundant wording on every option.

### 3. Engine (NHIE-shaped)

`src/games/would-you-rather/engine/`:

- `buildDeck(packIds, locale)` — merge dilemmas, dedupe by `optionA|optionB` key
- `shuffleDeck(dilemmas)` — Fisher–Yates
- `createGameState(config, deck)` — index, played count, skipped count, status
- `advanceDilemma(state, { skipped? })` — increment index, update counts, detect exhaustion
- `endSession(state)` — mark complete

State in session secrets as `wouldYouRatherState` (PATCH_SECRETS on navigation like NHIE/TorD).

### 4. Dilemma packs (en + it)

| Pack | Content | Adult |
|------|---------|-------|
| Classic | Light hypotheticals, everyday trade-offs | No |
| Gross | Mildly gross/funny dilemmas | No |
| Hypothetical | Big "what if" scenarios | No |
| Spicy | Edgier 18+ dilemmas | Yes — opt-in + confirmation |

Minimum ~25 dilemmas per pack for v1.

### 5. Presets

| Preset | Packs |
|--------|-------|
| Classic | Classic only |
| Party mix | Classic + Gross + Hypothetical |
| All ages | All non-adult packs |
| Custom | User-selected |

### 6. Play UI — dilemma card

```
        Would you rather…

   ┌──────────────────┐
   │  Live without    │
   │  music           │
   └──────────────────┘
            or
   ┌──────────────────┐
   │  Live without    │
   │  movies          │
   └──────────────────┘

   12 dilemmas played · Next · Skip · End session
```

Both options equal visual weight (no pre-selected winner). Optional subtle divider label from i18n (`wouldYouRather.play.or`).

### 7. Config validation

```typescript
WouldYouRatherConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
  locale: z.string().min(2),
});
```

### 8. Catalog and accents

- `id: "would-you-rather"`
- Tags: `social`, `quick`
- New accent token `would-you-rather` (e.g. teal/cyan border — distinct from rose Truth or Dare)

## Risks / Trade-offs

- **[Risk] Content quality matters more than quantity** → Curate dilemmas; avoid duplicate-feeling pairs
- **[Risk] Long option text on small screens** → Card layout with wrapping; test Italian strings
- **[Trade-off] No shared abstract "prompt deck" module** → Copy NHIE engine pattern; extract factory if Most Likely To ships next
- **[Trade-off] No in-app voting** → Matches roadmap and single-phone constraint; rules explain verbal debate

## Migration Plan

1. Implement game module and content
2. Register in registry + catalog
3. i18n + rules + design doc
4. No data migration

## Open Questions

- None blocking v1. In-app voting can be a follow-up if user feedback requests it.
