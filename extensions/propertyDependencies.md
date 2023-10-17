# JSON Schema Extension: The `propertyDependencies` Keyword

## Abstract

The `propertyDependencies` keyword is a more friendly way to select between two
or more schemas to validate an instance against than is currently supported by
JSON Schema.

## Status

**Current Status**: EXPERIMENTAL

This extension is in the early stages of development. Changes, including
breaking changes, are possible. At this stage, it's recommended that
implementations disable this keyword by default.

This extension has been
[proposed](https://github.com/json-schema-org/json-schema-spec/blob/main/proposals/propertyDependencies.md)
for inclusion as a standard keyword in the JSON Schema specification.

## Note to Readers

The issues list for this extension can be found at
<https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aissue+propertydependencies>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker or any of the communication methods
listed on the homepage.

## Table of Contents

## Conventions and Terminology

All conventions and terms used and defined by the [JSON Schema Core
specification](../jsonschema-core.html) also apply to this document.

## Extension

This document adds the `propertyDependencies` keyword to the
`https://json-schema.org/vocab/applicator` [applicator
vocabulary](../jsonschema-core.html#applicatorvocab).

### `propertyDependencies`

This keyword specifies subschemas that are evaluated if the instance is an
object and contains a certain property with a certain string value.

This keyword's value MUST be an object. Each value in the object MUST be an
object whose values MUST be valid JSON Schemas.

If the outer object key is a property in the instance and the inner object key
is equal to the value of that property, the entire instance must validate
against the schema. Its use is dependent on the presence and value of the
property.

Omitting this keyword has the same behavior as an empty object.

## [Appendix] Change Log

* [October 2023] Created

## Champions

| Champion                   | Company | Email                | URI                              |
|----------------------------|---------|----------------------|----------------------------------|
| Jason Desrosiers           | Postman | <jdesrosi@gmail.com> | <https://github.com/jdesrosiers> |
