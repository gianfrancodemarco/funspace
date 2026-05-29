# FunSpace — Product Vision & Decisions

This document captures the product definition, architectural decisions, and technical direction agreed during initial discovery. It serves as the source of truth before formal OpenSpec change proposals.

---

## 1. What FunSpace Is

FunSpace is a **web app that aggregates and hosts in-person party games** — simple social games meant to be played with friends in the same room.

Examples include:

- Hangman (*Impiccato*)
- Impostor (*Impostore*)
- Never Have I Ever (*Non ho mai*)
- Truth or Dare (*Obbligo o verità*)
- Similar word-based and social games

FunSpace is both:

1. **A catalog** — browse, discover, and launch games
2. **A game platform** — the games run inside the app itself

Games are intentionally **simple**, primarily **word-based**, and designed for **social play in person**.

---

## 2. Core Product Principles

| Principle | Decision |
|-----------|----------|
| **No registration** | Zero accounts, zero login friction |
| **Frontend-only (v1)** | No backend required to ship and play |
| **Privacy-friendly** | No user data collection by default |
| **Mobile-first** | Optimized for a phone passed around at a table |
| **Low friction** | Open the site, pick a game, play immediately |

---

## 3. Single-Device First

### Default UX model

All games should be playable on **a single shared phone**. This is the primary interaction model, not a fallback.

Multi-device support is a **future evolution**, not a v1 requirement.

### Pass-the-phone pattern

When a game requires private information (roles, secrets, etc.), the app uses a sequential reveal flow:

```
Setup → Private reveal loop → Shared play → Resolve → (optional) Rematch
```

**Reveal loop (per player):**

1. Instruction: *"Pass the phone to [Player Name]"*
2. Player taps to reveal their secret (role, card, etc.)
3. Player confirms they have memorized it
4. Screen is covered / blurred — secret is hidden
5. Instruction to pass the phone to the next player
6. Repeat until all players have seen their private info

### Example: Impostor on a single device

- The app assigns roles in memory (never shown all at once)
- Each player sees only their own role, one at a time
- After all reveals, the group plays verbally (discussion, accusations, etc.)
- The app may provide a shared screen for timer, instructions, or end-game reveal

### UX considerations for reveal flows

- Randomize reveal order when possible (reduces suspicion)
- Require explicit confirmation before and after showing secrets
- Use a cover/blur screen — not just browser back navigation
- Clear copy: *"Pass the phone to…"* at every handoff

### Single-device limitations (accepted for v1)

- Anonymous voting is awkward (may use pass-the-phone voting or verbal voting)
- Long reveal loops with 8+ players can feel slow
- Peek risk exists — mitigated by UX, not eliminated entirely

---

## 4. Multi-Device (Future, Not v1)

The architecture should **keep the door open** for multi-device play without building it now.

When multi-device arrives, games like Impostor become simpler: each player sees their role on their own phone — no reveal loop needed.

### Design for extensibility now

- Separate **game rules** from **how secrets are delivered** to players
- Use stable `playerId` values for the session (not user accounts)
- Keep game state serializable
- Emit domain events (`RoleAssigned`, `PhaseChanged`) rather than coupling logic to UI components

### Conceptual layering

```
Game Engine (rules, phases, win conditions)
        │
        ▼
Secret Delivery (how private info reaches a player)
        │
        ├── SingleDeviceProvider   ← v1
        └── MultiDeviceProvider    ← future (rooms, WebSocket, etc.)
        │
        ▼
Shared Phase UI (timer, instructions, final reveal)
```

**Do not build now:** WebSocket, room codes, backend sync, auth, matchmaking.

---

## 5. Data & Storage

### v1: browser local storage

When persistence is needed (preferences, last-used config, optional score history), use the **browser's local storage**.

### Storage abstraction (required)

Storage must be accessed through an abstraction layer so the implementation can change without rewriting game logic.

```
Application / Games
        │
        ▼
   StoragePort (interface)
        │
        ├── LocalStorageAdapter    ← v1
        └── ApiStorageAdapter      ← future backend
```

### What to persist (examples)

- Global preferences (language, theme)
- Last-used game configuration per game
- Optional score / session history
- Favorite variant presets (future)

### Guidelines

- Do not scatter raw `localStorage` calls across game code
- Use typed, namespaced keys (e.g. `funspace:impostor:lastConfig`)
- Keep stored data JSON-serializable — same shape can sync to a backend later
- Consider IndexedDB only if localStorage limits become a real constraint

---

## 6. Game Variants

Many games support **variants** — rule modifiers that change how a game is played without creating an entirely new game.

### Examples (Impostor)

- Classic (1 impostor, no special roles)
- Multiple impostors (2, 3, …)
- With spy role (spy knows the word but appears as crew to the impostor)
- Optional discussion timer
- Custom word packs / categories

Variants are **not separate games in the catalog**. They are modes of the same game.

### Three-level model

```
1. Game ID          e.g. "impostor"
2. Variant Preset   e.g. "classic", "double-agent", "with-spy"
3. Config           fine-grained parameters (validated)
```

- **Presets** — named shortcuts for UX (*Classic*, *Chaos*, *With Spy*)
- **Config** — the actual parameters the game engine consumes
- **Custom setup** — advanced users tweak individual toggles; output is still a config object

### Example config shape (Impostor)

```typescript
ImpostorConfig {
  players: string[]
  impostorCount: number
  roles: {
    spy: boolean
    // future: jester, oracle, ...
  }
  wordPack: string
  discussionTimerSec?: number
  revealOrder: "random" | "fixed"
  votingEnabled: boolean
}
```

### Preset examples

| Preset | impostorCount | spy | Notes |
|--------|---------------|-----|-------|
| Classic | 1 | false | Default |
| Chaos | 2 | false | For larger groups |
| With Spy | 1 | true | Extra hidden role |
| Hard | 2 | true | Larger groups, more complexity |

### Composable rule modules

Instead of branching logic everywhere, optional behaviors are implemented as **rule modules** activated by config:

```
Impostor Core Engine
        │
        ├── MultiImpostorModule
        ├── SpyRoleModule
        └── TimerModule
        └── (future modules)
```

Each module:

- Declares what it adds (roles, phases, UI hooks)
- Reads only its slice of config
- Registers with the game engine

### Config validation

Invalid combinations must be rejected at setup time with clear messages:

- Too many impostors for player count
- Spy enabled with too few players
- etc.

Use a schema validator (e.g. Zod) for config and preset definitions.

### Catalog representation

```
Impostor
├── Classic
├── Two Impostors
├── With Spy
└── Customize…
```

Each variant exposes metadata: name, description, difficulty, min/max players.

---

## 7. Common Game Phase Model

Most FunSpace games share a common lifecycle:

```
SETUP → PRIVATE (optional reveal loop) → PLAY → RESOLVE → REMATCH?
```

| Phase | Purpose |
|-------|---------|
| **Setup** | Player names, options, variant selection |
| **Private** | Pass-the-phone reveals for secrets |
| **Play** | Shared-screen gameplay (verbal, timed, turn-based) |
| **Resolve** | Winner, role reveal, scoring |
| **Rematch** | Replay with same or adjusted config |

Games implement only the phases they need. The **game shell** provides shared infrastructure (setup flow, reveal loop, navigation, rematch).

---

## 8. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FunSpace                             │
├─────────────────────────────────────────────────────────────┤
│  Catalog          Browse, filter, search, launch games      │
│  Game Shell       Setup, reveal loop, shared phase chrome   │
│  Game Engine      Rules, state machine, variant modules     │
│  Secret Delivery  Single-device reveal (multi-device later) │
│  Storage Port     Preferences, last config, history         │
│  Content          Word packs, prompts, question decks       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    Static deploy (no backend v1)
```

### Per-game structure (convention)

```
games/
  impostor/
    meta.ts           # catalog entry, variant list
    config.schema.ts  # validation
    presets.ts        # named variant configs
    machine.ts        # state machine (phases)
    modules/          # optional rule modules
    components/       # game-specific UI
core/
  game-shell/
  secret-delivery/
  storage/
catalog/
```

---

## 9. Recommended Tech Stack

### Primary recommendation

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js (App Router)** | SEO, SSG/SSR for catalog pages, locale routing |
| UI | **React + TypeScript** | Rich ecosystem, good for interactive games |
| i18n | **next-intl** | Locale-prefixed routes; English first, extensible |
| Styling | **Tailwind CSS + shadcn/ui** | Mobile-friendly components, fast iteration |
| Game state | **XState** | Explicit phases (setup, reveal, play, resolve); variant params map cleanly to machine context |
| Validation | **Zod** | Config and preset schemas |
| Testing | **Vitest + Testing Library** | Unit test rules and variants without a browser |
| SEO | **Next.js Metadata API** | Per-page title/description, Open Graph, sitemap, robots |
| Deploy | **Vercel** (recommended) | First-class Next.js support |

### Why Next.js (updated from initial Vite recommendation)

- **SEO required from day one** — game discovery and landing pages must be indexable
- **i18n with locale routes** — `/en/...` now, additional locales later without rewrites
- Games remain client-heavy (`"use client"`) — Next.js does not conflict with interactive game pages
- Static generation for catalog/marketing; client components for in-game UI

### Internationalization

- **Default locale:** English (`en`)
- **Launch:** English only — all UI copy in `messages/en.json`
- **Future:** Add locales (e.g. Italian) by adding message files and registering in routing config
- Catalog structural data uses i18n keys for display text (`nameKey`, `descriptionKey`)

### State management approach

- **XState** for in-game phase logic
- **React state** for catalog and global UI
- Avoid Redux — unnecessary complexity for this scope

---

## 10. Game Taxonomy (Initial)

| Category | Examples | Single-device fit |
|----------|----------|-------------------|
| Word | Hangman, Taboo, Charades prompts | Native |
| Social / Prompt | Never Have I Ever, Truth or Dare | Native |
| Deduction / Bluff | Impostor | Native (via reveal loop) |
| Voting | Mafia-lite, hidden ballots | Awkward — pass-phone or verbal fallback |

Useful catalog tags: `#words` `#18+` `#2-players` `#large-group` `#quick` `#no-materials`

---

## 11. v1 Scope (Draft)

Explicit v1 boundaries:

- [ ] Game catalog (home page with available games)
- [ ] Game shell (setup, reveal loop, resolve)
- [ ] Storage abstraction with localStorage adapter
- [ ] Secret delivery — single-device provider only
- [ ] First game: **Impostor** with 2–3 presets + customize
- [ ] Second game: a shared-screen game (Hangman or Never Have I Ever) to validate catalog diversity
- [ ] Mobile-first responsive UI
- [ ] SEO (metadata, sitemap, robots) and i18n (English first)
- [ ] No backend, no auth, no multi-device

### Suggested first games

1. **Impostor** — stress-tests the reveal loop and variant system
2. **Hangman or Never Have I Ever** — validates shared-screen games without private phases

---

## 12. Open Questions

| Topic | Question |
|-------|----------|
| **Language** | ~~Italian only at launch, or i18n from day one?~~ **Decided:** i18n from day one; **English** is the launch locale |
| **Content** | Hand-authored decks, generated content, or mixed? Who curates prompts? |
| **Impostor + Hangman** | Is there a hybrid variant (impostor must guess the word hangman-style)? Rules TBD. |
| **Spy role rules** | Exact spy behavior needs definition (what they know, how they win/lose). |
| **Visual identity** | Minimal/tool vs playful/party aesthetic? |
| **Scoring** | Which games track scores? Persist or session-only? |
| **18+ content** | Separate packs with filtering, or separate tags? |

---

## 13. Non-Goals (v1)

- User accounts and authentication
- Backend API or database
- Real-time multi-device sync
- Monetization
- User-generated content / custom decks (unless explicitly added later)
- Native mobile apps (PWA is sufficient for now)

---

## 14. Next Steps

When ready to formalize implementation:

1. Run `/opsx-propose` for a foundation change (project scaffold, game shell, storage, catalog)
2. Follow with game-specific changes (e.g. Impostor with variants)
3. Reference this document in OpenSpec proposals and design artifacts

---

*Last updated: discovery session + stack/i18n/SEO decisions — May 2025*
