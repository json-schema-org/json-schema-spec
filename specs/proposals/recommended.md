# `recommended` Keyword Proposal

## Summary

This proposal introduces a `recommended` keyword that allows schema authors to indicate that certain instance properties or values are encouraged but not required. Unlike [`required`](../jsonschema-validation.md#required), which enforces presence (per RFC 2119 "MUST"), `recommended` expresses "SHOULD" semantics, enabling implementations to issue warnings or informational messages without causing validation failure.

## Motivation

Many JSON Schema use cases involve hand-written JSON documents where users benefit from guidance about best practices without strict enforcement. Common scenarios include:

- Configuration files where certain options improve behavior but are not mandatory
- API request bodies where additional metadata improves processing quality
- Data entry forms where fields are strongly encouraged for completeness

Current workarounds include using annotations, custom vocabularies, or documentation outside the schema. None of these provide a standardized, machine-readable way to express "this property is recommended."

RFC 2119 defines "SHOULD" as:

> This word, or the adjective "RECOMMENDED", means that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.

This proposal provides a schema-level mechanism to express that semantics.

## Detailed Explanation

Two variants have been proposed for the shape of the `recommended` keyword:

### Variant 1: Object-Key List

Mirrors the structure of [`required`](../jsonschema-validation.md#required), accepting an array of property names:

```json
{
  "type": "object",
  "recommended": ["description", "version"]
}
```

This variant is simple, familiar to schema authors, and directly parallels `required`. It only applies to object properties.

### Variant 2: Schema Variant

Accepts a subschema that instance properties are tested against, similar to the structure of `properties` or `patternProperties`:

```json
{
  "type": "object",
  "recommended": {
    "description": { "type": "string", "minLength": 1 },
    "version": { "type": "string" }
  }
}
```

This variant allows expressing not just that a property should be present, but constraints on its value when present.

### Validation Behavior

Regardless of variant, `recommended` does not cause validation failure. When an instance does not satisfy the recommendation:

- The schema validates successfully (annotation result)
- Implementations MAY emit warnings, annotations, or informational messages
- The exact mechanism for communicating recommendations is left to implementations

## Examples

### Journal Entry Schema

A journaling application where certain metadata fields improve searchability and organization but are not mandatory:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Journal Entry",
  "type": "object",
  "required": ["entry", "timestamp"],
  "recommended": ["tags", "mood", "location"],
  "properties": {
    "entry": { "type": "string", "minLength": 1 },
    "timestamp": { "type": "string", "format": "date-time" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "mood": { "type": "string", "enum": ["happy", "neutral", "sad", "anxious"] },
    "location": { "type": "string" }
  }
}
```

A journal entry without `tags`, `mood`, or `location` is valid. An editor or linter might display: "Consider adding 'tags' to improve searchability."

### Library Metadata Schema

A library catalog system distinguishing between required and recommended fields:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Library Item",
  "type": "object",
  "required": ["title", "author"],
  "recommended": ["isbn", "publisher", "publicationYear", "pageCount", "summary"],
  "properties": {
    "title": { "type": "string" },
    "author": { "type": "string" },
    "isbn": { "type": "string", "pattern": "^[0-9]{10,13}$" },
    "publisher": { "type": "string" },
    "publicationYear": { "type": "integer", "minimum": 1000, "maximum": 2100 },
    "pageCount": { "type": "integer", "minimum": 1 },
    "summary": { "type": "string" }
  }
}
```

## Drawbacks

- **Increased Complexity**: Adds a new keyword that implementations must recognize, even if only to ignore it gracefully.
- **Implementation Burden**: The value of `recommended` depends on tooling support (linters, editors, validators with warning modes). Without ecosystem adoption, the keyword is inert.
- **Ambiguous Warning Semantics**: Unlike validation errors, "warnings" have no standardized representation in JSON Schema output formats. Different implementations may communicate recommendations inconsistently.
- **Potential for Misuse**: Schema authors may overuse `recommended` rather than making firm decisions about what is truly required, leading to schema ambiguity.

## Alternatives Considered

### Annotations

Schema authors can use the `"$comment"` keyword or custom annotation keywords to document recommendations:

```json
{
  "$comment": "The 'description' property is recommended for discoverability"
}
```

This approach is unstructured and not machine-readable in a standardized way.

### Custom Vocabularies

A custom vocabulary could define recommendation semantics outside the core specification.

This fragments the ecosystem and prevents interoperable tooling support without prior vocabulary negotiation.

### `default` Combined with Validation

Providing `default` values for properties can encourage their presence but does not communicate that the user should explicitly provide a value.

### Documentation

Relegating recommendations to prose documentation outside the schema.

This separates concerns that are tightly coupled and loses the machine-readable aspect.

## Unresolved Questions

- **Core vs Vocabulary**: Should `recommended` be part of a core vocabulary (like Validation) or a separate vocabulary (like Content)?
- **Warning Output Format**: How should recommendations be represented in validation output? As a new annotation result type, a separate output collection, or left entirely to implementations?
- **Interaction with `required`**: Should a property appear in both `required` and `recommended` be an error, a no-op, or explicitly allowed?
- **Variant Selection**: Which variant (object-key list or schema variant) should be standardized, or should both be supported?
- **Applicability**: Should `recommended` apply only to object properties, or could it also apply to array items or other structural elements?
