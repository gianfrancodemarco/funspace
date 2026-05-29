## ADDED Requirements

### Requirement: Setup phase rules access

When a playable game definition includes a `rulesKeyPrefix`, the game shell setup phase SHALL display a rules entry point before or alongside the setup form.

#### Scenario: Rules available during Impostor setup

- **WHEN** a user opens Impostor setup
- **THEN** a control to view game rules is visible on the setup screen

#### Scenario: Rules not shown during other phases

- **WHEN** a user is in reveal, play, or resolve phase
- **THEN** the rules entry point is not displayed in the shell chrome

#### Scenario: Default setup view supports rules

- **WHEN** a playable game uses the default player selection setup and defines `rulesKeyPrefix`
- **THEN** the rules entry point is still available without a custom SetupView
