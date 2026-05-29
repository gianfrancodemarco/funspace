## Why

Impostor is the flagship deduction game, but some groups prefer answering **personal questions** instead of giving word clues. A **question-based variant** keeps the same social-deduction loop (reveal → discuss → eliminate) while changing the secret: civilians share one question, the impostor gets a **paired question whose answer type matches** (e.g. both numeric, same rough range) so bluffing stays plausible. This expands the catalog without overlapping Spyfall or NHIE, and reuses the proven Impostor shell and elimination flow — with a **simpler two-role model** (no spy).

## What Changes

- Implement **Question Impostor** (*Impostore con domande*) as a new playable game: civilians see the crew question; impostors see a different impostor question with a compatible answer type
- Add **question packs** (locale-specific, multi-select, all default) containing curated **pairs**: `crewQuestion`, `impostorQuestion`, plus `answerType` metadata
- Build **setup UI**: player selection (3–20), impostor count only, presets (Classic, Two Impostors, Chaos, Custom), question pack multi-select
- Integrate with **game shell** phases `setup → reveal → play → resolve` (same as Impostor)
- Build **play/resolve UI**: alive list, elimination, win detection, full reveal at resolve (both questions + roles + reference answers optional for host)
- Register as **playable** in registry and homepage catalog
- Add **in-app rules** via the shared game-rules system (civilian + impostor only)
- Add **i18n** (en + it) for setup, reveal, play, resolve, rules, and pack names
- Add **`docs/games/question-impostor-design.md`** as the rules reference for implementation

## Capabilities

### New Capabilities

- `question-impostor-game`: Question pair selection, two-role assignment, reveal by role, elimination, win detection, and game-specific UI

### Modified Capabilities

- `homepage`: Question Impostor card added as playable; catalog grid includes a fourth shipped game
- `i18n`: Translation keys for Question Impostor UI, rules, and question pack names
- `game-rules`: Question Impostor registers rules content via the shared game rules system

## Impact

- New `src/games/question-impostor/` — engine, config schema, presets, question packs, components
- New `docs/games/question-impostor-design.md` — rules and integration reference
- Updates to `src/games/registry.ts` and `src/catalog/games.ts`
- Updates to `src/messages/en.json` and `src/messages/it.json`
- Depends on: `player-roster`, `game-shell`, `secret-delivery`, `game-rules` (already shipped)
- Reuses patterns from `src/games/impostor/` (elimination, win check) with a slimmer role and config model
