# JSON Schema Proposal: Add `propertyDependencies` Keyword

## Abstract

The `propertyDependencies` keyword is a more friendly way to select between two
or more schemas to validate an instance against than is currently supported by
JSON Schema.

## Status

**Current Status**: PROPOSAL

TODO: We should have a short standard blurb outlining the stages involved in a
feature making its way to stable status.

TODO: Link to a document that describes the proposal => stable process in
detail.

## Note to Readers

The issues list for this document can be found at
<https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aissue+propertydependencies>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker or any of the communication methods
listed on the homepage.

## Overview

### Problem Statement

A common need in JSON Schema is to select between one or more schemas to use to
validate an instance based on the value of some property in the JSON instance.
There are a several patterns people use to accomplish this, but they all have
significant problems.

The pattern of using `oneOf` to describe a choice between two schemas has become
ubiquitous.

```json
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
object that determines which subschema to chose, but the `oneOf` pattern has no
way to specify what that value is and therefore needs to evaluate the entire
schema. This is made worse in that every subschema needs to be fully validated
to ensure that only one of the subschemas passes and all the others fail. This
last problem can be avoided by using `anyOf` instead, but that pattern is much
less used.

We can describe this kind of constraint more efficiently and with with better
error messaging by using `if`/`then`. This allows the user to explicitly specify
the constraint to be used to select which subschema should be used.  However,
this pattern has problems of it's own. It's verbose, error prone, and not
particularly intuitive, which leads most people to avoid it.

```json
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

OpenAPI solves this problem with the `discriminator` keyword. However, their
approach is more oriented toward code generation concerns, is poorly specified
when it comes to validation, and is coupled to OpenAPI concepts that don't exist
is JSON Schema. Therefore, it's necessary to define something new rather than
adopt `discriminator`.

### Solution

The `dependentSchemas` keyword is very close to what is needed except it checks
for the presence of a property rather than it's value. The chosen solution is to
build on that concept to solve this problem.

```json
{
  "propertyDependencies": {
    "foo": {
      "aaa": { "$ref": "#/$defs/foo-aaa" }
    }
  }
}
```

The validation behavior of this schema is equivalent to the following schema.

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

### Limitations

The problem of choosing a subschema based on a property value could apply for a
value of any JSON type, but `propertyDependencies` only solves this problem when
the value is a string. One of the main goals of this keyword is to define
something that's intuitive enough and easy enough to use that people will
actually use it rather than fallback to `oneOf` because it's simple. Achieving
those goals means that some trade-offs need to be made. The next section lists
some alternatives that we considered.

### Alternatives

Here are some alternatives that were considered that support all value types.
All examples have the same validation behavior as the examples above.

This version uses an array of objects. Each object is a collection of the
variables needed to express a property dependency. This doesn't fit the style of
JSON Schema. There aren't any keywords remotely like this. It's also still too
verbose. It's a little more intuitive than `if`/`then` and definitely less error
prone.

```json
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

A slight variation on that example is to make it a map of keyword to dependency
object. It's still too verbose.

```json
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

This one is a little more consistent with the JSON Schema style (poor keyword
naming aside), but otherwise has all the same problems as the other examples.

```json
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

This one is a variation of `if` that combines `if`, `properties`, and `required`
to reduce boilerplate. It's also essentially a variation of the previous example
with better names. This avoids to error proneness problem, but it's still too
verbose.

```json
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

All of the previous alternatives use a schema as the discriminator. This
alternative is a little less powerful in that it can only match on exact values,
but it successfully addresses the problems we're concerned about with the
current approaches. The only issue with this alternative is that it's not as
intuitive as the chosen solution.

```json
{
  "propertyDepenencies": {
    "foo": [
      ["aaa", { "$ref": "#/$defs/foo-aaa" }],
      ["bbb", { "$ref": "#/$defs/foo-bbb" }]
    ]
  }
}
```

## Specification

<!-- TODO: Update to where this actually ends up getting hosted. This is a guess
for now. -->
<https://json-schema.org/specification/extensions/propertyDependencies.html>

## Change Log

* [October 2023] Created

## Champions

| Champion                   | Company | Email                | URI                              |
|----------------------------|---------|----------------------|----------------------------------|
| Jason Desrosiers           | Postman | <jdesrosi@gmail.com> | <https://github.com/jdesrosiers> |
