## Why

FunSpace has no automated quality checks or deployment pipeline. Every change is validated and published manually. Adding GitHub Actions CI ensures tests and builds pass on pull requests and `main`, and deploying to GitHub Pages gives the project a public URL on every merge to `main`.

## What Changes

- Add **GitHub Actions CI workflow** — runs on pull requests and pushes to `main` (`npm ci`, lint, test, build)
- Add **GitHub Actions deploy workflow** — deploys to **GitHub Pages** on pushes to `main`
- Configure Next.js for **static export** compatible with GitHub Pages (`output: 'export'`)
- Set **`basePath`** for project-site hosting (`/funspace`) when building for production
- Add root **redirect** from `/` to `/en` for static hosting (middleware does not run on GitHub Pages)
- Set **`NEXT_PUBLIC_SITE_URL`** in CI/deploy for correct SEO metadata
- Document GitHub Pages setup steps in README

## Capabilities

### New Capabilities

- `github-ci-cd`: Continuous integration (test/lint/build) and GitHub Pages deployment workflows

### Modified Capabilities

- `project-scaffold`: Production build must support static export for GitHub Pages deployment

## Impact

- New files: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
- Modified: `next.config.ts`, `package.json` (optional build script), `public/index.html` (redirect), README
- GitHub repo settings: Pages source must be set to **GitHub Actions**
- No backend; deployment is static files only
- Middleware-based locale redirect replaced/supplemented for static hosting at root path
