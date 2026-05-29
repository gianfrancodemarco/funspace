## Why

FunSpace has product vision and architecture decisions documented, but no runnable application yet. We need a scaffolded frontend with the agreed tech stack, a clear folder structure for future games, a minimal homepage with navigation, **SEO-friendly pages from day one**, and **i18n infrastructure with English as the launch language** — so every subsequent change (games, storage, game shell) has a stable base to build on.

## What Changes

- Initialize a **Next.js (App Router) + React + TypeScript** project with **Tailwind CSS** and **shadcn/ui**
- Add core dependencies aligned with the product vision: **XState**, **Zod**, **next-intl**
- Configure **SEO basics**: per-page metadata, Open Graph tags, `robots.txt`, and `sitemap.xml`
- Set up **i18n from the start** with **English (`en`) as the default and only locale** for now; translation file structure ready for additional locales
- Establish the **project folder structure** (`core/`, `games/`, `catalog/`, `components/`, etc.) with placeholder modules
- Implement a **mobile-first app shell** with header navigation (menu)
- Implement a **homepage** that introduces FunSpace and lists placeholder game cards (catalog preview, no playable games yet)
- Configure **Vitest** and **Testing Library** for unit/component tests
- Add basic tooling: ESLint, path aliases, README with dev commands

## Capabilities

### New Capabilities

- `app-shell`: Application layout, routing, header menu, and mobile-first navigation chrome
- `homepage`: Landing/catalog preview page showing FunSpace branding and placeholder game entries
- `project-scaffold`: Repository structure, build tooling, and dependency baseline for all future work
- `i18n`: Internationalization infrastructure with English as the default locale
- `seo`: Search-engine optimization for public pages (metadata, sitemap, robots)

### Modified Capabilities

<!-- None — greenfield project -->

## Impact

- Creates the entire frontend codebase from scratch (no existing application code)
- New dependencies: Next.js, React, Tailwind, shadcn/ui, XState, Zod, next-intl, Vitest
- Static/SSR deploy target (Vercel recommended) — deployment config may be added but is not required in this change
- No backend, no storage implementation, no game logic — those are follow-up changes
- Supersedes the earlier Vite SPA decision in favor of Next.js for SEO and locale routing
