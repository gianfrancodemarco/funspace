### Requirement: Next.js React TypeScript project

The repository SHALL contain a Next.js (App Router) React application written in TypeScript that builds and runs in development mode.

#### Scenario: Development server starts

- **WHEN** a developer runs the dev command
- **THEN** the application starts without errors and serves the homepage at `/en`

#### Scenario: Production build succeeds

- **WHEN** a developer runs the build command
- **THEN** a production build is generated without errors

### Requirement: Tailwind CSS styling

The project SHALL use Tailwind CSS for styling, configured with the shadcn/ui CSS variable theme.

#### Scenario: Tailwind classes applied

- **WHEN** components use Tailwind utility classes
- **THEN** styles are applied correctly in the browser

### Requirement: Path alias configuration

The project SHALL support `@/` as a path alias resolving to the `src/` directory in both TypeScript and Next.js configuration.

#### Scenario: Alias imports resolve

- **WHEN** source files import using `@/` prefix
- **THEN** the imports resolve correctly at build and type-check time

### Requirement: Scalable folder structure

The project SHALL organize source code into directories for `app/`, `components/`, `catalog/`, `core/`, `games/`, `i18n/`, `messages/`, and `lib/` as defined in the design document.

#### Scenario: Core directories exist

- **WHEN** a developer inspects the `src/` directory
- **THEN** `app/`, `catalog/`, `core/`, `games/`, `components/`, `i18n/`, `messages/`, and `lib/` directories are present

#### Scenario: Future module placeholders

- **WHEN** a developer inspects `src/core/` and `src/games/`
- **THEN** placeholder subdirectories exist for future game-shell, secret-delivery, storage, and per-game modules

### Requirement: Catalog type definitions

The project SHALL define TypeScript interfaces for game catalog metadata (`GameMeta`) in the catalog module, using i18n keys for display text.

#### Scenario: GameMeta type exported

- **WHEN** a developer imports from the catalog types module
- **THEN** a `GameMeta` interface is available with fields for id, nameKey, descriptionKey, tags, player counts, and status

### Requirement: Stack dependencies installed

The project SHALL include the following runtime dependencies: Next.js, React, next-intl, XState, and Zod.

#### Scenario: Dependencies in package manifest

- **WHEN** a developer inspects `package.json`
- **THEN** `next`, `react`, `next-intl`, `xstate`, `@xstate/react` (or equivalent), and `zod` are listed as dependencies

### Requirement: Test runner configured

The project SHALL configure Vitest with Testing Library for component and unit tests.

#### Scenario: Tests run successfully

- **WHEN** a developer runs the test command
- **THEN** the test runner executes and at least one smoke test passes

### Requirement: README with dev commands

The project SHALL include a README documenting how to install dependencies, run the dev server, build, and run tests.

#### Scenario: README documents setup

- **WHEN** a new developer reads the README
- **THEN** they find instructions for install, dev, build, and test commands
