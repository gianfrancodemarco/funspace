## ADDED Requirements

### Requirement: Truth or Dare playable on homepage

The Truth or Dare catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Truth or Dare card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Truth or Dare game card does not show a coming-soon badge

#### Scenario: Truth or Dare card links to playable game

- **WHEN** a user taps the Truth or Dare card on the homepage
- **THEN** they navigate to a playable Truth or Dare game at `/[locale]/games/truth-or-dare`
