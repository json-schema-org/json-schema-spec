# How Meta-Schemas and Dialects Work Under a Stable Specification

* Status: accepted
* Deciders: @jdesrosiers @gregsdennis @relequestual
* Date: 2023-05

Technical Story:
- https://github.com/json-schema-org/json-schema-spec/issues/1393
- https://github.com/json-schema-org/json-schema-spec/issues/1397
- https://github.com/orgs/json-schema-org/discussions/384

## Context and Problem Statement

Following the decision to forbid unknown keywords, there is a question of whether the meta-schema should enforce it by including `"unevaluatedProperties": false`.

Essentially,

* having an open meta-schema (does not include `"unevaluatedProperties": false`) allows for future compatibility in that any copy of the meta-schema should be able to validate a given schema, whereas
* having a closed meta-schema (includes `"unevaluatedProperties": false`) allows for verifying that all keywords are valid, known, and used correctly.

In discussing this, we also discovered misalignment on how a dialect was to be defined and some nuances surrounding meta-schema URI(s).

## Decision Drivers <!-- optional -->

* Opinion: Older copies of the meta-schema should not provide a false-negative when validating a schema with newer valid keywords.  Only an open meta-schema can support this.
* Opinion: A copy of the meta-schema that is packaged with an implementation should align validation of schemas with the implementation's support.  Only a closed meta-schema can support this.
* It is only possible to extend an open meta-schema.

We will also need to document the benefits and detriments of using each meta-schema so that users can make informed decisions.

## Considered Options

* Open meta-schema
* Closed meta-schema
* Have two meta-schemas: one open and one closed

*An option that allowed for both future-compatibility and checking for unknown keywords within a single meta-schema could not be found.*

## Decision Outcome

*Chosen option: "have two meta-schemas"*

After isolating the root of the disagreement, it was determined that since there are benefits to each, we should just create both.

The decision also informed the following decisions:

- A dialect is defined as the set of vocabularies included by a meta-schema's `$vocabulary` keyword.  It can therefore be described by multiple meta-schemas, each with their own URI.  This allows us to have both open and closed meta-schemas that describe the stable dialect.
- A dialect is therefore "[duck typed](https://en.wikipedia.org/wiki/Duck_typing)" and does not need to have a URI.  Although a dialect author may wish to have one, there is currently no use for a dialect URI.  This may still change in the future.
- The meta-schemas that the JSON Schema team defines will use a single, stable URI for each, and it is understood that the content of the meta-schemas will change over time.

This has a knock-on effect for implementations:

- For implementations which contain a copy of the meta-schema, that copy will inevitably become outdated.  Therefore it makes sense for that meta-schema copy to align with the implementation's support.  Validation by a closed meta-schema can provide early detection of incompatibilities between a schema's desired support and what the implementation provides.
- For implementations which support the user providing the meta-schema, validation by an open meta-schema may say a schema is valid.  However the implementation support is necessarily finite, and so the implementation will error when attempting load or process a schema that contains unsupported features.

It's recognized that the net outcome for these two scenarios is the same: the implementation must be updated.  However, the error messaging may vary between them, and it's the implementor's responsibility to document the meaning of such errors with respect to using the implementation.

### Positive Consequences <!-- optional -->

* Providing both meta-schemas allows users to decide which kind of support is important to them: forever-future-compatibility at the cost of not validating unrecognized keywords, or vice versa.
* Implementations get to decide how they want to support meta-schemas.

### Negative Consequences <!-- optional -->

Maybe some initial confusion about JSON Schema publishing both open and close variations of the meta-schema.  However this is addressed easily enough with documentation and guidance.
