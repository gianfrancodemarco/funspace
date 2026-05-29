## 1. Design Tokens

- [x] 1.1 Update `globals.css` with vibrant violet primary, tinted backgrounds, and accent tokens (light + dark)
- [x] 1.2 Create `src/lib/tag-colors.ts` with tag → color class mapping
- [x] 1.3 Add `accentColor` to `GameMeta` and set per-game values in `catalog/games.ts`
- [x] 1.4 Update `components.json` baseColor to `violet` if needed for shadcn alignment

## 2. Shared Components

- [x] 2.1 Create `TagBadge` component with category-based colors
- [x] 2.2 Update `GameCard` — accent top border, colorful tags, polished coming-soon badge, shadow
- [x] 2.3 Update `Header` — brand styling, active nav primary highlight

## 3. Pages

- [x] 3.1 Redesign homepage hero — gradient container, gradient title, mobile-first typography
- [x] 3.2 Refresh about page styling to match new visual language (section spacing, colored accents)
- [x] 3.3 Audit responsive layout on homepage and about (`sm`/`md`/`lg` breakpoints)

## 4. Verification

- [x] 4.1 Update tests if class names or structure changed
- [x] 4.2 Verify light and dark mode both look vibrant and readable
- [x] 4.3 Verify `npm run build` and `npm test` pass
