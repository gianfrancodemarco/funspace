## Purpose

Define homepage layout, hero section, game catalog preview, and navigation behavior for FunSpace.
## Requirements
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

The homepage SHALL display a grid of game preview cards sourced from the catalog module, each with a distinct accent color, tags, player count, and coming-soon indicator where applicable.

#### Scenario: Game cards rendered

- **WHEN** the user views the homepage
- **THEN** at least three game preview cards are displayed (Impostor, Hangman, Never Have I Ever)

#### Scenario: Game card shows metadata

- **WHEN** a game preview card is displayed
- **THEN** it shows the game name, description, player count range, and tags in English

#### Scenario: Game card accent color

- **WHEN** a game preview card is displayed
- **THEN** it includes a visible per-game accent color (e.g., colored top border)

#### Scenario: Game card links to launch route

- **WHEN** the user taps a game preview card
- **THEN** they navigate to that game's launch route under `/[locale]/games/[gameId]`

### Requirement: Coming soon state for games

Game preview cards with `status: "coming-soon"` SHALL display a "Coming soon" indicator and navigate to a coming-soon placeholder at the game's launch route.

#### Scenario: Coming soon badge preserved

- **WHEN** a catalog game has `status: "coming-soon"`
- **THEN** the card still displays a coming-soon badge but remains clickable

#### Scenario: Coming soon badge visible

- **WHEN** a game preview card is displayed
- **THEN** a "Coming soon" badge or label is visible on the card when applicable

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

### Requirement: Hangman playable on homepage

The Hangman catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Hangman card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Hangman game card does not show a coming-soon badge

#### Scenario: Hangman card links to playable game

- **WHEN** a user taps the Hangman card on the homepage
- **THEN** they navigate to a playable Hangman game at `/[locale]/games/hangman`

### Requirement: Never Have I Ever playable on homepage

The Never Have I Ever catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Never Have I Ever card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Never Have I Ever game card does not show a coming-soon badge

#### Scenario: Never Have I Ever card links to playable game

- **WHEN** a user taps the Never Have I Ever card on the homepage
- **THEN** they navigate to a playable Never Have I Ever game at `/[locale]/games/never-have-i-ever`

### Requirement: Truth or Dare playable on homepage

The Truth or Dare catalog entry SHALL have `status: "playable"` and its homepage card SHALL NOT display a coming-soon badge.

#### Scenario: Truth or Dare card without coming soon

- **WHEN** a user views the homepage
- **THEN** the Truth or Dare game card does not show a coming-soon badge

#### Scenario: Truth or Dare card links to playable game

- **WHEN** a user taps the Truth or Dare card on the homepage
- **THEN** they navigate to a playable Truth or Dare game at `/[locale]/games/truth-or-dare`

