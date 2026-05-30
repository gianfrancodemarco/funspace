## ADDED Requirements

### Requirement: Paired-option deck selection

The Would You Rather game engine SHALL build a shuffled deck from the union of selected locale-specific dilemma packs at game start. Each dilemma SHALL consist of two options (option A and option B).

#### Scenario: Dilemmas from selected packs

- **WHEN** a game starts with one or more dilemma packs selected
- **THEN** the engine merges dilemmas from those packs into a single shuffled deck without duplicates

#### Scenario: English dilemma content

- **WHEN** a game is played under `/en/games/would-you-rather`
- **THEN** dilemmas are drawn from English dilemma decks

#### Scenario: Italian dilemma content

- **WHEN** a game is played under `/it/games/would-you-rather`
- **THEN** dilemmas are drawn from Italian dilemma decks

### Requirement: Dilemma navigation during play

During play, the Would You Rather engine SHALL present one dilemma at a time and advance through the deck without repeating dilemmas until the deck is exhausted.

#### Scenario: Next dilemma advances deck

- **WHEN** a user taps Next on the current dilemma
- **THEN** the next dilemma in the shuffled deck is displayed and the played count increases

#### Scenario: Skip dilemma advances deck

- **WHEN** a user taps Skip on the current dilemma
- **THEN** the current dilemma is not shown again in the session and the next dilemma is displayed

#### Scenario: No repeat until deck exhausted

- **WHEN** dilemmas remain in the shuffled deck
- **THEN** each dilemma appears at most once per session

#### Scenario: Deck exhaustion ends play

- **WHEN** the last dilemma in the deck has been shown and the user taps Next
- **THEN** the game status becomes complete and the shell transitions to resolve

### Requirement: Would You Rather setup configuration

The Would You Rather setup phase SHALL allow configuring player selection and dilemma packs via presets, with validation for player count and pack selection.

#### Scenario: Non-adult packs default selected

- **WHEN** a user opens Would You Rather setup for the first time
- **THEN** all non-adult dilemma packs are selected by default and the Spicy pack is not selected

#### Scenario: At least one pack required

- **WHEN** a user attempts to deselect all dilemma packs
- **THEN** the setup form prevents starting

#### Scenario: Player count validated

- **WHEN** a user attempts to start with fewer than 3 or more than 20 players
- **THEN** the setup form prevents starting and shows a validation message

#### Scenario: Spicy pack requires confirmation

- **WHEN** a user selects the Spicy 18+ dilemma pack
- **THEN** the setup UI displays a confirmation before the pack is included in the session

#### Scenario: Classic preset selects Classic pack only

- **WHEN** a user selects the Classic preset
- **THEN** only the Classic dilemma pack is selected

### Requirement: Shared-screen play UI

The Would You Rather play phase SHALL display the current dilemma prominently on a single shared screen with both options visible, navigation controls, and session progress.

#### Scenario: Both options displayed

- **WHEN** a user is in the Would You Rather play phase viewing a dilemma
- **THEN** option A and option B are both visible with equal visual prominence

#### Scenario: Progress indicator visible

- **WHEN** a user is viewing a dilemma during play
- **THEN** a progress indicator shows how many dilemmas have been played in the session

#### Scenario: End session control available

- **WHEN** a user is in the Would You Rather play phase
- **THEN** an End session control is available to finish early and proceed to resolve

### Requirement: Would You Rather resolve screen

When a session ends, the resolve phase SHALL summarize the session and offer rematch or exit.

#### Scenario: Session summary on resolve

- **WHEN** a Would You Rather session ends by user action or deck exhaustion
- **THEN** the resolve screen displays the number of dilemmas played in the session

#### Scenario: Rematch starts new deck

- **WHEN** a user selects rematch after a completed session
- **THEN** a new session starts with the same players and configuration but a newly shuffled dilemma deck

#### Scenario: Session complete animation

- **WHEN** the Would You Rather resolve screen mounts
- **THEN** the win end-animation variant plays above the session summary headline

### Requirement: Would You Rather shell integration

Would You Rather SHALL use the game shell with play and resolve phases only (no reveal phase).

#### Scenario: No reveal phase

- **WHEN** a user starts a Would You Rather game from setup
- **THEN** the shell proceeds directly to the play phase without a reveal phase

### Requirement: Would You Rather in-app rules

Would You Rather SHALL register rules content via the shared game rules system.

#### Scenario: Rules key prefix registered

- **WHEN** a developer inspects the Would You Rather game definition
- **THEN** `rulesKeyPrefix` is set to `wouldYouRather.rules`

#### Scenario: Rules explain verbal debate

- **WHEN** a user opens Would You Rather rules during setup
- **THEN** the rules explain that the app shows two options, the group debates and picks verbally, and there is no app-tracked winner
