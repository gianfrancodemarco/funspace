## Context

Impostor and Hangman both land on a resolve view with a headline and details. The UI is functional but flat at the emotional peak of a session. This change adds a small shared animation layer — two variants — reusable by future games.

## Goals / Non-Goals

**Goals:**

- Shared `GameEndAnimation` component with `variant: "win" | "loss"`
- Win: pop-in headline + brief confetti burst + accent glow
- Loss: subtle shake + muted treatment, no confetti
- Map game outcomes to variants (see table below)
- Honor `prefers-reduced-motion`
- Ship for Impostor + Hangman resolve views

**Non-Goals:**

- Full-screen blocking modal or forced wait before rematch
- Sound effects or haptics
- Per-game custom animation assets (Lottie, Rive)
- Animations during play or reveal phases
- Shell demo resolve animation (optional stretch — skip unless trivial)

## Outcome mapping

| Game | Condition | Variant |
|------|-----------|---------|
| Impostor | Civilians win | `win` |
| Impostor | Impostors win | `win` |
| Hangman | Status `won` | `win` |
| Hangman | Status `lost` | `loss` |

Impostor always produces a winning group; only Hangman uses `loss` today.

## Decisions

### 1. Shared wrapper component

```tsx
<GameEndAnimation variant="win" | "loss">
  {children} // headline + resolve body
</GameEndAnimation>
```

Children render immediately; animation decorates the header zone. Buttons stay outside the animated wrapper so they are always tappable.

**Why:** One implementation, consistent party feel, easy for Never Have I Ever later.

### 2. CSS-only implementation

Keyframes in a colocated CSS module or Tailwind `@theme` plugin-style arbitrary animation classes:

- `animate-resolve-win-pop`
- `animate-resolve-loss-shake`
- `animate-confetti-fall` on absolutely positioned spans

Confetti: render `N` fixed-position dots in a portal-like container with `pointer-events-none`, `aria-hidden`, removed after `animationend`.

**Alternative:** `framer-motion` — rejected; not in stack today.

### 3. Reduced motion

Use `useReducedMotion()` hook (match `window.matchMedia('(prefers-reduced-motion: reduce)')`) or CSS `@media (prefers-reduced-motion: reduce)` to disable transforms and hide confetti nodes.

### 4. Integration in resolve views

Wrap only the **headline block** (title + subtitle), not the full player list:

```tsx
<GameEndAnimation variant={variant}>
  <div className="space-y-2 text-center">
    <p className="text-2xl font-bold">{headline}</p>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
</GameEndAnimation>
```

Impostor derives `variant="win"` always. Hangman: `state.status === "won" ? "win" : "loss"`.

### 5. Visual tokens

- **Win glow:** `bg-primary/20` radial gradient pseudo-element behind headline
- **Loss tint:** `bg-muted/40` subtle overlay, no primary glow
- Confetti colors: rotate through `--primary`, `--accent`, tag palette CSS vars

## Risks / Trade-offs

- **[Risk] Motion sickness** → Short durations, reduced-motion off switch
- **[Risk] Confetti hurts performance on low-end phones** → Cap at 10 nodes, CSS only, remove after animation
- **[Trade-off] Impostor never uses loss** → Loss variant only visible in Hangman for now; still worth building both for the shared contract

## Migration Plan

1. Add component + styles
2. Integrate Impostor + Hangman resolve views
3. Visual QA on mobile + dark mode

Rollback: remove wrapper from resolve views; delete component.

## Open Questions

- None blocking v1. Optional: per-game accent color prop on `GameEndAnimation` for confetti hue (Impostor violet vs Hangman sky) — default to primary if omitted.
