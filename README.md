# FunSpace

In-person party games for friends — playable on a single shared phone. No signup required.

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
