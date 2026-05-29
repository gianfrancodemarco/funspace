## ADDED Requirements

### Requirement: Hangman translations

The application SHALL define i18n keys for Hangman setup, play, resolve, word packs, and rules in both English and Italian message files.

#### Scenario: Hangman keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `hangman` for setup, play, resolve, packs, and rules sections

#### Scenario: Hangman keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `hangman` keys exist with Italian translations

#### Scenario: Hangman rules keys in both locales

- **WHEN** a developer inspects message files for Hangman rules
- **THEN** `hangman.rules` contains goal, roles, how-to-play steps, and win condition keys in both English and Italian
