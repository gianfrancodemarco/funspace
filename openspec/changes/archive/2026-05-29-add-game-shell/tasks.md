## 1. Core Types & Registry

- [x] 1.1 Create `src/core/game-shell/` — types (`GameSession`, `GameDefinition`, `ShellPhase`), session factory
- [x] 1.2 Create `src/games/registry.ts` — game lookup by ID
- [x] 1.3 Add unit tests for session creation and player ID assignment

## 2. Shell State Machine

- [x] 2.1 Implement XState shell machine (`setup` → `reveal` → `play` → `resolve` → rematch/exit)
- [x] 2.2 Create `GameShellProvider` context exposing session, phase, and transitions
- [x] 2.3 Add unit tests for phase transitions and skipped phases

## 3. Secret Delivery

- [x] 3.1 Create `src/core/secret-delivery/` — provider interface and types
- [x] 3.2 Build `SingleDeviceRevealLoop` component (handoff → reveal → confirm → cover)
- [x] 3.3 Add component tests for reveal loop step progression

## 4. Shell UI Components

- [x] 4.1 Create `GameShellLayout` — back link, title, phase indicator
- [x] 4.2 Create `PlayerSelectSetup` — multi-select from roster with validation
- [x] 4.3 Create `RematchPrompt` — rematch / exit actions
- [x] 4.4 Add i18n keys (en + it) for shell and reveal UI

## 5. Game Routes & Demo

- [x] 5.1 Create `/[locale]/games/[gameId]/page.tsx` with registry lookup
- [x] 5.2 Implement `src/games/shell-demo/` reference game (full lifecycle)
- [x] 5.3 Register catalog games — playable demo + coming-soon placeholder for others

## 6. Homepage Integration

- [x] 6.1 Update `GameCard` to link to `/games/[gameId]`
- [x] 6.2 Update sitemap with game routes (shell-demo at minimum)

## 7. Verification

- [x] 7.1 Run `npm test` and `npm run lint`
- [x] 7.2 Verify static export includes `/en/games/shell-demo` route
- [x] 7.3 Manual smoke: complete shell demo end-to-end (setup → reveal → play → resolve → rematch)
