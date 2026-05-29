## Purpose

Define single-device pass-the-phone secret delivery for FunSpace games.

## Requirements

### Requirement: Pass-the-phone reveal flow

The secret delivery module SHALL implement a single-device pass-the-phone reveal loop for sequential private information delivery.

#### Scenario: Handoff instruction

- **WHEN** a reveal phase begins for a player
- **THEN** the screen displays an instruction to pass the phone to that player by name

#### Scenario: Secret reveal requires confirmation

- **WHEN** a player views their secret during the reveal loop
- **THEN** they must confirm before the secret is hidden and the phone passes to the next player

#### Scenario: Secret cover screen

- **WHEN** a player confirms they have seen their secret
- **THEN** the secret is hidden behind a cover screen before the next handoff

#### Scenario: Reveal loop completes

- **WHEN** all session players have completed the reveal loop
- **THEN** the shell advances to the next game phase

### Requirement: Single-device provider interface

The application SHALL define a secret delivery provider interface with a single-device implementation for v1.

#### Scenario: Single-device mode only

- **WHEN** a developer inspects secret delivery providers
- **THEN** only single-device pass-the-phone delivery is implemented

#### Scenario: Reveal order follows session shuffle

- **WHEN** the reveal loop runs
- **THEN** players are processed in the session's shuffled order
