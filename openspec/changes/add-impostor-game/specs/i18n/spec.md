## ADDED Requirements

### Requirement: Impostor game translations

The application SHALL define i18n keys for Impostor game UI in both English and Italian message files.

#### Scenario: Impostor keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist for setup presets, role labels, reveal messages, play instructions, elimination, resolve, and word pack names

#### Scenario: Impostor keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same Impostor keys exist with Italian translations
