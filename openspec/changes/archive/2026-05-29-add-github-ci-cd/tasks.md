## 1. Next.js Static Export Config

- [x] 1.1 Update `next.config.ts` — static export, basePath, assetPrefix, unoptimized images when `GITHUB_PAGES=true`
- [x] 1.2 Add `public/index.html` root redirect to `/en/` for static hosting
- [x] 1.3 Verify `NEXT_PUBLIC_SITE_URL` is used correctly in metadata/sitemap

## 2. GitHub Actions — CI

- [x] 2.1 Create `.github/workflows/ci.yml` — triggers on `pull_request` and push to `main`
- [x] 2.2 CI steps: checkout, setup-node (22), npm ci, lint, test, build with `GITHUB_PAGES=true`

## 3. GitHub Actions — Deploy

- [x] 3.1 Create `.github/workflows/deploy.yml` — trigger on push to `main`
- [x] 3.2 Configure Pages permissions (`pages: write`, `id-token: write`)
- [x] 3.3 Build static export, upload Pages artifact, deploy via `actions/deploy-pages@v4`

## 4. Documentation & Verification

- [x] 4.1 Update README with CI/CD overview and GitHub Pages setup instructions
- [x] 4.2 Verify local build with `GITHUB_PAGES=true npm run build` succeeds
- [x] 4.3 Verify `npm test` and `npm run lint` still pass
