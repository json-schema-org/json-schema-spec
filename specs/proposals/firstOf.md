# `firstOf` Keyword Proposal

## Summary

Introduce a `firstOf` applicator keyword that validates an instance against an array of subschemas, accepting the instance if at least one subschema validates, but collecting annotations only from the first valid subschema.

## Motivation

### The Problem

The `unevaluatedProperties` keyword depends on the set of properties that have been "evaluated" by other keywords in the schema. When using `oneOf`, annotations from **all** valid subschemas are collected, even though only one branch is logically selected. This creates a fundamental problem when `oneOf` branches represent subset/superset relationships.

Consider a schema that must distinguish between two related object shapes:

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "kind": { "const": "base" },
        "foo": { "type": "string" }
      },
      "required": ["kind", "foo"]
    },
    {
      "type": "object",
      "properties": {
        "kind": { "const": "extended" },
        "foo": { "type": "string" },
        "bar": { "type": "integer" }
      },
      "required": ["kind", "foo", "bar"]
    }
  ],
  "unevaluatedProperties": false
}
```

An instance `{ "kind": "extended", "foo": "hello", "bar": 42 }` validates against the second subschema. However, it also validates against the first subschema if `kind` and `foo` are present. Because `oneOf` collects annotations from all valid branches, the property `bar` is marked as evaluated by the second branch. The `unevaluatedProperties: false` check passes, which is correct in this case.

The problem arises when the branches are true subsets — where one schema's valid instances are a strict subset of another's:

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" }
      },
      "required": ["foo"]
    },
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" },
        "bar": { "type": "integer" }
      },
      "required": ["foo", "bar"]
    }
  ],
  "unevaluatedProperties": false
}
```

For the instance `{ "foo": "hello", "bar": 42, "baz": true }`:

1. The first subschema validates (it only requires `foo`)
2. The second subschema also validates
3. Annotations from **both** branches are collected
4. Properties `foo` and `bar` are both marked as evaluated
5. `unevaluatedProperties: false` only flags `baz` as unevaluated
6. The instance incorrectly validates

The intent was that `bar` should be an unevaluated property when the first branch is "selected", making the instance fail validation. The current behavior prevents `unevaluatedProperties` from enforcing mutual exclusion between subset and superset schemas.

### Current Workaround

The only workaround is to use explicit `not` patterns to exclude superset instances from subset branches:

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" }
      },
      "required": ["foo"],
      "not": {
        "required": ["bar"]
      }
    },
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" },
        "bar": { "type": "integer" }
      },
      "required": ["foo", "bar"]
    }
  ],
  "unevaluatedProperties": false
}
```

This pattern does not scale well. For schemas with many optional properties, the `not` conditions become combinatorially complex.

## Specification

### Keyword Location

`firstOf` is an applicator keyword that may appear in any schema.

### Value

The value of `firstOf` MUST be a non-empty array of valid JSON Schemas.

### Validation

An instance validates against `firstOf` if it validates against at least one subschema in the array.

### Annotation Collection

Annotations are collected **only** from the first subschema (by array position) that successfully validates the instance. Subschemas that appear later in the array, even if they would also validate the instance, do not contribute annotations.

This is the sole behavioral difference between `firstOf` and `anyOf`. The validation result (valid vs. invalid) is identical between the two keywords for any given instance.

### Error Behavior

If the instance fails to validate against all subschemas, the keyword produces a single error. Implementations MAY include details about which subschemas were attempted.

## Interaction with `unevaluatedProperties`

Because `firstOf` only collects annotations from the first valid subschema, `unevaluatedProperties` sees exactly the properties evaluated by that single branch. This enables subset/superset discrimination:

```json
{
  "firstOf": [
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" }
      },
      "required": ["foo"]
    },
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" },
        "bar": { "type": "integer" }
      },
      "required": ["foo", "bar"]
    }
  ],
  "unevaluatedProperties": false
}
```

For `{ "foo": "hello", "bar": 42, "baz": true }`:

1. The first subschema validates
2. Only annotations from the first subschema are collected
3. Only `foo` is marked as evaluated
4. `bar` and `baz` are unevaluated
5. `unevaluatedProperties: false` rejects the instance

For `{ "foo": "hello", "bar": 42 }`:

1. The first subschema validates
2. Only `foo` is marked as evaluated
3. `bar` is unevaluated
4. `unevaluatedProperties: false` rejects the instance

For `{ "foo": "hello" }`:

1. The first subschema validates
2. Only `foo` is marked as evaluated
3. No unevaluated properties remain
4. `unevaluatedProperties: false` passes

### Correct Usage with Subset/Superset Schemas

To properly handle subset/superset patterns, **more specific schemas MUST appear earlier in the array**. This ensures that when a superset instance is encountered, the superset schema is tried first and its annotations are collected:

```json
{
  "firstOf": [
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" },
        "bar": { "type": "integer" }
      },
      "required": ["foo", "bar"]
    },
    {
      "type": "object",
      "properties": {
        "foo": { "type": "string" }
      },
      "required": ["foo"]
    }
  ],
  "unevaluatedProperties": false
}
```

Now for `{ "foo": "hello", "bar": 42 }`:

1. The first subschema (superset) validates
2. `foo` and `bar` are marked as evaluated
3. No unevaluated properties remain
4. `unevaluatedProperties: false` passes

And for `{ "foo": "hello" }`:

1. The first subschema fails (missing `bar`)
2. The second subschema (subset) validates
3. Only `foo` is marked as evaluated
4. No unevaluated properties remain
5. `unevaluatedProperties: false` passes

## Interaction with `unevaluatedItems`

The same principle applies to `unevaluatedItems`. `firstOf` only collects item annotations from the first valid subschema, allowing `unevaluatedItems: false` to distinguish between array patterns with different lengths or additional item constraints.

```json
{
  "firstOf": [
    {
      "type": "array",
      "prefixItems": [
        { "type": "string" },
        { "type": "integer" }
      ],
      "items": false
    },
    {
      "type": "array",
      "prefixItems": [
        { "type": "string" }
      ],
      "items": false
    }
  ],
  "unevaluatedItems": false
}
```

## Comparison with Alternatives

### `anyOf` + Discriminator (OpenAPI Pattern)

OpenAPI 3.1 supports a `discriminator` object that can be used with `oneOf` to select a subschema based on a property value. However:

- The discriminator pattern requires a designated property with distinct values in each branch
- It does not address cases where discrimination must be based on the presence or absence of properties
- It is an external annotation, not a core JSON Schema keyword
- It does not change annotation collection behavior

### `if`/`then`/`else` Chaining

Conditional schemas can approximate this behavior:

```json
{
  "if": { "required": ["bar"] },
  "then": {
    "type": "object",
    "properties": {
      "foo": { "type": "string" },
      "bar": { "type": "integer" }
    },
    "required": ["foo", "bar"]
  },
  "else": {
    "type": "object",
    "properties": {
      "foo": { "type": "string" }
    },
    "required": ["foo"]
  },
  "unevaluatedProperties": false
}
```

This works for two branches but does not scale to three or more branches without deep nesting.

### Explicit `not` Patterns

As shown in the motivation, `not` patterns can exclude superset instances from subset branches. This approach:

- Requires manual identification of all distinguishing properties
- Becomes combinatorially complex with multiple optional properties
- Is error-prone and difficult to maintain
- Does not compose well with `allOf` merging

### Advantages of `firstOf`

- Declarative: no need for explicit exclusion conditions
- Composable: works naturally with schema merging via `allOf`
- Scalable: adding a new branch requires only appending to the array
- Minimal: introduces a single keyword with clear, narrow semantics
- Predictable: ordering in the array determines priority, analogous to routing rules

## Examples

### Polymorphic Event Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "type": { "type": "string" },
    "timestamp": { "type": "integer" }
  },
  "required": ["type", "timestamp"],
  "firstOf": [
    {
      "properties": {
        "type": { "const": "user.created" },
        "userId": { "type": "integer" },
        "email": { "type": "string" }
      },
      "required": ["userId", "email"]
    },
    {
      "properties": {
        "type": { "const": "user.updated" },
        "userId": { "type": "integer" },
        "email": { "type": "string" },
        "previousEmail": { "type": "string" }
      },
      "required": ["userId", "email", "previousEmail"]
    }
  ],
  "unevaluatedProperties": false
}
```

A `user.updated` event without `previousEmail` is rejected because the `user.created` branch matches first and marks `previousEmail` as unevaluated.

### Extensible Configuration with Defaults

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "firstOf": [
    {
      "properties": {
        "database": { "type": "object" },
        "cache": { "type": "object" }
      },
      "required": ["database", "cache"]
    },
    {
      "properties": {
        "database": { "type": "object" }
      },
      "required": ["database"]
    }
  ],
  "unevaluatedProperties": false
}
```

Only the explicitly listed configuration keys are allowed. Providing `cache` without including it in the evaluated properties is correctly rejected.
