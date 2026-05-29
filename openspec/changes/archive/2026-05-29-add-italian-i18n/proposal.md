## Why

FunSpace was built with i18n infrastructure but only ships English. Italian-speaking users need a localized experience, and all users need a way to switch languages without manually editing URLs.

## What Changes

- Add **Italian (`it`)** as a second locale with a full `messages/it.json` translation file
- Register `it` in the central `next-intl` routing configuration
- Add a **language selector** in the app header (desktop and mobile menu) that switches locale while preserving the current page path
- Update **SEO artifacts** (sitemap, metadata) to include Italian routes
- Update **static hosting redirect** (`public/index.html`) to respect browser language or default to English
- Add tests for locale switching and Italian message loading

## Capabilities

### New Capabilities

<!-- None — extending existing i18n and app-shell capabilities -->

### Modified Capabilities

- `i18n`: Add Italian locale, language selector UI, and locale-aware HTML `lang` attribute for Italian pages
- `app-shell`: Expose language selector in header (desktop inline + mobile menu)
- `seo`: Include Italian locale URLs in sitemap and per-locale metadata

## Impact

- `src/i18n/routing.ts` — add `it` to locales list
- `src/messages/it.json` — new translation file (mirror of `en.json`)
- `src/components/layout/Header.tsx` — language selector component
- New `LanguageSwitcher` component (or similar)
- `src/app/sitemap.ts` — already iterates locales; will pick up `it` automatically once registered
- `src/app/[locale]/layout.tsx` — `generateStaticParams` picks up new locale automatically
- `public/index.html` — may need locale-aware redirect logic
- Tests updated for multi-locale navigation
