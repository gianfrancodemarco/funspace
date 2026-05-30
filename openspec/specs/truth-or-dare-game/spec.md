## Purpose

Define Truth or Dare as a shared-screen social prompt game with separate truth and dare decks, prompt modes, and session flow.

## Requirements

### Requirement: Separate Truth and Dare deck selection

The Truth or Dare game engine SHALL build two independent shuffled decks — one for truths and one for dares — from the union of selected locale-specific prompt packs at game start.

#### Scenario: Truths from selected packs

- **WHEN** a game starts with one or more prompt packs selected
- **THEN** the engine merges all truths from those packs into a single shuffled truth deck without duplicates

#### Scenario: Dares from selected packs

- **WHEN** a game starts with one or more prompt packs selected
- **THEN** the engine merges all dares from those packs into a single shuffled dare deck without duplicates

#### Scenario: English prompt content

- **WHEN** a game is played under `/en/games/truth-or-dare`
- **THEN** prompts are drawn from English truth and dare decks

#### Scenario: Italian prompt content

- **WHEN** a game is played under `/it/games/truth-or-dare`
- **THEN** prompts are drawn from Italian truth and dare decks

### Requirement: Prompt mode configuration

The Truth or Dare setup phase SHALL allow selecting a prompt mode that controls whether users choose Truth or Dare each turn, are restricted to one type, or receive a random assignment.

#### Scenario: Both mode shows choice

- **WHEN** a session is configured with prompt mode `both`
- **THEN** each turn presents Truth and Dare choice controls before displaying a prompt

#### Scenario: Truth only mode skips choice

- **WHEN** a session is configured with prompt mode `truth_only`
- **THEN** each turn draws directly from the truth deck without a Truth/Dare choice step

#### Scenario: Dare only mode skips choice

- **WHEN** a session is configured with prompt mode `dare_only`
- **THEN** each turn draws directly from the dare deck without a Truth/Dare choice step

#### Scenario: Random mode assigns type

- **WHEN** a session is configured with prompt mode `random`
- **THEN** each turn randomly assigns truth or dare from non-exhausted pools before displaying the prompt

### Requirement: Prompt navigation during play

During play, the Truth or Dare engine SHALL present one prompt at a time and advance through the active deck without repeating prompts until that deck is exhausted.

#### Scenario: Next prompt advances deck

- **WHEN** a user taps Next on the current prompt
- **THEN** the next prompt from the appropriate deck is displayed and the played count for that type increases

#### Scenario: Skip prompt advances deck

- **WHEN** a user taps Skip on the current prompt
- **THEN** the current prompt is not shown again in the session and the next prompt is displayed

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

The Truth or Dare setup phase SHALL allow configuring player selection, prompt packs, prompt mode, and optional player picker via presets, with validation for player count and pack selection.

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

#### Scenario: Player picker toggle available

- **WHEN** a user configures a custom session
- **THEN** a toggle is available to show or hide the optional player picker during play

### Requirement: Shared-screen play UI

The Truth or Dare play phase SHALL display the current prompt prominently on a single shared screen with type indication, navigation controls, and session progress.

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

#### Scenario: Optional player picker shown when enabled

- **WHEN** the session is configured with player picker enabled
- **THEN** the play UI displays roster player names for the group to highlight who is up for the current turn

### Requirement: Truth or Dare resolve screen

When a session ends, the resolve phase SHALL summarize the session and offer rematch or exit.

#### Scenario: Session summary on resolve

- **WHEN** a Truth or Dare session ends by user action or deck exhaustion
- **THEN** the resolve screen displays the number of truths played and dares played in the session

#### Scenario: Rematch starts new decks

- **WHEN** a user selects rematch after a completed session
- **THEN** a new session starts with the same players and configuration but newly shuffled truth and dare decks

#### Scenario: Session complete animation

- **WHEN** the Truth or Dare resolve screen mounts
- **THEN** the win end-animation variant plays above the session summary headline

### Requirement: Truth or Dare shell integration

Truth or Dare SHALL use the game shell with play and resolve phases only (no reveal phase).

#### Scenario: No reveal phase

- **WHEN** a user starts a Truth or Dare game from setup
- **THEN** the shell proceeds directly to the play phase without a reveal phase

### Requirement: Truth or Dare in-app rules

Truth or Dare SHALL register rules content via the shared game rules system.

#### Scenario: Rules key prefix registered

- **WHEN** a developer inspects the Truth or Dare game definition
- **THEN** `rulesKeyPrefix` is set to `truthOrDare.rules`

#### Scenario: Rules explain verbal play

- **WHEN** a user opens Truth or Dare rules during setup
- **THEN** the rules explain that the app provides prompts, the group picks who answers or acts, and there is no app-tracked winner
