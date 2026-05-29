## ADDED Requirements

### Requirement: Never Have I Ever playable on homepage

The Never Have I Ever catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Never Have I Ever card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Never Have I Ever game card does not show a coming-soon badge

#### Scenario: Never Have I Ever card links to playable game

- **WHEN** a user taps the Never Have I Ever card on the homepage
- **THEN** they navigate to a playable Never Have I Ever game at `/[locale]/games/never-have-i-ever`
