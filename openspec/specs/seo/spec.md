### Requirement: Per-page metadata

Each public page SHALL export metadata including a unique title and description suitable for search engines.

#### Scenario: Homepage metadata

- **WHEN** a search engine or social crawler fetches `/en`
- **THEN** the response includes a page title and meta description describing FunSpace

#### Scenario: About page metadata

- **WHEN** a search engine or social crawler fetches `/en/about`
- **THEN** the response includes a unique title and meta description for the about page

### Requirement: Open Graph tags

Public pages SHALL include Open Graph metadata (at minimum `og:title`, `og:description`, and `og:type`).

#### Scenario: Homepage Open Graph

- **WHEN** the homepage is shared on a platform that reads Open Graph tags
- **THEN** a title and description are available from OG meta tags

### Requirement: Sitemap

The application SHALL provide a sitemap listing all public indexable routes.

#### Scenario: Sitemap includes public routes

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the sitemap lists `/en` and `/en/about`

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
