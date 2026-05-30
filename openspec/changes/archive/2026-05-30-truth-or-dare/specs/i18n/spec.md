## ADDED Requirements

### Requirement: Truth or Dare translations

The application SHALL define i18n keys for Truth or Dare setup, play, resolve, prompt packs, prompt modes, and rules in both English and Italian message files.

#### Scenario: Truth or Dare keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `truthOrDare` for setup, play, resolve, packs, modes, and rules sections

#### Scenario: Truth or Dare keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `truthOrDare` keys exist with Italian translations

#### Scenario: Truth or Dare rules keys in both locales

- **WHEN** a developer inspects message files for Truth or Dare rules
- **THEN** `truthOrDare.rules` contains goal, roles, how-to-play steps, and session-end keys in both English and Italian

#### Scenario: Spicy pack confirmation copy in both locales

- **WHEN** a developer inspects message files for the Spicy 18+ pack
- **THEN** confirmation copy for enabling adult content exists in both English and Italian

#### Scenario: Prompt mode labels in both locales

- **WHEN** a developer inspects message files for Truth or Dare prompt modes
- **THEN** labels for both, truth only, dare only, and random modes exist in both English and Italian
