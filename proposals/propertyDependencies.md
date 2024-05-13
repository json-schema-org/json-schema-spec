# JSON Schema Proposal: The `propertyDependencies` Keyword

## Abstract

The `propertyDependencies` keyword is a more friendly way to select between two
or more schemas to validate an instance against than is currently supported by
JSON Schema.

## Note to Readers

The issues list for this document can be found at
<https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aissue+propertydependencies>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker or any of the communication methods
listed on the homepage.

## Table of Contents

## Conventions and Terminology

All conventions and terms used and defined by the [JSON Schema Core
specification](../jsonschema-core.html) also apply to this document.

## Overview

### Problem Statement

A common need in JSON Schema is to select between one schema or another to
validate an instance based on the value of some property in the JSON instance.
There are a several patterns people use to accomplish this, but they all have
significant [problems](#problems).

OpenAPI solves this problem with the `discriminator` keyword. However, their
approach is more oriented toward code generation concerns, is poorly specified
when it comes to validation, and is coupled to OpenAPI concepts that don't exist
is JSON Schema. Therefore, it's necessary to define something new rather than
adopt or redefine `discriminator`.

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

The validation result is equivalent to the following schema.

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

The problem of choosing an alternative based on a property value could apply for
a value of any JSON type, but `propertyDependencies` only solves this problem
when the value is a string. One of the main goals of this keyword is to define
something that's intuitive enough and easy enough to use that people will
actually use it rather than fallback to `oneOf` because it's simple. Achieving
those goals means that some trade-offs need to be made.

## Change Description

1. The following will be added to the JSON Schema Core specification as a
subsection of "Keywords for Applying Subschemas Conditionally".
    > ### `propertyDependencies`
    >
    > This keyword specifies subschemas that are evaluated if the instance is an
    > object and contains a certain property with a certain string value.
    >
    > This keyword's value MUST be an object. Each value in the object MUST be an
    > object whose values MUST be valid JSON Schemas.
    >
    > If the outer object key is a property in the instance and the inner object key
    > is equal to the value of that property, the entire instance must validate
    > against the schema. Its use is dependent on the presence and value of the
    > property.
    >
    > Omitting this keyword has the same behavior as an empty object.
2. The following subschema will be added to the Applicator Vocabulary schema, `https://json-schema.org/<version>/<release>/meta/applicator` at `/properties/propertyDependencies`:
    ```json
    {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "$dynamicRef": "#meta",
          "default": true
        },
        "default": {}
      }
    }
    ```

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

## [Appendix] Change Log

* [October 2023] Created

## Champions

| Champion                   | Company | Email                | URI                              |
|----------------------------|---------|----------------------|----------------------------------|
| Jason Desrosiers           | Postman | <jdesrosi@gmail.com> | <https://github.com/jdesrosiers> |
