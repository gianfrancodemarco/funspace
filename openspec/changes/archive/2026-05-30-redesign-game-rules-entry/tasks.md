## 1. Design selection

- [x] 1.1 Confirm modal design option (A: section cards, B: hero + timeline, C: accordion) in design.md
- [x] 1.2 Confirm footer "Got it" dismiss (yes/no) and whether corner X stays

## 2. Modal shell

- [x] 2.1 Refactor `GameRulesTrigger` dialog layout: sticky header, scrollable body, optional sticky footer
- [x] 2.2 Apply dialog chrome per chosen option (`rounded-2xl`, spacing, title row with icon)
- [x] 2.3 Add `gameRules.gotIt` to `messages/en.json` and `messages/it.json` if footer dismiss ships
- [x] 2.4 Wire footer button as `DialogClose` — do not change trigger button placement or styling

## 3. Rules panel interior

- [x] 3.1 Option A: implement `RulesSectionCard` with icon, sentence-case title, tinted goal card
- [x] 3.2 Option A: implement numbered step badges and role label/description split (parse on ` — `)
- [ ] 3.3 Option B: implement goal hero block + vertical step timeline + dot lists for roles/win
- [ ] 3.4 Option C: add accordion primitive and collapsible section triggers (goal + how to play open by default)
- [x] 3.5 Remove uppercase `tracking-wide` section headings from `GameRulesPanel`

## 4. Tests and verification

- [x] 4.1 Update `GameRulesPanel.test.tsx` for new DOM structure (sections still present, steps/roles readable)
- [x] 4.2 Add test for footer dismiss label when implemented
- [x] 4.3 Manually verify rules modal for Impostor, Hangman, and Truth or Dare on mobile width
- [x] 4.4 Confirm scroll, close, and setup state preservation still work
