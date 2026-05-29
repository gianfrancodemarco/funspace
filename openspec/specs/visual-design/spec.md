## Purpose

Define vibrant UI tokens, typography, spacing, and accessible contrast for FunSpace.

## Requirements

### Requirement: Vibrant brand color system

The application SHALL define a cohesive color palette with a violet primary brand color and multi-hue accent colors, applied via CSS custom properties in both light and dark modes.

#### Scenario: Primary brand color visible

- **WHEN** the user views any public page in light mode
- **THEN** interactive and brand elements use the primary violet palette rather than neutral grayscale

#### Scenario: Dark mode vibrant palette

- **WHEN** the user views any public page in dark mode
- **THEN** the UI uses a vibrant dark palette (not flat gray) with adjusted primary and background tokens

### Requirement: Tag category colors

The application SHALL render catalog tag badges using distinct colors mapped to each tag category (deduction, bluff, words, social, quick).

#### Scenario: Tag badge has category color

- **WHEN** a game card displays a tag badge
- **THEN** the badge background color corresponds to its tag category

### Requirement: Mobile-first typography and spacing

The application SHALL use a mobile-first typography scale and spacing system, with larger type and spacing at wider breakpoints.

#### Scenario: Mobile base typography

- **WHEN** the user views a page on a narrow viewport
- **THEN** body text is at least `text-base` size with comfortable padding (`px-4` minimum)

#### Scenario: Enhanced typography on larger screens

- **WHEN** the user views a page at the `sm` breakpoint or wider
- **THEN** hero and section headings scale up compared to the mobile default

### Requirement: Accessible contrast

Colorful UI elements SHALL maintain readable text contrast for body copy and interactive controls.

#### Scenario: Primary text readable

- **WHEN** primary-colored text or buttons are displayed
- **THEN** foreground/background contrast meets WCAG AA for normal text

### Requirement: Resolve outcome motion

The resolve phase SHALL use visually distinct motion for successful versus failed game outcomes.

#### Scenario: Win outcome feels celebratory

- **WHEN** a resolve screen uses the win animation variant
- **THEN** the headline area uses an upbeat motion treatment distinct from the loss variant

#### Scenario: Loss outcome feels subdued

- **WHEN** a resolve screen uses the loss animation variant
- **THEN** the headline area uses a muted motion treatment without celebratory particles
