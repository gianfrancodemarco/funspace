## ADDED Requirements

### Requirement: Prompt deck selection

The Never Have I Ever game engine SHALL build a shuffled deck from the union of selected locale-specific prompt packs at game start.

#### Scenario: Prompts from selected packs

- **WHEN** a game starts with one or more prompt packs selected
- **THEN** the engine merges prompts from those packs into a single shuffled deck without duplicates

#### Scenario: English prompt content

- **WHEN** a game is played under `/en/games/never-have-i-ever`
- **THEN** prompts are drawn from English prompt decks

#### Scenario: Italian prompt content

- **WHEN** a game is played under `/it/games/never-have-i-ever`
- **THEN** prompts are drawn from Italian prompt decks

### Requirement: Prompt navigation during play

During play, the Never Have I Ever engine SHALL present one prompt at a time and advance through the deck without repeating prompts until the deck is exhausted.

#### Scenario: Next prompt advances deck

- **WHEN** a user taps Next on the current prompt
- **THEN** the next prompt in the shuffled deck is displayed and the played count increases

#### Scenario: Skip prompt advances deck

- **WHEN** a user taps Skip on the current prompt
- **THEN** the current prompt is not shown again in the session and the next prompt is displayed

#### Scenario: No repeat until deck exhausted

- **WHEN** prompts remain in the shuffled deck
- **THEN** each prompt appears at most once per session

#### Scenario: Deck exhaustion ends play

- **WHEN** the last prompt in the deck has been shown and the user taps Next
- **THEN** the game status becomes complete and the shell transitions to resolve

### Requirement: Never Have I Ever setup configuration

The Never Have I Ever setup phase SHALL allow configuring player selection and prompt packs via presets, with validation for player count and pack selection.

#### Scenario: Non-adult packs default selected

- **WHEN** a user opens Never Have I Ever setup for the first time
- **THEN** all non-adult prompt packs are selected by default and the Spicy pack is not selected

#### Scenario: At least one prompt pack required

- **WHEN** a user attempts to deselect all prompt packs
- **THEN** the setup form prevents starting

#### Scenario: Player count validated

- **WHEN** a user attempts to start with fewer than 3 or more than 20 players
- **THEN** the setup form prevents starting and shows a validation message

#### Scenario: Spicy pack requires confirmation

- **WHEN** a user selects the Spicy 18+ prompt pack
- **THEN** the setup UI displays a confirmation before the pack is included in the session

#### Scenario: Icebreaker preset selects Classic only

- **WHEN** a user selects the Icebreaker preset
- **THEN** only the Classic prompt pack is selected

### Requirement: Shared-screen play UI

The Never Have I Ever play phase SHALL display the current prompt prominently on a single shared screen with navigation controls and session progress.

#### Scenario: Prompt displayed prominently

- **WHEN** a user is in the Never Have I Ever play phase
- **THEN** the current prompt is displayed as the primary content on the shared screen

#### Scenario: Progress indicator visible

- **WHEN** a user is viewing a prompt during play
- **THEN** a progress indicator shows how many prompts have been played in the session

#### Scenario: End session control available

- **WHEN** a user is in the Never Have I Ever play phase
- **THEN** an End session control is available to finish early and proceed to resolve

### Requirement: Never Have I Ever resolve screen

When a session ends, the resolve phase SHALL summarize the session and offer rematch or exit.

#### Scenario: Session summary on resolve

- **WHEN** a Never Have I Ever session ends by user action or deck exhaustion
- **THEN** the resolve screen displays the number of prompts played in the session

#### Scenario: Rematch starts new deck

- **WHEN** a user selects rematch after a completed session
- **THEN** a new session starts with the same players and configuration but a newly shuffled deck

#### Scenario: Session complete animation

- **WHEN** the Never Have I Ever resolve screen mounts
- **THEN** the win end-animation variant plays above the session summary headline

### Requirement: Never Have I Ever shell integration

Never Have I Ever SHALL use the game shell with play and resolve phases only (no reveal phase).

#### Scenario: No reveal phase

- **WHEN** a user starts a Never Have I Ever game from setup
- **THEN** the shell proceeds directly to the play phase without a reveal phase

### Requirement: Never Have I Ever in-app rules

Never Have I Ever SHALL register rules content via the shared game rules system.

#### Scenario: Rules key prefix registered

- **WHEN** a developer inspects the Never Have I Ever game definition
- **THEN** `rulesKeyPrefix` is set to `neverHaveIEver.rules`

#### Scenario: Rules explain verbal response

- **WHEN** a user opens Never Have I Ever rules during setup
- **THEN** the rules explain that players respond in person (e.g. putting a finger down) and the app only provides prompts
