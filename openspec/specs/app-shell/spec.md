## Purpose

Define the shared application layout, navigation chrome, and header controls for FunSpace.

## Requirements

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

### Requirement: Modern header styling

The app shell header SHALL use the vibrant brand color system, with the site name styled as a brand element and active navigation links visually distinguished using the primary color.

#### Scenario: Brand name styled

- **WHEN** the user views the header
- **THEN** the FunSpace site name uses primary brand styling

#### Scenario: Active nav link highlighted

- **WHEN** the user is on a page linked from the navigation
- **THEN** the corresponding nav link is visually distinguished with primary color styling

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
