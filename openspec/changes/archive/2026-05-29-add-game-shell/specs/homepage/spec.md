## MODIFIED Requirements

### Requirement: Game catalog preview cards

The homepage SHALL display a grid of game preview cards sourced from the catalog module, each with a distinct accent color, tags, player count, and coming-soon indicator where applicable.

#### Scenario: Game cards visible

- **WHEN** the user views the homepage
- **THEN** at least three game preview cards are displayed (Impostor, Hangman, Never Have I Ever)

#### Scenario: Game card links to launch route

- **WHEN** the user taps a game preview card
- **THEN** they navigate to that game's launch route under `/[locale]/games/[gameId]`

#### Scenario: Coming soon badge preserved

- **WHEN** a catalog game has `status: "coming-soon"`
- **THEN** the card still displays a coming-soon badge but remains clickable
