## 1. Locale Configuration

- [x] 1.1 Add `it` to `routing.locales` in `src/i18n/routing.ts`
- [x] 1.2 Update middleware matcher in `src/middleware.ts` to include `it`

## 2. Italian Translations

- [x] 2.1 Create `src/messages/it.json` with full Italian translations (all keys from `en.json`)
- [x] 2.2 Add locale selector i18n keys to `en.json` and `it.json` (`locale.en`, `locale.it`, `locale.switch`)

## 3. Language Switcher Component

- [x] 3.1 Create `LanguageSwitcher` component using `usePathname` + `useRouter` from `@/i18n/navigation`
- [x] 3.2 Integrate `LanguageSwitcher` in `Header.tsx` (desktop header + mobile sheet)
- [x] 3.3 Add tests for `LanguageSwitcher` (locale switch navigation)

## 4. Static Hosting & SEO

- [x] 4.1 Update `public/index.html` to redirect to `./it/` when browser language is Italian, else `./en/`
- [x] 4.2 Verify sitemap includes `/it` and `/it/about` after locale registration
- [x] 4.3 Verify Italian pages render correct `lang="it"` and localized metadata

## 5. Verification

- [x] 5.1 Run `npm test` and `npm run lint`
- [x] 5.2 Verify static export build with `GITHUB_PAGES=true npm run build` generates `/it/` routes
