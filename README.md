# FunSpace

In-person party games for friends — playable on a single shared phone. No signup required.

**Live site:** [gianfrancodemarco.github.io/funspace/en](https://gianfrancodemarco.github.io/funspace/en)

[![CI](https://github.com/gianfrancodemarco/funspace/actions/workflows/ci.yml/badge.svg)](https://github.com/gianfrancodemarco/funspace/actions/workflows/ci.yml)
[![Deploy](https://github.com/gianfrancodemarco/funspace/actions/workflows/deploy.yml/badge.svg)](https://github.com/gianfrancodemarco/funspace/actions/workflows/deploy.yml)

## Stack

- **Next.js** (App Router) + React + TypeScript
- **Tailwind CSS** + shadcn/ui
- **next-intl** — i18n (English first)
- **XState** + **Zod** — reserved for game logic (upcoming changes)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

## CI/CD

GitHub Actions runs on every **pull request** and push to **`main`**:

- Lint (`npm run lint`)
- Unit tests (`npm test`)
- Static export build (`GITHUB_PAGES=true npm run build`)

Pushes to **`main`** also deploy the static site to **GitHub Pages** via `.github/workflows/deploy.yml`.

### One-time GitHub Pages setup

1. Open repository **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Merge to `main` — the deploy workflow publishes to `https://gianfrancodemarco.github.io/funspace/`

### Local GitHub Pages build

```bash
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://gianfrancodemarco.github.io/funspace npm run build
```

Static output is written to `out/`. Serve locally with any static file server rooted at `out/`.

## Project structure

```
src/
├── app/              # Next.js App Router (pages, SEO)
├── catalog/          # Game metadata and catalog data
├── components/       # UI and layout components
├── core/             # Shared infrastructure (game shell, storage — upcoming)
├── games/            # Per-game modules (upcoming)
├── i18n/             # next-intl routing and request config
├── messages/         # Translation files (en.json)
└── lib/              # Utilities
```

## Documentation

- [Product vision & decisions](docs/product-vision.md)
- [OpenSpec changes](openspec/changes/)
