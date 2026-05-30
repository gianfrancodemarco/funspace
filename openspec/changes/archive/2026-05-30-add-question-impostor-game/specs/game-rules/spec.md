## ADDED Requirements

### Requirement: Question Impostor rules content

Question Impostor SHALL provide complete in-app rules via the shared game rules system using the `questionImpostor.rules` translation namespace.

#### Scenario: Question Impostor rules accessible from setup

- **WHEN** a user opens Question Impostor setup
- **THEN** a how-to-play control is available that opens the Question Impostor rules dialog

#### Scenario: Question Impostor rules describe question secrets

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules explain that civilians share one question, impostors get a different question with a compatible answer type, and the group discusses answers verbally at the table

#### Scenario: Question Impostor rules describe win conditions

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules explain civilian and impostor win conditions and facilitator-driven elimination

#### Scenario: Question Impostor rules omit spy role

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules describe only civilian and impostor roles with no spy role section
