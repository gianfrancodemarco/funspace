## Why

New players often don't know how a party game works before starting. FunSpace currently shows only a one-line catalog description and jumps straight into setup — there is no in-app way to learn the rules. Clear, scannable rules reduce friction for first-time groups and make each game self-contained without external explanation.

## What Changes

- Add a **shared game rules UI** — collapsible or modal panel with a consistent structure (goal, roles, how to play, win conditions)
- Extend the **game definition contract** so playable games can register rules content via i18n keys
- Surface rules from the **game shell setup phase** (primary) and optionally from the **homepage game card** (link or expandable hint)
- Implement **Impostor rules** as the first game — plain language derived from `docs/games/impostor-design.md`, covering roles, verbal clue-giving, elimination, and win conditions
- Add **i18n strings** for shared rules chrome and Impostor-specific content (en + it)

## Capabilities

### New Capabilities

- `game-rules`: Shared rules presentation component, game-definition contract for rules content, and setup-phase access pattern

### Modified Capabilities

- `game-shell`: Setup phase SHALL expose game rules before starting a session
- `i18n`: Translation keys for shared rules UI and per-game rules sections
- `impostor-game`: Impostor SHALL provide complete in-app rules content via the shared rules system

## Impact

- New `src/components/game-rules/` — shared `GameRulesPanel` (or similar) and types
- Updates to `src/core/game-shell/types.ts` — optional `rulesKey` or rules config on `GameDefinition`
- Updates to `GameShellLayout` or setup views — rules entry point on setup screens
- Updates to `src/games/impostor/index.ts` — register rules keys
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Reference: `docs/games/impostor-design.md` for Impostor rules copy
