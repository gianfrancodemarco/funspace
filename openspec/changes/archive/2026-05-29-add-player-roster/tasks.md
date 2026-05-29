## 1. Storage Infrastructure

- [x] 1.1 Create `src/core/storage/` — `StoragePort` interface, `keys.ts`, `LocalStorageAdapter`
- [x] 1.2 Export default storage instance and test `LocalStorageAdapter` with mock localStorage

## 2. Player Roster Core

- [x] 2.1 Create `src/core/player-roster/` — types, `PlayerRosterRepository`, Zod schema for roster shape
- [x] 2.2 Implement `usePlayerRoster` hook with hydration-safe client-only reads/writes
- [x] 2.3 Add unit tests for repository CRUD operations

## 3. i18n

- [x] 3.1 Add roster translation keys to `messages/en.json` and `messages/it.json`
- [x] 3.2 Add Players page metadata keys for SEO

## 4. Players Page UI

- [x] 4.1 Create `/[locale]/players/page.tsx` with roster list, add, remove, rename
- [x] 4.2 Create roster UI components (list item, add form, empty state)
- [x] 4.3 Add component tests for roster interactions

## 5. Navigation & Integration

- [x] 5.1 Add Players link to `Header.tsx` (desktop + mobile)
- [x] 5.2 Update sitemap to include `/players` route for both locales

## 6. Verification

- [x] 6.1 Run `npm test` and `npm run lint`
- [x] 6.2 Verify static export build with `GITHUB_PAGES=true npm run build` generates `/en/players` and `/it/players`
