## Context

FunSpace is a Next.js 15 App Router app with `next-intl` middleware for locale routing. GitHub Pages serves **static files only** — no Node.js runtime, no Edge middleware. The default `next build` output targets Vercel/Node hosting. Deploying to GitHub Pages requires **static export** (`output: 'export'`) and adjustments for project-page URL structure (`https://<user>.github.io/<repo>/`).

Repository: `gianfrancodemarco/funspace` → base path **`/funspace`**.

## Goals / Non-Goals

**Goals:**

- Run **lint, test, and build** on every pull request and push to `main`
- **Deploy to GitHub Pages** automatically when `main` is updated
- Production site accessible at `https://gianfrancodemarco.github.io/funspace/`
- Correct asset paths and SEO URLs in production build
- Minimal workflow maintenance (official GitHub Actions)

**Non-Goals:**

- Preview deployments for pull requests
- Vercel/Netlify deployment
- Custom domain configuration (can be added later)
- E2E/browser tests in CI (unit tests only for now)
- Docker or container-based deploy

## Decisions

### 1. Two workflows: CI + Deploy

**Decision:** Separate workflows for clarity and permissions.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | `pull_request`, push to `main` | lint, test, build (verify only) |
| `deploy.yml` | push to `main` | build static export + deploy to Pages |

**Rationale:** CI runs on PRs without deploy permissions. Deploy workflow has `pages: write` and only runs on `main`.

**Alternative considered:** Single workflow with conditional deploy job — works but mixes concerns and permissions.

### 2. Static export for GitHub Pages

**Decision:** Add to `next.config.ts`:

```typescript
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/funspace" : "",
  assetPrefix: isGithubPages ? "/funspace/" : undefined,
  images: { unoptimized: true },
};
```

- CI build (non-export): standard `next build` to verify compilation (no export needed for PR validation)
- Deploy build: `GITHUB_PAGES=true npm run build` → outputs to `out/`

**Rationale:** Static export is required for GitHub Pages. Standard build in CI still validates the app compiles without forcing export constraints on every PR... Actually static export may have different constraints (no dynamic server features). Safer to **always build with export in CI** when we enable export, so CI matches deploy.

**Revised:** CI and deploy both use `GITHUB_PAGES=true npm run build` so CI catches export issues early.

### 3. Middleware vs static hosting

**Decision:** Next.js middleware **does not run** on GitHub Pages. Add `public/index.html` with a meta-refresh / JS redirect from repo root to `/funspace/en/` (or relative `./en/`).

For local dev, middleware continues to handle `/` → `/en`.

**Rationale:** Static hosts cannot execute Next middleware. Users hitting `github.io/funspace/` need a static redirect.

### 4. GitHub Actions — CI workflow

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
        env:
          GITHUB_PAGES: "true"
          NEXT_PUBLIC_SITE_URL: https://gianfrancodemarco.github.io/funspace
```

### 5. GitHub Actions — Deploy workflow

Uses official [GitHub Pages deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow):

```yaml
name: Deploy
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: "true"
          NEXT_PUBLIC_SITE_URL: https://gianfrancodemarco.github.io/funspace
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 6. Node.js version

**Decision:** Node **22** LTS in CI (matches modern Next.js 15 requirements).

### 7. README documentation

Add section covering:
- CI badges (optional)
- GitHub Pages URL
- One-time repo setting: Settings → Pages → Source: **GitHub Actions**

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Static export limits (no middleware, no SSR) | App is already SSG-friendly; redirect via `public/index.html` |
| basePath breaks local dev if always on | Only enable basePath when `GITHUB_PAGES=true` |
| Duplicate CI+deploy builds on main push | Acceptable; deploy could `needs` a reusable workflow later |
| sitemap/robots URLs wrong | Set `NEXT_PUBLIC_SITE_URL` in CI/deploy env |

## Migration Plan

1. Merge workflow + config changes
2. Enable GitHub Pages → GitHub Actions in repo settings
3. Push to `main` triggers first deploy
4. Verify `https://gianfrancodemarco.github.io/funspace/en`

## Open Questions

- Custom domain later — out of scope; `NEXT_PUBLIC_SITE_URL` env makes it easy to update
