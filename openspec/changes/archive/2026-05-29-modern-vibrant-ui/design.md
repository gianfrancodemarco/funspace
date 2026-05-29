## Context

FunSpace ships with shadcn/ui "neutral" tokens — grayscale primary, flat white cards, minimal hero. The layout is already mobile-first (responsive grid, sheet menu) but visually understated. This change establishes a cohesive **party-game visual identity** while preserving accessibility, dark mode, and existing component architecture.

## Goals / Non-Goals

**Goals:**

- Modern, vibrant, slightly colorful UI that feels **fun and social**
- **Mobile-first** — design for narrow viewports first, enhance at `sm`/`md`/`lg`
- Consistent **design token system** in CSS variables (light + dark)
- Colorful but **accessible** — sufficient contrast on text and interactive elements
- Per-game **accent colors** on catalog cards for visual variety
- Polished hero, header, cards, tags, and about page

**Non-Goals:**

- Custom illustrations or icon sets per game (use color accents only for now)
- Animation-heavy motion design (subtle transitions OK)
- Rebrand / logo design (wordmark styling only)
- Changing information architecture or adding new pages
- Gameplay UI (game shell comes later)

## Decisions

### 1. Color palette — violet party theme

**Decision:** Adopt a **violet/indigo primary** with **multi-hue accents** for tags and game cards.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| Primary | Violet ~`oklch(0.55 0.22 280)` | Lighter violet ~`oklch(0.72 0.18 280)` | Brand, links, active nav |
| Background | Soft violet tint ~`oklch(0.98 0.01 280)` | Deep blue-violet ~`oklch(0.16 0.03 280)` | Page bg |
| Accent | Coral ~`oklch(0.68 0.18 25)` | Same hue, adjusted L | Highlights, badges |
| Card | White / slight tint | Elevated dark surface | Game cards |

**Tag colors** (consistent mapping):

| Tag | Hue |
|-----|-----|
| deduction | Purple |
| bluff | Orange |
| words | Sky blue |
| social | Pink |
| quick | Teal |

**Game accent colors** (top border / icon circle):

| Game | Accent |
|------|--------|
| impostor | Orange-red |
| hangman | Blue |
| never-have-i-ever | Pink |

**Alternative considered:** Full rainbow per card — rejected as too chaotic; controlled accents per game + tags.

### 2. Typography & spacing

**Decision:**

- Hero title: `text-4xl sm:text-5xl font-extrabold` with gradient text on "FunSpace"
- Section headings: `text-2xl sm:text-3xl font-bold`
- Body: comfortable line-height, `text-base` on mobile
- Page padding: `px-4 py-8 sm:px-6 sm:py-10`
- Card internal padding increased slightly; min touch target 44px for icon buttons

### 3. Hero section treatment

**Decision:** Full-width hero band inside main with:

- Subtle **gradient background** (`from-primary/10 via-accent/5 to-background`)
- Rounded container (`rounded-2xl`) with padding
- Gradient text on brand name using `bg-clip-text text-transparent`
- Tagline in muted foreground, larger on `sm+`

### 4. Game card redesign

**Decision:**

- Add `accentColor` field to `GameMeta` (CSS class key or token name)
- Card: colored **top border** (4px) using game accent
- Remove flat `opacity-90` — use full opacity with subtle shadow
- Tags use **semantic tag colors** from mapping
- "Coming soon" badge: accent-colored pill instead of gray muted
- Optional subtle `hover:shadow-md` for depth (no navigation)

### 5. Header refresh

**Decision:**

- Brand link uses primary color / gradient on hover
- Active nav link: primary color + subtle underline or font-semibold
- Header: light backdrop blur retained; optional thin primary-tinted border
- Theme toggle and menu button unchanged functionally

### 6. About page

**Decision:** Match homepage spacing and section styling — hero-style title band, feature list with colored bullet dots using primary/accent.

### 7. shadcn base color

**Decision:** Update `components.json` baseColor from `neutral` to `violet` where applicable; override tokens in `globals.css` for fine control.

### 8. Responsive strategy (mobile-first)

**Decision:** All new styles written mobile-default, enhanced with `sm:`, `md:`, `lg:`:

| Breakpoint | Behavior |
|------------|----------|
| Default | Single column, centered hero text, full-width cards |
| `sm` | Larger type, hero text left-aligned |
| `md` | Desktop nav visible, 2-column grid |
| `lg` | 3-column game grid |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Too colorful / unprofessional | Limit saturation; one primary hue + controlled accents |
| Dark mode contrast failures | Test primary/text pairs; adjust oklch lightness |
| Gradient text accessibility | Tagline remains solid color; gradient decorative on title only |
| Tag color proliferation | Central mapping in `lib/tag-colors.ts` |

## Migration Plan

Visual-only change. Deploy as frontend update. No data migration.

## Open Questions

- None blocking — palette defined above; can tune exact oklch values during implementation
