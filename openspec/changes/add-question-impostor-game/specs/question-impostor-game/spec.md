## ADDED Requirements

### Requirement: Question Impostor role assignment

The Question Impostor game engine SHALL assign each session player exactly one role: civilian or impostor, based on the configured impostor count. The game SHALL NOT include a spy role.

#### Scenario: Roles assigned at game start

- **WHEN** a game starts with a valid impostor count
- **THEN** each player receives either civilian or impostor and impostors do not know each other's identities

#### Scenario: At least one civilian required

- **WHEN** a user configures an impostor count equal to or greater than the player count
- **THEN** the setup form prevents starting and shows a validation message

### Requirement: Question pair selection

The Question Impostor game engine SHALL select a random question pair from the union of selected locale-specific question packs.

#### Scenario: Pair from selected packs

- **WHEN** a game starts with one or more question packs selected
- **THEN** the engine picks a random pair containing crew and impostor questions from those packs

#### Scenario: Locale-specific question content

- **WHEN** a game is played under `/en/games/question-impostor`
- **THEN** questions are drawn from English question packs

#### Scenario: Italian question content

- **WHEN** a game is played under `/it/games/question-impostor`
- **THEN** questions are drawn from Italian question packs

### Requirement: Compatible answer types in pairs

Each question pair SHALL declare an `answerType` and impostor questions SHALL be authored so answers are plausibly similar in kind to the crew question (e.g. both numeric).

#### Scenario: Answer type shown on reveal

- **WHEN** a player views their reveal
- **THEN** they see their question text and a short answer-type hint derived from `answerType`

#### Scenario: Pair metadata present

- **WHEN** the engine loads a pair from a pack
- **THEN** the pair includes `crewQuestion`, `impostorQuestion`, and `answerType`

### Requirement: Private role reveal

Each player SHALL receive role-appropriate question text during the reveal phase.

#### Scenario: Civilian sees crew question

- **WHEN** a civilian views their reveal
- **THEN** they see the crew question for this session

#### Scenario: Impostor sees impostor question

- **WHEN** an impostor views their reveal
- **THEN** they see the impostor question and an answer-type hint, not the crew question

### Requirement: Question Impostor setup configuration

The setup phase SHALL allow configuring player selection, impostor count, question packs, and presets. The setup phase SHALL NOT expose spy count or spy-related presets.

#### Scenario: Classic preset

- **WHEN** a user selects the Classic preset
- **THEN** impostor count is set to 1

#### Scenario: Question packs default to all selected

- **WHEN** a user opens Question Impostor setup for the first time
- **THEN** all available question packs are selected by default

#### Scenario: At least one question pack required

- **WHEN** a user attempts to deselect all question packs
- **THEN** the setup form prevents starting

### Requirement: Free-form play phase

During the play phase, the app SHALL display alive players and verbal-play instructions without enforcing timers or structured clue rounds.

#### Scenario: Alive players shown

- **WHEN** a user is in the Question Impostor play phase
- **THEN** alive player names are listed and roles are not shown

#### Scenario: Elimination flow

- **WHEN** the facilitator eliminates a player
- **THEN** that player is removed from the alive list and their role is not revealed until resolve

### Requirement: Win detection

After each elimination, the engine SHALL check win conditions for civilians versus impostors only.

#### Scenario: Civilians win

- **WHEN** no impostors remain alive
- **THEN** the game transitions to resolve with civilians as the winning side

#### Scenario: Impostors win

- **WHEN** only impostors remain alive
- **THEN** the game transitions to resolve with impostors as the winning side

#### Scenario: Game continues

- **WHEN** at least one impostor and one civilian remain alive
- **THEN** play continues

### Requirement: Resolve reveal

The resolve phase SHALL reveal all roles, both questions from the pair, and optional reference answers for the host behind a disclosure control.

#### Scenario: Full role reveal

- **WHEN** a user reaches resolve
- **THEN** every player's role is visible as civilian or impostor only

#### Scenario: Reference answers optional

- **WHEN** a user expands the reference-answers control on resolve
- **THEN** crew and impostor reference answers from the pair are shown if present in pack data

### Requirement: Rematch

Rematch SHALL reuse the last player list and configuration while assigning new roles and a new question pair.

#### Scenario: Rematch starts new round

- **WHEN** a user chooses rematch from resolve
- **THEN** a new session begins with the same players and config but a new shuffle of roles and pair
