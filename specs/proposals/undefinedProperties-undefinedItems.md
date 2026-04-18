# Proposal: `undefinedProperties` and `undefinedItems` Keywords

## Status

Draft

## Champions

TBD

## Abstract

This proposal introduces two new keywords, `undefinedProperties` and `undefinedItems`, which apply a subschema to properties or items that have no applicable schema definition. These keywords occupy a distinct semantic space from `additionalProperties`/`additionalItems` (which are validation-based) and `unevaluatedProperties`/`unevaluatedItems` (which are annotation-based), focusing instead on whether a property or item has a definition in the current schema object.

## Motivation

The existing keywords for constraining uncovered properties and items fall into two categories:

- **`additional*`** keywords apply to properties/items not covered by adjacent sibling keywords in the same schema object.
- **`unevaluated*`** keywords apply to properties/items not covered by annotations produced by any schema in the entire evaluation path, including `$ref`, `allOf`, `if`/`then`/`else`, etc.

Neither category addresses the case where a schema author wants to constrain properties or items that simply have no definition anywhere in the current schema object, regardless of annotations from elsewhere. This proposal fills that gap.

## Definitions

A property or item is considered **undefined** with respect to a schema if no subschema within the current schema object provides an explicit definition for it. Specifically:

- For `undefinedProperties`: a property name is undefined if it does not match any key in `properties`, any pattern in `patternProperties`, and is not the subject of any entry in `dependentSchemas`.
- For `undefinedItems`: an item index is undefined if it is not covered by a positional entry in `prefixItems` (or `items` as a tuple in draft 4–7).

## Specification

### `undefinedProperties`

The value of `undefinedProperties` MUST be a valid JSON Schema.

For each property of the instance that is not defined by any of the following sibling keywords in the same schema object — `properties`, `patternProperties`, `dependentSchemas` — the subschema given by `undefinedProperties` MUST successfully validate against the property value.

Unlike `additionalProperties`, `undefinedProperties` does not interact with annotation collection and is not affected by `unevaluatedProperties` in parent or sibling schemas.

### `undefinedItems`

The value of `undefinedItems` MUST be a valid JSON Schema.

For each item of the instance array whose index is not covered by `prefixItems` (or positional `items` in prior drafts), the subschema given by `undefinedItems` MUST successfully validate against the item value.

Unlike `additionalItems`, `undefinedItems` does not interact with annotation collection and is not affected by `unevaluatedItems` in parent or sibling schemas.

## Comparison with Existing Keywords

| Keyword | Scope | Annotation-aware |
|---|---|---|
| `additionalProperties` | Current schema object siblings | No |
| `unevaluatedProperties` | Full evaluation path | Yes |
| `undefinedProperties` | Current schema object definitions | No |
| `additionalItems` | Current schema object siblings | No |
| `unevaluatedItems` | Full evaluation path | Yes |
| `undefinedItems` | Current schema object definitions | No |

## Examples

### `undefinedProperties`

```json
{
  "properties": {
    "foo": { "type": "string" }
  },
  "undefinedProperties": false
}
```

This schema requires that `foo` is a string and disallows any property that is not `foo`.

```json
{
  "properties": {
    "foo": { "type": "string" }
  },
  "undefinedProperties": { "type": "number" }
}
```

This schema requires that `foo` is a string and that every other property is a number.

### `undefinedItems`

```json
{
  "prefixItems": [
    { "type": "string" },
    { "type": "number" }
  ],
  "undefinedItems": false
}
```

This schema requires exactly two items: a string followed by a number.

```json
{
  "prefixItems": [
    { "type": "string" }
  ],
  "undefinedItems": { "type": "integer" }
}
```

This schema requires the first item to be a string and all subsequent items to be integers.

## Interaction with Other Keywords

- `undefinedProperties` and `undefinedItems` MUST NOT affect or be affected by annotation collection from `unevaluatedProperties` or `unevaluatedItems`.
- When `undefinedProperties` and `additionalProperties` appear in the same schema object, each applies its own logic independently.
- `undefinedProperties` does not consult `allOf`, `anyOf`, `oneOf`, `if`, `then`, `else`, or `$ref` when determining which properties are defined.

## Open Questions

1. Should `undefinedProperties` consult `dependentSchemas` keys as defined properties?
2. Should the keywords produce annotations similar to `additionalProperties`/`unevaluatedProperties`?
3. What is the appropriate behavior when `undefinedProperties: false` and `unevaluatedProperties` are both present?

## References

- [JSON Schema Validation — `additionalProperties`](https://json-schema.org/draft/2020-12/json-schema-validation#section-10.3.2.3)
- [JSON Schema Core — `unevaluatedProperties`](https://json-schema.org/draft/2020-12/json-schema-core#section-11.2)
- [propertyDependencies proposal](./propertyDependencies.md)
