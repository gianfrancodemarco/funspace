## ADDED Requirements

### Requirement: Playable game indicator

The homepage SHALL distinguish playable games from coming-soon games on catalog preview cards.

#### Scenario: Playable game has no coming-soon badge

- **WHEN** a catalog game has `status: "playable"`
- **THEN** the card does not display a coming-soon badge

#### Scenario: Playable game links to full game

- **WHEN** a user taps a playable game card
- **THEN** they navigate to the playable game at `/[locale]/games/[gameId]`

## MODIFIED Requirements

### Requirement: Game catalog preview grid

The homepage SHALL display a grid of game preview cards sourced from the catalog module, each with a distinct accent color, tags, player count, and coming-soon indicator where applicable.

#### Scenario: Game cards rendered

- **WHEN** the user views the homepage
- **THEN** at least three game preview cards are displayed (Impostor, Hangman, Never Have I Ever)

#### Scenario: Game card shows metadata

- **WHEN** a game preview card is displayed
- **THEN** it shows the game name, description, player count range, and tags in English

#### Scenario: Game card accent color

- **WHEN** a game preview card is displayed
- **THEN** it includes a visible per-game accent color (e.g., colored top border)

#### Scenario: Game card links to launch route

- **WHEN** the user taps a game preview card
- **THEN** they navigate to that game's launch route under `/[locale]/games/[gameId]`

#### Scenario: Impostor shows updated player range

- **WHEN** the Impostor game card is displayed
- **THEN** it shows a player range of 3–20 players
