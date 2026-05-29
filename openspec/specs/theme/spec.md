### Requirement: Theme modes

The application SHALL support three theme modes: light, dark, and system (follow OS preference).

#### Scenario: Light mode active

- **WHEN** the user selects light mode
- **THEN** the application renders with light color tokens

#### Scenario: Dark mode active

- **WHEN** the user selects dark mode
- **THEN** the application renders with dark color tokens

#### Scenario: System mode follows OS

- **WHEN** the user selects system mode and the OS prefers dark
- **THEN** the application renders with dark color tokens

### Requirement: Theme persistence

The application SHALL persist the user's theme preference in browser local storage and restore it on subsequent visits.

#### Scenario: Preference restored on reload

- **WHEN** a user selects dark mode and reloads the page
- **THEN** the application renders in dark mode

### Requirement: Dark color tokens

The application SHALL define dark-mode CSS variable tokens applied when the `dark` class is present on the document root.

#### Scenario: Dark class applies tokens

- **WHEN** dark mode is active
- **THEN** the `<html>` element has the `dark` class and components use dark color tokens

### Requirement: No flash of wrong theme

The application SHALL minimize visible flash of an incorrect theme during initial page load.

#### Scenario: Dark preference on first paint

- **WHEN** a returning user has dark mode saved
- **THEN** the page does not briefly render in light mode before switching to dark
