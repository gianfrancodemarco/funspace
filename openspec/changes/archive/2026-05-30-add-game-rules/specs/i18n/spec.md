## ADDED Requirements

### Requirement: Game rules translations

The application SHALL define i18n keys for shared game rules UI and per-game rules content. All keys MUST exist in both `messages/en.json` and `messages/it.json`.

#### Scenario: Shared rules keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `gameRules` for the rules trigger and dialog chrome

#### Scenario: Shared rules keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `gameRules` keys exist with Italian translations

#### Scenario: Impostor rules keys in both locales

- **WHEN** a developer inspects message files for Impostor rules
- **THEN** `impostor.rules` contains goal, roles, how-to-play steps, and win condition keys in both English and Italian
