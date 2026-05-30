## ADDED Requirements

### Requirement: Game-specific setup form

The game shell SHALL support an optional game-specific setup component on `GameDefinition` for games that need configuration beyond player selection.

#### Scenario: Custom setup rendered

- **WHEN** a registered game provides a `SetupView` component
- **THEN** the shell renders that component during the setup phase instead of the generic player select

#### Scenario: Generic setup fallback

- **WHEN** a registered game does not provide a `SetupView` component
- **THEN** the shell renders the generic player selection setup

#### Scenario: Game config passed on start

- **WHEN** a game-specific setup form starts a session
- **THEN** the shell stores optional game configuration alongside the session for use by assignSecrets and play views
