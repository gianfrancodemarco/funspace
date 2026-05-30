## MODIFIED Requirements

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
- **THEN** `truthOrDare.rules` keys exist in both English and Italian

#### Scenario: Turn and skip strings in play and resolve

- **WHEN** a developer inspects message files for Truth or Dare
- **THEN** keys exist for active-player turn label (e.g. `truthOrDare.play.currentTurn`) and per-player skip display on resolve (e.g. `truthOrDare.resolve.skips`) in both locales
