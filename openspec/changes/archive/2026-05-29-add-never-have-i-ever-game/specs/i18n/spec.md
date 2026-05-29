## ADDED Requirements

### Requirement: Never Have I Ever translations

The application SHALL define i18n keys for Never Have I Ever setup, play, resolve, prompt packs, and rules in both English and Italian message files.

#### Scenario: Never Have I Ever keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `neverHaveIEver` for setup, play, resolve, packs, and rules sections

#### Scenario: Never Have I Ever keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `neverHaveIEver` keys exist with Italian translations

#### Scenario: Never Have I Ever rules keys in both locales

- **WHEN** a developer inspects message files for Never Have I Ever rules
- **THEN** `neverHaveIEver.rules` contains goal, roles, how-to-play steps, and session-end keys in both English and Italian

#### Scenario: Spicy pack confirmation copy in both locales

- **WHEN** a developer inspects message files for the Spicy 18+ pack
- **THEN** confirmation copy for enabling adult content exists in both English and Italian
