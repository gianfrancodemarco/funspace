## ADDED Requirements

### Requirement: Rules modal matches vibrant UI system

The rules modal SHALL use FunSpace design tokens: rounded-xl/2xl surfaces, primary-tinted accents, card-style section grouping, and comfortable mobile padding — consistent with game setup cards and catalog UI.

#### Scenario: Modal uses rounded card surfaces

- **WHEN** a user opens the rules modal
- **THEN** the dialog and inner section groups use rounded corners (`rounded-xl` or larger), not flat document-style blocks

#### Scenario: Primary accent on rules chrome

- **WHEN** a user views step indicators or the goal highlight in the rules modal
- **THEN** primary violet tokens are used for accents, not neutral gray alone
