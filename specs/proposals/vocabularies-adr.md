# Add Vocabulary System

- Status: proposed
- Deciders: @gregsdennis, @jdesrosiers
- Date: 2024-06-10

Technical Story:

- Issues discussing feature - <https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aopen+is%3Aissue+label%3Avocabulary>
- ADR to extract from the spec and use feature life cycle - <https://github.com/json-schema-org/json-schema-spec/pull/1510>

## Table of Contents

## Context and Problem Statement

The current approach to extending JSON Schema by providing custom keywords is
very implementation-specific and therefore not interoperable.

To address this deficiency, this document proposes vocabularies as a concept
and a new Core keyword, `$vocabulary` to support it.

## Decision Drivers <!-- optional -->

- Language-agnostic
- Ease of use
- Ease of implementation

## Considered Options

### Current design as included in 2019-09 and 2020-12.

A vocabulary is a collection of keywords and is defined by a vocabulary
document. For the 2019-09 and 2020-12 vocabularies, the documents are integrated
into the specifications themselves.

With vocabularies as the primary method for defining individual keywords,
dialects can be created by combining different vocabularies.

Users must confirm with an implementation's documentation whether a given
vocabulary is supported.

`$vocabulary` keyword is an object with URI keys and boolean values. The URIs
identify each vocab, and the values indicate whether the implementation must
"understand" that vocab in order to process the schema. This keyword is only
processed when it is found as part of a meta-schema.

- Good because it provides a language-agnostic method of defining extension
  keywords that's built into JSON Schema itself
- Bad because unknown keywords are now unsupported, which implies that
  [unknown vocabularies are implicitly
  unsupported](https://github.com/orgs/json-schema-org/discussions/342)

### [option 2]

[example | description | pointer to more information | …]

- Good, because [argument a]
- Good, because [argument b]
- Bad, because [argument c]
- ... <!-- numbers of pros and cons can vary -->

### [option 3]

[example | description | pointer to more information | …]

- Good, because [argument a]
- Good, because [argument b]
- Bad, because [argument c]
- ... <!-- numbers of pros and cons can vary -->

## Decision Outcome

*TBD*

### Positive Consequences <!-- optional -->

*TBD*

### Negative Consequences <!-- optional -->

*TBD*
