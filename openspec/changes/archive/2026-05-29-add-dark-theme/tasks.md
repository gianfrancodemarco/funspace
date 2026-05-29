## 1. Dependencies & CSS

- [x] 1.1 Install `next-themes`
- [x] 1.2 Add `.dark { ... }` color tokens to `globals.css` (shadcn neutral dark palette)

## 2. Theme Infrastructure

- [x] 2.1 Create `ThemeProvider` client component wrapping `next-themes` provider
- [x] 2.2 Create `Providers` component combining `ThemeProvider` for use in locale layout
- [x] 2.3 Update `[locale]/layout.tsx` — wrap with `Providers`, add `suppressHydrationWarning` on `<html>`

## 3. Theme Toggle UI

- [x] 3.1 Create `ThemeToggle` client component (cycle light → dark → system)
- [x] 3.2 Add theme toggle to desktop header
- [x] 3.3 Add theme toggle to mobile Sheet menu
- [x] 3.4 Add i18n strings to `messages/en.json` (`theme.toggle`, `theme.light`, `theme.dark`, `theme.system`)

## 4. Verification

- [x] 4.1 Add unit test for `ThemeToggle` rendering with mocked `next-themes`
- [x] 4.2 Verify light/dark/system modes visually or via class assertion in test
- [x] 4.3 Verify `npm run build` and `npm test` pass
