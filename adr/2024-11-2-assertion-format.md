# `format` as an assertion

- Status: proposed
  <!-- will update below to only those who participated in the vote -->
- Deciders: @gregsdennis @jdesrosiers @julian @jviotti @mwadams @karenetheridge
  @relequestual
- Date: 2024-11-02
- Technical Story: <https://github.com/json-schema-org/json-schema-spec/issues/1520>
- Voting issue: <https://github.com/json-schema-org/TSC/issues/19>
  - For - @gregsdennis @jdesrosiers @jviotti @mwadams @karenetheridge
  - Neutral - @relequestual
  - Against - @julian

## Context and Problem Statement

There's a long and sticky history around format.

1. Going back all the way to Draft 01, format has never required validation.
1. Whether to support format validation has always been the decision of the
   implementation.
1. The extent to which formats are validated has also been the decision of the
   implementation.

The result of all of this is that implementation support for validation has been
spotty at best. Despite the JSON Schema specs referencing very concretely
defined formats (by referencing other specs), implementations that do support
validation don't all support each format equally. This has been the primary
driving force behind keeping format as an opt-in validation.

With 2019-09, we decided that it was time to give the option of format
validation to the schema author. They could enable validation by using a
meta-schema which listed the Format Vocabulary with a true value, which meant,
"format validation is required to process this schema."

In 2020-12, we further refined this by offering two separate vocabularies, one
that treats the keyword as an annotation and one that treats it as an assertion.
The argument was that the behavior of a keyword shouldn't change based on
whether the vocabulary was required or not.

However, the fact remains that our users consistently report (via questions in
Slack, GitHub, and StackOverflow) that they expect format to validate. (The most
recent case I can think of was only last week, in .Net's effort to build a
short-term solution for schema generation from types.)

Due to this consistency in user expectations, we have decided to:

1. make format an assertion keyword, and
1. strictly enforce it by moving the appropriate tests into the required section
   of the Test Suite and building them more completely.

## Decision Drivers

- User expectation
- Current behavior
- Historical context
- Disparity of current implementation support vs the proposed requirements

## Considered Options

### `format` remains an annotation keyword by default

This is the current state. The primary benefit is that we don't need to make a
breaking change.

The primary downside is that the current system of (1) configuring the tool or
(2) incluing the `format-assertion` vocab[^1] is confusing for many and doesn't
align with user expectations.

[^1]: The `format-assertion` vocabulary will no longer be an option since we have
demoted vocabularies to a proposal for the stable release. This leaves tool
configuration as the only option to enable `format` validation.

### `format` becomes an assertion keyword by default

We change the spec to require `format` validation. Furthermore:

- Implementations SHOULD support `format` with the defined values
- Implementations MAY support others, but only by explicit config
- Implementations MUST refuse to process a schema that contains an unsupported
  format

## Decision Outcome

The TSC has decided via vote (see voting issue above) that we should change
`format` to act as an assertion by default, in line with option (2).

### Positive Consequences <!-- optional -->

- Aligns with user expectations.
- Users are still able to have purely annotative behavior through use of
  something like `x-format`.
- Increased consistency for `format` validation across implementations.

### Negative Consequences <!-- optional -->

- This is a breaking change, which means that we will likely have to re-educate
  the users who correctly treat it as an annotation.
- Older schemas which do not specify a version (`$schema`) may change their
  validation outcome.
- The burden on implementations will be greater since format validation was
  previously optional.
