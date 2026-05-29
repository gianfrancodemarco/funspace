## ADDED Requirements

### Requirement: Impostor role assignment

The Impostor game engine SHALL assign each session player exactly one role: civilian, impostor, or spy, based on configured counts.

#### Scenario: Roles assigned at game start

- **WHEN** a game starts with valid impostor and spy counts
- **THEN** each player receives one role and impostors do not know each other's identities

#### Scenario: At least one civilian required

- **WHEN** a user configures impostor and spy counts such that no civilian would remain
- **THEN** the setup form prevents starting and shows a validation message

### Requirement: Word pair selection

The Impostor game engine SHALL select a random word pair from the union of selected locale-specific word packs.

#### Scenario: Word pair from selected packs

- **WHEN** a game starts with one or more word packs selected
- **THEN** the engine picks a random crew/spy word pair from those packs

#### Scenario: Locale-specific word content

- **WHEN** a game is played under `/en/games/impostor`
- **THEN** word pairs are drawn from English word packs

#### Scenario: Italian word content

- **WHEN** a game is played under `/it/games/impostor`
- **THEN** word pairs are drawn from Italian word packs

### Requirement: Private role reveal

Each player SHALL receive role-appropriate secret information during the reveal phase.

#### Scenario: Civilian sees crew word

- **WHEN** a civilian views their reveal
- **THEN** they see the crew word for this session

#### Scenario: Spy sees similar word

- **WHEN** a spy views their reveal
- **THEN** they see the spy decoy word, not the crew word

#### Scenario: Impostor sees no word

- **WHEN** an impostor views their reveal
- **THEN** they see an impostor message and no secret word

### Requirement: Impostor setup configuration

The Impostor setup phase SHALL allow configuring player selection, impostor count, spy count, word packs, and presets.

#### Scenario: Preset applies configuration

- **WHEN** a user selects the Classic preset
- **THEN** impostor count is set to 1 and spy count to 0

#### Scenario: Word packs default to all selected

- **WHEN** a user opens Impostor setup for the first time
- **THEN** all available word packs are selected by default

#### Scenario: At least one word pack required

- **WHEN** a user attempts to deselect all word packs
- **THEN** the setup form prevents starting

### Requirement: Free-form play phase

During the play phase, the app SHALL display alive players and instructions without enforcing timers or clue rounds.

#### Scenario: Alive players shown

- **WHEN** a user is in the Impostor play phase
- **THEN** a list of alive player names is visible

#### Scenario: No timer enforced

- **WHEN** a user is in the Impostor play phase
- **THEN** no countdown timer is displayed or required

### Requirement: In-app elimination tracking

The Impostor play phase SHALL allow marking a player as eliminated when the group decides in real life.

#### Scenario: Eliminate a player

- **WHEN** the facilitator selects a player and confirms elimination
- **THEN** that player is removed from the alive set

#### Scenario: Role hidden on elimination

- **WHEN** a player is eliminated during play
- **THEN** their role is not revealed until the resolve phase

### Requirement: Win detection

The Impostor engine SHALL detect win conditions after each elimination.

#### Scenario: Civilians win

- **WHEN** all impostors have been eliminated
- **THEN** the game ends with a civilian-side victory

#### Scenario: Impostors win

- **WHEN** only impostors remain alive
- **THEN** the game ends with an impostor victory

#### Scenario: Game continues

- **WHEN** neither win condition is met after an elimination
- **THEN** play continues with the updated alive player list

### Requirement: Resolve with full reveal

The resolve phase SHALL reveal all roles, the word pair, and the winning side.

#### Scenario: Full role reveal

- **WHEN** the game reaches the resolve phase
- **THEN** every player's role and the crew/spy words are displayed

#### Scenario: Rematch restarts game

- **WHEN** a user selects rematch after resolve
- **THEN** a new session starts with the same players and configuration but new roles, word, and shuffle

### Requirement: Player limits

Impostor SHALL support 3 to 20 players per session.

#### Scenario: Minimum players enforced

- **WHEN** fewer than 3 players are selected
- **THEN** the setup form prevents starting

#### Scenario: Maximum players enforced

- **WHEN** more than 20 players are selected
- **THEN** the setup form prevents starting
