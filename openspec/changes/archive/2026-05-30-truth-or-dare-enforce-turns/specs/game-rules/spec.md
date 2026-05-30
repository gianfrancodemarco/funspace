## MODIFIED Requirements

### Requirement: Truth or Dare rules content

Truth or Dare SHALL provide complete in-app rules via the shared game rules system using the `truthOrDare.rules` translation namespace.

#### Scenario: Truth or Dare rules accessible from setup

- **WHEN** a user opens Truth or Dare setup
- **THEN** a how-to-play control is available that opens the Truth or Dare rules dialog

#### Scenario: Truth or Dare rules describe verbal play

- **WHEN** a user opens Truth or Dare rules
- **THEN** the rules explain that the app shows Truth or Dare prompts, the group decides who participates, and there is no app-tracked winner

#### Scenario: Truth or Dare rules describe turn rotation

- **WHEN** a user opens Truth or Dare rules
- **THEN** the rules explain that the app enforces round-robin turns and tracks skips per player
