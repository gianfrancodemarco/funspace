## 1. Shared animation component

- [x] 1.1 Create `src/components/game-end/GameEndAnimation.tsx` with `variant: "win" | "loss"` prop
- [x] 1.2 Add CSS keyframes for win pop-in, loss shake, and confetti particles (pointer-events-none, aria-hidden)
- [x] 1.3 Implement `usePrefersReducedMotion` (or equivalent) to skip motion effects
- [x] 1.4 Export barrel `src/components/game-end/index.ts`

## 2. Game integration

- [x] 2.1 Wrap Impostor resolve headline with `GameEndAnimation variant="win"`
- [x] 2.2 Wrap Hangman resolve headline with `win` or `loss` based on `state.status`

## 3. Tests and verification

- [x] 3.1 Add unit test: renders children, applies win vs loss class/data attribute
- [x] 3.2 Add unit test: reduced motion skips animated elements
- [x] 3.3 Manual/visual check: dark mode + mobile; run `npm test` and `npm run build`
