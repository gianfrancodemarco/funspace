## Purpose

Define shared win/loss resolve animations and reduced-motion behavior for game end screens.

## Requirements

### Requirement: Win resolve animation

When a resolve screen represents a successful outcome (a group wins or the group completes the objective), the application SHALL play a brief win animation once when the resolve view mounts.

#### Scenario: Win animation on Impostor resolve

- **WHEN** an Impostor game ends with civilians or impostors as the winning side
- **THEN** the resolve screen displays the win animation variant above the outcome headline

#### Scenario: Win animation on Hangman success

- **WHEN** a Hangman game ends with the secret word fully guessed
- **THEN** the resolve screen displays the win animation variant above the outcome headline

#### Scenario: Win animation is brief

- **WHEN** the win animation plays
- **THEN** the full animation completes within approximately 1.5 seconds and does not block rematch or exit controls

### Requirement: Loss resolve animation

When a resolve screen represents a failed group outcome (no victorious side), the application SHALL play a brief loss animation once when the resolve view mounts.

#### Scenario: Loss animation on Hangman failure

- **WHEN** a Hangman game ends because wrong guesses reached the maximum
- **THEN** the resolve screen displays the loss animation variant above the outcome headline

#### Scenario: Loss animation excludes confetti

- **WHEN** the loss animation plays
- **THEN** no celebratory confetti or victory glow effects are shown

### Requirement: Reduced motion support

Resolve animations SHALL respect the user's reduced-motion preference.

#### Scenario: Reduced motion disables effects

- **WHEN** a user has `prefers-reduced-motion: reduce` enabled
- **THEN** resolve screens show outcome text immediately without shake, scale, or particle effects

### Requirement: Non-blocking resolve actions

Resolve animations SHALL NOT delay or disable rematch and exit actions.

#### Scenario: Actions available during animation

- **WHEN** a resolve animation is playing
- **THEN** rematch and exit buttons remain visible and interactive
