# Acknowledge ambiguity in additionalProperties behaviour and fix after patch release

* Status: accepted
* Deciders: @relequestual @gregsdennis, @jdesrosiers, @karenetheridge
* Date:  2022-05-19

Related...

Issue: https://github.com/json-schema-org/json-schema-spec/issues/1172

Discussion: https://github.com/json-schema-org/community/discussions/57

Pull Request: https://github.com/json-schema-org/json-schema-spec/pull/1203

## Context and Problem Statement

When we changed the specification to use annotations as the context in which some keywords behave, we included a clause that allowed implementations which didn't use annotations to optimize the processing of `additionalProperties` in another way which produces the same effect as the prior behaviour.
This section created an ambiguity in terms of the resulting output format, but not validation.

We needed to decide on how to proceed for the patch release of the 2020-12 version of the specification.

The two above links are to a GitHub Discussion and a GitHub Issue detailing the problems.
Details with an example of the problem can be seen in the Discussion's opening post specifically.

## Decision Drivers <!-- optional -->

* The "patch release" should not change anything functionally
* Annotations as they are, are confusing to users, implementers, and specification editors alike
* Patch release is behind schedule
* There are currently no tests for the output format
* It's hard to see any immediate consensus on changing the annotation based behaviour

## Considered Options

* [Leaving it "as is" and do nothing](https://github.com/json-schema-org/community/discussions/57#discussioncomment-1413777)
* [Pick one](https://github.com/json-schema-org/community/discussions/57#discussioncomment-1416683) of the behaviours
* [Revert back to draft-07 behaviour](https://github.com/json-schema-org/community/discussions/57#discussioncomment-1453723)
* [Reinterpret how we understand annotation collection](https://github.com/json-schema-org/json-schema-spec/issues/1172#issuecomment-1049686478) to allow reading annotations within the same schema object regardless of assertion results
* [Acknowledge and accept that two approaches and results are allowable](https://github.com/json-schema-org/community/issues/161#issue-1173742930)
* Redefine annotation collection behaviour and/or how `additionalProperties` works

## Decision Outcome

Chosen option: "Acknowledge and accept that two approaches and results are allowable", because

* Leaving it "as is" will continue to cause confusion
* The change is non-functional which is required for the patch release
* The patch release is behind schedule
* Finding consensus of other solutions proved to be difficult
* There's no test suite for the output format, so it's not easy to see unintended consequences of a functional change
* We need to properly re-evaluate annotation collection and how annotations are used by other keywords

### Positive Consequences

* Patch release can move forward
* Validation result is not impacted
* Confusion is at least seen and acknowledged
* Implementations which pick either approach are seen to be compliant

### Negative Consequences

* May have an impact for downstream tools which process full output data
* A test suite (not yet developed) which covers this situation needs to allow for multiple valid answers

## Pros and Cons of the Options

### Leaving it "as is" and do nothing

Agree to do nothing and hope for the best. There isn't any downstream tooling yet anyway.

* Good, because no functional change
* Good, because no impact on downstream tooling
* Bad, because leaves a known ambiguity in the specification

### Pick one / Revert to draft-07 behaviour / Reinterpret annotation collection

* Good, because ambiguity is removed
* Good, because not many tools will be effected
* Bad, because it can be seen as a functional change (not really allowed for the patch release)
* Bad, because it can break existing implementations and downstream tools
* Bad, because without a test suite it's hard to see unexpected consequences

## Links

* Issue: [Ambiguous behaviour of additionalProperties when invalid](https://github.com/json-schema-org/json-schema-spec/issues/1172)
* Discussion: [The meaning of "additionalProperties" has changed](https://github.com/json-schema-org/community/discussions/57)
* Resolving Pull Request: [Add CREF about ambiguous behaviour of additionalProperties](https://github.com/json-schema-org/json-schema-spec/pull/1203)
* Alternative solution proposal: [Resolve contradictions in the described behaviour of "additionalProperties" and "items"](https://github.com/json-schema-org/json-schema-spec/pull/1154)

* [Result of discussing](https://github.com/json-schema-org/json-schema-spec/issues/1172#issuecomment-1063962900) on an Open Community Working Meeting call - @jdesrosiers proposed a less controversial and more agreeable solution to add a comment that both are allowable
* [Related GitHub Discussion](https://github.com/json-schema-org/community/discussions/67) on alternative behaviour for `unevaluated*` keywords
