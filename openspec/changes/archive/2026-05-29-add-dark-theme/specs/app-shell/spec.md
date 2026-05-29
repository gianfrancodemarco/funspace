## ADDED Requirements

### Requirement: Theme toggle in header

The app shell SHALL display a theme toggle control in the header that is accessible on all pages.

#### Scenario: Toggle visible on desktop

- **WHEN** the user views the application on a desktop viewport
- **THEN** a theme toggle button is visible in the header

#### Scenario: Toggle accessible on mobile

- **WHEN** the user opens the mobile navigation menu
- **THEN** a theme toggle control is available within the menu

#### Scenario: Toggle cycles theme modes

- **WHEN** the user activates the theme toggle
- **THEN** the theme cycles through light, dark, and system modes

#### Scenario: Toggle label from i18n

- **WHEN** the theme toggle is rendered
- **THEN** its accessible label is loaded from i18n translation files
