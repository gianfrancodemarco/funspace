## Context

Opening "How to play" today shows a standard centered dialog:

- Generic `DialogContent` with border, `p-6`, plain title
- `GameRulesPanel` renders four sections as uppercase `<h3>` labels + muted bullet/numbered lists
- No icons, cards, or visual hierarchy beyond heading size
- Close is only the tiny X in the corner

The trigger button position (first item in the setup column) is **fine and stays as-is**. The problem is the **modal interior** — it reads like a wiki page dropped into a dialog.

FunSpace elsewhere uses `rounded-xl` cards, violet primary accents, tag colors, and comfortable mobile spacing. The rules modal should borrow that language.

## Goals / Non-Goals

**Goals:**

- Propose **two or three modal designs** that feel native to FunSpace
- Improve scannability on a phone (short sections, clear hierarchy, numbered flow)
- Keep all existing translation keys and section order
- Preserve scroll for long rules (Impostor, Truth or Dare) and dialog close behavior

**Non-Goals:**

- Moving or restyling the "How to play" trigger button
- Rewriting rules copy or adding new sections
- Sheet/bottom-drawer instead of dialog (unless chosen explicitly later)
- Rules on homepage or in-play phase

---

## Current modal (problem)

```
┌─────────────────────────────┐
│ How to play Impostor     [x]│
│                             │
│ GOAL                        │
│ Most players know a secret… │
│                             │
│ ROLES                       │
│ • Civilian — knows…         │
│ • Impostor — does not…      │
│                             │
│ HOW TO PLAY                 │
│ 1. Choose players…          │
│ 2. Pass the phone…          │
│ …                           │
└─────────────────────────────┘
```

Flat, document-like, uppercase labels feel harsh and "alert-like" inside the modal.

---

## Design options

**Pick one before `/opsx:apply`.** All options keep the trigger button unchanged.

### Option A — Section cards with icons (recommended)

Each section becomes a soft card inside the dialog. Icons and spacing create hierarchy without changing content.

**Modal shell**

```
┌─────────────────────────────┐
│ 📖  How to play Impostor [x]│  ← icon + title row, optional subtitle muted
├─────────────────────────────┤
│ ┌─ Goal ─────────────────┐  │
│ │ 🎯  Most players know…  │  │  ← primary/5 tint, rounded-xl, p-4
│ └─────────────────────────┘  │
│ ┌─ Roles ────────────────┐  │
│ │ 👤 Civilian            │  │  ← role name bold, description muted below
│ │    knows the secret…   │  │
│ │ 👤 Impostor            │  │
│ │    does not know…      │  │
│ └─────────────────────────┘  │
│ ┌─ How to play ──────────┐  │
│ │ ① Choose players…      │  │  ← numbered circles (primary bg)
│ │ ② Pass the phone…      │  │
│ └─────────────────────────┘  │
│ ┌─ Win conditions ───────┐  │
│ │ ✓ Civilians win when…  │  │
│ │ ✓ Impostors win when…  │  │
│ └─────────────────────────┘  │
├─────────────────────────────┤
│        [ Got it ]           │  ← full-width secondary dismiss (DialogClose)
└─────────────────────────────┘
```

**Details**

- Dialog: `rounded-2xl`, `max-h-[85vh]`, flex column — **sticky header + scrollable body + sticky footer**
- Section titles: **sentence case**, `text-sm font-semibold`, not `uppercase tracking-wide`
- Section icons (lucide): `Target` (goal), `Users` (roles), `ListOrdered` (steps), `Trophy` (win) — mapped by section id, not per-game
- Role bullets: split on ` — ` into **bold label** + muted body (works for all current en/it copy)
- Steps: custom numbered badges instead of `list-decimal`
- Footer **"Got it"** button (`gameRules.gotIt`) as `DialogClose` — easier to dismiss on mobile than corner X alone

**Pros:** Biggest visual upgrade; matches card UI elsewhere; still one scrollable page  
**Cons:** Slightly more vertical space per section

---

### Option B — Hero goal + compact timeline

Lead with a highlighted goal "hero" block; remaining sections use a lighter vertical timeline.

**Modal shell**

```
┌─────────────────────────────┐
│ How to play Impostor     [x]│
├─────────────────────────────┤
│ ╭─────────────────────────╮ │
│ │ Goal                    │ │  ← full-width hero, bg-primary/10,
│ │ Most players know a     │ │     larger text (text-base)
│ │ secret word…            │ │
│ ╰─────────────────────────╯ │
│                             │
│ Roles                       │
│ ○ Civilian — knows…         │  ← dot + text, no card borders
│ ○ Impostor — does not…      │
│                             │
│ How to play                 │
│ │                           │
│ ├─① Choose players…         │  ← vertical line connecting steps
│ ├─② Pass the phone…         │
│ │                           │
│ Win conditions              │
│ ○ Civilians win when…       │
│ ○ Impostors win when…       │
└─────────────────────────────┘
```

**Details**

- Only the **goal** gets heavy treatment (tinted hero block)
- Roles and win conditions: simple dot list with comfortable line-height
- Steps: **vertical timeline** with connecting line (`border-l-2 border-primary/20`) and numbered nodes
- No section cards — cleaner but less "chunky" than Option A
- Optional footer "Got it" or rely on X only

**Pros:** Strong opening hook; lighter than full card stack  
**Cons:** Roles/win sections still fairly plain; timeline CSS needs care on long step lists

---

### Option C — Accordion sections

Collapsible sections — only one or two open at a time. Compact at rest, expandable on tap.

**Modal shell**

```
┌─────────────────────────────┐
│ How to play Impostor     [x]│
├─────────────────────────────┤
│ ▼ Goal                      │  ← expanded by default
│   Most players know…        │
│ ▶ Roles                     │
│ ▶ How to play               │
│ ▶ Win conditions            │
├─────────────────────────────┤
│        [ Got it ]           │
└─────────────────────────────┘
```

**Details**

- Use shadcn-style accordion (may need new `src/components/ui/accordion.tsx` or lightweight custom)
- **Goal** and **How to play** open by default; others collapsed
- Chevron rotation, smooth height transition
- Section headers: icon + title row in accordion trigger

**Pros:** Shortest modal on first paint; good for very long rules  
**Cons:** Extra tap to read everything; new UI primitive; may hide content from first-time users

---

## Comparison

| | Visual polish | Scannability | Effort | Mobile dismiss |
|---|---------------|--------------|--------|----------------|
| **A — Section cards** | Highest | Best (all visible) | Medium | Footer "Got it" |
| **B — Hero + timeline** | High | Good | Medium | Optional footer |
| **C — Accordion** | Medium | Requires taps | Higher | Footer "Got it" |

## Decision (pending)

**Recommendation:** **Option A (section cards with icons)** — best alignment with FunSpace card UI, improves every section equally, and the footer dismiss button fixes the awkward corner-only close on mobile.

Choose **Option B** if you want a lighter look with less boxiness. Choose **Option C** only if rules feel too long when fully expanded.

## Risks / Trade-offs

- **[Risk] Role text split on ` — ` breaks if copy format changes** → Parse defensively; fall back to full string if no delimiter
- **[Risk] Icons feel generic across games** → Use section-type icons, not game-specific art
- **[Risk] Sticky footer reduces scroll area** → Keep body `flex-1 overflow-y-auto`; test on 667px height
- **[Trade-off] More padding = more scroll** → Acceptable; rules are reference content

## Migration Plan

1. Confirm modal design option (A, B, or C)
2. Refactor `GameRulesPanel` layout components (`RulesSectionCard`, `RulesStepList`, etc.)
3. Update `GameRulesTrigger` dialog structure (sticky header/body/footer)
4. Add `gameRules.gotIt` to en/it if footer ships
5. Update tests; no i18n content changes for game rules themselves

## Open Questions

- **Which modal option (A, B, or C)?**
- Ship footer **"Got it"** button in all options or A only?
- Keep corner X in addition to footer dismiss, or footer only?
