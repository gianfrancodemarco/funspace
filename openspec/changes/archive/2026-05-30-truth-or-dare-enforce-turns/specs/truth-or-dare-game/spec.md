## MODIFIED Requirements

### Requirement: Prompt navigation during play

During play, the Truth or Dare engine SHALL present one prompt at a time and advance through the active deck without repeating prompts until that deck is exhausted. After each turn completes (Next or Skip), the engine SHALL advance to the next player in round-robin order.

#### Scenario: Next prompt advances deck

- **WHEN** a user taps Next on the current prompt
- **THEN** the next prompt from the appropriate deck is displayed and the played count for that type increases

#### Scenario: Skip prompt advances deck

- **WHEN** a user taps Skip on the current prompt
- **THEN** the current prompt is not shown again in the session and the next prompt is displayed

#### Scenario: Skip increments active player skip count

- **WHEN** a user taps Skip during a turn
- **THEN** the skip count for the currently active player increases by one

#### Scenario: Next advances turn rotation

- **WHEN** a user taps Next after a prompt turn completes
- **THEN** the active player advances to the next player in turn order (wrapping to the first player after the last)

#### Scenario: Skip advances turn rotation

- **WHEN** a user taps Skip after a prompt turn completes
- **THEN** the active player advances to the next player in turn order

#### Scenario: No repeat until deck exhausted

- **WHEN** prompts remain in the active shuffled deck
- **THEN** each prompt in that deck appears at most once per session

#### Scenario: Deck exhaustion ends play

- **WHEN** all applicable decks for the selected prompt mode are exhausted and the user taps Next
- **THEN** the game status becomes complete and the shell transitions to resolve

#### Scenario: Random mode uses remaining pool

- **WHEN** prompt mode is `random` and one deck type is exhausted
- **THEN** subsequent turns draw only from the non-exhausted deck type

### Requirement: Truth or Dare setup configuration

The Truth or Dare setup phase SHALL allow configuring player selection, prompt packs, and prompt mode via presets, with validation for player count and pack selection. Turn rotation is always enforced and SHALL NOT be configurable via a player-picker toggle.

#### Scenario: Non-adult packs default selected

- **WHEN** a user opens Truth or Dare setup for the first time
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

#### Scenario: Classic preset selects Classic pack and both mode

- **WHEN** a user selects the Classic preset
- **THEN** only the Classic prompt pack is selected and prompt mode is `both`

#### Scenario: No optional player picker toggle

- **WHEN** a user configures a Truth or Dare session in setup
- **THEN** no toggle is shown to disable turn enforcement — turns are always active

### Requirement: Shared-screen play UI

The Truth or Dare play phase SHALL display the current prompt prominently on a single shared screen with type indication, navigation controls, session progress, and the active player's turn.

#### Scenario: Prompt displayed prominently

- **WHEN** a user is in the Truth or Dare play phase viewing a prompt
- **THEN** the current prompt is displayed as the primary content on the shared screen

#### Scenario: Prompt type indicated

- **WHEN** a prompt is displayed during play
- **THEN** a visible label indicates whether the prompt is a Truth or a Dare

#### Scenario: Progress indicator visible

- **WHEN** a user is viewing a prompt during play
- **THEN** a progress indicator shows how many truths and dares have been played in the session

#### Scenario: End session control available

- **WHEN** a user is in the Truth or Dare play phase
- **THEN** an End session control is available to finish early and proceed to resolve

#### Scenario: Active player turn displayed

- **WHEN** a user is in the Truth or Dare play phase
- **THEN** the play UI displays which player's turn it is according to round-robin order

#### Scenario: Active player is not manually selectable

- **WHEN** a user views the active player indicator during play
- **THEN** the indicator is read-only and cannot be changed by tapping other player names

### Requirement: Truth or Dare resolve screen

When a session ends, the resolve phase SHALL summarize the session and offer rematch or exit.

#### Scenario: Session summary on resolve

- **WHEN** a Truth or Dare session ends by user action or deck exhaustion
- **THEN** the resolve screen displays the number of truths played and dares played in the session

#### Scenario: Per-player skip counts on resolve

- **WHEN** a Truth or Dare session ends
- **THEN** the resolve screen displays each player's skip count for the session

#### Scenario: Rematch starts new decks

- **WHEN** a user selects rematch after a completed session
- **THEN** a new session starts with the same players and configuration but newly shuffled truth and dare decks and reset skip counts

#### Scenario: Session complete animation

- **WHEN** the Truth or Dare resolve screen mounts
- **THEN** the win end-animation variant plays above the session summary headline

## ADDED Requirements

### Requirement: Round-robin turn order

The Truth or Dare engine SHALL initialize a turn order from session players at game start and SHALL track the current turn index. Turn order SHALL follow session player order unless a future preset explicitly shuffles it.

#### Scenario: Turn order initialized at start

- **WHEN** a Truth or Dare game starts with N players
- **THEN** the engine stores a turn order of N player IDs and sets the active turn to the first player

#### Scenario: Turn wraps after last player

- **WHEN** the active turn is the last player in turn order and a turn completes via Next or Skip
- **THEN** the active turn returns to the first player in turn order

#### Scenario: Skip counts initialized to zero

- **WHEN** a Truth or Dare game starts
- **THEN** every player in turn order has a skip count of zero
