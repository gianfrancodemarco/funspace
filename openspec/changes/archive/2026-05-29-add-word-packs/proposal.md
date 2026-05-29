## Why

Impostor and Hangman share four word packs (General, Food, Animals, Places). Players who finish a few sessions see repeats quickly, and there is no themed content for common party-night interests (animation, movies, music). Adding curated theme packs increases replay value with minimal engine change — the pack registry, setup UI, and build pipeline already exist.

## What Changes

- Add **three new themed word packs** (see Pack proposals below), available in **English and Italian**
- Extend the word-pack **build script** and **validator** for new categories and tiered size rules (theme packs vs core packs)
- Register new packs in **Impostor** and **Hangman** word list registries
- Add **i18n** display names for new packs (`en` + `it`)
- Derive Hangman word lists from Impostor pairs via the build script (single source of truth)
- Update **games roadmap** decision log

### Pack proposals

| ID | Name | Ship? | Example pairs (Impostor) | Notes |
|----|------|-------|---------------------------|-------|
| **`anime`** | Anime & Animation | ✓ | `Naruto` / `Sasuke`, `Goku` / `Vegeta`, `Mickey` / `Donald`, `Elsa` / `Anna` | **Famous only** — Japanese anime/manga **and** Western animation (Disney, Pixar, Avatar, Simpsons, etc.). No deep cuts or seasonal niche titles. |
| **`movies`** | Movies & TV | ✓ | `Star Wars` / `Star Trek`, `Batman` / `Superman`, `Friends` / `Seinfeld`, `Harry Potter` / `Lord of the Rings` | Live-action blockbusters and household-name TV. Animated films that are iconically *movie* franchises (e.g. Marvel) live here; character duos from cartoons live in `anime`. |
| **`music`** | Music | ✓ | `Rock` / `Pop`, `Guitar` / `Piano`, `Beatles` / `Rolling Stones`, `Drake` / `Kanye` | Artists, genres, instruments, and famous acts — recognizable at a party without niche deep cuts. |
| `sports` | Sports | Defer | `Football` / `Rugby`, `Real Madrid` / `Barcelona` | Next content round. |
| `video-games` | Video Games | Defer | `Mario` / `Luigi`, `Minecraft` / `Roblox` | Next content round. |
| `science` | Science & Nature | Defer | `Mars` / `Venus`, `Atom` / `Molecule` | Overlaps Animals/General. |

**v1 scope:** ship **`anime`**, **`movies`**, **`music`**. Defer `sports`, `video-games`, and `science`.

### Anime & Animation curation rules

- Include only **top-tier global recognition** — if a casual player at a party might not know it, exclude it
- **Mix Japanese and Western:** shōnen/global anime (Dragon Ball, Naruto, One Piece, Pokémon, Ghibli, etc.) **plus** Western staples (Disney/Pixar characters, Simpsons, SpongeBob, Avatar, etc.)
- Prefer **pairs within the same franchise** (rivals, duo partners) or **easily confusable series** for spy decoys
- Use **official English titles** in `en` packs; **Italian titles or widely used Italian names** in `it` packs
- No adult/heavy-violence-only series as primary pair labels unless mainstream (e.g. Attack on Titan is OK as a title; avoid graphic terms)
- Target **≥50 quality pairs** for theme packs (see design for tiered minimums)

### Music curation rules

- Genres, instruments, and **globally famous artists/bands** only
- Pairs should be easy to describe in clues (avoid obscure subgenres or one-hit deep cuts)
- Locale-aware where it matters (Italian artists well known in IT: e.g. Vasco, Jovanotti alongside international acts)

## Capabilities

### New Capabilities

- `word-packs`: Shared themed word pack content, build pipeline, validation tiers, and availability in Impostor + Hangman

### Modified Capabilities

- `i18n`: New pack display name keys for Impostor and Hangman in `en` and `it`

## Impact

- `scripts/word-pack-data/` — new `{locale}-{pack}.mjs` source files (6 new files: 3 packs × 2 locales)
- `scripts/build-word-packs.mjs` — new categories + Hangman word list generation
- `scripts/validate-word-packs.mjs` — tiered minimum pair counts
- `src/games/impostor/word-packs/{en,it}/index.ts` — register new packs
- `src/games/hangman/word-lists/{en,it}/index.ts` — register new lists
- `src/messages/en.json`, `src/messages/it.json` — pack labels
- `docs/games-roadmap.md` — content milestone note
- No game engine or shell behavior changes beyond more pack IDs in setup checkboxes
