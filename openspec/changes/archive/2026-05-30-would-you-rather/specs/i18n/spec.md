## ADDED Requirements

### Requirement: Would You Rather translations

The application SHALL define i18n keys for Would You Rather setup, play, resolve, dilemma packs, and rules in both English and Italian message files.

#### Scenario: Would You Rather keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `wouldYouRather` for setup, play, resolve, packs, and rules sections

#### Scenario: Would You Rather keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `wouldYouRather` keys exist with Italian translations

#### Scenario: Catalog keys in both locales

- **WHEN** a developer inspects message files
- **THEN** `games.wouldYouRather.name` and `games.wouldYouRather.description` exist in English and Italian
