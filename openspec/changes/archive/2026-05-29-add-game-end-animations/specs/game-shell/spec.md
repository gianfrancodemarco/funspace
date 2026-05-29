## ADDED Requirements

### Requirement: Shared resolve animation hook

The game shell resolve phase SHALL support an optional shared outcome animation wrapper that games can use without forking resolve layout.

#### Scenario: Resolve content remains readable

- **WHEN** a game uses the shared resolve animation on its resolve view
- **THEN** outcome headline, details, and action buttons remain visible and usable after the resolve phase transition
