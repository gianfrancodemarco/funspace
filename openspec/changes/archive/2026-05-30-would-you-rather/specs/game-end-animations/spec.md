## ADDED Requirements

### Requirement: Would You Rather session complete animation

Would You Rather SHALL use the win end-animation variant on the resolve screen when a session completes.

#### Scenario: Win animation on Would You Rather resolve

- **WHEN** a Would You Rather session reaches the resolve phase
- **THEN** the resolve view renders `GameEndAnimation` with variant `win` above the session summary
