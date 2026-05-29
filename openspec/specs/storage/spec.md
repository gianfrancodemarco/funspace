## Purpose

Define the browser storage abstraction for persisting FunSpace data client-side.

## Requirements

### Requirement: StoragePort interface

The application SHALL provide a storage abstraction (`StoragePort`) with typed get, set, and remove operations so feature code does not access browser storage directly.

#### Scenario: Get missing key

- **WHEN** storage is queried for a key that has no stored value
- **THEN** the result is `null`

#### Scenario: Set and get value

- **WHEN** a JSON-serializable value is stored under a key and then retrieved
- **THEN** the retrieved value equals the stored value

#### Scenario: Remove key

- **WHEN** a stored key is removed
- **THEN** subsequent get operations for that key return `null`

### Requirement: LocalStorage adapter

The application SHALL provide a `LocalStorageAdapter` that implements `StoragePort` using the browser's `localStorage`.

#### Scenario: Namespaced keys

- **WHEN** a developer inspects storage key definitions
- **THEN** keys use a `funspace:` namespace prefix

#### Scenario: No direct localStorage in features

- **WHEN** a developer inspects player roster or game modules
- **THEN** browser storage is accessed only through `StoragePort`, not raw `localStorage` calls
