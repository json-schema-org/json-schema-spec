# Decoupling from IETF

* Status: accepted
* Deciders: @jdesrosiers @relequestual @awwright
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
spec development and releases but isn't associated with IETF in any way. Our
perceived involvement with IETF causes confusion and misunderstanding within our
community in the cases were our practices and the realities of our situation
deviate from the typical IETF I-D process.

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
* Every one of our releases is expected to be used in production and will be
  depended on for many years forward. This is not consistent with normal IETF
  drafts. Even if we don't publicly use the term "draft", we're still using the
  IETF I-D system in a way that's not intended.
* Under IETF, JSON Schema fits under the category of "draft". The community has
  repeatedly told us that they perceive this to meant that JSON Schema
  "incomplete" and not "not ready for production use". This is the wrong message
  for us to be sending as all of our releases are intended to be used in
  production. This ADR doesn't decide whether or not to drop the "draft" from
  our releases, but decoupling from IETF gives us that option.
* Several members of the JSON Schema team have had poor interactions with IETF
  and don't feel that working with them would be productive. This is a
  relatively minor consideration. If we thought IETF was right for JSON Schema,
  we could find ways to make those relationships work.

## Considered Options

1. Continue to submit I-Ds, while using our customized process with no intention
  of pursing standards track RFC status.
2. Go all-in with IETF and pursue a standards track RFC with the IETF.
3. Join W3C and pursue a standards track with them using their process.
4. Decouple completely from any standards organization and come up with our own
   specification development lifecycle (SDLC) model inspired by well established
   projects with an SDLC that more closely meets or needs.

## Decision Outcome

Our decision is to go with Option 4 and decouple from standards organizations
that don't fit our needs. We don't currently have a plan for what to replace
IETF with. We are currently investigating how other established projects do
their SDLC and will likely choose one to emulate and adapt to our needs.
Although we don't have a replacement solution in place yet, we are confident
that continuing to abuse the IETF I-D process or conforming to a standards
organization process that doesn't fit our needs is not the way to go.

### Positive Consequences

* Decoupling from IETF allows us to distance ourselves from the assumptions that
  people make about JSON Schema because they assume it works like a typical I-D.
* Decoupling from IETF allows us to customize our SDLC model to what works best
  for JSON Schema.

### Negative Consequences

* Not being associated with a recognized standards organization such as IETF,
  W3C, or IEEE reduces the credibility of JSON Schema in the eyes of some.
* If we don't go the standardization route with IETF or W3C, we lose access to
  their expert review process.
* Defining our own SLDC process will be a lot of work and none of us have
  expertise in defining such a process. However, we can take inspiration from
  existing well established projects and we would have the freedom to update our
  process as we learn what works and what doesn't.
