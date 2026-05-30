## Why

Truth or Dare today treats player selection as optional — the group manually taps a name in the picker, and skips are only counted globally. That makes turns easy to forget and hides who keeps dodging prompts. Enforcing round-robin turns and tracking per-player skips gives the app a clear moderator role while keeping verbal play at the table.

## What Changes

- **Enforce round-robin turns** — the engine assigns one active player per turn; play UI highlights who is up (no free-form player selection)
- **Per-player skip tracking** — when Skip is used on a turn, increment that player's skip count in session state
- **Turn advancement on Next/Skip** — after each prompt (played or skipped), advance to the next player in rotation
- **Resolve summary** — show each player's skip count on the resolve screen (alongside existing session totals)
- **Remove optional player-picker toggle** from setup — turns are always enforced (**BREAKING** for `TruthOrDareConfig.showPlayerPicker`)
- Update **engine state shape**, **play/resolve UI**, **i18n** (en + it), **rules copy**, and **design doc**

## Capabilities

### New Capabilities

_None — extends existing Truth or Dare game behavior._

### Modified Capabilities

- `truth-or-dare-game`: Turn rotation, per-player skip stats, play UI, resolve summary, setup config
- `i18n`: New/changed Truth or Dare play and resolve strings for turn labels and skip counts
- `game-rules`: Rules explain enforced turns and per-player skip tracking

## Impact

- `src/games/truth-or-dare/types.ts` — turn order, current turn index, per-player skip map; remove `showPlayerPicker`
- `src/games/truth-or-dare/config.schema.ts`, `presets.ts` — config validation and preset defaults
- `src/games/truth-or-dare/engine/` — initialize turn order, advance turn on next/skip, attribute skips
- `src/games/truth-or-dare/components/TruthOrDarePlayView.tsx` — current-player banner (read-only)
- `src/games/truth-or-dare/components/TruthOrDareResolveView.tsx` — per-player skip display
- `src/games/truth-or-dare/components/TruthOrDareSetupView.tsx` — remove picker toggle
- `src/messages/en.json`, `src/messages/it.json`
- `docs/games/truth-or-dare-design.md`
- Engine and component tests
