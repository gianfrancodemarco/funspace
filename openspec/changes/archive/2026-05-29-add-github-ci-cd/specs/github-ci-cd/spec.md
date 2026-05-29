## ADDED Requirements

### Requirement: CI runs on pull requests

The repository SHALL run automated checks on every pull request targeting `main`.

#### Scenario: Pull request triggers CI

- **WHEN** a pull request is opened or updated
- **THEN** a GitHub Actions workflow runs lint, test, and build steps

#### Scenario: CI fails on test failure

- **WHEN** unit tests fail during a pull request CI run
- **THEN** the workflow exits with a failing status

### Requirement: CI runs on main branch pushes

The repository SHALL run the same automated checks on every push to `main`.

#### Scenario: Main branch push triggers CI

- **WHEN** a commit is pushed to `main`
- **THEN** the CI workflow runs lint, test, and build steps

### Requirement: CI quality gates

The CI workflow SHALL execute linting, unit tests, and a production build before reporting success.

#### Scenario: Lint step included

- **WHEN** CI runs
- **THEN** `npm run lint` is executed

#### Scenario: Test step included

- **WHEN** CI runs
- **THEN** `npm test` is executed

#### Scenario: Build step included

- **WHEN** CI runs
- **THEN** `npm run build` is executed with GitHub Pages production environment variables

### Requirement: Deploy to GitHub Pages on main

The repository SHALL deploy the static site to GitHub Pages when commits are pushed to `main`.

#### Scenario: Main push triggers deploy

- **WHEN** a commit is pushed to `main`
- **THEN** a deploy workflow builds a static export and publishes to GitHub Pages

#### Scenario: Deploy artifact is static export

- **WHEN** the deploy workflow completes a build
- **THEN** the published artifact is the Next.js static export output directory

### Requirement: Production site URL configuration

Production builds in CI and deploy SHALL set the public site URL for correct SEO metadata.

#### Scenario: Site URL env var set in deploy

- **WHEN** the deploy workflow builds the application
- **THEN** `NEXT_PUBLIC_SITE_URL` is set to the GitHub Pages project URL
