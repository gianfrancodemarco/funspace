## 1. Storage Infrastructure

- [ ] 1.1 Create `src/core/storage/` — `StoragePort` interface, `keys.ts`, `LocalStorageAdapter`
- [ ] 1.2 Export default storage instance and test `LocalStorageAdapter` with mock localStorage

## 2. Player Roster Core

- [ ] 2.1 Create `src/core/player-roster/` — types, `PlayerRosterRepository`, Zod schema for roster shape
- [ ] 2.2 Implement `usePlayerRoster` hook with hydration-safe client-only reads/writes
- [ ] 2.3 Add unit tests for repository CRUD operations

## 3. i18n

- [ ] 3.1 Add roster translation keys to `messages/en.json` and `messages/it.json`
- [ ] 3.2 Add Players page metadata keys for SEO

## 4. Players Page UI

- [ ] 4.1 Create `/[locale]/players/page.tsx` with roster list, add, remove, rename
- [ ] 4.2 Create roster UI components (list item, add form, empty state)
- [ ] 4.3 Add component tests for roster interactions

## 5. Navigation & Integration

- [ ] 5.1 Add Players link to `Header.tsx` (desktop + mobile)
- [ ] 5.2 Update sitemap to include `/players` route for both locales

## 6. Verification

- [ ] 6.1 Run `npm test` and `npm run lint`
- [ ] 6.2 Verify static export build includes `/en/players` and `/it/players`
