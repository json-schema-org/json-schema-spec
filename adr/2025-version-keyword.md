# Architecture Decision Record: `version` keyword

## Status

Accepted

## Date

2025-01-01

## Context

JSON Schema authors frequently want to communicate which version of their schema is current, track schema evolution, and give consumers a human-readable signal about compatibility. No standard mechanism exists in the core vocabulary for this purpose. Three approaches were considered:

1. **`$id` URI versioning** – embed a version token inside the schema's `$id` URI (e.g., `https://example.com/schemas/my-schema/v2`). This ties the schema's canonical identifier to its version, which breaks stable URI expectations: every release produces a new `$id`, invalidating bookmarks and cached references.

2. **`$comment`** – authors could write version information as free-form text in a `$comment` value. `$comment` is unstructured and explicitly non-machine-readable; tooling cannot reliably extract or compare version strings from it.

3. **Do nothing** – leave schema versioning entirely to out-of-band mechanisms (file names, HTTP headers, registry metadata). This is workable but means the information is absent from the schema document itself, reducing portability and self-description.

4. **Dedicated `version` annotation keyword** – add a first-class keyword whose sole role is to carry a version string as an annotation.

## Decision

Add a `version` keyword to the JSON Schema vocabulary as a pure annotation keyword.

- **Annotation-only**: `version` has no assertion behavior. A schema never fails validation because of its `version` value.
- **Non-normative semver recommendation**: the specification recommends (but does not require) that values conform to Semantic Versioning (semver). Validators MUST NOT enforce this recommendation.
- **No implicit semantics**: the keyword conveys no compatibility guarantees to validators. Consumers that wish to act on version information must do so outside the validation layer.

## Rationale

- Keeping `version` annotation-only preserves the open-world nature of JSON Schema and avoids introducing undecidable or context-dependent assertion semantics.
- A dedicated keyword is more discoverable and tool-friendly than `$comment` free text, and more stable than encoding version in `$id`.
- The non-normative semver recommendation aligns with industry practice without constraining authors who use other versioning schemes.
- Annotation-only keywords are already well-understood in the ecosystem (`title`, `description`, `examples`); `version` follows exactly the same pattern.

## Consequences

- Implementations that collect annotations will expose `version` values to annotation-aware consumers.
- Validators that do not collect annotations are unaffected; they silently ignore the keyword.
- Schema authors gain a standardised location for version metadata without any risk of inadvertent validation failures.
- Future proposals that want assertion-level version comparison semantics must be addressed by a separate ADR.
