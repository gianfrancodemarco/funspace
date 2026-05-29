## ADDED Requirements

### Requirement: Player roster translations

The application SHALL define i18n keys for the player roster UI in both English and Italian message files.

#### Scenario: Roster keys in English

- **WHEN** a developer inspects `messages/en.json`
- **THEN** keys exist for the Players page title, add/remove/rename actions, and empty state

#### Scenario: Roster keys in Italian

- **WHEN** a developer inspects `messages/it.json`
- **THEN** the same roster keys exist with Italian translations
