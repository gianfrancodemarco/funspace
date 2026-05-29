## Context

Word packs live in `scripts/word-pack-data/{locale}-{category}.mjs` as `[crewWord, spyWord]` tuples. `scripts/build-word-packs.mjs` compiles them to `src/games/impostor/word-packs/data/{locale}/{category}.json`. Impostor and Hangman each register packs in locale index files; Hangman word lists are currently **separate JSON files** that mirror Impostor vocabulary but can drift.

Validation enforces **≥200 pairs** per pack for all four core categories. Theme packs cannot realistically reach 200 entries while staying "famous only" — the validator and content strategy need to change together.

Both games default to **all packs selected** on first setup; new packs appear automatically once registered.

## Goals / Non-Goals

**Goals:**

- Ship three themed packs: `anime`, `movies`, `music` in `en` and `it`
- Anime pack mixes **Japanese anime/manga and Western animation** (mainstream only)
- Movies and Music packs with party-friendly, globally recognizable pairs
- Single build step produces Impostor pairs **and** Hangman word lists from the same source
- Tiered validation: core packs ≥200 pairs; theme packs ≥50 pairs
- i18n labels for all new packs

**Non-Goals:**

- User-created or downloadable packs
- Per-pack enable/disable in presets (still multi-select checkboxes only)
- Spoiler-heavy or 18+ content packs
- `sports`, `video-games`, `science` packs (deferred to next round)
- Changing Impostor/Hangman game rules or setup UX beyond new checkbox options

## Decisions

### 1. Three packs in v1: anime, movies, music

**Why:** User-scoped round — animation (incl. Western), live-action movies/TV, and music. Sports and video games deferred to keep content quality high and avoid a crowded setup screen.

**Alternatives considered:**

- Four packs with sports/video-games — rejected per user scope
- Anime only — too small for a pipeline update

### 2. Anime pack includes Western animation

The `anime` pack ID stays stable, but content and UI label reflect **Anime & Animation**:

- **Japanese:** Dragon Ball, Naruto, One Piece, Pokémon, Sailor Moon, Ghibli, AoT, Demon Slayer, Death Note, MHA, etc.
- **Western:** Disney/Pixar duos (Mickey/Donald, Elsa/Anna), Simpsons, SpongeBob, Avatar: The Last Airbender, Tom & Jerry, etc.

**Boundary with `movies` pack:** Animated *film franchises* that players think of as movies (Marvel, Star Wars) stay in `movies`. Character/series pairs from TV cartoons and anime stay in `anime`.

### 3. Tiered minimum pair counts

| Tier | Pack IDs | Minimum pairs |
|------|----------|---------------|
| Core | `general`, `food`, `animals`, `places` | 200 |
| Theme | `anime`, `movies`, `music` | 50 |

**Why:** Quality curation beats padding. Fifty strong pairs beats 200 with obscure entries.

### 4. Single-source build for Impostor + Hangman

Extend `build-word-packs.mjs` to also write `src/games/hangman/word-lists/data/{locale}/{category}.json`:

- Collect unique words from all `crewWord` and `spyWord` values in a pack
- Normalize for Hangman: lowercase, strip non-letter characters (keep locale letters), drop words shorter than 3 letters or longer than 20
- Sort alphabetically for stable diffs

**Why:** Eliminates manual drift between games. Hangman already uses the same pack IDs.

### 5. Anime pair strategy

Three pair types, in priority order:

1. **Rival/duo within franchise** — `Naruto` / `Sasuke`, `Mickey` / `Donald`
2. **Confusable franchises** — `One Piece` / `Naruto`, `Simpsons` / `Family Guy`
3. **Character vs iconic companion** — `Pikachu` / `Charizard`, `Woody` / `Buzz`

Exclude: seasonal anime, one-cour titles, gacha-only characters, meme-only references.

Target ~60–80 pairs per locale for anime.

### 6. Music pair strategy

1. **Genre pairs** — `Rock` / `Pop`, `Jazz` / `Blues`
2. **Instrument pairs** — `Guitar` / `Piano`, `Drums` / `Violin`
3. **Artist/band pairs (famous only)** — `Beatles` / `Rolling Stones`, `Madonna` / `Lady Gaga`
4. **Confusable acts or eras** — `Elvis` / `Beatles`, `Rap` / `Hip Hop`

Include locale-familiar Italian artists in `it` packs where they aid recognition.

Target ~50–70 pairs per locale for music.

### 7. Locale content approach

- **`en`:** English titles and names as commonly used internationally
- **`it`:** Italian titles where they differ (`L'Attacco dei Giganti`, `Il Re Leone`), otherwise names used in IT fandom/media

Italian packs are **adapted**, not literal translation of every English pair.

### 8. Pack registration and display names

Pack IDs: `anime`, `movies`, `music`. Display names via i18n:

| ID | EN label | IT label (suggested) |
|----|----------|----------------------|
| `anime` | Anime & Animation | Anime e cartoni |
| `movies` | Movies & TV | Film e TV |
| `music` | Music | Musica |

Keys: `impostor.setup.packs.{id}`, `hangman.setup.packs.{id}`.

## Risks / Trade-offs

- **[Risk] Anime pack name misleading** → Mitigation: UI label "Anime & Animation" / "Anime e cartoni"; ID stays `anime`
- **[Risk] Overlap between anime and movies** (e.g. Disney) → Mitigation: character/series in anime; film/franchise titles in movies
- **[Risk] Music pack overlaps General** (Piano/Guitar exist in general) → Mitigation: music pack leans artists/genres/acts; acceptable overlap across packs
- **[Risk] Hangman words too hard** (long names) → Mitigation: build filter drops unsuitable words
- **[Risk] Repeat pairs across packs** → Mitigation: optional dedupe warning in validator (follow-up)

## Migration Plan

1. Add source `.mjs` files and extend build/validate scripts
2. Run build → generates Impostor JSON + Hangman JSON
3. Register packs in index files + i18n
4. Run `npm run validate:word-packs` and `npm test`
5. No localStorage migration — new packs appear on next setup (all selected by default)

Rollback: remove new pack registrations and JSON; revert build script.

## Open Questions

- Add validator **dedupe warning** across packs in this change or follow-up?
- **`sports` / `video-games`:** next content-only change or wait for Taboo engine?

## Decision log

| Date | Decision |
|------|----------|
| 2026-05-29 | Initial scope: anime, movies, sports, video-games |
| 2026-05-29 | **Revised:** anime (incl. Western animation), movies, music; defer sports & video-games |
