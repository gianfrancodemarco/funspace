## Context

FunSpace uses shadcn/ui with Tailwind CSS v4 and CSS variable theming. `globals.css` already declares `@custom-variant dark (&:is(.dark *))` but only defines `:root` (light) tokens — no `.dark` block and no user control. The app shell header is the natural place for a theme toggle. Theme preference should persist locally without requiring the future StoragePort abstraction (next-themes handles this).

## Goals / Non-Goals

**Goals:**

- Support **light**, **dark**, and **system** theme modes
- Apply dark palette via `.dark` class on `<html>` (shadcn convention)
- Expose a **theme toggle** in the header on all pages
- **Persist** user preference across sessions (localStorage)
- Avoid **flash of incorrect theme** on initial load
- Add **i18n** accessibility labels for the toggle

**Non-Goals:**

- Per-game theme overrides
- Custom theme editor / color picker
- Integrating theme storage with the future StoragePort (may refactor later)
- `prefers-color-scheme` without user override (system mode covers this)
- Separate themes per locale

## Decisions

### 1. next-themes for theme management

**Decision:** Use `next-themes` `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`.

**Rationale:** De-facto standard for Next.js + shadcn. Handles localStorage persistence, system preference detection, and SSR flash prevention.

**Alternative considered:** Manual localStorage + matchMedia — reinventing next-themes.

### 2. Dark CSS tokens in globals.css

**Decision:** Add a `.dark { ... }` block with shadcn neutral dark palette (oklch values matching shadcn defaults).

**Rationale:** All existing components use CSS variables (`bg-background`, `text-foreground`, etc.) — dark mode works without component changes.

### 3. Theme toggle UX — cycle button

**Decision:** Single icon button in the header that cycles: **light → dark → system → light**.

Icons: Sun (light), Moon (dark), Monitor (system). Uses shadcn `Button` variant `ghost` size `icon`.

**Placement:**
- Desktop: right side of header, before/alongside nav
- Mobile: inside the Sheet menu, above nav links

**Alternative considered:** Dropdown with three explicit options — clearer but more UI; cycle is sufficient for v1.

### 4. Layout integration

**Decision:** Wrap app in `ThemeProvider` via a client component `Providers` in `[locale]/layout.tsx`.

```tsx
<html lang={locale} suppressHydrationWarning>
  <body>
    <Providers>
      <NextIntlClientProvider ...>
        <AppShell>...</AppShell>
      </NextIntlClientProvider>
    </Providers>
  </body>
</html>
```

`suppressHydrationWarning` on `<html>` is required by next-themes to avoid hydration mismatch warnings.

### 5. i18n keys

Add to `messages/en.json`:

```json
"theme": {
  "toggle": "Toggle theme",
  "light": "Light mode",
  "dark": "Dark mode",
  "system": "System theme"
}
```

Toggle `aria-label` reflects current mode; button title updates on cycle.

### 6. Storage key

next-themes default storage key: `theme` in localStorage. Acceptable for v1; documented as candidate for StoragePort migration when that layer lands.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Flash of light theme before dark loads | next-themes blocking script / `suppressHydrationWarning` |
| Theme toggle hydration mismatch | ThemeToggle is `"use client"` only; provider wraps client boundary |
| Sheet/mobile menu styling in dark mode | Inherits CSS variables automatically |
| StoragePort abstraction bypass | Document in design; small scoped debt |

## Migration Plan

No migration needed. Default is `system` — existing users see no change until they interact with the toggle. Deploy as a frontend-only update.

## Open Questions

- None blocking — shadcn neutral dark palette is sufficient for v1
