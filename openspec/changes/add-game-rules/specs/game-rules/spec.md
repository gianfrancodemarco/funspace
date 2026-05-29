## ADDED Requirements

### Requirement: Shared rules section structure

The application SHALL provide a shared rules presentation component that renders game rules in a fixed section order: goal, roles, how to play, and win conditions.

#### Scenario: Sections rendered in order

- **WHEN** a game with configured rules content is displayed in the rules panel
- **THEN** the user sees goal, roles, how to play, and win conditions sections in that order

#### Scenario: Scrollable rules on small screens

- **WHEN** rules content exceeds the viewport height
- **THEN** the rules panel allows scrolling without breaking layout

### Requirement: Game rules i18n contract

Playable games MAY register rules content by setting a `rulesKeyPrefix` on their game definition. The shared rules component SHALL load all copy from translation keys under that prefix.

#### Scenario: Rules loaded from translation keys

- **WHEN** a game definition sets `rulesKeyPrefix` to `impostor.rules`
- **THEN** the rules panel displays strings from the `impostor.rules` namespace in the active locale

#### Scenario: Game without rules prefix

- **WHEN** a game definition omits `rulesKeyPrefix`
- **THEN** no rules entry point is shown during setup

### Requirement: Rules dialog entry point

The shared rules UI SHALL expose a user-triggered control (e.g. "How to play") that opens rules content without leaving the setup phase.

#### Scenario: Open rules from setup

- **WHEN** a user is on the setup phase of a game with rules configured
- **THEN** they can open a dialog showing the full rules content

#### Scenario: Close rules and continue setup

- **WHEN** a user closes the rules dialog
- **THEN** they remain on the setup phase with their prior configuration intact

### Requirement: Shared rules chrome translations

The application SHALL define i18n keys for shared rules UI chrome (trigger label, dialog title fallback, section headings where shared) in English and Italian.

#### Scenario: Rules trigger in English

- **WHEN** a user views setup under `/en/games/...` for a game with rules
- **THEN** the rules trigger label is displayed in English

#### Scenario: Rules trigger in Italian

- **WHEN** a user views setup under `/it/games/...` for a game with rules
- **THEN** the rules trigger label is displayed in Italian
