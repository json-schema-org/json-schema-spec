# Architecture Decision Record: `uniqueKeys`

## Status

Proposed

## Context

JSON Schema already has `uniqueItems`, which requires every item in an array to be distinct from every other item using the standard JSON Schema equality algorithm. However, there is a common real-world constraint that is not expressible with `uniqueItems`: requiring that a specific subset of properties act as a composite key across an array of objects, while allowing duplicated values elsewhere.

Examples of this constraint:

- A list of DNS records where the combination of `name` and `type` must be unique, but `value` may repeat.
- A list of environment variables where `name` must be unique across all entries.
- A configuration list where `id` serves as a primary key.

Before introducing `uniqueKeys`, schema authors worked around this limitation by:

1. Writing complex `contains` + `not` combinations that are difficult to read and often exponential in validation cost.
2. Moving uniqueness enforcement entirely out of JSON Schema into application logic.
3. Misusing `uniqueItems` and accepting false failures when unrelated properties differ.

Two design directions were considered:

### Option A — Extend `uniqueItems`

Allow `uniqueItems` to accept an array of property names in addition to a boolean:

```json
{ "uniqueItems": ["name", "type"] }
```

Pros:
- No new keyword.

Cons:
- Breaks the established meaning of `uniqueItems` (boolean keyword).
- Implementations that do not recognise the array form silently ignore it if they treat unknown types as ignored, or error if they enforce strict types — neither behaviour is safe.
- Conflates two distinct concepts under one keyword, making the schema harder to read when both constraints are needed simultaneously.
- Complicates the meta-schema and type system for `uniqueItems`.

### Option B — Introduce a new keyword `uniqueKeys`

Add a dedicated keyword whose value is an array of strings:

```json
{ "uniqueKeys": ["name", "type"] }
```

Pros:
- `uniqueItems` retains its existing boolean semantics; no risk of breakage.
- Both keywords can coexist in the same schema when both constraints apply.
- Intent is immediately clear to readers.
- Simpler meta-schema: `uniqueKeys` is always an array of strings.
- Implementations can add support incrementally without changing existing keyword behaviour.

Cons:
- Adds a keyword to the vocabulary.

## Decision

**Introduce a new keyword `uniqueKeys`** (Option B).

The value of `uniqueKeys` is a non-empty array of strings. Each string names a property. An instance is valid against this keyword if and only if, for every pair of items in the array that are both objects and that both contain at least one of the named properties, there is no pair of items whose values for all of the named properties are equal under the JSON Schema equality algorithm.

Items that are not objects, and objects that contain none of the named properties, are ignored for the purposes of this keyword (they do not participate in the uniqueness comparison).

### Rationale for key sub-decisions

#### Non-object items are ignored

Arrays may be heterogeneous. Requiring non-objects to participate would make the keyword inapplicable to any mixed array, which is overly restrictive and inconsistent with how `properties` and related keywords treat non-objects.

#### Objects missing all named keys are ignored

An object with no entry for any of the named keys has no key value to compare. Treating such objects as equal to each other (because they all map to the empty projection) would silently invalidate schemas that authors intend to be permissive about optional properties. Ignoring them is the least surprising behaviour.

#### Equality follows the JSON Schema equality algorithm

Using a separate equality definition would create two subtly different equality semantics within the same specification. Reusing the existing algorithm keeps behaviour predictable and consistent with `uniqueItems`.

#### The keyword is ignored when the instance is not an array

Consistent with the behaviour of `uniqueItems` and `contains`: keywords that constrain arrays are vacuously satisfied by non-array instances.

## Consequences

- Schema authors gain a concise, readable way to express composite-key constraints on arrays of objects.
- `uniqueItems` is unchanged; existing schemas and implementations are unaffected.
- Implementations must iterate over pairs of array items to check uniqueness, which is O(n²) in the worst case — the same complexity as `uniqueItems`. No new algorithmic complexity is introduced.
- The meta-schema gains one new property definition for `uniqueKeys`.
- The Applicator vocabulary is not affected; `uniqueKeys` belongs to the Validation vocabulary alongside `uniqueItems`.
