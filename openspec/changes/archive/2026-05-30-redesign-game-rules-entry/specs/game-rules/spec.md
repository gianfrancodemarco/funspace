## MODIFIED Requirements

### Requirement: Shared rules section structure

The application SHALL provide a shared rules presentation component that renders game rules in a fixed section order: goal, roles, how to play, and win conditions. Each section SHALL use visually distinct styling (cards, icons, or equivalent hierarchy) so content is scannable on mobile — not plain uppercase headings with unstyled bullet lists.

#### Scenario: Sections rendered in order

- **WHEN** a game with configured rules content is displayed in the rules panel
- **THEN** the user sees goal, roles, how to play, and win conditions sections in that order

#### Scenario: Scrollable rules on small screens

- **WHEN** rules content exceeds the viewport height
- **THEN** the rules panel allows scrolling without breaking layout

#### Scenario: Section titles use sentence case

- **WHEN** a user opens the rules modal for any game
- **THEN** section headings are displayed in sentence case without all-caps tracking styling

### Requirement: Rules dialog entry point

The shared rules UI SHALL expose a user-triggered control (e.g. "How to play") that opens rules content without leaving the setup phase. The trigger placement and styling SHALL remain unchanged from the current setup-column position.

#### Scenario: Open rules from setup

- **WHEN** a user is on the setup phase of a game with rules configured
- **THEN** they can open a dialog showing the full rules content

#### Scenario: Close rules and continue setup

- **WHEN** a user closes the rules dialog
- **THEN** they remain on the setup phase with their prior configuration intact

## ADDED Requirements

### Requirement: Rules modal visual hierarchy

The rules dialog SHALL present content with improved visual hierarchy: section grouping (cards or equivalent), optional section icons, styled numbered steps for "how to play", and readable role entries (bold role label with supporting description where copy allows).

#### Scenario: Numbered steps are visually distinct

- **WHEN** a user views the how-to-play section in the rules modal
- **THEN** each step is displayed with a visible step indicator (numbered badge or timeline node), not only a plain ordered-list numeral

#### Scenario: Goal section is visually prominent

- **WHEN** a user opens the rules modal
- **THEN** the goal section uses stronger visual treatment than body list sections (e.g. tinted card or hero block)

### Requirement: Rules modal dismiss affordance

The rules dialog SHALL provide a prominent dismiss control in addition to or instead of the corner close icon — e.g. a footer "Got it" button — so mobile users can close the modal without targeting a small X.

#### Scenario: Footer dismiss closes dialog

- **WHEN** a user taps the footer dismiss control in the rules modal
- **THEN** the dialog closes and setup state is preserved

#### Scenario: Footer dismiss label is localized

- **WHEN** the locale is English or Italian
- **THEN** the footer dismiss label is loaded from `gameRules.gotIt` in the active message file
