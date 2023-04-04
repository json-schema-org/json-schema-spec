# Supporting Single-Value Annotations via a Defined Prefix

* Status: accepted
* Deciders: @relequestual, @gregsdennis, @jdesrosiers, @karenetheridge, @awwright, @julian
* Date: 2023-04-04

Related:

- Discussions:
  - Disallow Unknown Keywords - https://github.com/orgs/json-schema-org/discussions/241
  - Support SVAs - https://github.com/orgs/json-schema-org/discussions/329
- PRs:
  - https://github.com/json-schema-org/json-schema-spec/pull/1387 (proposal)

## Context and Problem Statement

Dropping support for unknown keywords was a necessary step toward providing stability guarantees.  However, the community's reaction to this news was not encouraging.  How can we still support keywords that are merely collected as annotations and provide no functionality (single-value annotations, or SVAs)?

## Decision Drivers <!-- optional -->

* Future-proofing - We want to ensure that we can still add keywords to the spec without breaking existing schemas.
* Implementation supportability - Is the proposal feasible to implement?
* Community preference

## Considered Options

1. A defined prefix or other convention for SVAs
    1. Optionally defined by a new `$sigil` keyword
1. Inlined vocabularies that can define SVAs
1. A new core keyword that lists SVAs, e.g. `$ignored`
1. A defined configuration option to allow/forbid unknown keywords
1. A new core keyword designed for "extra" data

## Decision Outcome

Chosen option: A defined prefix or other convention.

This option was chosen because it solves the problem in a clean way that can be easily implemented.  It was also the favorite solution among the team members as well as the community.

Specifically, the prefix `x-` has been selected.

### Positive Consequences <!-- optional -->

* It solves the problem by allowing users to include custom data in their schemas.
* Many developers will be familiar with using `x-` for custom data.
* It's a simple way to differentiate SVAs from other keywords.

### Negative Consequences <!-- optional -->

* Some people preferred a different prefix as `x-` in some other contexts denotes "experimental" behavior.

## Pros and Cons of the Options <!-- optional -->

### Option 1 - A defined prefix or other convention for SVAs

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-4988859)

* Good, because it's simple and easy to understand.
* Good, because `x-` specifically is familiar to many developers as an identifying prefix for custom data.
* Good, because it's easily supportable by the meta-schema (i.e. `patterProperties`)
* Bad, because `x-` in some other contexts can denote "experimental" behavior, which is not our meaning.

#### Option 1a - Optionally defined by a new `$sigil` keyword

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-5357549)

* Good, because it can give users flexibility for the prefix that they want to use.
* Bad, because it cannot be supported by the meta-schema without other changes, which may be difficult to define and/or implement.

High level of effort

### Option 2 - Inlined vocabularies that can define SVAs

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-4988882)

* Good, because it defines the SVAs in a vocabulary which means they are regarded as "known."
* Bad, because we don't have any support for inlined vocabularies at the moment and would have to build that.

### Option 3 - A new core keyword that lists SVAs, e.g. `$ignored`

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-4988904)

* Good, because it provides a way to define SVAs.
* Bad, because it cannot be supported by the meta-schema without other changes, which may be difficult to define and/or implement.

High level of effort

### Option 4 - A defined configuration option to allow/forbid unknown keywords

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-4999789)

* Good, because it returns previous functionality (i.e. allowing unknown keywords) to the user.
* Bad, because that previous functionality removes/circumvents stability guarantees.

### Option 5 - A new core keyword designed for "extra" data

[Discussion](https://github.com/orgs/json-schema-org/discussions/329#discussioncomment-5374873)

* Good, because it provides a place for users to add extra data.
* Bad, because it's an extra depth level that users need to create.
* Bad, because it can only generate a single annotation instead of multiple.
