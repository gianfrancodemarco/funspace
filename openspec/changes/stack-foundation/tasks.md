## 1. Project Bootstrap

- [x] 1.1 Scaffold Next.js (App Router) + React + TypeScript project at repository root
- [x] 1.2 Install runtime dependencies: `next-intl`, `xstate`, `@xstate/react`, `zod`
- [x] 1.3 Install and configure Tailwind CSS with PostCSS (shadcn-compatible)
- [x] 1.4 Initialize shadcn/ui for Next.js (default style, neutral base, CSS variables) and add `Button`, `Sheet`, `Card` components
- [x] 1.5 Configure `@/` path alias in `tsconfig.json` and Next.js config
- [x] 1.6 Configure Vitest + Testing Library with test setup file
- [x] 1.7 Add README with install, dev, build, and test commands

## 2. i18n Setup

- [x] 2.1 Configure `next-intl` with routing module (`locales: ['en']`, `defaultLocale: 'en'`)
- [x] 2.2 Add `middleware.ts` for locale detection and redirect `/` → `/en`
- [x] 2.3 Create `messages/en.json` with all UI copy (nav, hero, about, game names/descriptions, badges)
- [x] 2.4 Set up `[locale]` dynamic segment layout with `NextIntlClientProvider` and `lang="en"` on `<html>`

## 3. SEO Setup

- [x] 3.1 Add `metadata` export on homepage and about page (title, description, Open Graph)
- [x] 3.2 Create `app/sitemap.ts` listing `/en` and `/en/about`
- [x] 3.3 Create `app/robots.ts` allowing indexing of public pages
- [x] 3.4 Use semantic HTML (`header`, `nav`, `main`, proper heading hierarchy) on public pages

## 4. Folder Structure

- [x] 4.1 Create `src/components/ui/` (shadcn) and `src/components/layout/`
- [x] 4.2 Create `src/app/[locale]/page.tsx` (homepage) and `src/app/[locale]/about/page.tsx`
- [x] 4.3 Create `src/catalog/types.ts` with `GameMeta` (i18n keys) and `src/catalog/games.ts` with three placeholder games
- [x] 4.4 Create `src/core/game-shell/`, `src/core/secret-delivery/`, `src/core/storage/` with `.gitkeep`
- [x] 4.5 Create `src/games/` with `.gitkeep`
- [x] 4.6 Create `src/lib/utils.ts` with `cn()` helper

## 5. App Shell & Navigation

- [x] 5.1 Implement `AppShell` layout in `[locale]/layout.tsx` wrapping page content
- [x] 5.2 Implement `Header` with FunSpace branding
- [x] 5.3 Implement mobile menu using shadcn `Sheet` (hamburger → slide-out nav links)
- [x] 5.4 Implement desktop inline nav links (visible at `md` breakpoint and above)
- [x] 5.5 Implement `AboutPage` with brief FunSpace description (all copy from i18n)

## 6. Homepage

- [x] 6.1 Implement hero section with title and tagline from `messages/en.json`
- [x] 6.2 Implement `GameCard` component displaying name, description, tags, player count, and "Coming soon" badge
- [x] 6.3 Implement responsive game grid on homepage using catalog placeholder data + i18n keys
- [x] 6.4 Ensure game cards are not navigable (disabled / no link)

## 7. Verification

- [x] 7.1 Add smoke test for homepage rendering hero and game cards
- [x] 7.2 Add smoke test for app shell header rendering
- [x] 7.3 Verify `npm run dev`, `npm run build`, and `npm test` all pass
- [x] 7.4 Verify `/` redirects to `/en` and page source contains metadata + `lang="en"`
