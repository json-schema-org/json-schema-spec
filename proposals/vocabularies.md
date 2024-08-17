# JSON Schema Proposal: <TODO>

## Abstract

The current approach to extending JSON Schema by providing custom keywords is
very implementation-specific and therefore not interoperable.

To address this deficiency, this document proposes vocabularies as a concept
and a new Core keyword, `$vocabulary`, to support it.

While the Core specification will define and describe vocabularies in general,
the Validation specification will also need to change to incorporate some of
these ideas. This proposal will be updated as necessary to reflect the changes
in both documents.

## Current Status

This proposal was originally integrated into both specifications, starting with
the 2019-09 release. For the upcoming stable release, the feature has been
extracted as it is incomplete. The feature, at best effort, was extracted in
such a way as to retain the functionality present in the 2020-12 release.

Trying to fit the 2020-12 version into the current specification, however,
raises some problems, and further discussion around the design of
this concept is needed.

## Note to Readers

The issues list for this proposal can be found at
<https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aopen+is%3Aissue+label%3Avocabulary>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker or any of the communication methods
listed on the homepage.

## Table of Contents

## Conventions and Terminology

All conventions and terms used and defined by the JSON Schema Core specification
also apply to this document.

## Overview

### Problem Statement

To support extensibility, the specification allows implementations to support
keywords that are not defined in the specifications themselves. However, this
vague and open allowance has drawbacks.

1. Such support is not a requirement; it is a permission. An implementation
   could just as easily (_more_ easily) choose _not_ to support extension
   keywords.
2. There is no prescribed mechanism by which an implementation should provide
   this support. As a result, each implementation that _does_ have the feature
   supports it in different ways.
3. Support for any given user-defined keyword will be limited to the
   implementations which are explicitly configured for that keyword. For a user
   defining their own keyword, this becomes difficult and/or impossible
   depending on the varying support for extension keywords offered by the
   implementations the user is using.

This exposes a need for an implementation-agnostic approach to
externally-defined keywords as well as a way for implementations to declare
support for them.

### Solution

This proposal introduces vocabularies as a new concept to be added to the Core
specification.

A vocabulary is identified by an absolute URI and is used to define a set of
keywords. A vocabulary is generally defined in a human-readable _vocabulary
description document_. (The URI for the vocabulary may be the same as the URL of
where this vocabulary description document can be found, but no recommendation
is made either for or against this practice.)

A new keyword, `$vocabulary`, will be introduced into the Core specification as
well. This keyword's value is an object with vocabulary URIs as keys and
booleans as values. This keyword only has meaning within a meta-schema. A
meta-schema which includes a vocabulary's URI in its `$vocabulary` keyword is
said to "include" that vocabulary.

```jsonc
{
  "$schema": "https://example.org/draft/next/schema",
  "$id": "https://example.org/schema",
  "$vocabulary": {
    "https://example.org/vocab/vocab1": true,
    "https://example.org/vocab/vocab2": true,
    "https://example.org/vocab/vocab3": false
  },
  // ...
}
```

Whereas in the current specification, a dialect is merely the set of keywords
used by a schema, with this proposal a dialect is defined by the set of
vocabularies listed by a meta-schema. It is ephemeral and carries no identifier.

_**NOTE** It is possible for two meta-schemas, which would have different `$id`
values, to share a common dialect if they both declare the same set of
vocabularies._

A schema that declares a meta-schema (via `$schema`) which contains
`$vocabulary` is declaring that only those keywords defined by the included
vocabularies are to be processed when evaluating the schema. All other keywords
are to be considered "unknown" and handled accordingly.

The boolean values in `$vocabulary` signify implementation requirements for each
vocabulary.

- A `true` value indicates that the implementation must recognize the vocabulary
  and be able to process each of the keywords defined in it. If an implementation
  does not recognize the vocabulary or cannot process all of its defined
  keywords, the implementation must refuse to process the schema. These
  vocabularies are also known as "required" vocabularies.
- A `false` value indicates that the implementation is not required to recognize
  the vocabulary or its keywords and may continue processing the schema anyway.
  However, keywords that are not recognized or supported must be considered
  "unknown" and handled accordingly. These vocabularies are also known as
  "optional" vocabularies.

Typically, but not required, a schema will accompany the vocabulary description
document. This _vocabulary schema_ should carry an `$id` value which is distinct
from the vocabulary URI. The purpose of the vocabulary schema is to provide
syntactic validation for the the vocabulary's keywords' values for when the
schema is being validated by a meta-schema that includes the vocabulary. (A
vocabulary schema is not itself a meta-schema since it does not validate entire
schemas.) To facilitate this extra validation, when a vocabulary schema is
provided, any meta-schema which includes the vocabulary should also contain a
reference (via `$ref`) to the vocabulary schema's `$id` value.

```jsonc
{
  "$schema": "https://example.org/draft/next/schema",
  "$id": "https://example.org/schema",
  "$vocabulary": {
    "https://example.org/vocab/vocab1": true,
    "https://example.org/vocab/vocab2": true,
    "https://example.org/vocab/vocab3": false
  },
  "allOf": {
    {"$ref": "meta/vocab1"},  // https://example.org/meta/vocab1
    {"$ref": "meta/vocab2"},  // https://example.org/meta/vocab2
    {"$ref": "meta/vocab3"}   // https://example.org/meta/vocab3
  }
  // ...
}
```

Finally, the keywords in both the Core and Validation specifications will be
divided into multiple vocabularies. The keyword definitions will be removed from
the meta-schema and added to vocabulary schemas to which the meta-schema will
contain references. In this way, the meta-schema's functionality remains the same.

```json
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$id": "https://json-schema.org/draft/next/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/next/vocab/core": true,
    "https://json-schema.org/draft/next/vocab/applicator": true,
    "https://json-schema.org/draft/next/vocab/unevaluated": true,
    "https://json-schema.org/draft/next/vocab/validation": true,
    "https://json-schema.org/draft/next/vocab/meta-data": true,
    "https://json-schema.org/draft/next/vocab/format-annotation": true,
    "https://json-schema.org/draft/next/vocab/content": true
  },
  "$dynamicAnchor": "meta",

  "title": "Core and Validation specifications meta-schema",
  "allOf": [
    {"$ref": "meta/core"},
    {"$ref": "meta/applicator"},
    {"$ref": "meta/unevaluated"},
    {"$ref": "meta/validation"},
    {"$ref": "meta/meta-data"},
    {"$ref": "meta/format-annotation"},
    {"$ref": "meta/content"}
  ],
}
```

The division of keywords among the vocabularies will be in accordance with the
2020-12 specification (for now).

### Limitations

#### Unknown Keywords and Unsupported Vocabularies

This proposal, in its current state, seeks to mimic the behavior defined in the
2020-12 specification. However, the current specification's disallowance of
unknown keywords presents a problem for schemas that use keywords from optional
vocabularies. (This is the topic of the discussion at
https://github.com/orgs/json-schema-org/discussions/342.)

#### Machine Readability

The vocabulary URI is an opaque value. There is no data that an implementation
can reference to identify the keywords defined by the vocabulary. The vocabulary
schema _implies_ this, but scanning a `properties` keyword isn't very reliable.
Moreover, such a system cannot provide metadata about the keywords.

Having some sort of "vocabulary definition" file could alleviate this.

One reason for _not_ having such a file is that, at least for functional
keywords, the user generally needs to provide custom code to the implementation
to process the keywords, thus performing that same explicit configuration
anyway. (Such information cannot be gleaned from a vocabulary specification. For
example, an implementation can't know what to do with a hypothetical `minDate`
keyword.)

Several ideas have been offered for this sort of document:

- https://github.com/json-schema-org/json-schema-spec/issues/1523
- https://github.com/json-schema-org/json-schema-spec/issues/1423
- https://github.com/json-schema-org/json-schema-spec/pull/1257

#### Implicit Inclusion of Core Vocabulary

Because the Core keywords (the ones that start with `$`) instruct an
implementation on how a schema should be processed, its inclusion is mandatory
and assumed. As such, while excluding the Core Vocabulary from the `$vocabulary`
keyword has no effect, it is generally advised as common practice to include the
Core Vocabulary explicitly.

This can be confusing and difficult to use/implement, and we probably need
something better here.

## Change Details

<!--
This is where the specification changes are defined. This must be precise as
these changes will be made verbatim.

For example

1. The following section will be added to the JSON Schema Core specification as
   a subsection of "Keywords for Applying Subschemas Conditionally".
    > ### {New section name}
    >
    > {Feature description}
2. The following subschema will be added to the Applicator Vocabulary schema,
   `https://json-schema.org/<version>/<release>/meta/applicator`, at
   `/properties/{keyword}`:
    ```jsonc
    {
      // keyword schema
    }
    ```
-->

_**NOTE** Since the design of vocabularies will be changing anyway, it's not worth the time and effort to fill in this section just yet.  As such, please read the above sections for loose requirements.  For tighter requirements, please assume conformance with the 2020-12 Core and Validation specifications._

## [Appendix] Change Log

* 2024-06-10 - Created

## [Appendix] Champions

| Champion                   | Company | Email                   | URI                              |
|----------------------------|---------|-------------------------|----------------------------------|
| Greg Dennis                |         | gregsdennis@yahoo.com   | https://github.com/gregsennis    |
