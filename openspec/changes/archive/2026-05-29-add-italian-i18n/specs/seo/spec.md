## MODIFIED Requirements

### Requirement: Per-page metadata

Each public page SHALL export metadata including a unique title and description suitable for search engines, localized per locale.

#### Scenario: Homepage metadata in English

- **WHEN** a search engine or social crawler fetches `/en`
- **THEN** the response includes an English page title and meta description describing FunSpace

#### Scenario: Homepage metadata in Italian

- **WHEN** a search engine or social crawler fetches `/it`
- **THEN** the response includes an Italian page title and meta description describing FunSpace

#### Scenario: About page metadata in English

- **WHEN** a search engine or social crawler fetches `/en/about`
- **THEN** the response includes a unique English title and meta description for the about page

#### Scenario: About page metadata in Italian

- **WHEN** a search engine or social crawler fetches `/it/about`
- **THEN** the response includes a unique Italian title and meta description for the about page

### Requirement: Sitemap

The application SHALL provide a sitemap listing all public indexable routes for every supported locale.

#### Scenario: Sitemap includes all locale routes

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the sitemap lists `/en`, `/en/about`, `/it`, and `/it/about`
