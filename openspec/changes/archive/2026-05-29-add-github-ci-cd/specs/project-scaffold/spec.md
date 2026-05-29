## ADDED Requirements

### Requirement: Static export for GitHub Pages

The project SHALL support building a static export suitable for GitHub Pages hosting when the `GITHUB_PAGES` environment variable is set.

#### Scenario: Static export output

- **WHEN** a developer runs the build with `GITHUB_PAGES=true`
- **THEN** a static site is generated in the `out/` directory

#### Scenario: Base path for project site

- **WHEN** building with `GITHUB_PAGES=true`
- **THEN** the application is configured with base path `/funspace` for assets and routes
