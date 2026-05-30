# game-rules Specification

## Purpose
TBD - created by archiving change add-hangman-game. Update Purpose after archive.
## Requirements
### Requirement: Hangman rules content

Hangman SHALL provide complete in-app rules via the shared game rules system using the `hangman.rules` translation namespace.

#### Scenario: Hangman rules accessible from setup

- **WHEN** a user opens Hangman setup
- **THEN** a how-to-play control is available that opens the Hangman rules dialog

#### Scenario: Hangman rules describe win and loss

- **WHEN** a user opens Hangman rules
- **THEN** the rules explain that the group wins by guessing the word before the drawing is complete and loses when wrong guesses reach the limit

### Requirement: Never Have I Ever rules content

Never Have I Ever SHALL provide complete in-app rules via the shared game rules system using the `neverHaveIEver.rules` translation namespace.

#### Scenario: Never Have I Ever rules accessible from setup

- **WHEN** a user opens Never Have I Ever setup
- **THEN** a how-to-play control is available that opens the Never Have I Ever rules dialog

#### Scenario: Never Have I Ever rules describe verbal play

- **WHEN** a user opens Never Have I Ever rules
- **THEN** the rules explain that the app shows prompts and players respond verbally at the table with no app-tracked winner

### Requirement: Truth or Dare rules content

Truth or Dare SHALL provide complete in-app rules via the shared game rules system using the `truthOrDare.rules` translation namespace.

#### Scenario: Truth or Dare rules accessible from setup

- **WHEN** a user opens Truth or Dare setup
- **THEN** a how-to-play control is available that opens the Truth or Dare rules dialog

#### Scenario: Truth or Dare rules describe verbal play

- **WHEN** a user opens Truth or Dare rules
- **THEN** the rules explain that the app shows Truth or Dare prompts, the group decides who participates, and there is no app-tracked winner

#### Scenario: Truth or Dare rules describe turn rotation

- **WHEN** a user opens Truth or Dare rules
- **THEN** the rules explain that the app enforces round-robin turns and tracks skips per player

### Requirement: Would You Rather rules content

Would You Rather SHALL provide complete in-app rules via the shared game rules system using the `wouldYouRather.rules` translation namespace.

#### Scenario: Would You Rather rules accessible from setup

- **WHEN** a user opens Would You Rather setup
- **THEN** a how-to-play control is available that opens the Would You Rather rules dialog

#### Scenario: Would You Rather rules describe verbal debate

- **WHEN** a user opens Would You Rather rules
- **THEN** the rules explain that the app shows two options per dilemma, the group debates and chooses verbally at the table, and there is no app-tracked winner

#### Scenario: Would You Rather rules describe tap-to-advance and end session

- **WHEN** a user opens Would You Rather rules
- **THEN** the rules explain that tapping the chosen option moves to the next dilemma and End session finishes early

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

### Requirement: Game rules i18n contract

Playable games MAY register rules content by setting a `rulesKeyPrefix` on their game definition. The shared rules component SHALL load all copy from translation keys under that prefix.

#### Scenario: Rules loaded from translation keys

- **WHEN** a game definition sets `rulesKeyPrefix` to `impostor.rules`
- **THEN** the rules panel displays strings from the `impostor.rules` namespace in the active locale

#### Scenario: Game without rules prefix

- **WHEN** a game definition omits `rulesKeyPrefix`
- **THEN** no rules entry point is shown during setup

### Requirement: Rules dialog entry point

The shared rules UI SHALL expose a user-triggered control (e.g. "How to play") that opens rules content without leaving the setup phase. The trigger placement and styling SHALL remain unchanged from the current setup-column position.

#### Scenario: Open rules from setup

- **WHEN** a user is on the setup phase of a game with rules configured
- **THEN** they can open a dialog showing the full rules content

#### Scenario: Close rules and continue setup

- **WHEN** a user closes the rules dialog
- **THEN** they remain on the setup phase with their prior configuration intact

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

### Requirement: Shared rules chrome translations

The application SHALL define i18n keys for shared rules UI chrome (trigger label, dialog title fallback, section headings where shared) in English and Italian.

#### Scenario: Rules trigger in English

- **WHEN** a user views setup under `/en/games/...` for a game with rules
- **THEN** the rules trigger label is displayed in English

#### Scenario: Rules trigger in Italian

- **WHEN** a user views setup under `/it/games/...` for a game with rules
- **THEN** the rules trigger label is displayed in Italian

### Requirement: Question Impostor rules content

Question Impostor SHALL provide complete in-app rules via the shared game rules system using the `questionImpostor.rules` translation namespace.

#### Scenario: Question Impostor rules accessible from setup

- **WHEN** a user opens Question Impostor setup
- **THEN** a how-to-play control is available that opens the Question Impostor rules dialog

#### Scenario: Question Impostor rules describe question secrets

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules explain that civilians share one question, impostors get a different question with a compatible answer type, and the group discusses answers verbally at the table

#### Scenario: Question Impostor rules describe win conditions

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules explain civilian and impostor win conditions and facilitator-driven elimination

#### Scenario: Question Impostor rules omit spy role

- **WHEN** a user opens Question Impostor rules
- **THEN** the rules describe only civilian and impostor roles with no spy role section

