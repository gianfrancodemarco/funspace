## ADDED Requirements

### Requirement: Question Impostor translation namespace

The application SHALL provide English and Italian translation keys for Question Impostor under `games.questionImpostor`, `questionImpostor`, and related pack name keys.

#### Scenario: English game strings

- **WHEN** a user plays Question Impostor under `/en/games/question-impostor`
- **THEN** setup, reveal, play, resolve, and rules UI strings are displayed in English

#### Scenario: Italian game strings

- **WHEN** a user plays Question Impostor under `/it/games/question-impostor`
- **THEN** setup, reveal, play, resolve, and rules UI strings are displayed in Italian

#### Scenario: Answer type hints localized

- **WHEN** a player views their reveal
- **THEN** the answer-type hint label is translated for the active locale

#### Scenario: Question pack names localized

- **WHEN** a user views Question Impostor setup pack labels
- **THEN** pack names are resolved from i18n keys, not hardcoded English strings in components
