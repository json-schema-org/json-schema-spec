# Object Graph Serialization Standardization

- **Status**: deferred
- **Deciders**: JSON Schema working group
- **Date**: 2024-11-01

## Context

JSON Schema validates JSON documents, which are trees. Some use-cases involve
data models with shared object references or cycles (e.g. a graph of nodes where
two properties point at the same logical object). Different serialization
libraries handle this differently:

- Some serialize shared references as duplicate subtrees (no identity preserved).
- Others use non-standard extensions such as JSON Reference (`$ref` pointer
  back-references) or custom `@id`/`@graph` envelopes (JSON-LD style).

Contributors have periodically asked whether JSON Schema should standardize a
prescribed serialization form for object graphs, or at minimum acknowledge the
problem in the specification so implementers have guidance.

## Decision

The working group decided **not** to address dynamic object identity or object
graph serialization in the current specification cycle. This is an explicit
deferral, not a rejection.

## Rationale

1. **Scope**: JSON Schema operates on JSON text (or an equivalent parsed value
   tree). Object identity is a property of in-memory representations, not of
   JSON itself. Standardizing serialization of graphs would require the
   specification to take a position on runtime data models, which is outside its
   current charter.

2. **Lack of consensus**: No single interoperable encoding for JSON object graphs
   exists today. Picking one risks endorsing a format that the broader ecosystem
   does not converge on.

3. **Existing workarounds**: Authors who need to round-trip shared references can
   use schema-level conventions (e.g. a `$defs`-based canonical form) without
   changes to the core vocabulary.

4. **Revisit trigger**: If a future RFC or de-facto standard for JSON object
   graph serialization achieves wide adoption, the working group should revisit
   this decision with that evidence in hand.

## Consequences

- The specification makes no statement about object identity or shared
  references; implementations are free to handle them as they see fit.
- Future contributors encountering this gap should reference this ADR before
  reopening the discussion, and bring concrete evidence of ecosystem convergence
  if they wish to revisit.
- If the decision is eventually reversed, an updated ADR should supersede this
  one.
