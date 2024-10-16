# Add New Keyword: `propertyDependencies`

- Status: proposed
- Deciders: @gregsdennis, @jdesrosiers, @relequestual
- Date: 2022-04-07

Technical Story:

- Issue discussing feature - <https://github.com/json-schema-org/json-schema-spec/issues/1082>
- PR to add to the spec - <https://github.com/json-schema-org/json-schema-spec/pull/1143>
- ADR to extract from the spec and use feature life cycle - <https://github.com/json-schema-org/json-schema-spec/pull/1505>

## Table of Contents

## Context and Problem Statement

A common need in JSON Schema is to select between one schema or another to
validate an instance based on the value of some property in the JSON instance.
There are a several patterns people use to accomplish this, but they all have
significant [problems](#problems).

OpenAPI solves this problem with the `discriminator` keyword. However, their
approach is more oriented toward code generation concerns, is poorly specified
when it comes to validation, and is coupled to OpenAPI concepts that don't exist
is JSON Schema. Therefore, it's necessary to define something new rather than
adopt or redefine `discriminator`.

## Decision Drivers

- Ease of use
- Readability
- Coverage of most common use cases
- Coverage of all use cases
- Ease of implementation

## Considered Options

All of the following options have the same validation result as the following
schema.

```json
{
  "if": {
    "properties": {
      "foo": { "const": "aaa" }
    },
    "required": ["foo"]
  },
  "then": { "$ref": "#/$defs/foo-aaa" }
}
```


### Option 1

The `dependentSchemas` keyword is very close to what is needed except it checks
for the presence of a property rather than it's value. This option builds on
that concept to solve this problem.

```json
{
  "propertyDependencies": {
    "foo": {
      "aaa": { "$ref": "#/$defs/foo-aaa" }
    }
  }
}
```

- Good, because it handle the most common use case: string property values
- Good, because all property values are grouped together
- Good, because it's less verbose
- Bad, because it doesn't handle non-string property values

### Option 2

This version uses an array of objects. Each object is a collection of the
variables needed to express a property dependency. This doesn't fit the style of
JSON Schema. There aren't any keywords remotely like this. It's also still too
verbose. It's a little more intuitive than `if`/`then` and definitely less error
prone.

```jsonschema
{
  "propertyDependencies": [
    {
      "propertyName": "foo",
      "propertySchema": { "const": "aaa" },
      "apply": { "$ref": "#/$defs/foo-aaa" }
    },
    {
      "propertyName": "foo",
      "propertySchema": { "const": "bbb" },
      "apply": { "$ref": "#/$defs/foo-bbb" }
    }
  ]
}
```

* Good, because it supports all use cases
* Bad, because properties are not naturally grouped together
* Bad, because it's quite verbose
* Bad, because we have no precedent for a keyword which explicitly defines its
  own properties. This would be new operational functionality, which we try to
  avoid if we can.

### Option 3

A slight variation on that example is to make it a map of keyword to dependency
object. It's still too verbose.

```jsonschema
{
  "propertyDependencies": {
    "foo": [
      {
        "propertySchema": { "const": "aaa" },
        "apply": { "$ref": "#/$defs/foo-aaa" }
      },
      {
        "propertySchema": { "const": "bbb" },
        "apply": { "$ref": "#/$defs/foo-bbb" }
      }
    ]
  }
}
```

* Good, because it supports all use cases
* Good, because all property values are grouped together
* Bad, because it's quite verbose
* Bad, because we have no precedent for a keyword which explicitly defines its
  own properties. This would be new operational functionality, which we try to
  avoid if we can.

### Option 4

This one is a little more consistent with the JSON Schema style (poor keyword
naming aside), but otherwise has all the same problems as the other examples.

```jsonschema
{
  "allOf": [
    {
      "propertyDependencyName": "foo",
      "propertyDependencySchema": { "const": "aaa" },
      "propertyDependencyApply": { "$ref": "#/$defs/foo-aaa" }
    },
    {
      "propertyDependencyName": "foo",
      "propertyDependencySchema": { "const": "bbb" },
      "propertyDependencyApply": { "$ref": "#/$defs/foo-bbb" }
    }
  ]
}
```

- Good, because it supports all use cases
- Bad, because properties are not naturally grouped together
- Bad, because it's very verbose
- Bad, because it introduces a lot of inter-keyword dependencies, which we'd
  have to exhaustively define

### Option 5

This one is a variation of `if` that combines `if`, `properties`, and `required`
to reduce boilerplate. It's also essentially a variation of the previous example
with better names. This avoids to error proneness problem, but it's still too
verbose.

```jsonschema
{
  "allOf": [
    {
      "ifProperties": {
        "foo": { "const": "aaa" }
      },
      "then": { "$ref": "#/$defs/foo-aaa" }
    },
    {
      "ifProperties": {
        "foo": { "const": "bbb" }
      },
      "then": { "$ref": "#/$defs/foo-aaa" }
    }
  ]
}
```

* Good, because it supports all use cases
* Good, because it's a familiar syntax
* Bad, because properties are not naturally grouped together
* Bad, because it's very verbose
* Bad, because `ifProperties` is very niche.  Will this spawn a new series of
  `if*` keywords?  How would it interact with `if`?

### Option 6

All of the previous alternatives use a schema as the discriminator. This
alternative is a little less powerful in that it can only match on exact values,
but it successfully addresses the problems we're concerned about with the
current approaches. The only issue with this alternative is that it's not as
intuitive as the chosen solution.

```jsonschema
{
  "propertyDependencies": {
    "foo": [
      ["aaa", { "$ref": "#/$defs/foo-aaa" }],
      ["bbb", { "$ref": "#/$defs/foo-bbb" }]
    ]
  }
}
```

* Good, because it supports all use cases
* Bad, because it's an unintuitive syntax and easy to get wrong
* Bad, because properties are not naturally grouped together

## Decision Outcome

Option 1 was chosen because it satisfies the most common use cases while being
sufficiently readable and easy to implement, even though it does not satisfy
_all_ use cases, such as those where the property value is not a string. As
these cases are significantly less common, the requirement to support all use
cases carried a lower priority.

### Positive Consequences <!-- optional -->

- Some level of built-in support for a `discriminator`-like keyword that aligns
  with the existing operation of JSON Schema.

### Negative Consequences <!-- optional -->

- Properties with non-string values cannot be supported using this keyword and
  the `allOf`-`if`-`then` pattern must still be used.

## [Appendix] Problems With Existing Patterns {#problems}

### `oneOf`/`anyOf`

The pattern of using `oneOf` to describe a choice between two schemas has become
ubiquitous.

```jsonschema
{
  "oneOf": [
    { "$ref": "#/$defs/aaa" },
    { "$ref": "#/$defs/bbb" }
  ]
}
```

However, this pattern has several shortcomings. The main problem is that it
tends to produce confusing error messages. Some implementations employ
heuristics to guess the user's intent and provide better messaging, but that's
not wide-spread or consistent behavior, nor is it expected or required from
implementations.

This pattern is also inefficient. Generally, there is a single value in the
object that determines which alternative to chose, but the `oneOf` pattern has
no way to specify what that value is and therefore needs to evaluate the entire
schema. This is made worse in that every alternative needs to be fully validated
to ensure that only one of the alternative passes and all the others fail. This
last problem can be avoided by using `anyOf` instead, but that pattern is much
less used.

### `if`/`then`

We can describe this kind of constraint more efficiently and with with better
error messaging by using `if`/`then`. This allows the user to explicitly specify
the constraint to be used to select which alternative the schema should be used
to validate the schema. However, this pattern has problems of it's own. It's
verbose, error prone, and not particularly intuitive, which leads most people to
avoid it.

```jsonschema
{
  "allOf": [
    {
      "if": {
        "properties": {
          "foo": { "const": "aaa" }
        },
        "required": ["foo"]
      },
      "then": { "$ref": "#/$defs/foo-aaa" }
    },
    {
      "if": {
        "properties": {
          "foo": { "const": "bbb" }
        },
        "required": ["foo"]
      },
      "then": { "$ref": "#/$defs/foo-bbb" }
    }
  ]
}
```
