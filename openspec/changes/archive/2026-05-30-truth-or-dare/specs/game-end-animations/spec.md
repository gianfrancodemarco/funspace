## ADDED Requirements

### Requirement: Truth or Dare session complete animation

Truth or Dare SHALL use the win end-animation variant on the resolve screen when a session completes.

#### Scenario: Win animation on Truth or Dare resolve

- **WHEN** a Truth or Dare session reaches the resolve phase
- **THEN** the resolve view renders `GameEndAnimation` with variant `win` above the session summary
