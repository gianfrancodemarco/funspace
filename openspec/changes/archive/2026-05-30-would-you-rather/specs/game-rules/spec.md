## ADDED Requirements

### Requirement: Would You Rather rules content

Would You Rather SHALL provide complete in-app rules via the shared game rules system using the `wouldYouRather.rules` translation namespace.

#### Scenario: Would You Rather rules accessible from setup

- **WHEN** a user opens Would You Rather setup
- **THEN** a how-to-play control is available that opens the Would You Rather rules dialog

#### Scenario: Would You Rather rules describe verbal debate

- **WHEN** a user opens Would You Rather rules
- **THEN** the rules explain that the app shows two options per dilemma, the group debates and chooses verbally at the table, and there is no app-tracked winner

#### Scenario: Would You Rather rules describe skip and end session

- **WHEN** a user opens Would You Rather rules
- **THEN** the rules explain that Skip moves to the next dilemma and End session finishes early
