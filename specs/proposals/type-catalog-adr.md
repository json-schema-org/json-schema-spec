# Type Catalog Architecture Decision Record
Status: Accepted
## Context
The `format` keyword has been discussed as a possible registry-like extension point for reusable string formats and related validation behavior. Those discussions exposed limitations in using `format` as the primary mechanism for broader type discovery:

- `format` is already a validation keyword, so expanding its role would blur the line between assertion and cataloging.
- Different implementations need a place to publish and consume reusable entries without changing existing schema semantics.
- A registry-style solution needs stable identifiers, discoverability, and room for implementation-defined entries.
- The design should preserve existing behavior for schemas that already use `format`.

## Decision
We will pursue a catalog-based approach rather than expanding `format` into a general-purpose registry.

The catalog will serve as the mechanism for naming, publishing, and discovering reusable type entries. The `format` keyword will retain its existing role unless a separate specification changes it.

## Consequences
- Implementations that support the catalog will need registration and lookup behavior for catalog entries.
- Catalog entries must have stable identifiers and clear semantics so they can be shared across implementations.
- Existing schemas that use `format` will continue to work without modification.
- This decision preserves backward compatibility by avoiding changes to the current meaning of `format`.
- Future work on `format` remains possible, but its responsibilities are not expanded to cover catalog concerns.
- Tooling and implementations that assumed `format` would become the extensible registry will need to target the catalog instead.
