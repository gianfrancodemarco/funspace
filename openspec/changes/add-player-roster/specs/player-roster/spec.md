## ADDED Requirements

### Requirement: Global player roster persistence

The application SHALL persist a global list of player names in browser storage, shared across all games.

#### Scenario: Roster survives reload

- **WHEN** a user adds player names and reloads the page
- **THEN** the same names are available in the roster

#### Scenario: Roster shared across routes

- **WHEN** a user adds names on the Players page and navigates elsewhere
- **THEN** the roster remains available without re-entry

### Requirement: Roster CRUD operations

The application SHALL allow users to add, remove, and rename players in the global roster.

#### Scenario: Add player

- **WHEN** a user enters a non-empty name and confirms add
- **THEN** the name appears in the roster and is persisted

#### Scenario: Remove player

- **WHEN** a user removes a name from the roster
- **THEN** the name is deleted from storage and no longer appears in the list

#### Scenario: Rename player

- **WHEN** a user renames an existing roster entry
- **THEN** the updated name is persisted and replaces the previous name

### Requirement: Players management page

The application SHALL provide a `/[locale]/players` page for managing the global roster.

#### Scenario: Empty roster state

- **WHEN** a user visits the Players page with no saved names
- **THEN** an empty state is shown with instructions to add players

#### Scenario: Roster list displayed

- **WHEN** a user visits the Players page with saved names
- **THEN** all roster names are listed with controls to remove or rename

### Requirement: Roster consumer hook

The application SHALL expose a reusable hook or service for reading and mutating the roster, intended for use by game setup flows.

#### Scenario: Hook returns persisted roster

- **WHEN** a client component calls the roster hook after hydration
- **THEN** it receives the current list of player names from storage

### Requirement: Roster UI internationalization

All player roster UI strings SHALL be loaded from i18n translation files.

#### Scenario: English roster UI

- **WHEN** a user views the Players page under `/en/players`
- **THEN** labels and actions are displayed in English

#### Scenario: Italian roster UI

- **WHEN** a user views the Players page under `/it/players`
- **THEN** labels and actions are displayed in Italian
