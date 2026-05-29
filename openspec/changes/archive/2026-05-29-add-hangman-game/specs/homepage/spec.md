## ADDED Requirements

### Requirement: Hangman playable on homepage

The Hangman catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Hangman card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Hangman game card does not show a coming-soon badge

#### Scenario: Hangman card links to playable game

- **WHEN** a user taps the Hangman card on the homepage
- **THEN** they navigate to a playable Hangman game at `/[locale]/games/hangman`
