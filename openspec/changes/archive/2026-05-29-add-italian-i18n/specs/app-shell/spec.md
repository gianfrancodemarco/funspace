## ADDED Requirements

### Requirement: Language selector in header

The app shell SHALL display a language selector in the header that allows switching between available locales.

#### Scenario: Language selector visible on desktop

- **WHEN** the user views the application on a desktop viewport
- **THEN** a language selector is visible in the header

#### Scenario: Language selector accessible on mobile

- **WHEN** the user opens the mobile navigation menu
- **THEN** a language selector is available within the menu

#### Scenario: Language selector preserves current page

- **WHEN** the user switches language while on a sub-page (e.g. About)
- **THEN** the equivalent page in the selected locale is displayed
