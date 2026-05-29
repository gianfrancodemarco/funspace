## Why

FunSpace currently uses a neutral, minimal shadcn default that reads as a generic scaffold rather than a lively party-game product. A modern, vibrant visual refresh will better match the brand (social, in-person, fun) and improve first impressions — especially on mobile, where most users will play.

## What Changes

- Replace **neutral grayscale tokens** with a **vibrant color palette** (violet primary, colorful accents) in light and dark modes
- Redesign the **homepage hero** with gradient background, stronger typography, and party-game personality
- Enhance **game cards** with per-game accent colors, improved hierarchy, and polished hover/focus states (still non-navigable)
- Refresh **app shell** header and about page styling to match the new visual language
- Add **colorful tag badges** mapped to tag categories
- Strengthen **mobile-first responsive** spacing, typography scale, and touch targets across all public pages
- Introduce shared **design tokens** (`accentColor` on games, CSS custom properties for brand colors)
- Update **tests** that assert on structure/classes where needed

## Capabilities

### New Capabilities

- `visual-design`: Brand color system, typography, spacing, and mobile-first responsive standards applied globally

### Modified Capabilities

- `homepage`: Vibrant hero treatment and colorful game card presentation
- `app-shell`: Modern header styling consistent with the new brand look

## Impact

- Modified: `globals.css`, `components.json` (base color), homepage, about page, `GameCard`, `Header`, `catalog/types.ts`, `catalog/games.ts`
- No new dependencies expected
- Dark theme must remain fully supported with a vibrant (not washed-out) dark palette
- SEO, i18n, routing, and game logic unchanged
