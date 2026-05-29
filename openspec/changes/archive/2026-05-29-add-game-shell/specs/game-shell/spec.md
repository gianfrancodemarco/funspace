## ADDED Requirements

### Requirement: Game phase lifecycle

The game shell SHALL support a shared phase lifecycle: setup, optional reveal, play, resolve, and optional rematch.

#### Scenario: Phase progression

- **WHEN** a game session completes setup and the game definition includes a reveal phase
- **THEN** the shell transitions through reveal, play, and resolve in order

#### Scenario: Skip unused phases

- **WHEN** a game definition does not include a reveal phase
- **THEN** the shell skips reveal and proceeds from setup to play

### Requirement: Game session model

The game shell SHALL create a session-scoped player list with stable player IDs and a shuffled turn order for each new game.

#### Scenario: Session player IDs assigned

- **WHEN** a game session starts with selected player names
- **THEN** each player receives a unique session-scoped ID distinct from their display name

#### Scenario: Turn order shuffled

- **WHEN** a game session starts
- **THEN** player order is shuffled once for reveal and turn-order purposes

### Requirement: Game registry

The application SHALL maintain a registry mapping game IDs to game definitions.

#### Scenario: Known game ID resolves

- **WHEN** a user navigates to `/en/games/shell-demo`
- **THEN** the shell loads the registered game definition for `shell-demo`

#### Scenario: Unknown game ID

- **WHEN** a user navigates to `/en/games/unknown-game`
- **THEN** a not-found response is shown

### Requirement: Player selection setup

The game shell setup phase SHALL allow selecting participants from the global player roster.

#### Scenario: Select players from roster

- **WHEN** a user starts game setup with saved roster names
- **THEN** they can select which roster names participate in the session

#### Scenario: Validate player count

- **WHEN** a user attempts to start a game with fewer than the game's minimum players
- **THEN** the shell prevents starting and shows a validation message

#### Scenario: Empty roster guidance

- **WHEN** a user starts game setup with no saved roster names
- **THEN** the shell directs them to add players on the Players page

### Requirement: Game shell layout chrome

The game shell SHALL provide shared layout chrome for in-game pages including navigation back to the catalog.

#### Scenario: Back to home

- **WHEN** a user is on any in-game phase screen
- **THEN** a control is available to return to the homepage

#### Scenario: Game title displayed

- **WHEN** a user is in an active game session
- **THEN** the current game's name is visible in the shell chrome

### Requirement: Rematch flow

The game shell SHALL offer rematch and exit options after the resolve phase.

#### Scenario: Rematch restarts session

- **WHEN** a user selects rematch after a completed game
- **THEN** a new session starts with the same selected players and a new shuffled order

#### Scenario: Exit returns to catalog

- **WHEN** a user exits after resolve
- **THEN** they return to the homepage

### Requirement: Shell demo game

The application SHALL include a registered shell demo game that exercises the full shell lifecycle for validation.

#### Scenario: Shell demo playable

- **WHEN** a user launches the shell demo game and completes all phases
- **THEN** they experience setup, reveal, play, and resolve using the shared shell

### Requirement: Game shell internationalization

All game shell UI strings SHALL be loaded from i18n translation files.

#### Scenario: English shell UI

- **WHEN** a user plays a game under `/en/games/...`
- **THEN** shell chrome and reveal flow strings are displayed in English

#### Scenario: Italian shell UI

- **WHEN** a user plays a game under `/it/games/...`
- **THEN** shell chrome and reveal flow strings are displayed in Italian
