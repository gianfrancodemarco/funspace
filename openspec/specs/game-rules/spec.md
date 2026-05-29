# game-rules Specification

## Purpose
TBD - created by archiving change add-hangman-game. Update Purpose after archive.
## Requirements
### Requirement: Hangman rules content

Hangman SHALL provide complete in-app rules via the shared game rules system using the `hangman.rules` translation namespace.

#### Scenario: Hangman rules accessible from setup

- **WHEN** a user opens Hangman setup
- **THEN** a how-to-play control is available that opens the Hangman rules dialog

#### Scenario: Hangman rules describe win and loss

- **WHEN** a user opens Hangman rules
- **THEN** the rules explain that the group wins by guessing the word before the drawing is complete and loses when wrong guesses reach the limit

