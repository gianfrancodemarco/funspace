## ADDED Requirements

### Requirement: Application layout wraps all pages

The application SHALL render every page inside a shared layout component (`AppShell`) that provides consistent chrome across routes.

#### Scenario: Page renders inside app shell

- **WHEN** the user navigates to any defined route under `/en`
- **THEN** the page content is rendered within the app shell layout

### Requirement: Header displays FunSpace branding

The app shell SHALL display a fixed header containing the FunSpace name/logo and navigation controls.

#### Scenario: Header visible on homepage

- **WHEN** the user loads the application
- **THEN** a header with FunSpace branding is visible at the top of the viewport

### Requirement: Mobile navigation menu

On viewports below the medium breakpoint, the app shell SHALL show a hamburger control that opens a slide-out menu (`Sheet`) with navigation links.

#### Scenario: Open mobile menu

- **WHEN** the user taps the hamburger icon on a mobile viewport
- **THEN** a slide-out menu opens displaying navigation links

#### Scenario: Close mobile menu via link

- **WHEN** the user taps a navigation link in the mobile menu
- **THEN** the menu closes and the user navigates to the selected page

### Requirement: Desktop inline navigation

On viewports at or above the medium breakpoint, the app shell SHALL display navigation links inline in the header without requiring a hamburger menu.

#### Scenario: Desktop nav links visible

- **WHEN** the user views the application on a desktop viewport
- **THEN** navigation links are visible directly in the header

### Requirement: Locale-aware navigation

Navigation links SHALL use locale-prefixed paths and display labels from i18n translation files.

#### Scenario: Nav labels from translations

- **WHEN** the user views the navigation menu in English
- **THEN** link labels are rendered from `messages/en.json`

### Requirement: About page route

The application SHALL provide an `/en/about` route accessible from the navigation menu.

#### Scenario: Navigate to about page

- **WHEN** the user selects "About" from the navigation menu
- **THEN** the about page is displayed with information about FunSpace
