## ADDED Requirements

### Requirement: Hangman word selection

The Hangman game engine SHALL select a random word from the union of selected locale-specific word lists at game start.

#### Scenario: Word from selected packs

- **WHEN** a game starts with one or more word packs selected
- **THEN** the engine picks a random word from those lists

#### Scenario: English word content

- **WHEN** a game is played under `/en/games/hangman`
- **THEN** words are drawn from English word lists

#### Scenario: Italian word content

- **WHEN** a game is played under `/it/games/hangman`
- **THEN** words are drawn from Italian word lists

### Requirement: Letter guessing

During play, the Hangman engine SHALL accept letter guesses, reveal matching positions, and track wrong guesses toward a configured maximum.

#### Scenario: Correct guess reveals letters

- **WHEN** a player guesses a letter that appears in the secret word
- **THEN** all positions containing that letter are revealed and the wrong-guess count does not increase

#### Scenario: Wrong guess increments counter

- **WHEN** a player guesses a letter not in the secret word
- **THEN** the wrong-guess count increases by one and the hangman drawing advances

#### Scenario: Duplicate guess prevented

- **WHEN** a player attempts to guess a letter that was already guessed
- **THEN** the guess is ignored and game state is unchanged

#### Scenario: Win on complete word

- **WHEN** all letters of the secret word have been guessed
- **THEN** the game status becomes won and the shell transitions to resolve

#### Scenario: Loss on max wrong guesses

- **WHEN** the wrong-guess count reaches the configured maximum
- **THEN** the game status becomes lost and the shell transitions to resolve

### Requirement: Hangman setup configuration

The Hangman setup phase SHALL allow configuring player selection, word packs, and max wrong guesses via presets.

#### Scenario: Word packs default to all selected

- **WHEN** a user opens Hangman setup for the first time
- **THEN** all available word packs are selected by default

#### Scenario: At least one word pack required

- **WHEN** a user attempts to deselect all word packs
- **THEN** the setup form prevents starting

#### Scenario: Player count validated

- **WHEN** a user attempts to start with fewer than 2 or more than 8 players
- **THEN** the setup form prevents starting and shows a validation message

#### Scenario: Classic preset applies six wrong guesses

- **WHEN** a user selects the Classic preset
- **THEN** max wrong guesses is set to 6

### Requirement: Shared-screen play UI

The Hangman play phase SHALL display the masked word, a letter picker, wrong-guess progress, and a hangman drawing on a single shared screen.

#### Scenario: Secret word hidden during play

- **WHEN** a user is in the Hangman play phase before the game ends
- **THEN** the full secret word is not displayed — only revealed letters and blanks are shown

#### Scenario: Letter picker disables guessed letters

- **WHEN** a letter has already been guessed
- **THEN** it is not available for selection again in the letter picker

### Requirement: Hangman resolve screen

When a game ends, the resolve phase SHALL reveal the secret word and show whether the group won or lost.

#### Scenario: Word revealed on resolve

- **WHEN** a Hangman game ends in win or loss
- **THEN** the resolve screen displays the full secret word

#### Scenario: Rematch starts new word

- **WHEN** a user selects rematch after a completed Hangman game
- **THEN** a new session starts with the same players and configuration but a new random word

### Requirement: Hangman shell integration

Hangman SHALL use the game shell with play and resolve phases only (no reveal phase).

#### Scenario: No reveal phase

- **WHEN** a user starts a Hangman game from setup
- **THEN** the shell proceeds directly to the play phase without a reveal phase

### Requirement: Hangman in-app rules

Hangman SHALL register rules content via the shared game rules system.

#### Scenario: Rules key prefix registered

- **WHEN** a developer inspects the Hangman game definition
- **THEN** `rulesKeyPrefix` is set to `hangman.rules`

#### Scenario: Rules explain cooperative play

- **WHEN** a user opens Hangman rules during setup
- **THEN** the rules explain that the group guesses letters together on one shared phone
