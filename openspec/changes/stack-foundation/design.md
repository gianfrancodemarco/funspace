## Context

FunSpace is a greenfield frontend-only party game platform. Product decisions are documented in `docs/product-vision.md`. This change establishes the initial codebase: tooling, folder layout, app shell with navigation, homepage catalog preview, **SEO**, and **i18n (English first)**. No games, storage layer, or backend are included.

## Goals / Non-Goals

**Goals:**

- Bootstrap **Next.js (App Router)** + React + TypeScript with Tailwind CSS and shadcn/ui
- Define a scalable folder structure that separates catalog, core infrastructure, and per-game modules
- Ship a mobile-first app shell with persistent header navigation
- Ship a homepage that communicates FunSpace's purpose and previews upcoming games
- **Configure SEO** for discoverability (metadata, Open Graph, sitemap, robots)
- **Set up i18n from day one** with English as the default locale; all user-facing copy via translation files
- Configure path aliases, linting, and Vitest so future changes can add tests immediately
- Install XState and Zod as declared dependencies (used in follow-up changes)

**Non-Goals:**

- Implementing playable games or game routes
- StoragePort / localStorage adapter
- Game shell, reveal loop, or XState machines for games
- Additional locales beyond English (infrastructure only — no `it.json` yet)
- PWA, deployment pipelines, or CI
- Dark mode / theme switching (use shadcn default light theme)
- Backend, auth, or analytics

## Decisions

### 1. Next.js (App Router) over Vite SPA

**Decision:** Use Next.js with the App Router for SSG/SSR-capable pages and built-in SEO APIs.

**Rationale:** User requires SEO from the start. Next.js provides:
- `metadata` export / `generateMetadata` for title, description, Open Graph
- Static generation for catalog and marketing pages
- Locale-based routing pairs naturally with i18n (`/en/...`)
- Still supports client-heavy game pages later (`"use client"`)

**Alternative considered:** Vite SPA + meta tags — insufficient for search engine indexing of content pages.

### 2. next-intl for internationalization

**Decision:** Use `next-intl` with locale-prefixed routes. Default locale: **`en`**.

**Routing:**

| URL | Page |
|-----|------|
| `/en` | Homepage (catalog preview) |
| `/en/about` | About FunSpace |

**Middleware:** Redirect `/` → `/en` (default locale).

**Messages:** All user-facing strings in `messages/en.json`. Components use `useTranslations()` — no hardcoded UI copy in components.

**Future locales:** Add `messages/it.json` and register `it` in routing config — no component rewrites needed.

**Alternative considered:** react-i18next — works but next-intl integrates better with App Router and RSC.

### 3. SEO strategy

**Decision:** Implement SEO at the foundation layer for all public pages.

| Mechanism | Scope |
|-----------|-------|
| `metadata` / `generateMetadata` | Per-page title, description, Open Graph |
| `app/sitemap.ts` | Dynamic sitemap listing public routes (`/en`, `/en/about`) |
| `app/robots.ts` | Allow indexing of public pages |
| Semantic HTML | `<main>`, `<header>`, `<nav>`, heading hierarchy |
| `html lang="en"` | Set on locale layout |

Homepage metadata example:
- **Title:** FunSpace — Party Games for Friends
- **Description:** In-person party games you can play with a single phone. No signup required.

Game landing pages (`/en/games/:id`) are reserved for a future change but the sitemap pattern should be easy to extend.

**Alternative considered:** Client-only meta via react-helmet — worse crawlability; rejected.

### 4. App Router file structure

```
src/
├── app/
│   ├── layout.tsx              # root layout (minimal)
│   ├── robots.ts
│   ├── sitemap.ts
│   └── [locale]/
│       ├── layout.tsx          # AppShell, next-intl provider, html lang
│       ├── page.tsx            # Homepage
│       └── about/
│           └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   └── layout/                 # AppShell, Header, MobileMenu
├── catalog/
│   ├── types.ts
│   └── games.ts                # placeholder data (keys reference i18n)
├── core/
│   ├── game-shell/             # .gitkeep
│   ├── secret-delivery/        # .gitkeep
│   └── storage/                # .gitkeep
├── games/                      # .gitkeep
├── i18n/
│   ├── routing.ts              # locales, defaultLocale
│   └── request.ts              # next-intl server config
├── lib/
│   └── utils.ts
├── messages/
│   └── en.json                 # all English copy
└── middleware.ts               # locale detection + redirect
```

**Rationale:** Mirrors product vision architecture. App Router replaces React Router. i18n messages live outside components.

### 5. shadcn/ui for components

**Decision:** Initialize shadcn/ui with the default style, `neutral` base color, CSS variables enabled.

**Components to add for this change:**

- `Button` — CTAs on homepage
- `Sheet` — mobile slide-out menu
- `Card` — game preview cards

**Note:** shadcn supports Next.js App Router — use `"use client"` only on interactive components (Sheet, mobile menu).

### 6. App shell and mobile menu

**Decision:** Fixed top header with logo/title on the left and a hamburger menu on mobile. Menu opens a `Sheet` from the right with navigation links.

**Desktop (≥ md breakpoint):** Inline nav links in the header (no hamburger).

**Menu items (i18n keys):**

- `nav.home` → `/en`
- `nav.about` → `/en/about`

**Rationale:** Mobile-first party use case. Navigation labels come from `messages/en.json`.

### 7. Homepage content

**Decision:** Homepage sections (all copy from i18n):

1. **Hero** — FunSpace title, tagline (*"Party games for friends, one phone"*)
2. **Game grid** — cards from `catalog/games.ts` (3 games: Impostor, Hangman, Never Have I Ever)
3. **Coming soon** badge on cards; cards are not clickable yet

**Catalog + i18n pattern:** `games.ts` holds structural data (id, tags, player counts, status). Display names and descriptions use i18n keys (`games.impostor.name`, `games.impostor.description`).

```typescript
interface GameMeta {
  id: string
  nameKey: string       // i18n key
  descriptionKey: string
  tags: string[]
  minPlayers: number
  maxPlayers: number
  status: "coming-soon" | "available"
}
```

### 8. Path alias

**Decision:** `@/` maps to `src/` via Next.js and TypeScript config.

### 9. Dependencies installed but unused in this change

XState and Zod are installed now to lock stack versions; no machines or schemas until game changes land.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Next.js adds complexity vs Vite SPA | Use static pages where possible; client components only for interactive UI |
| i18n overhead with only English | Low cost now; avoids string extraction refactor later |
| Empty `core/` and `games/` folders feel premature | `.gitkeep` + documented in design |
| Placeholder games if deployed publicly | "Coming soon" badge; cards not navigable |
| Locale prefix in every URL (`/en/...`) | Standard next-intl pattern; middleware redirects `/` → `/en` |

## Migration Plan

Not applicable — greenfield. After merge:

1. `npm install`
2. `npm run dev` — verify homepage, menu, `/en` routing
3. `npm run build` — verify static generation
4. `npm test` — verify test runner
5. Inspect page source — confirm metadata and `lang="en"` in HTML

## Open Questions

- **Branding/colors:** shadcn neutral defaults for now; visual identity TBD
- **Additional locales:** Italian likely next — add when content is ready
- **Deployment:** Vercel assumed; config optional in this change
