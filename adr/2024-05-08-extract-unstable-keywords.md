# Extract Unstable Features for Initial Release

- Status: accepted
- Deciders: @gregsdennis @jdesrosiers @bhutton
- Date: 2024-05-08

Technical Story:

@gregsdennis [proposed](https://github.com/json-schema-org/json-schema-spec/issues/1443#issuecomment-2099427543)
that an ADR be created to document that unstable features be extracted before
the stable release.

Also the [SDLC proposal](https://github.com/orgs/json-schema-org/discussions/671)
which lists features that need to be put into the proposal process.

## Context and Problem Statement

In creating a stable spec release, it's important that all included features are
well-developed and their behaviors are finalized.  As such, the following
features will be extracted before the stable release.

- `$vocabulary` - This feature is still in development.
- Output formats - This feature is being extracted to its own spec anyway.  (See
  [PR](https://github.com/json-schema-org/json-schema-spec/pull/1429) for more
  info and link to discussion.)
- `propertyDependencies` - This feature is not technically in the spec and
  should go through the proposal process.

## Decision Drivers <!-- optional -->

We can't publish a stable spec that contains unstable features.  Thus we need to
remove them.

## Considered Options

1. Extract unfinished features and put them through the proposal process.
1. Complete the features before releasing the spec.

## Decision Outcome

Chosen option: Extract unfinished features and put them through the proposal
process.

This allows us to release a stable version of the specification while continuing
to develop these features.

### Positive Consequences <!-- optional -->

- We can release a spec earlier that fulfills our users' needs.
- We can continue to develop these features.

### Negative Consequences <!-- optional -->

- These feature will be considered experimental until their proposals are
accepted.  This may be a hindrance to adoption.

## Pros and Cons of the Options <!-- optional -->

<!--lint ignore maximum-heading-length-->
### Extract unfinished features and put them through the proposal process

- Good, because we can release a spec earlier that fulfills our users' needs.
- Good, because we can continue to develop these features.
- Bad, because these features are experimental now.

### Complete the features before releasing the spec

- Good, because the features will be ready to use when the spec releases.
- Bad, because the spec may not release if we can't finalize the features.
