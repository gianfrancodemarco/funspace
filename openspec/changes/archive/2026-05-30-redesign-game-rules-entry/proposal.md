## Why

The "How to play" rules dialog works functionally but looks like plain documentation — flat text, uppercase section labels, default bullet lists, and generic shadcn dialog chrome. It doesn't match FunSpace's vibrant, card-based UI. A polished modal will make rules feel like part of the product, not an afterthought, while keeping the trigger button exactly where it is today.

## What Changes

- Redesign the **rules modal shell** — header, spacing, scroll behavior, close affordance, optional footer dismiss
- Redesign **GameRulesPanel** interior — section cards, icons, step timeline, role styling instead of raw lists
- Keep the **"How to play" trigger** placement and styling unchanged (above setup form in `GamePageClient`)
- Keep the **i18n contract** and four-section content order (goal, roles, how to play, win conditions)
- Update **component tests** for new structure and accessibility

## Capabilities

### New Capabilities

_None — visual refinement of existing game-rules presentation._

### Modified Capabilities

- `game-rules`: Rules panel and dialog presentation requirements
- `visual-design`: Rules modal SHALL follow vibrant card-based patterns consistent with the rest of the app

## Impact

- `src/components/game-rules/GameRulesPanel.tsx` — section layout, typography, icons, step/role styling
- `src/components/game-rules/GameRulesTrigger.tsx` — dialog content classes, header/footer chrome (trigger unchanged)
- `src/components/game-rules/GameRulesPanel.test.tsx` — updated structure assertions
- `src/messages/en.json` / `it.json` — optional `gameRules.gotIt` dismiss label if footer button added
