## ADDED Requirements

### Requirement: Would You Rather playable on homepage

The Would You Rather catalog entry SHALL have `status: "playable"` and appear on the homepage games grid.

#### Scenario: Would You Rather card visible on homepage

- **WHEN** a user views the homepage
- **THEN** a Would You Rather game card is displayed in the games grid

#### Scenario: Would You Rather card links to playable game

- **WHEN** a user taps the Would You Rather card on the homepage
- **THEN** they navigate to a playable Would You Rather game at `/[locale]/games/would-you-rather`

#### Scenario: Would You Rather card without coming soon

- **WHEN** a user views the Would You Rather game card
- **THEN** the card does not show a coming-soon badge
