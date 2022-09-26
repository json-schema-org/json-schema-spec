# Decoupling from IETF

* Status: accepted
* Deciders: @jdesrosiers @relequestual @awwright @handrews
* Date: 2022-08-17

Related Issues:
* https://github.com/orgs/json-schema-org/discussions/69 - This issue is about
  dropping the "draft" prefix from our releases. This ADR doesn't cover that,
  but much of the discussion about whether or not to decouple from IETF is in
  that discussion.
* This topic has been discussed in many other places as well that are difficult
  to link to here including Slack, Twitter, OCWMs, and conference discussions.

## Context and Problem Statement

Currently JSON Schema loosely follows the IETF Internet-Draft (I-D) process for
spec development and releases but isn't associated with any IETF working group.
JSON Schema is an individual draft. That means it isn't on a standards track
with IETF and IETF is not involved nor supports the spec in any way other than
hosting the canonical version of our I-Ds. Our perceived involvement with IETF
causes confusion and misunderstanding within our community in the cases were our
practices and the realities of our situation deviate from a typical IETF I-D
lifecycle. The thing that makes our situation different than a typical I-D is
that our "drafts" are intended for use in production.

## Decision Drivers

* IETF's draft versioning system doesn't work for JSON Schema and we stopped
  using it to version our releases a while ago. We now use date based versioning
  and even have more than one draft submission per release (the initial release
  and the patch release).
* The IETF process is optimized for working on a draft until it's done and then
  disbanding. In some cases, the RFC may be revisited and revised in the future,
  but this is rare and generally contains little more than clarifications and
  reference updates. JSON Schema is not like that. JSON Schema is more like a
  programming language. When it stops evolving, it will lose its relevance.
  When we finish a release of JSON Schema, we don't disband, we start work on
  the next release.
* Since the project resumed activity after the gap following draft-04, every one
  of our releases is expected to be used in production and will be depended on
  for many years forward. This is not consistent with normal IETF drafts. Even
  if we don't publicly use the term "draft", we're still using the IETF I-D
  system in a way that's not intended.
* Under IETF, JSON Schema fits under the category of "draft". The community has
  repeatedly told us that they perceive this to meant that JSON Schema
  "incomplete" and not "not ready for production use". This is the wrong message
  for us to be sending as all of our releases are intended to be used in
  production. This ADR doesn't decide whether or not to drop the "draft" from
  our releases, but decoupling from IETF gives us that option.
* Several members of the JSON Schema team have interacted with JSON-related IETF
  working groups. Some of these interactions demonstrated an indifference or
  hostility to JSON Schema, and a preference for projects taking a different
  approach. Equally important was a lack of any active interest or constructive
  engagement. Finally, we were informed that any schema project for JSON would
  not necessarily start from JSON Schema as a base, indicating that a "JSON
  Schema" working group would quite likely not involve JSON Schema itself. This
  impression has been reinforced by observing the amount of change introduced to
  JSON Path as a consequence of its adoption by an IETF working group. While we
  have a good relationship with the relatively new HTTPAPIs working group, the
  combination of these other experiences with other mismatches between our
  project and the IETF process contributes to our reluctance to move forward
  through the iETF.

## Considered Options

1. Continue to submit I-Ds, while using our customized process with no intention
   of pursing standards track RFC status.
2. Go all-in with IETF and pursue a standards track RFC with the IETF. The
   approach would be to describe the essential characteristics of evaluating a
   JSON Schema: the keywords that everybody is guaranteed to support, and any
   extension mechanisms.
3. Join W3C and pursue a standards track with them using their process.
4. Decouple completely from any standards organization and come up with our own
   specification development lifecycle (SDLC) model inspired by well established
   projects with an SDLC that more closely meets or needs.

## Decision Outcome

Our decision is to go with Option 4 and decouple from standards organizations
that don't fit our needs. We don't currently have a plan for what to replace
IETF with, but we are currently investigating how other established projects do
their SDLC and will likely choose one to emulate and adapt to our needs.
Although we don't have a replacement solution in place yet, we are confident
that continuing to abuse the IETF I-D process or conforming to a standards
organization process that doesn't fit our needs is not the way to go.

However, we still plan to use the IETF process to register the media types
defined by JSON Schema with IANA. This effort is currently in progress with the
HTTPAPIs working group.

The decision to not use IETF applies only to the main specification documents
and not necessarily supporting components we have defined or will define in the
future. Currently our only such component is Relative JSON Pointer, but there
could be others in the future. These components will be examined on a case by
case basis and we may choose an IETF standards path for those components if it
makes sense.

Option 2 and 3 are still on the table if we feel it makes sense when we get to a
more stable place in the future. The main concern is the pain this process is
causing while we are in this unusual phase of simultaneous unstable growth and
production use. Standardization isn't out of the question, it's just not
productive for us to be developing JSON Schema within the constraints of a
standards organizations procedures.

Option 1 was rejected because it ignores the problems we've been facing and
provides no solution. No one wants this.

Option 2 was rejected for several reasons. If we go all in with IETF, we would
have to join a working group and treat JSON Schema like a normal I-D. That means
we would have to start treating drafts as drafts, which means not recommending
production use until we are ready for RFC and not releasing a new
production-ready version of JSON Schema until we've reached RFC status. Most of
the core contributors don't believe that we are close enough to an RFC-ready
release that we want to commit to not being able to issue another release until
that happens.

There are other concerns including skepticism that even with an extension
mechanism that the RFC wouldn't need regular updates, which is not normal
practice for an RFC and would require significant effort to issue a replacing
RFC. Without a concrete proposal on the scope of the RFC and the extension
mechanisms, it's hard to commit to this path.

Additionally, many of the core contributors have found working with the IETF
unproductive and have concerns about JSON Schema getting deeper involved without
compelling enough reason. Most agree that the reasons are not sufficiently
compelling at this point.

Option 3 was rejected because it has the same problems as Option 2 except that
we don't have the same unpleasant history with W3C than we do with IETF.
Additionally, the W3C is a "pay to play" standards organization. Organizations
must pay to contribute to specifications the W3C publish, which doesn't match
the JSON Schema Org's open ethos.

Ben Hutton has had multiple calls with various individuals at different levels
within the W3C, and has a friendly contact should we wish to investigate again
at a later point. The W3C does have an "invited expert" solution for when
a persons employer doesn't want to be a paying member, however this is supposed
to be an exception to the rule, and not frequently used.

### Positive Consequences

* Decoupling from IETF allows us to distance ourselves from the assumptions that
  people make about JSON Schema because they assume it works like a typical I-D.
* Decoupling from IETF allows us to customize our SDLC model to what works best
  for JSON Schema.

### Negative Consequences

* If we don't go the standardization route with IETF or W3C, we lose access to
  their expert review process.
* Not being associated with a recognized standards organization such as IETF,
  W3C, or IEEE reduces the credibility of JSON Schema in the eyes of some.
  However, we have received feedback that our membership with OpenJS/Linux
  Foundation provides the credibility that we need.
* One of the benefits of an RFC is other standards can normatively reference it,
  and use JSON Schema to define their JSON-based syntaxes. However, we have
  received feedback from people involved in standards development that told us
  that they were comfortable referencing OpenAPI's self published specification
  in their standards and that OpenAPI's membership with the Linux Foundation was
  an important aspect of what makes them comfortable doing so. JSON Schema is a
  member of the OpenJS Foundation, which is a sub-group of the Linux Foundation,
  so we expect standards developers to be just as comfortable referencing JSON
  Schema as they are referencing OpenAPI.
* Defining our own SLDC process will be a lot of work and none of us have
  expertise in defining such a process. However, we can take inspiration from
  existing well established projects and we would have the freedom to update our
  process as we learn what works and what doesn't.
