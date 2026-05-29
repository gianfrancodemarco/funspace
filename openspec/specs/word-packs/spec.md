# word-packs Specification

## Purpose
TBD - created by archiving change add-word-packs. Update Purpose after archive.
## Requirements
### Requirement: Themed word pack catalog

The application SHALL provide themed word packs in addition to the four core packs (`general`, `food`, `animals`, `places`). The v1 themed packs SHALL be: `anime`, `movies`, and `music`.

#### Scenario: Themed packs available in Impostor setup

- **WHEN** a user opens Impostor setup under any supported locale
- **THEN** word pack checkboxes include Anime & Animation, Movies & TV, and Music alongside the core packs

#### Scenario: Themed packs available in Hangman setup

- **WHEN** a user opens Hangman setup under any supported locale
- **THEN** word pack checkboxes include Anime & Animation, Movies & TV, and Music alongside the core packs

### Requirement: Locale-specific themed content

Each themed word pack SHALL have locale-specific content for English (`en`) and Italian (`it`).

#### Scenario: English themed pairs

- **WHEN** a game is played under an English locale route
- **THEN** themed pack word pairs or words are drawn from English pack data

#### Scenario: Italian themed pairs

- **WHEN** a game is played under an Italian locale route
- **THEN** themed pack word pairs or words are drawn from Italian pack data

### Requirement: Anime and animation pack curation

The `anime` word pack SHALL contain globally mainstream Japanese anime, manga, and Western animation references recognizable to casual party players.

#### Scenario: Famous Japanese franchises

- **WHEN** the anime pack is built and validated
- **THEN** entries include widely known Japanese franchises and characters (e.g. Dragon Ball, Naruto, One Piece, Pokémon, Sailor Moon, Attack on Titan, Demon Slayer, Death Note, My Hero Academia, Studio Ghibli titles)

#### Scenario: Famous Western animation

- **WHEN** the anime pack is built and validated
- **THEN** entries also include widely known Western animated series and characters (e.g. Disney/Pixar characters, The Simpsons, SpongeBob, Avatar: The Last Airbender)

#### Scenario: No obscure deep cuts

- **WHEN** reviewing anime pack source data
- **THEN** seasonal, niche, or single-season titles that lack broad recognition are excluded

### Requirement: Music pack curation

The `music` word pack SHALL contain globally recognizable genres, instruments, and artists suitable for in-person party play.

#### Scenario: Famous acts and genres

- **WHEN** the music pack is built and validated
- **THEN** entries include well-known genres, instruments, and artists or bands (e.g. Rock, Pop, Guitar, Piano, Beatles, Rolling Stones)

#### Scenario: No obscure deep cuts

- **WHEN** reviewing music pack source data
- **THEN** niche subgenres or little-known one-hit acts are excluded

### Requirement: Tiered pack size validation

Word pack validation SHALL enforce tiered minimum pair counts: core packs at least 200 pairs; themed packs at least 50 pairs.

#### Scenario: Core pack minimum

- **WHEN** `validate:word-packs` runs against a core pack (`general`, `food`, `animals`, `places`)
- **THEN** validation fails if the pack has fewer than 200 valid pairs

#### Scenario: Theme pack minimum

- **WHEN** `validate:word-packs` runs against a themed pack (`anime`, `movies`, `music`)
- **THEN** validation fails if the pack has fewer than 50 valid pairs

### Requirement: Single-source build for Impostor and Hangman

The word pack build script SHALL generate Impostor pair JSON and Hangman word list JSON from the same source files.

#### Scenario: Hangman lists derived from pairs

- **WHEN** the build script processes a word pack source file
- **THEN** it writes Impostor `{ crewWord, spyWord }` pairs and a deduplicated Hangman word list derived from those pair strings

#### Scenario: Hangman unsuitable words filtered

- **WHEN** a word from a pair is shorter than 3 characters, longer than 20 characters, or contains no letters after normalization
- **THEN** it is excluded from the Hangman word list for that pack

### Requirement: New packs default selected

When themed packs are added, setup flows SHALL continue to default to all available packs selected.

#### Scenario: First visit after themed packs ship

- **WHEN** a user opens Impostor or Hangman setup without a saved pack selection
- **THEN** core and themed packs are all selected by default

