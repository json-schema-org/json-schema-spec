# Proposal: Standardized Object Graph Serialization

## Status

Draft

## Authors

- JSON Schema Contributors

## Abstract

This proposal defines a vocabulary for declaring object identity keys in JSON Schema, enabling serializers and deserializers across languages and libraries to emit and consume a compact, reference-aware JSON format without duplicating shared nodes. This addresses a real interoperability gap: JSON Schema currently has no standard mechanism for representing shared object references (identity) during serialization, forcing each library (e.g., Jackson's `@JsonIdentityInfo`, JSOG, JSON Reference) to invent incompatible conventions.

## Motivation

When serializing an object graph that contains shared references or cycles, a serializer must either:

1. Duplicate shared nodes (verbose, loses identity semantics), or
2. Use a library-specific convention to emit an identity key and back-references.

Existing ad-hoc approaches include:

| Approach | Identity key | Reference syntax | Interoperable? |
|---|---|---|---|
| Jackson `@JsonIdentityInfo` | configurable (e.g. `@id`) | `{"@id": 1}` (integer) | No |
| JSOG | `@id` | `{"@ref": "..."}` | Partial |
| JSON-LD | `@id` (IRI) | `{"@id": "..."}` | No (requires JSON-LD processing) |
| Specs custom | varies | varies | No |

Because JSON Schema has no opinion on this, a schema author cannot express that a field carries an identity key or a back-reference, and generic tooling cannot round-trip object graphs faithfully.

## Proposed Solution

Introduce two new annotation keywords under a dedicated `$vocabulary` URI:

```
https://json-schema.org/draft/next/vocab/object-graph
```

### Keywords

#### `x-identity`

Declares that the annotated string or integer property is the **identity key** for instances of the enclosing object schema. Exactly one property per object schema SHOULD carry this annotation.

```json
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/next/vocab/object-graph": true
  },
  "type": "object",
  "properties": {
    "$id": {
      "type": "string",
      "x-identity": true
    },
    "name": { "type": "string" }
  }
}
```

#### `x-ref`

Declares that the annotated string or integer property is a **back-reference** to the identity value of another node in the same document. When a validator or serializer encounters an object where only the `x-ref`-annotated property is present, it MUST treat the object as an alias for the node whose identity key equals that value.

```json
{
  "properties": {
    "$ref": {
      "type": "string",
      "x-ref": true
    }
  }
}
```

### Wire Format

A conforming serializer emitting an object graph MUST:

1. Assign a unique identity value to each distinct object node before serialization begins.
2. On the **first** occurrence of a node, emit the full object including the identity key property.
3. On every **subsequent** occurrence of the same node, emit a stub object containing only the back-reference property.

A conforming deserializer MUST:

1. Collect every fully-emitted node indexed by its identity value.
2. Replace every stub object (containing only the back-reference property) with a pointer/reference to the corresponding collected node.
3. Report an error if a back-reference value has no matching identity key in the document.

### Example

Schema:

```json
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/next/vocab/object-graph": false
  },
  "type": "object",
  "properties": {
    "nodes": {
      "type": "array",
      "items": { "$ref": "#/$defs/Node" }
    }
  },
  "$defs": {
    "Node": {
      "type": "object",
      "properties": {
        "$id":   { "type": "string", "x-identity": true },
        "$ref":  { "type": "string", "x-ref": true },
        "value": { "type": "string" },
        "child": { "$ref": "#/$defs/Node" }
      }
    }
  }
}
```

Instance (shared node `"n2"` appears twice but is emitted once):

```json
{
  "nodes": [
    { "$id": "n1", "value": "root", "child": { "$id": "n2", "value": "shared" } },
    { "$ref": "n2" }
  ]
}
```

After deserialization both `nodes[0].child` and `nodes[1]` point to the same logical object.

## Backwards Compatibility

The vocabulary URI is declared optional (`false`) by default, meaning validators that do not implement this vocabulary MUST ignore the annotation keywords and validate the instance against any remaining constraints. This preserves full backwards compatibility with existing schemas and validators.

## Alternatives Considered

### Use JSON Pointer / `$ref` within instance data

JSON Pointer addresses locations within a document but does not express object identity independent of position. Two logically identical objects at different locations would require separate pointers and lose the identity semantic.

### Adopt JSON-LD `@id`

JSON-LD imposes a full linked-data processing model. Adopting it would couple JSON Schema to IRI resolution semantics and a heavy processing pipeline not appropriate for general-purpose schema validation.

### Leave it to implementations

The status quo. Rejected because it perpetuates the fragmentation documented in the Motivation section and prevents generic tooling from handling object graphs portably.

## Open Questions

1. Should the identity value be required to be unique within a single JSON document only, or globally (e.g., a URI)?
2. Should cycles (node A's child is node A) be explicitly permitted or left implementation-defined?
3. Should the vocabulary support multiple identity keys per object (composite keys)?
4. What is the canonical vocabulary URI and the process for registering it?

## References

- [JSOG – JavaScript Object Graph](https://github.com/jsog/jsog)
- [Jackson `@JsonIdentityInfo`](https://fasterxml.github.io/jackson-databind/javadoc/2.9/com/fasterxml/jackson/annotation/JsonIdentityInfo.html)
- [JSON-LD `@id`](https://www.w3.org/TR/json-ld11/#node-identifiers)
- [JSON Schema Vocabularies](https://json-schema.org/understanding-json-schema/reference/schema.html#vocabulary)
