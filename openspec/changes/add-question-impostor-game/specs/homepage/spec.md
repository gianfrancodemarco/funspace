## MODIFIED Requirements

### Requirement: Game catalog preview grid

The homepage SHALL display a grid of game preview cards sourced from the catalog module, each with a distinct accent color, tags, player count, and coming-soon indicator where applicable.

#### Scenario: Game cards rendered

- **WHEN** the user views the homepage
- **THEN** at least four game preview cards are displayed (Impostor, Hangman, Never Have I Ever, Question Impostor)

#### Scenario: Game card shows metadata

- **WHEN** a game preview card is displayed
- **THEN** it shows the game name, description, player count range, and tags in English

#### Scenario: Game card accent color

- **WHEN** a game preview card is displayed
- **THEN** it includes a visible per-game accent color (e.g., colored top border)

#### Scenario: Game card links to launch route

- **WHEN** the user taps a game preview card
- **THEN** they navigate to that game's launch route under `/[locale]/games/[gameId]`

## ADDED Requirements

### Requirement: Question Impostor playable on homepage

The Question Impostor catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Question Impostor card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Question Impostor game card does not show a coming-soon badge

#### Scenario: Question Impostor card links to playable game

- **WHEN** a user taps the Question Impostor card on the homepage
- **THEN** they navigate to a playable Question Impostor game at `/[locale]/games/question-impostor`
