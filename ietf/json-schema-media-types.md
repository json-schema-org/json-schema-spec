---

stand_alone: true
ipr: trust200902
submissiontype: independent
category: info

title: JSON Schema Media Types
author:
- name: Jason Desrosiers
  email: jdesrosi@gmail.com
  role: editor

normative:
  # TODO: Update to the stable release
  JSON-Schema:
    title: JSON Schema Core
    target: "https://json-schema.org/specification.html"
  HTTP: RFC9110
  JSON: RFC8259
  JSON-Pointer: RFC6901
  IRI: RFC3987

informative:
  draft-2020-12:
    title: JSON Schema - draft-2020-12
    date: 2022-06-16
    target: "https://json-schema.org/draft/2020-12"
    author:
    - ins: A. Wright
    - ins: H. Andrews
    - ins: B. Hutton
    - ins: G. Dennis
  draft-2019-09:
    title: JSON Schema - draft-2019-09
    date: 2019-09-17
    target: "https://json-schema.org/draft/2019-09"
    author:
    - ins: A. Wright
    - ins: H. Andrews
    - ins: B. Hutton
    - ins: G. Dennis
  draft-07:
    title: JSON Schema - draft-07
    date: 2018-03-19
    target: "https://json-schema.org/draft-07"
    author:
    - ins: A. Wright
    - ins: H. Andrews
  draft-03:
    title: JSON Schema - draft-03
    date: 2018-03-19
    target: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf"
    author:
    - ins: K. Zyp
    - ins: G. Court
  profile: RFC6906

--- abstract

This document registers the following media types associated with
{{JSON-Schema}} to the IANA Media Types registry: `application/schema+json` and
`application/schema-instance+json`.

--- middle

# Introduction

{{JSON-Schema}} is a declarative domain-specific language for validating and
annotating {{JSON}} documents. This document registers media types that can be
used with schemas (`application/schema+json`) and instances
(`application/schema-instance+json`) that are represented as JSON.

Although there is now a stable version of {{JSON-Schema}}, there are still many
dialects of JSON Schema in wide use today including {{draft-07}} and
{{draft-2020-12}}. There are also several third-party JSON Schema dialects as
well including the ones defined for use in
[OpenAPI](https://spec.openapis.org/oas/latest.html#schema-object) and
[MongoDB](https://www.mongodb.com/docs/manual/core/schema-validation).

The media types defined in this document can be used with any dialect of JSON
Schema including obsolete draft dialects and third-party dialects. The draft
dialects include media type definitions in their specification. This document
obsoletes those definitions while remaining compatible as much as is possible
and reasonable.

## Notational Conventions

{::boilerplate bcp14+}

The terms "content", "content negotiation", "resource", and "user agent" in this
document are to be interpreted as in {{HTTP}}.

# Media Type application/schema+json {#schema-json}

The `application/schema+json` media type is an extension of the JSON {{JSON}}
media type and is used for JSON Schemas represented as JSON. It defines two
types of fragment identifiers as well as a media type parameter that can be used
for content negotiation or as a fallback mechanism for identifying the dialect
of the schema.

The following information serves as the registration form for the
`application/schema+json` media type.

Type name:
: application

Subtype name:
: schema+json

Required parameters:
: N/A

Optional parameters:

- schema: An {{IRI}} identifying the JSON Schema dialect the schema was written
  for. If this value conflicts with the value of the `$schema` keyword in the
  schema, the `$schema` keyword takes precedence.
- profile: **(deprecated)** An alias of the `schema` parameter included for
  compatibility with older versions of JSON Schema.

Encoding considerations:
: Same as "application/json"

Security considerations:
: See the "Security Considerations" section of {{JSON-Schema}}

Interoperability considerations:
: See the "General Considerations" section of {{JSON-Schema}}

Published specification:
: this document

Applications that use this media type:
: JSON Schema is used in a variety of applications including API servers and
  clients that validate JSON requests and responses, IDEs that valid
  configuration files, and databases that store JSON.

Fragment identifier considerations:
: This media type uses the JSON Pointer and plain-name fragment identifier
  structures defined in the "Fragment Identifiers" section of {{JSON-Schema}}.

Additional information:

- Deprecated alias names for this type: N/A
- Magic number(s): N/A
- File extension(s): json, schema.json
- Macintosh file type code(s): N/A

Person and email address to contact for further information:
: See Authors' Addresses section.

Intended usage:
: COMMON

Restrictions on usage:
: N/A.

Author:
: See Authors' Addresses section.

Change controller:
: N/A

## Identifying the dialect

If the resource includes the `$schema` keyword, the value of that keyword
determines the dialect of the schema. As a fallback, the `schema` media type
parameter can be used to determine the dialect of the schema.

## Content negotiation based on dialect

The `schema` media type parameter can also be used for content negotiation (see
{{Section 12 of HTTP}}). In the following example, the user agent is able to
accept two possible dialects of JSON Schema and the server replies with the
latest one it supports.

Request:

~~~ http-message
NOTE: '\' line wrapping per RFC 8792

GET /schemas/v2/pet HTTP/1.1
Host: foo.example
Accept: application/schema+json; \
            schema="https://json-schema.org/v1/2025", \
        application/schema+json; \
            schema="http://json-schema.org/draft-07/schema#"
~~~

Response:

~~~ http-message
NOTE: '\' line wrapping per RFC 8792

HTTP/1.1 200 OK
Content-Type: \
  application/schema+json; schema="https://json-schema.org/v1/2025"

{
  "$id": "https://json-schema.org/v1/2025",
  "$schema": "https://json-schema.org/v1/2025",
  ...
}
~~~

<!-- lint ignore maximum-heading-length -->
# Media Type application/schema-instance+json {#schema-instance-json}

The `application/schema-instance+json` media type is an extension of the
{{JSON}} media type and is used for instances represented as JSON. It defines a
fragment identifier and a media type parameter that can be used for content
negotiation or as a way to declare a schema the instance conforms to.

The following information serves as the registration form for the
`application/schema-instance+json` media type.

Type name:
: application

Subtype name:
: schema-instance+json

Required parameters:
: N/A

Optional parameters:

- schema:
  : An IRI-reference {{IRI}} identifying a JSON Schema that the resource
  conforms to. If the IRIs is relative, the base URI is the retrieval URI of the
  retrieved resource. **(deprecated)** A whitespace-separated list of IRIs is
  also allowed, but discouraged due to conflicting semantics in different
  dialects of JSON Schema (see {{multiple-schemas}}). If multiple IRIs are
  given, the resource conforms to all of the schemas listed.

Encoding considerations:
: Same as {{JSON}}

Security considerations:
: Same as {{JSON}}

Interoperability considerations:
: Same as {{JSON}}

Published specification:
: this document

Applications that use this media type:
: JSON Schema is used in a variety of applications including API servers and
  clients that validate JSON requests and responses, IDEs that valid
  configuration files, databases that store JSON, and more.

Fragment identifier considerations:
: Fragment identifiers MUST be interpreted as JSON Pointers. The use of JSON
  Pointers as URI fragment identifiers is described in {{JSON-Pointer}}.

Additional information:

- Deprecated alias names for this type: N/A
- Magic number(s): N/A
- File extension(s): json
- Macintosh file type code(s): N/A

Person and email address to contact for further information:
: See Authors' Addresses section.

Intended usage:
: COMMON

Restrictions on usage:
: N/A

Author:
: See Authors' Addresses section.

Change controller:
: N/A

## Identifying a schema

It is a common convention for schemas to use `$schema` in an instance to declare
the schema the instance conforms to. However, this is not an official behavior
defined for JSON Schema and has limitations such the inability to declare the
schema of an instance that isn't an object.

The `schema` media type parameter serves the same purpose of declaring the
instance's schema without the limitations. It also allows for content
negotiation (see {{Section 12 of HTTP}}).

The following is an example of content negotiation where a user agent can accept
two different versions of a "pet" resource. Each resource version is identified
by a unique JSON Schema.

Request:

~~~ http-message
NOTE: '\' line wrapping per RFC 8792

GET /pet/1234 HTTP/1.1
Host: foo.example
Accept: \
  application/schema-instance+json; schema="/schemas/v2/pet"; q=0.2, \
  application/schema-instance+json; schema="/schemas/v1/pet"; q=0.1
~~~

Response:

~~~ http-message
NOTE: '\' line wrapping per RFC 8792

HTTP/1.1 200 Ok
Content-Type: \
  application/schema-instance+json; schema="/schemas/v2/pet"

{
  "petId": "1234",
  "name": "Pluto",
  ...
}
~~~

# Interoperability Considerations

In its various iterations, JSON Schema has made several changes to how it
defines its media types and how it recommends the use of media types. This has
led to some differences in how these media types have been used in the wild.

The media types defined in this document are designed to be compatible with as
many of those iterations as possible with special consideration for what has
been seen in use in the wild. However, there are some things that couldn't be
included. Implementations MAY consider supporting a "compatibility mode" to
support behaviors that aren't officially supported yet might be encountered in
the wild.

## The `profile` parameter {#profile-parameter}

Earlier drafts of JSON Schema suggest the use of the `profile` media type
parameter as defined by {{profile}} to associate an instance with a schema or a
schema with a meta-schema. There was some debate about whether a schema can be
considered a profile, so the parameter was renamed to `schema`.

The `profile` parameter is included for the `application/schema+json` media type
for compatibility with older systems. It's not included for the
`application/schema-instance+json` media type because there was never a time
where the `profile` parameter was defined for that media type.

## A Media Type for Instances

Earlier drafts of JSON Schema suggest the use of `application/json` with the
{{profile-parameter}} to associate an instance with a schema. However, it isn't
allowed to use media type parameters that aren't defined to be used by the media
type. The `application/schema-instance+json` media type was introduced to
address that problem. In {{draft-07}}, the specification started suggesting the
new media type be used instead of `application/json` for instances so a media
type parameter can be used correctly.

Implementations MAY consider supporting the `profile` parameter with
`application/json` if compatibility with older systems is necessary. Supporting
the `schema` parameter with `application/json` should not be necessary because
that parameter was not introduced before the `application/schema-instance+json`
media type was introduced.

## Multiple `schema` IRIs {#multiple-schemas}

The semantics of the `schema` parameter when it contains multiple IRIs has
conflicting definitions in different releases of JSON Schema. {{draft-07}}
defines that the instance conforms to at least one of the schemas.
{{draft-2019-09}} contradicts itself saying in different places that the
instance conforms to all of the schemas and that it conforms to at least one of
the schemas. The `schema` parameter was removed entirely for {{draft-2020-12}}
with the intention of sorting out the contradiction later.

The `application/schema-instance+json` media type uses the "all of" semantics as
that was the most recent intention. It's also more logical, more useful, and in
alignment with how `profile` is defined. However, due to the contradicting
definitions and unclear use case, using multiple IRIs is considered deprecated
going forward.

Implementations MAY consider supporting the "any of" definition through
configuration of some kind to switch between the "all of" and "any of"
definitions if they think their users might depend on the "any of" definition.

The `application/schema+json` media type doesn't allow for multiple IRIs because
a schema can only have one dialect. Technically the {{draft-2019-09}}
specification allows the `schema` parameter to have multiple values, but since
that doesn't make sense, it was considered safe to leave that option out.

Implementations MAY consider supporting the "any of" definition for multiple
values in `schema` if they think their users might depend on it.

## The `schema` Link Relation

{{draft-07}} and {{draft-2019-09}} specify that the `schema` media type
parameter can also be used as a link relation. However, there's no mention of
registering the relation or any evidence that anyone has used it in this way.
Therefore, it was decided not to register `schema` as a link relation.

Implementations MAY consider supporting the `schema` link relation if they think
their users might depend on it.

## Fragment Identifiers

Through {{draft-03}}, JSON Schema defined a dot-notation alternative to JSON
Pointer fragment identifiers. Implementations MAY consider supporting the
dot-notation syntax if they think their users might depend on it.

# Security Considerations

See the "Security Considerations" for each registered media type.

# IANA Considerations

 IANA is asked to update the ["Media Types"
 registry](https://www.iana.org/assignments/media-types) with the registration
 information in {{schema-json}} for the media types `application/schema+json`
 and `application/schema-instance+json`.

--- back

