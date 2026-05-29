### Requirement: Vibrant hero section

The homepage hero SHALL use a visually distinctive treatment including a gradient background container and gradient-styled brand title text. All copy MUST come from i18n translation files.

#### Scenario: Hero gradient background

- **WHEN** the user views the homepage
- **THEN** the hero section is displayed within a rounded container with a subtle gradient background

#### Scenario: Gradient brand title

- **WHEN** the user views the homepage hero
- **THEN** the FunSpace title uses a gradient text treatment

#### Scenario: Hero content visible

- **WHEN** the user navigates to `/en`
- **THEN** a hero section with the FunSpace name and tagline is displayed in English

### Requirement: Game catalog preview grid

The homepage SHALL display a grid of game preview cards sourced from static catalog data with display text resolved via i18n keys. Each card SHALL include a per-game accent color for visual distinction.

#### Scenario: Game cards rendered

- **WHEN** the user views the homepage
- **THEN** at least three game preview cards are displayed (Impostor, Hangman, Never Have I Ever)

#### Scenario: Game card shows metadata

- **WHEN** a game preview card is displayed
- **THEN** it shows the game name, description, player count range, and tags in English

#### Scenario: Game card accent color

- **WHEN** a game preview card is displayed
- **THEN** it includes a visible per-game accent color (e.g., colored top border)

### Requirement: Coming soon state for games

Game preview cards SHALL display a "Coming soon" indicator and MUST NOT navigate to a playable game route.

#### Scenario: Card is not clickable

- **WHEN** the user taps or clicks a game preview card
- **THEN** no navigation to a game page occurs

#### Scenario: Coming soon badge visible

- **WHEN** a game preview card is displayed
- **THEN** a "Coming soon" badge or label is visible on the card

### Requirement: Mobile-first responsive layout

The homepage layout SHALL be optimized for mobile viewports first and adapt to larger screens with a responsive grid and scaled typography.

#### Scenario: Single column on mobile

- **WHEN** the user views the homepage on a narrow viewport
- **THEN** game cards are displayed in a single-column layout with mobile-optimized spacing

#### Scenario: Multi-column on desktop

- **WHEN** the user views the homepage on a wide viewport
- **THEN** game cards are displayed in a multi-column grid

### Requirement: Homepage SEO metadata

The homepage SHALL export page metadata (title, description, Open Graph) defined in English.

#### Scenario: Homepage has unique metadata

- **WHEN** the homepage is rendered
- **THEN** it includes a unique page title and meta description suitable for search indexing
