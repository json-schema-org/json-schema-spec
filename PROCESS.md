# JSON Schema Specification Development Process
This document formally defines the process used to evolve the JSON Schema
specification as of the first stable release in 2023. It applies to the core
specification and the specifications for any dialects and vocabularies
maintained by the JSON Schema Org, but it doesn't necessarily apply to
everything the JSON Schema Org maintains. For example, media type registration
follows the IETF process. Certain components used within JSON Schema, such as
Relative JSON Pointer, may also follow a separate process.

This process doesn't apply to third-party dialects, vocabularies, or other
extensions. However, third-parties are welcome to use this as a basis for the
process they use for their specifications.

## Canonical URLs
There MUST be a stable canonical URL for referencing any specification that
follows this process. If the spec is made available from any other URLs, they
SHOULD redirect to the canonical URL. If the canonical URL is changed in the
future, all previous canonical URLs MUST remain accessible as redirects to the
current URL.

## Mutable Spec
There is only one version of the specification and it can be updated at any time
as long as those changes don't violate the compatibility rules identified by the
stability model. Bug fixes, clarifications, and other non-functional spec
updates can be merged at any time even for stable features. A change-log blog
post SHOULD be prepared quarterly to give visibility to any changes that were
merged in the last quarter.

## The Stability Model
Every feature in the spec has a release status. It's either evolving, stable, or
deprecated. Flags are used to show the status a feature is in. If it has a year
flag (such as `2024`) that's the year the feature reached stability. The other
flags indicate a feature that is not yet stable or is deprecated.

If a feature doesn't have a flag, it's considered stable. A feature can only be
unflagged if it was stable in the initial stable release in 2023. Any functional
change to the spec after the initial stable release MUST have a flag indicating
it's status.

### Champions
Any feature that is evolving SHOULD have a champion. The champion is responsible
for shepherding the feature through the process to into stable status. The
champion doesn't need to do all the work, they're just responsible for making
sure the work gets done. The champion role MAY be shared by more than one
person. An evolving feature without a champion SHOULD be removed from the spec.

### Proposals
New features start out as proposals. Proposals are informal GitHub Issues or
Discussions and can be submitted by anyone.

All proposals MUST be backward compatible with the current stable specification.
Features that could be problematic for forward compatibility are highly
discouraged, but may be considered if the feature is optional and disabled by
default.

**Promotion to STAGE-0 Checklist:**
[] Consensus among JSON Schema Org core contributors that the proposal is worth
  pursuing
[] The proposal has a champion
[] A PR for an entry in the `STAGE-0` registry has been approved

### STAGE-0
`STAGE-0` features are tracked in the `STAGE-0` Registry on the website. This
registry lists all `STAGE-0` features. Each entry SHOULD include the following
checklist as well as an informal description with at least one example and any
relevant links.

This stage requires at least two implementations to implement the feature. The
purpose of these implementations is to identify any potential implementation
issues that might lead to low adoption such as difficulty of implementation or
performance implications. Therefore, these implementations don't need to be
publicly available or have real world use at this point.

**Promotion to STAGE-1 Checklist:**
[] There is general consensus among the core contributors for adding the feature
  to the spec
[] Tests are available in the test suite
[] Two implementations have implemented the feature and pass the tests suite
[] A blog post has been published introducing the feature
[] A PR for the spec has been approved that completely specifies the feature and
  removes the feature from the `STAGE-0` registry.

### STAGE-1
`STAGE-1` features are included in the specification, but flagged as `STAGE-1`
and are not subject to the compatibility requirements of "stable" features. They
can be added at any time as long as it meets all criteria for `STAGE-1` status.

At this stage, the feature should be seeing real world use. These features MAY
change or be removed all together based on what we learn from real world usage,
but anything more than small changes should be extremely rare. Any necessary
feature experimentation and evolution should have been done in `STAGE-0`.

Implementers are encouraged to implement `STAGE-1` features, but are not
expected to maintain support for previous versions if they change. Users who
choose to use these features should be prepared for the possibility of changes
and be willing to update their schemas if a change does occur.

A `STAGE-1` feature can be promoted to `STAGE-2` at any time. Ideally a
feature should stay in `STAGE-1` for about one year, but may stay longer if we
don't see it used enough in the wild.

**Promotion to STAGE-2 Checklist:**
[] There is general consensus that the feature has been proven to be a good
  addition to JSON Schema and is unlikely to change.
[] We see the feature being used successfully in the wild and not generating a
  lot of community support issues that could indicate a problem.

### STAGE-2
`STAGE-2` features are in the last stages of becoming stable. Changes are
unlikely, but backward incompatible changes are still allowed in extreme cases.
Users can be reasonably sure that the feature won't change, but can't expect all
implementations to support the feature yet.

`STAGE-2` is a staging area for features that are ready to be declared stable,
but are waiting for the next release or don't yet have enough implementations.
When we see the vast majority of actively maintained implementations support
this feature, it will be promoted to stable in the next release. Implementers
SHOULD support `STAGE-2` features so they aren't out-of-date when the next
release happens.

Being in `STAGE-2` isn't a guarantee that a feature will be declared stable in
the next release. If we don't see that the vast majority of actively maintained
implementation have implemented the feature, it may stay in `STAGE-2` another
year to allow implementations to catch up.

`STAGE-2` features can only be promoted to stable as part of a release.

**Promotion to Stable Checklist:**
[] The vast majority of actively maintained implementations support the feature

### Stable
Any part of the specification that doesn't have stability flag or has a year
stability flag such as `2024` is considered stable. This flag indicates the year
a feature was declared stable. Any changes to stable features MUST be backward
compatible and not introduce problems for forward compatibility. Stable features
are never removed, but may be deprecated.

### Deprecated
Any feature in the specification that is flagged in the form `DEPRECATED-{YEAR}`
is considered deprecated as of the year specified. Implementations SHOULD still
support these features to maintain backward compatibility. Deprecated features
will never be removed from the spec, but schema authors SHOULD migrate away from
using them as implementations may begin dropping support for these features at
some point.

A feature can only be deprecated as part of a release.

## Release Process
Releases occur on Jan 1 every year. Each release is identified with the
four-digit year of when the release occurred. Releases never introduce anything
new. The only change should be updating `STAGE-2` flags to `{YEAR}` flags for
the features that are promoted to stable that year, or adding adding deprecation
flags for any features that are deprecated that year.

Implementations that express support for a particular release MUST support all
features that are stable as of that release.

A snapshot of the spec will be taken of the stable parts of the spec and made
available as a PDF on the website.

## Meta-Schemas
Meta-schemas associated with the specification(s) maintained under this process
are subject to the same compatibility rules as the specification. They can be
updated at any time, but changes MUST be backward compatible and allow for
forward compatibility with future schemas.

Meta-schema URIs SHOULD NOT change once published, but if they do, the old URI
MUST remain available and redirect to the new URI.

Meta-schemas are considered non-normative. It's sometimes not possible or not
practical for the meta-schema to describe every constraint in the specification.
