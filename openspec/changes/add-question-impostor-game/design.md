## Context

Impostor is shipped with word packs, role assignment (civilian / impostor / spy), pass-the-phone reveal, elimination play, and resolve. Question Impostor is a **sibling game** with the same deduction skeleton but secrets are **questions** instead of words, and **only two roles**: civilian and impostor. Civilians all see the same crew question; impostors see a **different** question whose answer is the same *kind* as the crew answer (number in a comparable range, year, yes/no, etc.) so table talk stays ambiguous.

Full rules live in `docs/games/question-impostor-design.md` (created during implementation).

## Goals / Non-Goals

**Goals:**

- Playable Question Impostor at `/[locale]/games/question-impostor`
- Two-role model: civilians vs impostors (1+ impostors configurable)
- Win conditions: civilians win when all impostors eliminated; impostors win when only impostors remain
- Locale-specific **question packs** (en + it), multi-select, all default
- Presets: Classic (1 impostor), Two Impostors, Chaos (2 impostors), Custom
- Reveal shows role-appropriate **question text** (impostor always gets a question — not a blank secret)
- Optional **reference answers** on resolve for the host (stored in pack data, not shown during reveal)
- Setup/play/resolve UI aligned with Impostor UX; rematch with new shuffle and new pair
- Homepage catalog entry; in-app rules; i18n en + it

**Non-Goals:**

- Spy role or spy-specific questions (unlike word Impostor)
- Sharing or converting Impostor **word** packs into question packs
- In-app voting, timers, or clue-round enforcement
- User-authored question packs or runtime pack editing
- Multi-device sync
- Persisting mid-game state to localStorage
- Extracting a shared deduction framework in v1 (duplicate Impostor patterns in a dedicated module instead)

## Decisions

### 1. Separate game module `question-impostor`

New `src/games/question-impostor/` with its own `GameDefinition`, config schema, packs, and components. Copy proven patterns from `src/games/impostor/` (assign roles without spy, eliminate, check win) as pure functions rather than importing Impostor internals.

**Why:** Word and question content are unrelated; coupling would blur pack types and i18n keys.

**Alternative:** Impostor rule module `QuestionSecretModule` — rejected; two catalog games, clearer marketing.

### 2. Question pair as pack unit (no spy leg)

```typescript
type QuestionPair = {
  crewQuestion: string;
  impostorQuestion: string;
  answerType: "number" | "year" | "yes_no" | "duration";
  crewAnswer?: string;      // host-only on resolve
  impostorAnswer?: string;
};
```

Packs group pairs (e.g. General, Geography, Pop culture). `pickQuestionPair(packs, packIds)` unions selected packs and picks one pair at random.

**Why:** Authoring enforces “similar answer” at content time; engine only stores `answerType` for UI hints (e.g. “Risposta: un numero”).

**Alternative:** Runtime pairing of unrelated questions — rejected; too easy to break bluff quality.

### 3. Reveal content by role

| Role | Reveal shows |
|------|----------------|
| Civilian | `crewQuestion` + answer-type hint |
| Impostor | `impostorQuestion` + answer-type hint |

Impostors **do not** see the crew question. No “you don’t know the word” message — the twist is a **plausible wrong question**.

Uses existing `assignSecrets` + `SingleDeviceRevealLoop` like Impostor.

### 4. Config and validation (Zod)

```typescript
QuestionImpostorConfig = {
  impostorCount: number;  // >= 1
  questionPackIds: string[];
  locale: "en" | "it";
}
```

Validation: `impostorCount < playerCount` (at least one civilian), optional cap `impostorCount <= floor(n/2)`, at least one pack selected.

Presets: Classic (1), Two Impostors (2), Chaos (2), Custom — **no With Spy preset**.

### 5. Session state shape

```typescript
type QuestionImpostorGameState = {
  roles: Record<playerId, "civilian" | "impostor">;
  pair: QuestionPair;
  alivePlayerIds: string[];
  eliminatedPlayerIds: string[];
};
```

Win check: `aliveImpostors === 0` → civilians; `aliveNonImpostors === 0` → impostors; else continue.

### 6. Play and resolve UX

Play phase: copy Impostor play machine pattern (`playing` ↔ `eliminating` → `won`). Alive list, facilitator-driven elimination, roles hidden until resolve.

Resolve: winner side, all roles, **both** questions from the pair, optional reference answers collapsed under “Risposte di riferimento” for the host.

### 7. Question pack authoring pipeline

v1: static TypeScript modules per locale (like early word packs), minimum **4 packs × ~8–12 pairs** per locale. Build script optional later; start with hand-authored data under `src/games/question-impostor/question-packs/` or `scripts/question-pack-data/`.

Italian and English pairs are **not** machine-translated in v1 — separate authored strings per locale.

### 8. Catalog and theme

- `id`: `question-impostor`
- `minPlayers`: 3, `maxPlayers`: 20
- `accentColor`: new token e.g. `question-impostor` (distinct from Impostor)
- `tags`: `["deduction", "bluff", "questions"]`
- Rules namespace: `questionImpostor.rules` with role keys **`civilian`, `impostor` only**

### 9. SEO and routing

Static route `/[locale]/games/question-impostor` via existing game page; add metadata keys under `games.questionImpostor.*`.

## Risks / Trade-offs

- **[Risk] Poor pair quality breaks the game** → Review packs for overlapping numeric ranges; document authoring guidelines in design doc
- **[Risk] UI clutter showing answer-type hints** → Short i18n labels per `answerType`; no numeric range on reveal (only on resolve for host)
- **[Risk] Duplication with Impostor engine** → Accept for v1; extract shared `deduction` helpers only if a third similar game ships
- **[Trade-off] Facilitator-driven elimination** → Same as Impostor; one person holds the phone
- **[Trade-off] Content volume** → Ship lean packs first; expand via content-only PRs
- **[Trade-off] No spy** → Simpler rules and setup; players who want spy use word Impostor

## Migration Plan

Greenfield module. Register in `registry.ts` and `catalog/games.ts`. No data migration. Sitemap/static paths pick up new game route automatically.

## Open Questions

- **Pack themes for v1:** Proposed General, Numbers & stats, Everyday, Pop culture — confirm during content authoring
- **Resolve reference answers:** Show by default on resolve or behind “Mostra risposte” toggle — default **behind toggle** to avoid spoilers for players still at the table
