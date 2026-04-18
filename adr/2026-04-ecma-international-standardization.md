# ADR: Ecma International Standardization of JSON Schema

## Status

Proposed

## Context

JSON Schema has grown significantly in adoption, becoming a foundational technology for API description, configuration validation, and data interchange across the industry. Despite this broad use, JSON Schema has lacked formal standardization through a recognized standards body, which affects its perceived stability, intellectual property protections, and long-term governance.

In 2022, the project formally decoupled from the IETF standards track (see [2022-09-decouple-from-ietf.md](2022-09-decouple-from-ietf.md)), choosing to pursue independent governance while remaining open to future standardization under a more suitable body.

Ecma International is a standards organization with direct relevance to JSON Schema:

- **TC39** standardizes ECMAScript (JavaScript) under Ecma, demonstrating Ecma's ability to govern dynamic, community-driven language and data specifications.
- **RFC 8259** (the JSON data format) is co-published by Ecma as ECMA-404, establishing a direct precedent for JSON-related standards under Ecma.

Ecma's membership model, royalty-free patent policy, and technical committee structure offer a governance path that aligns with open-source community norms while providing the formal recognition the specification requires.

Discussion of this proposal is tracked at: https://github.com/orgs/json-schema-org/discussions/938

## Decision

Pursue formal standardization of JSON Schema under Ecma International by establishing a new Technical Committee (TC), with JSON Schema as a founding Task Group within that committee.

This involves:

1. Engaging Ecma International to charter a new TC dedicated to JSON Schema.
2. Structuring JSON Schema (core, validation, and related specifications) as a Task Group under the new TC.
3. Migrating the normative specification process to Ecma's publication and review workflow.
4. Retaining community participation through Ecma's royalty-free RF patent policy and open participation model.

## Consequences

**Positive:**

- JSON Schema gains a formal standards track with versioned, citable Ecma publications.
- The Ecma RF patent policy provides intellectual property protections for implementors.
- Alignment with ECMA-404 (JSON) strengthens the JSON ecosystem's standards coherence.
- Formal TC membership opens participation to organizations seeking standards-body representation.

**Negative / Risks:**

- Ecma's versioning and publication cadence may constrain the project's current release flexibility.
- TC membership fees and organizational overhead introduce new operational requirements.
- Community contributors outside formal TC membership may perceive a governance shift away from open participation; clear communication and Ecma's open associate membership model must be leveraged to mitigate this.
- IP policy transition requires legal review to ensure compatibility with existing contributions.

**Neutral:**

- Existing JSON Schema drafts and implementations are unaffected during the transition period.
- The GitHub-based community workflow will continue alongside the formal Ecma process during transition.
