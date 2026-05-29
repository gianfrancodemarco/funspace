## Why

FunSpace currently ships with a light-only UI. Party games are often played in the evening or dimly lit rooms — a dark theme improves comfort and readability. The CSS foundation already defines a `dark` variant hook; this change completes the user-facing theme experience with a toggle and persistence.

## What Changes

- Add **dark mode CSS variables** to `globals.css` (shadcn neutral dark palette)
- Integrate **`next-themes`** for light / dark / system preference
- Add a **theme toggle** in the app header (visible on desktop and mobile menu)
- **Persist** the user's theme choice in the browser (localStorage via next-themes)
- Add **i18n strings** for theme toggle accessibility labels
- Prevent **flash of wrong theme** on page load

## Capabilities

### New Capabilities

- `theme`: Theme preference (light, dark, system), persistence, and CSS token application

### Modified Capabilities

- `app-shell`: Header must expose a theme toggle control accessible from all pages

## Impact

- New dependency: `next-themes`
- Modified files: `globals.css`, `[locale]/layout.tsx`, `Header.tsx`, `messages/en.json`
- New components: `ThemeProvider`, `ThemeToggle`
- No backend changes; theme preference is client-side only
- Existing pages and components inherit dark styling via CSS variables — no per-component rewrites expected
