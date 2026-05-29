## ADDED Requirements

### Requirement: Players navigation link

The app shell SHALL include a navigation link to the Players page on all locales.

#### Scenario: Desktop Players link

- **WHEN** the user views the application on a desktop viewport
- **THEN** a Players link is visible in the header navigation

#### Scenario: Mobile Players link

- **WHEN** the user opens the mobile navigation menu
- **THEN** a Players link is available in the menu

#### Scenario: Players link uses locale routing

- **WHEN** the user taps the Players link while on `/en`
- **THEN** they navigate to `/en/players`
