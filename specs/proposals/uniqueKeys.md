# Proposal: `uniqueKeys` Keyword

- **Status**: Draft
- **Champions**: TBD
- **Tracking Issue**: TBD

## Abstract

This proposal introduces a new keyword `uniqueKeys` that enables uniqueness constraints based on a composite key — a subset of properties — rather than comparing entire objects. This addresses a common use case where `uniqueItems: true` is insufficient because users need DB-style composite unique keys.

## Motivation

The existing `uniqueItems` keyword compares entire array items for equality. While this works for scalar values, it falls short when:

1. Array items are objects and uniqueness should be scoped to specific properties (composite keys).
2. Some properties are intentionally variable (e.g., timestamps, UUIDs) and should not participate in the uniqueness comparison.
3. Users need to model database-style `UNIQUE (col1, col2)` constraints.

### Example Problem

Given an array of user records, `uniqueItems: true` would reject two records that differ only in `updatedAt`, even if they share the same `userId` and `email`:

```json
[
  { "userId": 1, "email": "a@example.com", "updatedAt": "2024-01-01" },
  { "userId": 1, "email": "a@example.com", "updatedAt": "2024-06-01" }
]
```

Conversely, `uniqueItems: true` cannot enforce that `userId` + `email` combinations are unique while ignoring `updatedAt`.

## Specification

### Keyword Name

`uniqueKeys`

### Applies To

Arrays (`"type": "array"`).

### Value

An array of one or more non-empty strings. Each string is a property name that participates in the composite key. The array itself MUST contain at least one element and MUST NOT contain duplicate strings.

```
uniqueKeys: [string, ...string]
```

### Behavior

For each pair of items in the array instance, the validation extracts the values of the listed properties from both items and compares them using the same deep-equality algorithm defined for `uniqueItems`. If any two items produce an identical tuple of extracted values, validation MUST fail.

Properties listed in `uniqueKeys` that are absent from an item are treated as `undefined` / JSON `null` for the purposes of comparison (consistent with how `required` and `properties` interact elsewhere in the spec).

Items that are not objects MUST cause the keyword to be ignored for those items (the keyword applies only to object-typed items within the array).

`uniqueKeys` does not interact with `uniqueItems`. Both keywords may appear together; each is evaluated independently.

### JSON Schema Meta-Schema Fragment

```json
{
  "uniqueKeys": {
    "type": "array",
    "items": { "type": "string" },
    "minItems": 1,
    "uniqueItems": true
  }
}
```

## Examples

### Single-property Unique Key

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id":   { "type": "integer" },
      "name": { "type": "string" }
    }
  },
  "uniqueKeys": ["id"]
}
```

**Valid** — items have distinct `id` values:
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Alice" }
]
```

**Invalid** — two items share `id: 1`:
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 1, "name": "Bob" }
]
```

### Composite Key

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "region":    { "type": "string" },
      "productId": { "type": "integer" },
      "stock":     { "type": "integer" }
    }
  },
  "uniqueKeys": ["region", "productId"]
}
```

**Valid** — same `productId` but different `region`:
```json
[
  { "region": "us-east", "productId": 42, "stock": 10 },
  { "region": "eu-west", "productId": 42, "stock": 5 }
]
```

**Invalid** — duplicate `(region, productId)` tuple:
```json
[
  { "region": "us-east", "productId": 42, "stock": 10 },
  { "region": "us-east", "productId": 42, "stock": 99 }
]
```

### Interaction with `uniqueItems`

```json
{
  "type": "array",
  "uniqueItems": true,
  "uniqueKeys": ["userId"]
}
```

Both constraints are enforced independently. An instance must satisfy each one.

## Alternatives Considered

### Using `contains` + `not`

This can be approximated with complex `contains`/`not`/`if-then` compositions but results in schemas that are difficult to read and impossible to optimise.

### Extending `uniqueItems` to Accept an Array

Changing the type of an existing keyword would be a breaking change for validators that pre-validate schemas.

## References

- [JSON Schema Core Specification](https://json-schema.org/draft/2020-12/json-schema-core.html)
- [`uniqueItems` keyword](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.3)
- Related proposal: [`propertyDependencies`](propertyDependencies.md)
- Prior art: SQL `UNIQUE (col1, col2)` composite constraints
