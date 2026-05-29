## Purpose

Define internationalization behavior, supported locales, and language selection for FunSpace.
## Requirements
### Requirement: Locale-based routing

The application SHALL use locale-prefixed routes with `next-intl`. The default locale SHALL be English (`en`). Supported locales SHALL include English (`en`) and Italian (`it`).

#### Scenario: Default locale redirect

- **WHEN** a user navigates to `/`
- **THEN** they are redirected to `/en`

#### Scenario: English homepage route

- **WHEN** a user navigates to `/en`
- **THEN** the English homepage is displayed

#### Scenario: Italian homepage route

- **WHEN** a user navigates to `/it`
- **THEN** the Italian homepage is displayed

### Requirement: English as launch locale

The application SHALL ship with English (`en`) and Italian (`it`) locales. All user-facing strings MUST be defined in locale message files (`messages/en.json`, `messages/it.json`).

#### Scenario: No hardcoded UI strings

- **WHEN** a developer inspects page and layout components
- **THEN** user-visible text is loaded via translation keys, not hardcoded literals

#### Scenario: English messages file exists

- **WHEN** a developer inspects the messages directory
- **THEN** an `en.json` file contains all UI copy for the homepage, navigation, and about page

#### Scenario: Italian messages file exists

- **WHEN** a developer inspects the messages directory
- **THEN** an `it.json` file contains Italian translations for all keys present in `en.json`

### Requirement: HTML lang attribute

The locale layout SHALL set the correct BCP 47 language code on the `<html>` element for each locale.

#### Scenario: Correct lang attribute for English

- **WHEN** a user views any page under `/en`
- **THEN** the rendered HTML document has `lang="en"` on the `<html>` element

#### Scenario: Correct lang attribute for Italian

- **WHEN** a user views any page under `/it`
- **THEN** the rendered HTML document has `lang="it"` on the `<html>` element

### Requirement: Extensible locale configuration

The i18n configuration SHALL define a locales list and default locale in a central module so additional locales can be added without restructuring the app.

#### Scenario: Locale config is centralized

- **WHEN** a developer inspects the i18n routing configuration
- **THEN** `en` and `it` are listed in locales, `en` is the default locale, and the structure supports adding further locales

### Requirement: Language selection

The application SHALL provide a language selector that allows users to switch between available locales.

#### Scenario: Switch locale from English to Italian

- **WHEN** a user is on `/en/about` and selects Italian from the language selector
- **THEN** they are navigated to `/it/about` with Italian UI strings

#### Scenario: Switch locale from Italian to English

- **WHEN** a user is on `/it` and selects English from the language selector
- **THEN** they are navigated to `/en` with English UI strings

#### Scenario: Language selector labels from i18n

- **WHEN** the language selector is rendered
- **THEN** locale option labels and the control's accessible name are loaded from i18n translation files

### Requirement: Player roster translations

The application SHALL define i18n keys for the player roster UI in both English and Italian message files.

#### Scenario: Roster keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist for the Players page title, add/remove/rename actions, and empty state

#### Scenario: Roster keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same roster keys exist with Italian translations

### Requirement: Game shell translations

The application SHALL define i18n keys for game shell UI in both English and Italian message files.

#### Scenario: Shell keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist for reveal flow, setup validation, phase chrome, and rematch actions

#### Scenario: Shell keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same game shell keys exist with Italian translations

### Requirement: Hangman translations

The application SHALL define i18n keys for Hangman setup, play, resolve, word packs, and rules in both English and Italian message files.

#### Scenario: Hangman keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `hangman` for setup, play, resolve, packs, and rules sections

#### Scenario: Hangman keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `hangman` keys exist with Italian translations

#### Scenario: Hangman rules keys in both locales

- **WHEN** a developer inspects message files for Hangman rules
- **THEN** `hangman.rules` contains goal, roles, how-to-play steps, and win condition keys in both English and Italian

### Requirement: Never Have I Ever translations

The application SHALL define i18n keys for Never Have I Ever setup, play, resolve, prompt packs, and rules in both English and Italian message files.

#### Scenario: Never Have I Ever keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist under `neverHaveIEver` for setup, play, resolve, packs, and rules sections

#### Scenario: Never Have I Ever keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same `neverHaveIEver` keys exist with Italian translations

#### Scenario: Never Have I Ever rules keys in both locales

- **WHEN** a developer inspects message files for Never Have I Ever rules
- **THEN** `neverHaveIEver.rules` contains goal, roles, how-to-play steps, and session-end keys in both English and Italian

#### Scenario: Spicy pack confirmation copy in both locales

- **WHEN** a developer inspects message files for the Spicy 18+ pack
- **THEN** confirmation copy for enabling adult content exists in both English and Italian

### Requirement: Themed word pack display names

The application SHALL define i18n keys for themed word pack display names in both English and Italian message files.

#### Scenario: Impostor themed pack labels in English

- **WHEN** a user views Impostor setup in English
- **THEN** keys exist under `impostor.setup.packs` for `anime`, `movies`, and `music`

#### Scenario: Impostor themed pack labels in Italian

- **WHEN** a user views Impostor setup in Italian
- **THEN** the same themed pack keys exist with Italian translations under `impostor.setup.packs`

#### Scenario: Hangman themed pack labels in English

- **WHEN** a user views Hangman setup in English
- **THEN** keys exist under `hangman.setup.packs` for `anime`, `movies`, and `music`

#### Scenario: Hangman themed pack labels in Italian

- **WHEN** a user views Hangman setup in Italian
- **THEN** the same themed pack keys exist with Italian translations under `hangman.setup.packs`

#### Scenario: Anime label reflects Western animation

- **WHEN** a user views the `anime` pack label in English
- **THEN** the display name conveys both anime and Western animation (e.g. "Anime & Animation")

