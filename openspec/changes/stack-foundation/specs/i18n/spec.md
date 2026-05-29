## ADDED Requirements

### Requirement: Locale-based routing

The application SHALL use locale-prefixed routes with `next-intl`. The default locale SHALL be English (`en`).

#### Scenario: Default locale redirect

- **WHEN** a user navigates to `/`
- **THEN** they are redirected to `/en`

#### Scenario: English homepage route

- **WHEN** a user navigates to `/en`
- **THEN** the English homepage is displayed

### Requirement: English as launch locale

The application SHALL ship with English as the only available locale. All user-facing strings MUST be defined in `messages/en.json`.

#### Scenario: No hardcoded UI strings

- **WHEN** a developer inspects page and layout components
- **THEN** user-visible text is loaded via translation keys, not hardcoded literals

#### Scenario: English messages file exists

- **WHEN** a developer inspects the messages directory
- **THEN** an `en.json` file contains all UI copy for the homepage, navigation, and about page

### Requirement: HTML lang attribute

The locale layout SHALL set `lang="en"` on the `<html>` element for English pages.

#### Scenario: Correct lang attribute

- **WHEN** a user views any page under `/en`
- **THEN** the rendered HTML document has `lang="en"` on the `<html>` element

### Requirement: Extensible locale configuration

The i18n configuration SHALL define a locales list and default locale in a central module so additional locales can be added without restructuring the app.

#### Scenario: Locale config is centralized

- **WHEN** a developer inspects the i18n routing configuration
- **THEN** `en` is listed as the default locale and the structure supports adding further locales
