## 1. Build pipeline

- [x] 1.1 Extend `scripts/build-word-packs.mjs` — add `anime`, `movies`, `music` categories; emit Hangman word lists alongside Impostor pairs
- [x] 1.2 Add Hangman word extraction helper in `scripts/word-pack-data/_utils.mjs` (normalize, length filter, dedupe)
- [x] 1.3 Update `scripts/validate-word-packs.mjs` — tiered minimums (200 core, 50 theme) and validate all seven categories per locale

## 2. Word pack content (English)

- [x] 2.1 Create `scripts/word-pack-data/en-anime.mjs` — ≥50 pairs mixing Japanese anime and Western animation (famous only)
- [x] 2.2 Create `scripts/word-pack-data/en-movies.mjs` — ≥50 blockbuster live-action film/TV pairs
- [x] 2.3 Create `scripts/word-pack-data/en-music.mjs` — ≥50 genre/instrument/artist pairs (famous only)

## 3. Word pack content (Italian)

- [x] 3.1 Create `scripts/word-pack-data/it-anime.mjs` — ≥50 pairs (JP + Western; Italian titles/names where appropriate)
- [x] 3.2 Create `scripts/word-pack-data/it-movies.mjs` — ≥50 localized pairs
- [x] 3.3 Create `scripts/word-pack-data/it-music.mjs` — ≥50 pairs (include IT-recognizable artists where appropriate)

## 4. Generate and register packs

- [x] 4.1 Run build script — generate Impostor JSON under `src/games/impostor/word-packs/data/` and Hangman JSON under `src/games/hangman/word-lists/data/`
- [x] 4.2 Register new packs in `src/games/impostor/word-packs/en/index.ts` and `it/index.ts`
- [x] 4.3 Register new lists in `src/games/hangman/word-lists/en/index.ts` and `it/index.ts`

## 5. i18n

- [x] 5.1 Add `impostor.setup.packs` keys for `anime` (Anime & Animation), `movies`, `music` in `en.json` and `it.json`
- [x] 5.2 Add `hangman.setup.packs` keys for the same three IDs in `en.json` and `it.json`

## 6. Verification

- [x] 6.1 Run `npm run validate:word-packs` — all packs pass tiered minimums
- [x] 6.2 Run `npm test` — existing Impostor/Hangman tests pass
- [x] 6.3 Run `npm run build` — production build succeeds
- [x] 6.4 Manual smoke test — new packs appear in Impostor and Hangman setup; words draw from themed packs

## 7. Documentation

- [x] 7.1 Update `docs/games-roadmap.md` decision log — anime/movies/music themed word packs
