# Proposal: `longDescription`

## Summary
This proposal adds a new annotation keyword, `longDescription`, for authors who want to provide richer prose than fits comfortably in `description`.

`longDescription` is proposed as an optional array of strings. Implementations MAY use it for progressive disclosure, expanded help text, documentation panes, accessibility output, or other presentation styles that benefit from multiple paragraphs ordered narrative content.

## Motivation
The need for a longer-form description has been raised repeatedly over many years, including issue #100 from 2016 and the current discussion in issue #1645.

Today, schema authors commonly work around the single-string `description` keyword by:

- embedding manual line breaks in a string,
- storing markdown in JSON strings,
- using vendor extensions such as `x-description`, or
- keeping the full documentation outside the schema.

These approaches have drawbacks:

- newline-delimited strings are awkward to edit and preserve inconsistently,
- markdown-in-JSON mixes presentation with data and still leaves structure implicit,
- vendor extensions reduce interoperability, and
- external documentation can drift from the schema.

A structured array of strings provides a simple, implementation-friendly way to express longer documentation without changing validation behavior.

## Proposal
Add a new keyword, `longDescription`, whose value is an array of strings.

### Semantics
- `longDescription` is annotation keyword.
- Its value MUST be an array.
- Each item in the array MUST be a string.
- The keyword MUST NOT affect instance validation.
- Implementations MAY render each item as a separate paragraph, bullet, or block of text.
- Implementations MAY ignore the keyword.
- The order of items MUST be preserved.

### Intended use
`longDescription` is intended for longer documentation that benefits from structure, such as:

- multiple paragraphs,
- step-by-step explanations,
- caveats and edge cases,
- guidance for tool users, and
- accessibility-friendly expanded descriptions.

`description` remains available for short summaries.

## Detailed Specification
If a schema object contains a `longDescription` keyword, the value MUST be an array of strings.

Each string in the array SHOULD be suitable for presentation as a single logical block. Implementations MAY join or format the strings according to their own user interface needs, but they SHOULD preserve the original order.

The presence of `longDescription` does not modify the meaning of `description`, `$comment`, or any validation keyword.

### Relationship to `description`

`description` SHOULD continue to be used for concise summaries.

`longDescription` MAY be used in addition to `description` when authors want both a short summary and a longer explanation.

Implementations that support both keywords MAY present `description` as the primary summary and `longDescription` as an expanded view.

### Relationship to `$comment`

`$comment` is intended for implementers, not end users. `longDescription` is intended for user-facing documentation.

A schema MAY contain both keywords.

## Examples
### Simple long form documentation
```json
{
 "type": "object",
 "description": "User profile",
 "longDescription": [
    "This schema describes the top-level object used to store a user profile.",
    "The object is designed for progressive rendering in user interfaces that show short summaries first and reveal additional guidance on demand.",
    "Use `description` for the short summary and `longDescription` for the expanded explanation."
 ]
}
```

### Better than newline-delimited strings
```json
{
 "description": "This schema describes a payment method.\nIt is used by checkout flows.\nIt may be extended by platform-specific fields."
}
```

With `longDescription`, the same content can be represented structurally:

```json
{
 "description": "Payment method",
 "longDescription": [
    "This schema describes a payment method.",
    "It is used by checkout flows.",
    "It may be extended by platform-specific fields."
 ]
}
```

### Better than markdown-in-JSON
```json
{
 "description": "# Payment method\n\nThis schema describes a payment method.\n\n- Used by checkout flows\n- Supports platform-specific fields"
}
```

Using `longDescription`, authors can keep content structured without embedding formatting syntax in a JSON string:

```json
{
 "description": "Payment method",
 "longDescription": [
    "This schema describes a payment method.",
    "It is used by checkout flows.",
    "It supports platform-specific fields."
 ]
}
```

## Alternatives Considered
### Extend issue #100's approach as a single string
One option is to define a longer descriptive string and rely on line breaks or markdown for structure.

This approach was not chosen because it leaves structure implicit, makes editing harder, and encourages formatting conventions that are not interoperable.

### Vendor extensions
Tools can and do use vendor-specific keywords such as `x-longDescription`.

This works locally, but it fragments the ecosystem and prevents portable schema documentation.

### Markdown formatting in `description`

Markdown is widely understood, but it is still unstructured text inside a string. Different tools support different subsets, and the content remains difficult to process programmatically.

### External documentation only
External docs avoid schema bloat, but they are easy to lose sync with the schema and cannot be relied on by generic tooling.

## Backwards Compatibility
This proposal is purely additive.

- Existing schemas are unaffected.
- Validators that do not recognize `longDescription` will ignore it.
- Schemas using `longDescription` remain valid under existing validation rules, assuming implementations follow the usual behavior for unknown annotation keywords.

No existing keyword changes meaning, and no validation behavior changes.

## Open Questions
- Should `longDescription` be introduced as part of a vocabulary?
- Which meta-schema, if any, should include it by default?
- Should implementations treat the array as paragraphs, list items, or generic blocks?
- Should there be any recommended interaction with `description` when both are present?
- Should future work define formatting conventions for rich text rendering, or should the keyword remain intentionally unformatted?
- Is there any need to define guidance for localization or translation tooling?

## Design Rationale
An array was chosen instead of a formatted string because it gives authors a minimal amount of structure without committing the specification to a specific markup language.

This keeps the keyword easy to parse, easy to render progressively, and easy to translate or post-process in tooling.

## Status
This is a proposal document for discussion and does not itself define a normative keyword.
