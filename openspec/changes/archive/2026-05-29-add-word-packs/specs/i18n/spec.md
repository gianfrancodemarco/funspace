## ADDED Requirements

### Requirement: Themed word pack display names

The application SHALL define i18n keys for themed word pack display names in both English and Italian message files.

#### Scenario: Impostor themed pack labels in English

- **WHEN** a user views Impostor setup in English
- **THEN** keys exist under `impostor.setup.packs` for `anime`, `movies`, and `music`

#### Scenario: Impostor themed pack labels in Italian

- **WHEN** a user views Impostor setup in Italian
- **THEN** the same themed pack keys exist with Italian translations under `impostor.setup.packs`

#### Scenario: Hangman themed pack labels in English

- **WHEN** a user views Hangman setup in English
- **THEN** keys exist under `hangman.setup.packs` for `anime`, `movies`, and `music`

#### Scenario: Hangman themed pack labels in Italian

- **WHEN** a user views Hangman setup in Italian
- **THEN** the same themed pack keys exist with Italian translations under `hangman.setup.packs`

#### Scenario: Anime label reflects Western animation

- **WHEN** a user views the `anime` pack label in English
- **THEN** the display name conveys both anime and Western animation (e.g. "Anime & Animation")
