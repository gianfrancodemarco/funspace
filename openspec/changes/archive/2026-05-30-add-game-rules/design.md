## Context

FunSpace games launch directly into a setup screen after the user picks a game from the catalog. Catalog cards show a short tagline (`games.{id}.description`) but no structured rules. Impostor in particular has nuanced roles, verbal gameplay, and win conditions documented in `docs/games/impostor-design.md` — none of which is surfaced in the app today.

The game shell already centralizes lifecycle phases and layout chrome (`GameShellLayout`, `GamePageClient`). Game definitions extend a shared `GameDefinition` type with optional `SetupView`. This change adds a cross-game rules presentation layer without coupling rules copy to React components.

## Goals / Non-Goals

**Goals:**

- Provide a **shared, reusable rules UI** with a consistent section structure every game can adopt
- Let playable games opt in via a **declarative contract** on `GameDefinition` (i18n key prefix)
- Show rules **during setup** so groups can read them before configuring players
- Ship **complete Impostor rules** in English and Italian, written for first-time players
- Keep rules content in **translation files**, not hardcoded JSX

**Non-Goals:**

- Rules on the homepage catalog card (future enhancement; setup is sufficient for v1)
- Rules for coming-soon placeholder games
- Variant-specific rules (e.g. per Impostor preset) — one general rules page covers all presets
- Printable/PDF rules or external links
- In-play phase rules reminders (setup-only access)

## Decisions

### 1. i18n key prefix on `GameDefinition`

Add optional `rulesKeyPrefix?: string` to `GameDefinition`. When set, the shell renders a rules entry point that loads content from `{prefix}.*` translation keys.

**Rationale:** Matches existing `nameKey` pattern; keeps rules copy editable without code changes; works with next-intl and Italian from day one.

**Alternatives considered:**
- Custom `RulesView` component per game — flexible but duplicates layout; rejected for v1
- Markdown files per locale — harder to integrate with next-intl and existing message workflow

### 2. Fixed section schema in shared component

`GameRulesPanel` renders four sections in order:

1. **Goal** — one short paragraph
2. **Roles** — bullet list (role name + description)
3. **How to play** — numbered steps
4. **Win conditions** — bullet list

Translation shape:

```
{prefix}.title
{prefix}.sections.goal.title / .body
{prefix}.sections.roles.title / .items.{civilian|impostor|spy}
{prefix}.sections.howToPlay.title / .steps.1 … .steps.N
{prefix}.sections.winConditions.title / .items.civilians / .items.impostors
```

**Rationale:** Scannable on a phone; same mental model across future games; easy to validate completeness in tests.

### 3. Dialog for rules content

Use a shadcn `Dialog` triggered by a secondary "How to play" button. On mobile, a dialog avoids pushing setup content far down the page.

**Alternatives considered:**
- Inline collapsible — simpler but makes setup long; rejected
- Dedicated `/games/{id}/rules` route — over-engineered for v1

### 4. Rules trigger placement

Render `GameRulesTrigger` in `GamePageClient` during the setup phase, above the setup form content, when `game.rulesKeyPrefix` is defined. Both default `PlayerSelectSetup` and custom setup views (Impostor) benefit without each view importing rules manually.

**Rationale:** Single integration point; Impostor setup stays focused on configuration.

### 5. Impostor copy source

Derive player-facing rules from `docs/games/impostor-design.md` sections 1–3 and gameplay flow (verbal clues, elimination via app, win checks). Use plain language; mention spy as optional role without preset-specific detail.

## Risks / Trade-offs

- **[Risk] Long rules on small screens** → Use short paragraphs, bullets, and numbered steps; dialog is scrollable
- **[Risk] Games without rules feel incomplete** → Contract is optional; coming-soon games unaffected
- **[Risk] i18n key drift between en/it** → Add a lightweight test or validation that required keys exist in both files
- **[Trade-off] Static rules vs. dynamic preset rules** → Simpler copy; preset tooltips in setup remain the place for variant hints

## Migration Plan

1. Add shared component and extend `GameDefinition` type
2. Wire trigger into setup phase in `GamePageClient`
3. Add `gameRules.*` shared strings and `impostor.rules.*` content to en.json / it.json
4. Set `rulesKeyPrefix: "impostor.rules"` on `impostorDefinition`
5. No data migration; no breaking API changes

Rollback: remove `rulesKeyPrefix` and shared component; setup reverts to current behavior.

## Open Questions

- None blocking v1. Homepage rules link can be a follow-up change if user feedback requests it.
