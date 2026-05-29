## ADDED Requirements

### Requirement: Game shell translations

The application SHALL define i18n keys for game shell UI in both English and Italian message files.

#### Scenario: Shell keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist for reveal flow, setup validation, phase chrome, and rematch actions

#### Scenario: Shell keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same game shell keys exist with Italian translations
