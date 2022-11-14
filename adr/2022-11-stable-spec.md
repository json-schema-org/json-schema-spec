# Selecting a new specification development process

* Status: accepted
* Deciders: @jdesrosiers @relequestual @awwright @handrews @gregsdennis
* Date: 2022-11-02

## Context and Problem Statement
We've chosen to decouple our process from IETF, so we need to choose a new
specification development process to replace it.

## Decision Drivers
* Dropping the "draft" label is an important driver of this change. It's mostly
  an artifact of the IETF process and has proven to be confusing for the
  community.
* The community wants a stable version of JSON Schema.
* There is a need for JSON Schema to continue to evolve to meet evolving
  needs.
* There is a demand for custom keywords/vocabularies/dialects and we want to
  continue to support those use cases.
* There is a need to ease the burden of implementations supporting multiple
  versions of JSON Schema.

## Considered Options
There have been two proposals put forward. Both address the goal of a stable
specification with the ability to evolve. The third option represents sticking
with the status quo.

### Option 1 - TC-39 Inspired
The spec would be converted from I-D XML to Markdown, but can otherwise be
structured however we choose. A system would be put in place to allow us to flag
the stability level of any feature in the spec. There would be only one version
of the spec and that version can change at any time, but changes to stable
features must follow strict backward and forward compatibility requirements.

New features must go through a hardening process to ensure that they are very
unlikely to change before they are considered stable and subject to
compatibility requirements. This process will impose strict requirements
including tests, implementations, documentation, and real world vetting before a
feature or new keyword can be made stable in the spec.

Since the spec is constantly evolving, a "release" is just a matter of promoting
unstable features to "stable" status. Releases would happen once a year and be
designated by the year they were released.

### Option 2 - IETF Inspired
The spec would be reorganized into two parts: "Core Semantics" and "Standard
Extensions". Changes to either spec are subject to strict backward and forward
compatibility requirements and would be released as a new spec that replaces and
obsoletes past versions of the spec.

The "Core Semantics" spec would contain the bare minimum rules that must be
implemented for validators to not produce inaccurate results regardless of
future revisions or extensions. Among other necessities, this would include a
core set of keywords necessary to fully support structural validation and an
extension mechanism. This spec should rarely change. New features would be added
through additional specifications that define extensions to the "Core Semantics"
spec.

The "Standard Extensions" spec is an example of one of these extension
specifications. This spec would be authored by the JSON Schema Org, but
extension specifications could be authored by anyone. The "Standard Extensions"
spec would include everything from the current spec that isn't included in the
"Core Semantics" spec. Features and keywords included in this spec are so
ubiquitous that they should be considered essential for implementations to
support.

### Option 3 - Minimal Change
Option 3 represents the minimal amount of change to our process from what we
have been doing. The spec would need to be converted from I-D XML to a Markdown
version that would be served on the website, but otherwise we would continue to
work the way we have been. We would aim for new version releases every year with
patch releases mid-cycle. Each release is a distinct version of JSON Schema and
has no compatibility guarantees between versions.

## Decision Outcome
The decision is to go with Option 1 while leaving discussion open for aspects of
Option 2 that could be adopted within the constraints of Option 1.

Option 2 uses an immutable spec where each release replaces the last while
Option 1 uses a mutable spec. The outcome of having only one current version of
the spec is achieved with either option, but the mutable spec allows us to
remove some unnecessary roadblocks in our development processes and allows us to
release a stable spec much sooner.

Option 2's restructuring of the spec into "Core Semantics" and "Standard
Extensions" isn't specifically ruled out, but spec evolution is expected to be
done primarily through mutation of the spec guided by the stability process
rather than through extension. Option 1 puts no constraint on the structure of
the spec and restructuring is allowed at any time as long as it doesn't break
compatibility requirements.

## Pros and Cons of the Options
The biggest benefit is shared between Option 1 and Option 2. Both approaches
result in a stable spec. This will have benefits for both implementers and
users. Because of the compatibility requirements, whenever you write a schema,
you will never need to change it just to keep up with changes to JSON Schema.
This is also better for implementers because they don't have to maintain
separate code with different semantics in different versions. They just need to
code for the current release and they will automatically have support for past
releases.

### Option 1 - TC-39 Inspired
The two things that make this option stand out are the stability model governing
spec evolution and the mutability of the spec document.

Having a mutable spec allows us to make clarifications and bug fixes immediately
rather than having to wait months or years for the next release to go out. It
also allows us to iterate faster on unstable features which would allow us to
get them to a stable state much sooner. For example, we have changes to dynamic
references that have been agreed upon and ready to go for over a year, but users
can't benefit from the change until we can get the next full release published.
With this model, the change could have been made available for over a year now
and we would have a years worth of feedback on it's use. Having a mutable spec
also allows us to introduce new features without having to wait for a release.
For example, the `propertyDependencies` keyword has also been waiting for months
for a release. Users could have been benefiting from it for months and providing
feedback.

The downside of a mutable spec is that it can be more difficult for implementers
and users to track when changes happen. We will need to be better at
communicating changes in blog posts or equivalent.

The stability model allows us to ensure we don't make incompatible changes to
stable features, but it also allows us to introduce new features and get real
world feedback without committing to full compatibility requirements. This makes
it much more likely that we don't get stuck with something that doesn't work out
or could be done better.

The stability model also makes it clear to users which features are stable and
how likely a feature is to change in the future. Whether they prefer to stick
with stable features or want to use a new keyword, users have the information
they need to make that decision.

The downside of the stability model is that it presents a very high barrier for
a feature to make it into a stable status. It would typically take two years for
a feature to reach stability which could be a long time to wait for users who
need to stick to the stable feature set but could benefit greatly from a new
feature.

### Option 2 - IETF Inspired
The benefit of this approach is that it's compatible with the IETF process
without imposing some of the constraints and perception issues that we had with
our previous process. We can pursue an RFC in the future if we choose to without
significant changes or spec restructuring.

With this proposal, releases are done as a new document that replaces the
previous documents. Compared to the constantly evolving spec in Option 1,
changes from non-functional clarifications and bug fixes to adding and evolving
new features takes much longer if you have to wait for the next release to make
a change. This lengthens the feedback loop slowing spec development progress.

The main downside of this approach compared to Option 1 is that it will likely
take quite a while to get to a stable release. The spec restructuring is
controversial and it proposes several new keywords that are also controversial.
Discussing, achieving consensus, specifying, and implementing these changes will
take time. Introducing new features and keywords is much more risky with the new
compatibility requirements, so we have to go extra slow to make sure we get it
right.

### Option 3 - Minimal Changes
The benefit of this solution is that we don't have the overhead of defining
and/or learning a new process. In the short term, we can put more effort into
improving JSON Schema if we don't have the distraction of defining a whole new
process. The problem with this approach is that it doesn't solve the problem
with the "draft" label and doesn't provide the stability the community is
looking for.

## Links
* https://github.com/jdesrosiers/json-schema-spec/blob/main/adr/2022-09-decouple-from-ietf.md -
  The ADR for the decision to decouple from IETF
* https://github.com/orgs/json-schema-org/discussions/234 - Proposal submitted
  by @jdesrosiers for a process to replace the IETF based process we'd been
  using.
* https://github.com/orgs/json-schema-org/discussions/257 - @awwright's vision
  for JSON Schema including how it can continue to evolve while still having a
  stable core.
* https://github.com/json-schema-org/community/discussions/119 - When we first
  started talking about forward compatibility and a stable spec.
  * https://json-schema.org/blog/posts/future-of-json-schema - User friendly
    comments on decoupling from the IETF.
