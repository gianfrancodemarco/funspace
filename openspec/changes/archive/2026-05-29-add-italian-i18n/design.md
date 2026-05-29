## Context

FunSpace uses `next-intl` with locale-prefixed routing (`/en/...`). English is the only registered locale today. All UI copy lives in `messages/en.json`. The header has theme toggle and navigation but no language control. Middleware matcher is hardcoded to `en` only. GitHub Pages serves a static redirect from `/funspace/` to `/funspace/en/`.

The i18n infrastructure was designed to be extensible — adding a locale is mostly configuration + translations + a switcher UI.

## Goals / Non-Goals

**Goals:**

- Register Italian (`it`) as a second locale
- Provide full Italian translations for all existing UI strings
- Add a language selector in the header (desktop + mobile menu)
- Switch locale while preserving the current page path (e.g. `/en/about` → `/it/about`)
- Include Italian routes in sitemap and set correct `lang` attribute
- Update middleware and static redirect for the new locale

**Non-Goals:**

- Auto-detect locale from browser on every visit (beyond the static root redirect)
- Persist locale preference in localStorage (URL is the source of truth; next-intl cookie is optional future work)
- Translate game content packs or dynamic game data (only shell/catalog UI copy for now)
- Add locales beyond English and Italian
- hreflang link tags (can be a follow-up SEO enhancement)

## Decisions

### 1. Locale registration in central routing config

Add `"it"` to `routing.locales` in `src/i18n/routing.ts`. Keep `defaultLocale: "en"`.

**Why:** Single source of truth; `generateStaticParams`, sitemap, and middleware all derive from this list.

**Alternative considered:** Separate locale config file — unnecessary duplication.

### 2. Language switcher via next-intl navigation helpers

Create a `LanguageSwitcher` client component using `usePathname()` and `useRouter()` from `@/i18n/navigation`. On selection, call `router.replace(pathname, { locale })`.

**Why:** Built-in next-intl pattern; preserves current route segment without manual URL construction.

**Alternative considered:** Plain `<a href>` links — works on static export but doesn't integrate with next-intl's locale-aware routing as cleanly.

### 3. Compact toggle-style UI (EN | IT)

Use a small segmented control or select showing locale codes/labels. Place beside `ThemeToggle` on desktop; inside the mobile sheet on mobile.

**Why:** Only two locales — a dropdown is overkill; segmented buttons are scannable and match the minimal header.

**Alternative considered:** Flag icons — adds asset dependency; locale codes are clear enough for two languages.

### 4. Italian message file mirrors English structure

Create `src/messages/it.json` with identical keys to `en.json`. All values translated to Italian.

**Why:** next-intl loads messages by locale filename; key parity ensures no missing translations at runtime.

### 5. Middleware matcher update

Change middleware matcher from `/(en)/:path*` to `/(en|it)/:path*`.

**Why:** Current matcher would not run locale detection/redirect logic for `/it` routes in dev.

### 6. Static root redirect with browser language hint

Update `public/index.html` to redirect to `./it/` when `navigator.language` starts with `it`, otherwise `./en/`.

**Why:** GitHub Pages has no middleware; this gives Italian users a sensible default on first visit to the project root.

**Alternative considered:** Always redirect to English — worse UX for Italian users.

### 7. Locale labels in i18n

Add `locale.en` and `locale.it` keys (e.g. "English", "Italiano") plus `locale.switch` for accessibility label.

**Why:** Switcher labels should themselves be translatable and accessible.

## Risks / Trade-offs

- **[Risk] Incomplete Italian translations** → Mirror every key from `en.json`; verify with a key-parity check or test
- **[Risk] Middleware matcher drift when adding locales** → Derive matcher from `routing.locales` or document the coupling in tasks
- **[Risk] Static export doesn't run middleware** → Rely on explicit locale URLs; root redirect handles only `/funspace/`
- **[Trade-off] URL-based locale vs persisted preference** → Users must use switcher or locale-prefixed URL; acceptable for v1
