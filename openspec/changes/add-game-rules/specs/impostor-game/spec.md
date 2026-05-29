## ADDED Requirements

### Requirement: Impostor in-app rules

The Impostor game SHALL register rules content via the shared game rules system so first-time players can learn how to play without leaving the app.

#### Scenario: Impostor rules key prefix registered

- **WHEN** a developer inspects the Impostor game definition
- **THEN** `rulesKeyPrefix` is set to `impostor.rules`

#### Scenario: Impostor rules explain roles

- **WHEN** a user opens Impostor rules
- **THEN** the rules describe civilian, impostor, and optional spy roles in plain language

#### Scenario: Impostor rules explain verbal gameplay

- **WHEN** a user opens Impostor rules
- **THEN** the rules explain that clues and discussion happen verbally at the table while the phone moderates secrets and eliminations

#### Scenario: Impostor rules explain win conditions

- **WHEN** a user opens Impostor rules
- **THEN** the rules state that civilians win when all impostors are eliminated and impostors win when only impostors remain alive
