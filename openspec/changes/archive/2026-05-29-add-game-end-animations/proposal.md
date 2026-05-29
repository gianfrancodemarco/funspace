## Why

Resolve screens today show static text the moment a game ends. A brief, shared animation makes wins feel rewarding and losses feel clear — without blocking rematch or exit — and gives FunSpace a more polished party-game feel now that Impostor and Hangman are both playable.

## What Changes

- Add a **shared resolve animation component** with two variants: **`win`** (a group succeeded) and **`loss`** (the group failed / nobody wins)
- Play the animation **once** when the resolve phase mounts, above the outcome headline
- Wire **Impostor** resolve: either side winning → `win` variant
- Wire **Hangman** resolve: word guessed → `win`; out of guesses → `loss`
- Respect **`prefers-reduced-motion`**: skip motion effects, show static outcome immediately
- No new npm dependencies (CSS-only animation)

## Animation concepts (two variations)

### Variation A — `win` (one group wins)

Used when a side succeeds or the group completes the objective.

| Element | Behavior |
|---------|----------|
| Headline | Pop-in with slight overshoot (`scale 0.92 → 1.04 → 1`, ~400ms) |
| Accent | Soft radial glow behind title using primary / game accent color |
| Particles | 10 lightweight confetti dots (CSS), burst upward then fall; auto-remove after ~1.2s |
| Mood | Upbeat, quick — “you did it!” |

**Maps to:** Impostor (civilians or impostors win), Hangman (word complete).

### Variation B — `loss` (game lost / no one wins)

Used when the group fails together — no victorious side.

| Element | Behavior |
|---------|----------|
| Headline | Short horizontal shake (~300ms) then settle |
| Accent | Muted desaturated backdrop tint (no confetti) |
| Icon | Optional small “×” or drooping line motif above headline (SVG, fades in) |
| Mood | Sympathetic, not punishing — “nice try, want a rematch?” |

**Maps to:** Hangman (max wrong guesses). Impostor always has a winning group, so it does **not** use `loss`.

### Shared rules

- Animation runs **once per resolve visit** (not on rematch until next resolve)
- Total choreography **≤ 1.5s** before full resolve content is readable
- Rematch / exit buttons appear immediately (not gated on animation end)
- Reduced motion: show headline and content with **no** shake, scale, or particles

## Capabilities

### New Capabilities

- `game-end-animations`: Shared win/loss resolve animations, reduced-motion handling, and game outcome mapping

### Modified Capabilities

- `visual-design`: Resolve phase SHALL use distinct motion treatments for win vs loss outcomes
- `game-shell`: Resolve phase MAY show a shared outcome animation before static resolve content

## Impact

- New `src/components/game-end/` — `GameEndAnimation` (or similar) + CSS keyframes
- Updates to `ImpostorResolveView` and `HangmanResolveView`
- Optional i18n keys only if animation needs aria-live announcements (likely not for v1)
- No backend, no new dependencies

## Recommended default

Ship **Variation A + B** as described (CSS confetti win, subtle shake loss). Alternative considered: Lottie JSON assets — rejected for v1 to avoid asset weight and dependencies.
