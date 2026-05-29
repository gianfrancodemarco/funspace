## Purpose

Define search-engine optimization requirements for public FunSpace pages across all locales.

## Requirements

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

### Requirement: Open Graph tags

Public pages SHALL include Open Graph metadata (at minimum `og:title`, `og:description`, and `og:type`).

#### Scenario: Homepage Open Graph

- **WHEN** the homepage is shared on a platform that reads Open Graph tags
- **THEN** a title and description are available from OG meta tags

### Requirement: Sitemap

The application SHALL provide a sitemap listing all public indexable routes for every supported locale.

#### Scenario: Sitemap includes all locale routes

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the sitemap lists `/en`, `/en/about`, `/en/players`, `/it`, `/it/about`, and `/it/players`

### Requirement: Robots configuration

The application SHALL provide a robots configuration that allows indexing of public pages.

#### Scenario: Robots allows indexing

- **WHEN** a crawler requests `/robots.txt`
- **THEN** public pages are not disallowed from indexing

### Requirement: Semantic HTML structure

Public pages SHALL use semantic HTML elements including `header`, `nav`, and `main` with a logical heading hierarchy.

#### Scenario: Homepage semantic structure

- **WHEN** a user or crawler parses the homepage HTML
- **THEN** the page contains `header`, `nav`, and `main` landmarks and a single top-level `h1`
