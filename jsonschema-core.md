# JSON Schema: A Media Type for Describing JSON Documents

## Abstract

JSON Schema defines the media type `application/schema+json`, a JSON-based
format for describing the structure of JSON data. At its core, JSON Schema
provides a framework to describe a set of JSON documents. Through additional
behaviors, JSON Schema can be made to perform a multitude of tasks.

The `application/schema-instance+json` media type provides additional
feature-rich integration with `application/schema+json` beyond what can be
offered for `application/json` documents.

## Note to Readers

The issues list for this draft can be found at
<https://github.com/json-schema-org/json-schema-spec/issues>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker, the communication methods listed on
the homepage, or email the document editors.

## Table of Contents

## Introduction

JSON Schema is a JSON media type for defining the structure of JSON data.

This specification defines JSON Schema core terminology and mechanisms,
including pointing to another JSON Schema by reference, dereferencing such a
reference, specifying the dialect being used, and defining terms.

Other specifications define additional behaviors. Examples of such behaviors
include validation, linking, annotation, navigation, interaction, and other
related concepts such as output formats.

## Conventions and Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](#rfc2119).

The terms "JSON", "JSON text", "JSON value", "member", "element", "object",
"array", "number", "string", "boolean", "true", "false", and "null" in this
document are to be interpreted as defined in [RFC 8259](#rfc8259).

## Overview

This document proposes a new media type `application/schema+json` to identify a
JSON Schema for describing JSON data. It also proposes a further optional media
type, `application/schema-instance+json`, to provide additional integration
features. JSON Schemas are themselves JSON documents. This and related
specifications define keywords which allow authors to describe JSON data in
several ways.

JSON Schema uses behaviors, expressed through keywords, to apply constraints to
JSON instances. These behaviors are described by this and other specifications.

This document defines a set of core keywords that MUST be supported by any
implementation, and cannot be disabled. These keywords are each prefixed with a
"$" character to emphasize their required nature. These keywords are essential
to the functioning of the `application/schema+json` media type.

Additionally, this document defines a RECOMMENDED set of keywords for applying
subschemas conditionally, and for applying subschemas to the contents of objects
and arrays. These keywords, or a set very much like them, are required to write
schemas for non-trivial JSON instances. While not part of the required core set,
for maximum interoperability this additional set is included in this document
and its use is strongly encouraged.

Additional specifications MAY define new behaviors, expressing those behaviors
either by defining new keywords or augmenting the behaviors of keywords defined
in other specifications.

<!-- For example, this spec defines `properties` with an applicability behavior,
describing how it applies subschemas to an instance. Separately, the Validation
spec will augment that behavior by adding an assertion behavior. -->

Collectively, the specifications which define a set of keywords and their
behaviors form a dialect.

## Definitions

### JSON Document

A JSON document is an information resource (series of octets) described by the
`application/json` media type.

In JSON Schema, the terms "JSON document", "JSON text", and "JSON value" are
interchangeable because of the data model it defines in {{data-model}}.

JSON Schema is only defined over JSON documents. However, any document or memory
structure that can be parsed into or processed according to the JSON Schema data
model can be interpreted against a JSON Schema, including media types like
[CBOR](#rfc7049).

### Instance

JSON Schema is defined over `application/json` or compatible documents,
including media types with the `+json` structured syntax suffix.

Among these, this specification defines the `application/schema-instance+json`
media type which defines handling for fragments in the IRI.

When JSON Schema is applied to a JSON value, that value is referred to as an
"instance" and is interpreted by the rules defined in {{interpreting-instances}}.

### JSON Schema Document {#schema-document}

A JSON Schema document, or simply a schema, is a JSON document used to describe
an instance. A schema can itself be interpreted as an instance, but SHOULD
always be given the media type `application/schema+json` rather than
`application/schema-instance+json`. The `application/schema+json` media type is
defined to offer a superset of the fragment identifier syntax and semantics
provided by `application/schema-instance+json`.

The structure of JSON Schema is defined in {{schema-structure}}.

### Keyword

A property in a schema object which carries with it defined behaviors is called
a "keyword".

Keywords which exist within the same schema object are called "adjacent
keywords".

More information about keywords can be found in {{keywords}}.

### Subschema

A schema which appears as the value or within the value of a keyword is called a
"subschema". A single keywords could define a one or more subschemas in various
structures as needed to fulfill their purpose.

```jsonschema
{
  "title": "root",
  "items": {
    "title": "array item"
  }
}
```

In this example schema document, the schema titled "array item" is a subschema, and the
schema titled "root" is the root schema.

As with the root schema, a subschema is either an object or a boolean.

### Meta-Schema

A schema that itself describes a schema is called a meta-schema. Meta-schemas
are used to specify the the keywords and behaviors available to those schemas.

### Lexical Scope

The lexical scope is the nested JSON data structure of objects and arrays that
comprise the schema document itself, without following any references. The largest
scope is the full schema document; the smallest scope is a single schema object
with no subschemas.

As evaluation proceeds, the lexical scope changes so that it only contains the
schema object being processed.

### Dynamic Scope

During evaluation, the dynamic scope is the sequence of schema resources through
which evaluation passes.

As evaluation proceeds, the dynamic scope grows to include schema resources it enters and shrinks to remove schema resources it leaves.

## Interpreting Instances {#interpreting-instances}

This section defines rules and behaviors for interpreting instance data.

### Instance Data Model {#data-model}

An instance has one of six primitive types, and a range of possible values
depending on the type:

- *null*: A JSON "null" value
- *boolean*: A "true" or "false" value, from the JSON "true" or "false" values
- *object*: An unordered set of properties mapping a string to an instance, from
  the JSON "object" value
- *array*: An ordered list of instances, from the JSON "array" value
- *number*: An arbitrary-precision, base-10 decimal number value, from the JSON
  "number" value
- *string*: A string of Unicode code points, from the JSON "string" value

Whitespace and formatting concerns, including different lexical representations
of numbers that are equal within the data model, are outside the scope of
JSON Schema. Extensions to JSON Schema that wish to work with such differences
in lexical representations SHOULD define keywords to precisely interpret
formatted strings within the data model rather than relying on having the
original textual representation available.

Objects are defined to have a distinct set of properties. Behavior for data that
tries to define two properties with the same key in a single object is
undefined.

Note that JSON Schema extensions are free to define their own extended type
system. This should not be confused with the core data model types defined here.
As an example, "integer" is a reasonable type to define as a value for a
keyword, but the data model makes no distinction between integers and other
numbers.

### Instance Equality

Two JSON instances are said to be equal if and only if they are of the same type
and have the same value according to the data model. Specifically, this means:

- both are null; or
- both are true; or
- both are false; or
- both are strings, and are the same codepoint-for-codepoint; or
- both are numbers, and have the same mathematical value; or
- both are arrays, and have an equal value item-for-item; or
- both are objects, and each property in one has exactly one property with a key
  equal to the other's, and that other property has an equal value.

Implied in this definition is that arrays must be the same length, objects must
have the same number of members, properties in objects are unordered, there is
no way to define multiple properties with the same key, and mere formatting
differences (indentation, placement of commas, trailing zeros) are
insignificant.

### Non-JSON Instances

It is possible to use JSON Schema with a superset of the JSON Schema data model,
where an instance may be outside any of the six JSON data types.

An extension MAY define support for a superset of the core data model.

### Fragment Identifiers for Instances {#instance-fragments}

In accordance with section 3.1 of [RFC 6839](#rfc6839), the syntax and semantics
of fragment identifiers specified for any +json media type SHOULD be as
specified for `application/json`. However (as of the publication of this
document), there is no fragment identification syntax defined for
`application/json`.

The `application/schema-instance+json` media type supports one fragment
identifier structure: JSON Pointers.

## Schema Structure {#schema-structure}

A JSON Schema MUST either be an object or a boolean.

### JSON Schema Objects and Keywords

Object properties which apply behaviors to the instance are called keywords, or
schema keywords. Keywords can apply multiple behaviors as defined by this and
other documents. Keywords and their behaviors behaviors are described in more detail in
{{keywords}}.

A JSON Schema MUST NOT contain properties which are not schema keywords or are
not recognized as schema keywords. The behavior of such keywords is governed by
{{unrecognized}}.

An empty schema is a JSON Schema object with no keywords.

### Boolean JSON Schemas

The boolean schema values `true` and `false` are trivial schemas and exist to
clarify schema author intent and facilitate schema processing optimizations.
They behave identically to the following schema objects (where `not` is defined
in the [Applicators Vocabulary](./json-schema-vocab-applicators.md)).

| Boolean Schema | Equivalent Object Schema |
|:--------------:|:------------------------:|
| `true`         | `{}`                     |
| `false`        | `{ "not": {} }`          |

While the empty schema object is unambiguous, there could be many possible
equivalents to the `false` schema. Using the boolean values ensures that the
intent is clear to both human readers and implementations.

### Root Schema and Subschemas and Resources {#root}

A JSON Schema resource is a schema which is [canonically](#rfc6596) identified
by an [absolute IRI](#rfc3987). Schema resources MAY also be identified by IRIs
with fragments if the resulting secondary resource (as defined by
[section 3.5 of RFC 3986](#rfc3986)) is identical to the primary resource. This
can occur with the empty fragment, or when one schema resource is embedded in
another. Any such IRIs with fragments are considered to be non-canonical.

<!--
The second sentence here explicitly states that a retrieval URI might resolve to
the same resource as $id-declared URIs. This allows hosting a schema at a
different URL than the URI declared in its $id.

Interestingly, it also implicitly allows referring to schemas across resource
boundaries because https://example.com/root#/$defs/foo could contain an $id of
https://example.com/foo, which means there are two URIs that resolve the same
resource.

I wonder if it can be reworded to disallow the cross-resource references.
-->

The root schema is the schema that comprises the entire JSON document in
question. The root schema is always a schema resource, where the IRI is
determined as described in {{initial-base}}.[^1]

[^1]: Note that documents that embed schemas in another format will not have a
root schema resource in this sense. Exactly how such usages fit with the JSON
Schema document and resource concepts will be clarified in a future draft.

As discussed in {{id-keyword}}, a JSON Schema document can contain multiple JSON
Schema resources. When used without qualification, the term "root schema" refers
to the document's root schema. In some cases, resource root schemas are
discussed. A resource's root schema is its top-level schema object, which would
also be a document root schema if the resource were to be extracted to a
standalone JSON Schema document.

Whether multiple schema resources are embedded or linked with a reference, they
are processed in the same way, with the same available behaviors.

Canonical schema IRIs MUST NOT change during evaluation.

### Fragment Identifiers for Schemas {#schema-fragments}

In accordance with section 3.1 of [RFC 6839](#rfc6839), the syntax and semantics
of fragment identifiers specified for any +json media type SHOULD be as
specified for `application/json`. However (as of the publication of this
document), there is no fragment identification syntax defined for
`application/json`.

<!-- The above is redundant from {{instance-fragments}} -->

Additionally, the `application/schema+json` media type supports two fragment
identifier structures: plain names and JSON Pointers.

The use of JSON Pointers as IRI fragment identifiers is described in [RFC
6901](#rfc6901). For `application/schema+json`, which supports two fragment
identifier syntaxes, fragment identifiers matching the JSON Pointer syntax,
including the empty string, MUST be interpreted as JSON Pointer fragment
identifiers.

Per the W3C's [best practices for fragment
identifiers](#w3cwd-fragid-best-practices-20121025), plain name fragment
identifiers in `application/schema+json` are reserved for referencing locally
named schemas.

Plain name fragments MUST follow XML's [`NCName` production](#xml-names), which
allows for compatibility with the recommended plain name
[syntax](#w3crec-xptr-framework-20030325) for XML-based media types.  For
convenience, the `NCName` syntax is reproduced here in ABNF form, using
a minimal set of rules:

```abnf
NCName          = NCNameStartChar *NCNameChar
NCNameStartChar = "_" / ALPHA
                      / %xC0-D6 / %xD8-F6 / %xF8-2FF
                      / %x370-37D / %x37F-1FFF
                      / %x200C-200D / %x2070-218F
                      / %x2C00-2FEF / %x3001-D7FF
                      / %xF900-FDCF / %xFDF0-FFFD
                      / %x10000-EFFFF
NCNameChar      = NCNameStartChar / "-" / "." / DIGIT
                      / %xB7 / %x0300-036F / %x203F-2040
```

All fragment identifiers that do not match the JSON Pointer syntax MUST be
interpreted as plain name fragment identifiers.

Defining and referencing a plain name fragment identifier within an
`application/schema+json` document are specified in the [`$anchor`
keyword](#anchors) section.

## Schema Keywords {#keywords}

### Keyword Behaviors {#behaviors}

JSON Schema keywords can exhibit different behaviors in different contexts.
Additional documents MAY:

- define other behaviors as needed for their specific purpose;
- define new keywords;
- augment behaviors onto keywords which already have behaviors defined
  elsewhere.

This document defines the applicability of keywords which governs how a keyword
applies itself and its contents to an instance and its descendants. This
behavior is described in greater detail in {{applicability}}.

### Keyword Independence {#independence}

In general, keywords operate independently of adjacent keywords and their
subschemas.

When necessary, a keyword's behavior MAY be defined by the presence, contents,
or evaluation outcome of a sibling keyword. Such dependencies

- MUST be explicitly stated as part of the keyword definition;
- MUST NOT result in a circular dependency.

Keywords MAY modify their own behavior based on the presence, contents, or
evaluation outcome of another keyword, but they MUST NOT modify the behavior of
another keyword.

<!--
For example, "if" shouldn't be described as instructing "then" or "else" to
evaluate; instead, "then" and "else" are described as depending upon the
evaluation outcome of "if" to decide for themselves whether they should
evaluate.

Implementations can perform this however they like, but it should be specified
this way.
-->

<!-- Should probably also define that keywords can only have dependencies
defined within the lexical scope + references. (Do we need a "dereferenced
lexical scope"?) -->

### Default Behaviors {#default-behaviors}

A missing keyword MUST NOT apply any behaviors defined for it.

In some cases, the behavior of a keyword when it is absent is identical to that
produced by that keyword's presence with a certain value, and keyword
definitions SHOULD note such values where known.

### Extending JSON Schema {#extending}

Any entity MAY extend JSON Schema by defining new behaviors and keywords as
described by {{behaviors}}.

Implementations MAY provide the ability to register or load handlers for
keywords that they do not support directly. The exact mechanism for registering
and implementing such handlers is implementation-dependent.

### Handling of unrecognized or unsupported keywords {#unrecognized}

Implementations MUST refuse to process schemas which contain keywords they:

- do not recognize;
- recognize but do not support.

Likewise, implementations MUST refuse to process schemas which require
unsupported behaviors of recognized keywords.

## General Considerations

### Range of JSON Values

An instance may be any valid JSON value as defined by [JSON](#rfc8259). JSON
Schema imposes no restrictions on type: JSON Schema can describe any JSON value,
including, for example, null.

### Programming Language Independence {#language}

JSON Schema is programming language agnostic, and supports the full range of
values described in the data model. Be aware, however, that some languages and
JSON parsers may not be able to represent in memory the full range of values
describable by JSON.

### Regular Expressions {#regex}

Keywords MAY use regular expressions to express constraints, or constrain the
instance value to be a regular expression. These regular expressions SHOULD be
valid according to the regular expression dialect described in [ECMA-262,
section 21.2.1](#ecma262).

Unless otherwise specified by a keyword, regular expressions MUST NOT be
considered to be implicitly anchored at either end. All regular expression
keywords in this specification and its companion documents are un-anchored.

Regular expressions SHOULD be built with the "u" flag (or equivalent) to provide
Unicode support, or processed in such a way which provides Unicode support as
defined by ECMA-262.

Furthermore, given the high disparity in regular expression constructs support,
schema authors SHOULD limit themselves to the following regular expression
tokens:

- individual Unicode characters, as defined by the [JSON
  specification](#rfc8259);
- simple character classes ([abc]), range character classes ([a-z]);
- complemented character classes ([^abc], [^a-z]);
- simple quantifiers: "+" (one or more), "*" (zero or more), "?" (zero or one),
  and their lazy versions ("+?", "*?", "??");
- range quantifiers: "{x}" (exactly x occurrences), "{x,y}" (at least x, at most
  y, occurrences), {x,} (x occurrences or more), and their lazy versions;
- the beginning-of-input ("^") and end-of-input ("$") anchors;
- simple grouping ("(...)") and alternation ("|").

Finally, implementations MUST NOT take regular expressions to be anchored,
neither at the beginning nor at the end. This means, for instance, the pattern
"es" matches "expression".

## Evaluation

Evaluating an instance against a schema involves processing all of the keywords
and applying all of their behaviors against the appropriate locations within the
instance. Evaluation recurses into subschemas of applicator keywords until a
schema with no applicators is found.

Evaluation of a parent schema object can complete once all of its subschemas
have been evaluated; although, as allowed by the aggregate behaviors, evaluation
MAY be short-circuited if the final outcome can be determined before processing
completes.

### Keyword Evaluation Order

As per {{independence}}, unless otherwise specified, keywords can generally be evaluated in any order.  However there are a few exceptions from the core set of keywords defined by this document.

- `$schema` MUST be evaluated first as this keyword governs how the rest of the schema in interpreted.
- `$id` MUST be evaluated second as this keyword defines the URI for a schema resource, on which other processing relies.

### Lexical Scope and Dynamic Scope {#scopes}

<!-- TODO: come back to this.  There is a possibility that we could remove scopes altogether. -->

Keywords MAY be defined with a partial value, such as a IRI-reference, which
must be resolved against another value, such as another IRI-reference or a full
IRI, which is found through the lexical structure of the JSON document. The
`$id`, `$ref`, and `$dynamicRef` core keywords, and the `base` JSON Hyper-Schema
keyword, are examples of this sort of behavior.

Note that some keywords, such as `$schema`, apply to the lexical scope of the
entire schema resource, and therefore MUST only appear in a schema resource's
root schema.

<!-- Open question here about $schema pertaining to the entire document.
https://github.com/json-schema-org/json-schema-spec/issues/1442#issuecomment-1765544165 -->

Other keywords may take into account the dynamic scope that exists during the
evaluation of a schema, typically together with an instance document. The
outermost dynamic scope is the schema object at which processing begins, even if
it is not a schema resource root. The path from this root schema to any
particular keyword (that includes any `$ref` and `$dynamicRef` keywords that may
have been resolved) is considered the keyword's "evaluation path."

Lexical and dynamic scopes align until a reference keyword is encountered. While
following the reference keyword moves processing from one lexical scope into a
different one, from the perspective of dynamic scope, following a reference is
no different from descending into a subschema present as a value. A keyword on
the far side of that reference that resolves information through the dynamic
scope will consider the originating side of the reference to be their dynamic
parent, rather than examining the local lexically enclosing parent.

The concept of dynamic scope is primarily used with `$dynamicRef` and
`$dynamicAnchor`, and should be considered an advanced feature and used with
caution when defining additional keywords. It also appears when reporting errors
and collected annotations, as it may be possible to revisit the same lexical
scope repeatedly with different dynamic scopes. In such cases, it is important
to inform the user of the evaluation path that produced the error or annotation.

## Applicability Behavior {#applicability}

The applicability behavior defines how keywords which contain subschemas apply
those subschemas during evaluation. Keywords which exhibit the applicability
behavior are known as "applicators".

Applicators allow for building more complex schemas than can be accomplished
with a single schema object. Evaluation of an instance against a [schema
document](#schema-document) begins by applying the [root schema](#root) to the
complete instance document. From there, keywords known as applicators are used
to determine which additional schemas are applied. Such schemas may be applied
in-place to the current location, or to a child location.

The schemas to be applied may be present as subschemas comprising all or part of
the keyword's value. Alternatively, an applicator may refer to a schema
elsewhere in the same schema document, or in a different one. The mechanism for
identifying such referenced schemas is defined by the keyword.

Applicator keywords also define how subschema or referenced schema boolean
[assertion](#assertions) results are modified and/or combined to produce the
boolean result of the applicator. Applicators may apply any boolean logic
operation to the assertion results of subschemas, but MUST NOT introduce new
assertion conditions of their own.

[Annotation](#annotations) results from subschemas are preserved in accordance
with {{collect}} so that applications can decide how to interpret multiple
values. Applicator keywords do not play a direct role in this preservation.

#### Referenced and Referencing Schemas {#referenced}

As noted in {{applicability}}, an applicator keyword may refer to a schema to be
applied, rather than including it as a subschema in the applicator's value. In
such situations, the schema being applied is known as the referenced schema,
while the schema containing the applicator keyword is the referencing schema.

While root schemas and subschemas are static concepts based on a schema's
position within a schema document, referenced and referencing schemas are
dynamic. Different pairs of schemas may find themselves in various referenced
and referencing arrangements during the evaluation of an instance against a
schema.

For some by-reference applicators, such as [`$ref`](#ref), the referenced schema
can be determined by static analysis of the schema document's lexical scope.
Others, such as `$dynamicRef` (with `$dynamicAnchor`), may make use of dynamic
scoping, and therefore only be resolvable in the process of evaluating the
schema with an instance.

### Reserved Locations

A fourth category of keywords simply reserve a location to hold re-usable
components or data of interest to schema authors that is not suitable for
re-use. These keywords do not affect validation or annotation results. Their
purpose is to ensure that locations are available for certain purposes and will
not be redefined by extension keywords.

While these keywords do not directly affect results, as explained in
{{non-schemas}} unrecognized extension keywords that reserve locations for
re-usable schemas may have undesirable interactions with references in certain
circumstances.

### Loading Instance Data

While none of the keywords defined as part of this or the associated
documents define a keyword which target and/or load instance data, it is
possible that extensions may wish to do so.

Keywords MAY be defined to use JSON Pointers or Relative JSON Pointers to
examine parts of an instance outside the current evaluation location.

Keywords that allow adjusting the location using a Relative JSON Pointer SHOULD
default to using the current location if a default is desireable.

## The JSON Schema Core Keywords {#core}

Keywords declared in this section, which all begin with "$", are essential to
processing JSON Schema. These keywords inform implementations how to process any
schema or meta-schema, including those split across multiple documents, or exist
to reserve keywords for purposes that require guaranteed interoperability.

Support for these keywords MUST be considered mandatory at all times in order to
bootstrap the processing of further keywords.

The "$" prefix is reserved for use by this specification. Extensions MUST NOT
define new keywords that begin with "$".

### Meta-Schemas

Meta-schemas are used to inform an implementation how to interpret a schema.
Every schema has a meta-schema, which can be explicitly declared using the
`$schema` keyword.

The meta-schema serves to describe valid schema syntax. A schema MUST
successfully validate against its meta-schema, which constrains the syntax of
the available keywords. The syntax described for a given keyword is expected to
be compatible with the document which defines the keyword; while it is possible
to describe an incompatible syntax, such a meta-schema would be unlikely to be
useful.

Meta-schema authoring is an advanced usage of JSON Schema, so the design of
meta-schema features emphasizes flexibility over simplicity.

#### Dialect Determination

When evaluation encounters a new schema resource (i.e. the lexical scope
changes), the first task is to determine the dialect used by the schema.
Implementations MUST determine the dialect using the following prioritized
steps.

1. The `$schema` keyword - Implementations MUST process the schema according to
   the dialect it declares.
2. `application/schema+json` media type with a `schema` parameter -
   Implementations which support media type parameter inputs MUST process the
   schema according to the dialect the parameter declares. A media type will
   generally only be available if the schema has been retrieved from an external
   source and only applies to the document root.
3. Parent dialect - An embedded schema resource which does not itself contain a
   `$schema` keyword MUST be processed using the same dialect as the schema
   which contains it. If the schema is embedded in a non-schema document, the
   semantics for determining the dialect MAY be determined by any specification
   which applies to that document.
4. User configuration - Implementations MAY provide means for the user to
   configure the dialect under which a schema should be processed.

(Note that steps 2 and 3 are mutually exclusive.)

If the dialect is not specified through one of these methods, the implementation
MUST refuse to process the schema.

#### The `$schema` Keyword {#keyword-schema}

The `$schema` keyword is both used as a JSON Schema dialect identifier and as
the identifier of a resource which is itself a JSON Schema, which describes the
set of valid schemas written for this particular dialect. The identified dialect
applies to the resource in which it is declared as well as any embedded schema
resources, unless such a resource itself declares a different dialect by
including the `$schema` keyword with a different value.

The value of this keyword MUST be an [IRI](#rfc3987) (containing a scheme) and
this IRI MUST be normalized.

If this IRI identifies a retrievable resource, that resource SHOULD be of media
type `application/schema+json`.

The `$schema` keyword SHOULD be used in the document root schema object, and MAY
be used in the root schema objects of embedded schema resources. When the
keyword appears in a non-resource root schema object, the behavior is undefined.

Values for this property are defined elsewhere in this and other documents, and
by other parties.

### Base IRI, Anchors, and Dereferencing

To differentiate between schemas in a vast ecosystem, schemas are identified by
[IRI](#rfc3987), and can embed references to other schemas by specifying their
IRI.

Several keywords can accept a relative [IRI-reference](#rfc3987), or a value
used to construct a relative IRI-reference. For these keywords, it is necessary
to establish a base IRI in order to resolve the reference.

#### The `$id` Keyword {#id-keyword}

The `$id` keyword identifies a schema resource with its [canonical](#rfc6596)
IRI.

Note that this IRI is an identifier and not necessarily a network locator. In
the case of a network-addressable URL, a schema need not be downloadable from
its canonical IRI.

If present, the value for this keyword MUST be a string, and MUST represent a
valid [IRI-reference](#rfc3987). This IRI-reference SHOULD be normalized, and
MUST resolve to an [absolute-IRI](#rfc3987) (without a fragment).

The resulting absolute-IRI serves as the base IRI for relative IRI-references in
keywords within the schema resource, in accordance with [RFC 3987 section
6.5](#rfc3987) and [RFC 3986 section 5.1.1](#rfc3986) regarding base IRIs
embedded in content.

The presence of `$id` in a subschema indicates that the subschema constitutes a
distinct schema resource within a single schema document. Furthermore, in
accordance with [RFC 3987 section 6.5](#rfc3987) and [RFC 3986 section
5.1.2](#rfc3986) regarding encapsulating entities, if an `$id` in a subschema is
a relative IRI-reference, the base IRI for resolving that reference is the IRI
of the parent schema resource. Note that an `$id` consisting of an empty IRI or
of the empty fragment only will result in the embedded resource having the same
IRI as the encapsulating resource, which SHOULD be considered an error per
{{duplicate-iris}}.

If no parent schema object explicitly identifies itself as a resource with
`$id`, the base IRI is that of the entire document, as established by the steps
given in the [previous section.](initial-base)

##### Identifying the root schema

The root schema of a JSON Schema document SHOULD contain an `$id` keyword with
an [absolute-IRI](#rfc3987) (containing a scheme, but no fragment).

#### Defining location-independent identifiers {#anchors}

Using JSON Pointer fragments requires knowledge of the structure of the schema.
When writing schema documents with the intention to provide re-usable schemas,
it may be preferable to use a plain name fragment that is not tied to any
particular structural location. This allows a subschema to be relocated without
requiring JSON Pointer references to be updated.

The `$anchor` and `$dynamicAnchor` keywords are used to specify such fragments.
They are identifier keywords that can only be used to create plain name
fragments, rather than absolute IRIs as seen with `$id`.

The base IRI to which the resulting fragment is appended is the canonical IRI of
the schema resource containing the `$anchor` or `$dynamicAnchor` in question.
As discussed in the previous section, this is either the nearest `$id` in the
same or parent schema object, or the base IRI for the document as determined
according to [RFC 3987](#rfc3987) and [RFC 3986](#rfc3986).

Separately from the usual usage of IRIs, `$dynamicAnchor` indicates that the
fragment is an extension point when used with the `$dynamicRef` keyword. This
low-level, advanced feature makes it easier to extend recursive schemas such as
the meta-schemas, without imposing any particular semantics on that extension.
See the section on [`$dynamicRef`](#dynamic-ref) for details.

In most cases, the normal fragment behavior both suffices and is more intuitive.
Therefore it is RECOMMENDED that `$anchor` be used to create plain name
fragments unless there is a clear need for `$dynamicAnchor`.

If present, the value of these keywords MUST be a string and MUST conform to the
plain name fragment identifier syntax defined in {{schema-fragments}}.[^4]

[^4]: Note that the anchor string does not include the "#" character, as it is
not a IRI-reference. An `$anchor`: "foo" becomes the fragment `#foo` when used
in a IRI. See below for full examples.

#### Duplicate schema identifiers {#duplicate-iris}

A schema MAY (and likely will) have multiple IRIs, but there is no way for an
IRI to identify more than one schema. When multiple schemas attempt to identify
as the same IRI through the use of `$id`, `$anchor`, `$dynamicAnchor`, or any
other mechanism, implementations SHOULD raise an error condition. Otherwise the
result is undefined, and even if documented will not be interoperable.

#### Schema References {#references}

Several keywords can be used to reference a schema which is to be applied to the
current instance location. `$ref` and `$dynamicRef` are applicator keywords,
applying the referenced schema to the instance.

As the values of `$ref` and `$dynamicRef` are IRI References, this allows the
possibility to externalise or divide a schema across multiple files, and
provides the ability to validate recursive structures through self-reference.

The resolved IRI produced by these keywords is not necessarily a network
locator, only an identifier. A schema need not be downloadable from the address
if it is a network-addressable URL. Implementations which can access the network
SHOULD default to operating offline.

##### Direct References with `$ref` {#ref}

The `$ref` keyword is an applicator that is used to reference a statically
identified schema. Its results are the results of the referenced schema.[^5]

[^5]: Note that this definition of how the results are determined means that
other keywords can appear alongside of `$ref` in the same schema object.

The value of the `$ref` keyword MUST be a string which is a IRI-Reference.
Resolved against the current IRI base, it produces the IRI of the schema to
apply. This resolution is safe to perform on schema load, as the process of
evaluating an instance cannot change how the reference resolves.

##### Dynamic References with `$dynamicRef` {#dynamic-ref}

The `$dynamicRef` keyword is an applicator that allows for deferring the full
resolution until runtime, at which point it is resolved each time it is
encountered while evaluating an instance.

Together with `$dynamicAnchor`, `$dynamicRef` implements a cooperative extension
mechanism that is primarily useful with recursive schemas (schemas that
reference themselves). The extension point is defined with `$dynamicAnchor` and
only exhibits runtime dynamic behavior when referenced with `$dynamicRef`.

The value of the `$dynamicRef` property MUST be a string which is a
IRI-Reference that contains a valid [plain name fragment](#anchors). Resolved
against the current IRI base, it indicates the schema resource used as the
starting point for runtime resolution. This initial resolution is safe to
perform on schema load.

The schema to apply is the outermost schema resource in the [dynamic
scope](#scopes) that defines a `$dynamicAnchor` that matches the plain name
fragment in the initially resolved IRI.

For a full example using these keyword, see {{recursive-example}}.[^6]

[^6]: The difference between the hyper-schema meta-schema in pre-2019 drafts and
an this draft dramatically demonstrates the utility of these keywords.

#### Schema Re-Use With `$defs` {#defs}

The `$defs` keyword reserves a location for schema authors to inline re-usable
JSON Schemas into a more general schema. The keyword does not directly affect
the validation result.

This keyword's value MUST be an object. Each member value of this object MUST be
a valid JSON Schema.

As an example, here is a schema describing an array of positive integers, where
the positive integer constraint is a subschema in `$defs`:

```jsonschema
{
  "type": "array",
  "items": { "$ref": "#/$defs/positiveInteger" },
  "$defs": {
    "positiveInteger": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  }
}
```

### Comments With `$comment`

This keyword reserves a location for comments from schema authors to readers or
maintainers of the schema.

The value of this keyword MUST be a string. Implementations MUST NOT present
this string to end users. Tools for editing schemas SHOULD support displaying
and editing this keyword. The value of this keyword MAY be used in debug or
error output which is intended for developers making use of schemas.

Tools that translate other media types or programming languages to and from
`application/schema+json` MAY choose to convert that media type or programming
language's native comments to or from `$comment` values. The behavior of such
translation when both native comments and `$comment` properties are present is
implementation-dependent.

Implementations MAY strip `$comment` values at any point during processing. In
particular, this allows for shortening schemas when the size of deployed schemas
is a concern.

Implementations MUST NOT take any other action based on the presence, absence,
or contents of `$comment` properties. In particular, the value of `$comment`
MUST NOT be collected as an annotation result.

## Loading and Processing Schemas

### Loading a Schema

#### Initial Base IRI {#initial-base}

[RFC 3987 Section 6.5](#rfc3987) and [RFC 3986 Section 5.1](#rfc3986) defines
how to determine the default base IRI of a document.

Informatively, the initial base IRI of a schema is the IRI at which it was
found, whether that was a network location, a local filesystem, or any other
situation identifiable by a IRI of any known scheme.

If a schema document defines no explicit base IRI with `$id` (embedded in
content), the base IRI is that determined per [RFC 3987 Section 6.5](#rfc3987)
and [RFC 3986 section 5](#rfc3986).

If no source is known, or no IRI scheme is known for the source, a suitable
implementation-specific default IRI MAY be used as described in [RFC 3987
Section 6.5](#rfc3987) and [RFC 3986 Section 5.1.4](#rfc3986). It is RECOMMENDED
that implementations document any default base IRI that they assume.

If a schema object is embedded in a document of another media type, then the
initial base IRI is determined according to the rules of that media type.

Unless the `$id` keyword described in an earlier section is present in the root
schema, this base IRI SHOULD be considered the canonical IRI of the schema
document's root schema resource.

#### Loading a referenced schema

The use of IRIs to identify remote schemas does not necessarily mean anything is
downloaded, but instead JSON Schema implementations SHOULD understand ahead of
time which schemas they will be using, and the IRIs that identify them.

Implementations SHOULD be able to associate arbitrary IRIs with an arbitrary
schema and/or automatically associate a schema's `$id`-given IRI, depending on
the trust that the validator has in the schema. Such IRIs and schemas can be
supplied to an implementation prior to processing instances, or may be noted
within a schema document as it is processed, producing associations as shown in
{{idexamples}}.

Implementations MAY provide functionality to automatically fetch schemas based
on location semantics expressed by the IRI, however such functionality SHOULD be
disabled by default to prefer offline operation. When schemas are downloaded,
for example by a generic user-agent that does not know until runtime which
schemas to download, see {{hypermedia}}.

#### Detecting a Meta-Schema

Implementations MUST recognize a schema as a meta-schema if it is being examined
because it was identified as such by another schema's `$schema` keyword. This
means that a single schema document might sometimes be considered a regular
schema, and other times be considered a meta-schema.

In the case of examining a schema which is its own meta-schema, when an
implementation begins processing it as a regular schema, it is processed under
those rules. However, when loaded a second time as a result of checking its own
`$schema` value, it is treated as a meta-schema. So the same document is
processed both ways in the course of one session.

Implementations MAY allow a schema to be explicitly passed as a meta-schema, for
implementation-specific purposes, such as pre-loading a commonly used
meta-schema and checking its requirements up front. Meta-schema authors MUST NOT
expect such features to be interoperable across implementations.

### Dereferencing

Schemas can be identified by any IRI that has been given to them, including a
JSON Pointer or their IRI given directly by `$id`. In all cases, dereferencing a
`$ref` reference involves first resolving its value as a IRI reference against
the current base IRI per [RFC 3986](#rfc3986).

If the resulting IRI identifies a schema within the current document, or within
another schema document that has been made available to the implementation, then
that schema SHOULD be used automatically.

For example, consider this schema:

```jsonschema
{
  "$id": "https://example.net/root.json",
  "type": "array",
  "items": { "$ref": "#item" },
  "$defs": {
    "single": {
      "$anchor": "item",
      "type": "object",
      "additionalProperties": { "$ref": "other.json" }
    }
  }
}
```

When an implementation encounters the `#/$defs/single` schema, it resolves the
`$anchor` value as a fragment name against the current base IRI to form
`https://example.net/root.json#item`.

When an implementation then looks inside the `#/items` schema, it encounters the
`#item` reference, and resolves this to `https://example.net/root.json#item`,
which it has seen defined in this same document and can therefore use
automatically.

When an implementation encounters the reference to "other.json", it resolves
this to `https://example.net/other.json`, which is not defined in this document.
If a schema with that identifier has otherwise been supplied to the
implementation, it can also be used automatically.[^7]

[^7]: What should implementations do when the referenced schema is not known?
Are there circumstances in which automatic network dereferencing is allowed? A
same origin policy? A user-configurable option? In the case of an evolving API
described by Hyper-Schema, it is expected that new schemas will be added to the
system dynamically, so placing an absolute requirement of pre-loading schema
documents is not feasible.

#### JSON Pointer fragments and embedded schema resources {#embedded}

Since JSON Pointer IRI fragments are constructed based on the structure of the
schema document, an embedded schema resource and its subschemas can be
identified by JSON Pointer fragments relative to either its own canonical IRI,
or relative to any containing resource's IRI.

Conceptually, a set of linked schema resources should behave identically whether
each resource is a separate document connected with [schema
references](#referenced), or is structured as a single document with one or more
schema resources embedded as subschemas.

Since IRIs involving JSON Pointer fragments relative to the parent schema
resource's IRI cease to be valid when the embedded schema is moved to a separate
document and referenced, applications and schemas SHOULD NOT use such IRIs to
identify embedded schema resources or locations within them.

Consider the following schema document that contains another schema resource
embedded within it:

```jsonschema
{
  "$id": "https://example.com/foo",
  "items": {
    "$id": "https://example.com/bar",
    "additionalProperties": { }
  }
}
```

The IRI `https://example.com/foo#/items` points to the `items` schema, which is
an embedded resource. The canonical IRI of that schema resource, however, is
`https://example.com/bar`.

For the `additionalProperties` schema within that embedded resource, the IRI
`https://example.com/foo#/items/additionalProperties` points to the correct
object, but that object's IRI relative to its resource's canonical IRI is
`https://example.com/bar#/additionalProperties`.

Now consider the following two schema resources linked by reference using a IRI
value for `$ref`:

```jsonschema
{
  "$id": "https://example.com/foo",
  "items": {
    "$ref": "bar"
  }
}
```

```jsonschema
{
  "$id": "https://example.com/bar",
  "additionalProperties": {}
}
```

Here we see that `https://example.com/bar#/additionalProperties`, using a JSON
Pointer fragment appended to the canonical IRI of the "bar" schema resource, is
still valid, while `https://example.com/foo#/items/additionalProperties`, which
relied on a JSON Pointer fragment appended to the canonical IRI of the "foo"
schema resource, no longer resolves to anything.

Note also that `https://example.com/foo#/items` is valid in both arrangements,
but resolves to a different value. This IRI ends up functioning similarly to a
retrieval IRI for a resource. While this IRI is valid, it is more robust to use
the `$id` of the embedded or referenced resource unless it is specifically
desired to identify the object containing the `$ref` in the second
(non-embedded) arrangement.

An implementation MAY choose not to support addressing schema resource contents
by IRIs using a base other than the resource's canonical IRI, plus a JSON
Pointer fragment relative to that base. Therefore, schema authors SHOULD NOT
rely on such IRIs, as using them may reduce interoperability.[^8]

[^8]: This is to avoid requiring implementations to keep track of a whole stack
of possible base IRIs and JSON Pointer fragments for each, given that all but
one will be fragile if the schema resources are reorganized. Some have argued
that this is easy so there is no point in forbidding it, while others have
argued that it complicates schema identification and should be forbidden.
Feedback on this topic is encouraged. After some discussion, we feel that we
need to remove the use of "canonical" in favour of talking about JSON Pointers
which reference across schema resource boundaries as undefined or even forbidden
behavior (<https://github.com/json-schema-org/json-schema-spec/issues/937>,
<https://github.com/json-schema-org/json-schema-spec/issues/1183>)

Further examples of such non-canonical IRI construction, as well as the
appropriate canonical IRI-based fragments to use instead, are provided in
{{idexamples}}.

### Compound Documents

A Compound Schema Document is defined as a JSON document (sometimes called a
"bundled" schema) which has multiple embedded JSON Schema Resources bundled into
the same document to ease transportation.

Each embedded Schema Resource MUST be treated as an individual Schema Resource,
following standard schema loading and processing requirements, including
determining keyword support.

#### Bundling

The bundling process for creating a Compound Schema Document is defined as
taking references (such as `$ref`) to an external Schema Resource and embedding
the referenced Schema Resources within the referring document. Bundling SHOULD
be done in such a way that all IRIs (used for referencing) in the base document
and any referenced/embedded documents do not require altering.

Each embedded JSON Schema Resource MUST identify itself with a IRI using the
`$id` keyword, and SHOULD make use of the `$schema` keyword to identify the
dialect it is using, in the root of the schema resource. It is RECOMMENDED that
the IRI identifier value of `$id` be an Absolute IRI.

When the Schema Resource referenced by a by-reference applicator is bundled, it
is RECOMMENDED that the Schema Resource be located as a value of a `$defs`
object at the containing schema's root. The key of the `$defs` for the now
embedded Schema Resource MAY be the `$id` of the bundled schema or some other
form of application defined unique identifer (such as a UUID). This key is not
intended to be referenced in JSON Schema, but may be used by an application to
aid the bundling process.

A Schema Resource MAY be embedded in a location other than `$defs` where the
location is defined as a schema value.

A Bundled Schema Resource MUST NOT be bundled by replacing the schema object
from which it was referenced, or by wrapping the Schema Resource in other
applicator keywords.

In order to produce identical output, references in the containing schema
document to the previously external Schema Resources MUST NOT be changed, and
now resolve to a schema using the `$id` of an embedded Schema Resource. Such
identical output includes validation evaluation and IRIs or paths used in
resulting annotations or errors.

While the bundling process will often be the main method for creating a Compound
Schema Document, it is also possible and expected that some will be created by
hand, potentially without individual Schema Resources existing on their own
previously.

#### Differing and Default Dialects

When multiple schema resources are present in a single document, schema
resources which do not define with which dialect they should be processed MUST
be processed with the same dialect as the enclosing resource.

Since any schema that can be referenced can also be embedded, embedded schema
resources MAY specify different processing dialects using the `$schema` values
from their enclosing resource.

#### Validating

Given that a Compound Schema Document may have embedded resources which identify
as using different dialects, these documents SHOULD NOT be validated by applying
a meta-schema to the Compound Schema Document as an instance. It is RECOMMENDED
that an alternate validation process be provided in order to validate Schema
Documents. Each Schema Resource SHOULD be separately validated against its
associated meta-schema.[^9]

[^9]: If you know a schema is what's being validated, you can identify if the
schemas is a Compound Schema Document or not, by way of use of `$id`, which
identifies an embedded resource when used not at the document's root.

A Compound Schema Document in which all embedded resources identify as using the
same dialect, or in which `$schema` is omitted and therefore defaults to that of
the enclosing resource, MAY be validated by applying the appropriate
meta-schema.

### Caveats

#### Guarding Against Infinite Recursion

A schema MUST NOT be run into an infinite loop against an instance. For example,
if two schemas `#alice` and `#bob` both have an `allOf` property that refers to
the other, a naive validator might get stuck in an infinite recursive loop
trying to validate the instance. Schemas SHOULD NOT make use of infinite
recursive nesting like this; the behavior is undefined.

#### References to Possible Non-Schemas {#non-schemas}

Subschema objects (or booleans) are recognized by their use with known
applicator keywords or with location-reserving keywords such as
[`$defs`](#defs) that take one or more subschemas as a value. These keywords may
be `$defs` and the standard applicators from this document or
implementation-specific custom keywords.

Multi-level structures of unknown keywords are capable of introducing nested
subschemas, which would be subject to the processing rules for `$id`. Therefore,
having a reference target in such an unrecognized structure cannot be reliably
implemented, and the resulting behavior is undefined. Similarly, a reference
target under a known keyword, for which the value is known not to be a schema,
results in undefined behavior in order to avoid burdening implementations with
the need to detect such targets.[^10]

[^10]: These scenarios are analogous to fetching a schema over HTTP but
receiving a response with a Content-Type other than `application/schema+json`.
An implementation can certainly try to interpret it as a schema, but the origin
server offered no guarantee that it actually is any such thing. Therefore,
interpreting it as such has security implication and may produce unpredictable
results.

Note that single-level custom keywords with identical syntax and semantics to
`$defs` do not allow for any intervening `$id` keywords, and therefore will
behave correctly under implementations that attempt to use any reference target
as a schema. However, this behavior is implementation-specific and MUST NOT be
relied upon for interoperability.

#### Failure to resolve references

If for any reason a reference cannot be resolved, the evaluation MUST halt and
return an indeterminant result. Specifically, it MUST NOT return a passing or
failing validation result or any annotations. Instead it MUST inform the
consuming application or user of the evaluation failure via other means. It is
RECOMMENDED that implementations utilize native functionality for this purpose,
such as, but not limited to, raising an exception or other error.

In the cases where optimizations are enabled and a schema containing a
non-resolvable reference would be skipped, as in the example below, behavior is
implementation-defined.

```json
{
  "anyOf": [
    true,
    { "$ref": "https://json-schema.org/does-not-exist" }
  ]
}
```

Here, an optimized evaluation may recognize that `/anyOf/0` will satisfy the
`anyOf` constraint, regardless of the validation result of `/anyOf/1`, and so
`/anyOf/1` may be skipped altogether.

However, an unoptimized evaluation of this schema (for example one that expects
all annotation results), would result in a resolution failure.

### Associating Instances and Schemas

#### Usage for Hypermedia {#hypermedia}

JSON has been adopted widely by HTTP servers for automated APIs and robots. This
section describes how to enhance processing of JSON documents in a more RESTful
manner when used with protocols that support media types and [Web
linking](#rfc8288).

##### Linking to a Schema

It is RECOMMENDED that instances described by a schema provide a link to a
downloadable JSON Schema using the link relation "describedby", as defined by
[Linked Data Protocol 1.0, section 8.1](#w3crec-ldp-20150226).

In HTTP, such links can be attached to any response using the [Link
header](#rfc8288). An example of such a header would be:

```
Link: <https://example.com/my-hyper-schema>; rel="describedby"
```

##### Usage Over HTTP

When used for hypermedia systems over a network, [HTTP](#rfc7231) is frequently
the protocol of choice for distributing schemas. Misbehaving clients can pose
problems for server maintainers if they pull a schema over the network more
frequently than necessary, when it's instead possible to cache a schema for a
long period of time.

HTTP servers SHOULD set long-lived caching headers on JSON Schemas. HTTP clients
SHOULD observe caching headers and not re-request documents within their
freshness period. Distributed systems SHOULD make use of a shared cache and/or
caching proxy.

Clients SHOULD set or prepend a User-Agent header specific to the JSON Schema
implementation or software product. Since symbols are listed in decreasing order
of significance, the JSON Schema library name/version should precede the more
generic HTTP library name (if any). For example:

```
User-Agent: product-name/5.4.1 so-cool-json-schema/1.0.2 curl/7.43.0
```

Clients SHOULD be able to make requests with a "From" header so that server
operators can contact the owner of a potentially misbehaving script.

## Keywords for Applying Subschemas

This section defines a set of keywords that enable schema combinations and
composition.

### Keyword Independence

Schema keywords typically operate independently, without affecting each other's
outcomes.

For schema author convenience, there are some exceptions among these keywords:

- `additionalProperties`, whose behavior is defined in terms of `properties` and
  `patternProperties`
- `items`, whose behavior is defined in terms of `prefixItems`
- `contains`, whose behavior is affected by the presence and value of
  `minContains`

### Keywords for Applying Subschemas in Place {#in-place}

These keywords apply subschemas to the same location in the instance as the
parent schema is being applied. They allow combining or modifying the subschema
results in various ways.

Subschemas of these keywords evaluate the instance completely independently such
that the results of one such subschema MUST NOT impact the results of sibling
subschemas. Therefore subschemas may be applied in any order.

#### Keywords for Applying Subschemas With Logic {#logic}

These keywords correspond to logical operators for combining or modifying the
boolean assertion results of the subschemas. They have no direct impact on
annotation collection, although they enable the same annotation keyword to be
applied to an instance location with different values. Annotation keywords
define their own rules for combining such values.

##### `allOf` {#allof}

This keyword's value MUST be a non-empty array. Each item of the array MUST be a
valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against all schemas defined by this keyword's value.

##### `anyOf`

This keyword's value MUST be a non-empty array. Each item of the array MUST be a
valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against at least one schema defined by this keyword's value. Note
that when annotations are being collected, all subschemas MUST be examined so
that annotations are collected from each subschema that validates successfully.

##### `oneOf`

This keyword's value MUST be a non-empty array. Each item of the array MUST be a
valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against exactly one schema defined by this keyword's value.

##### `not` {#not}

This keyword's value MUST be a valid JSON Schema.

An instance is valid against this keyword if it fails to validate successfully
against the schema defined by this keyword.

#### Keywords for Applying Subschemas Conditionally {#conditional}

Three of these keywords work together to implement conditional application of a
subschema based on the outcome of another subschema. The fourth is a shortcut
for a specific conditional case.

`if`, `then`, and `else` MUST NOT interact with each other across subschema
boundaries. In other words, an `if` in one branch of an `allOf` MUST NOT have an
impact on a `then` or `else` in another branch.

There is no default behavior for `if`, `then`, or `else` when they are not
present. In particular, they MUST NOT be treated as if present with an empty
schema, and when `if` is not present, both `then` and `else` MUST be entirely
ignored.

##### `if`

This keyword's value MUST be a valid JSON Schema.

This validation outcome of this keyword's subschema has no direct effect on the
overall validation result. Rather, it controls which of the `then` or `else`
keywords are evaluated.

Instances that successfully validate against this keyword's subschema MUST also
be valid against the subschema value of the `then` keyword, if present.

Instances that fail to validate against this keyword's subschema MUST also be
valid against the subschema value of the `else` keyword, if present.

If [annotations](#annotations) are being collected, they are collected from this
keyword's subschema in the usual way, including when the keyword is present
without either `then` or `else`.

##### `then`

This keyword's value MUST be a valid JSON Schema.

When `if` is present, and the instance successfully validates against its
subschema, then validation succeeds against this keyword if the instance also
successfully validates against this keyword's subschema.

This keyword has no effect when `if` is absent, or when the instance fails to
validate against its subschema. Implementations MUST NOT evaluate the instance
against this keyword, for either validation or annotation collection purposes,
in such cases.

##### `else`

This keyword's value MUST be a valid JSON Schema.

When `if` is present, and the instance fails to validate against its subschema,
then validation succeeds against this keyword if the instance successfully
validates against this keyword's subschema.

This keyword has no effect when `if` is absent, or when the instance
successfully validates against its subschema. Implementations MUST NOT evaluate
the instance against this keyword, for either validation or annotation
collection purposes, in such cases.

##### `dependentSchemas` {#dependent-schemas}

This keyword specifies subschemas that are evaluated if the instance is an
object and contains a certain property.

This keyword's value MUST be an object. Each value in the object MUST be a valid
JSON Schema.

If the object key is a property in the instance, the entire instance must
validate against the subschema. Its use is dependent on the presence of the
property.

Omitting this keyword has the same behavior as an empty object.

### Keywords for Applying Subschemas to Child Instances

Each of these keywords defines a rule for applying its subschema(s) to child
instances, specifically object properties and array items, and combining their
results.

#### Keywords for Applying Subschemas to Arrays

##### `prefixItems`

The value of "prefixItems` MUST be a non-empty array of valid JSON Schemas.

Validation succeeds if each element of the instance validates against the
subschema at the same position, if any. This keyword does not constrain the
length of the array. Only array positions present in both the keyword's value
and the instance value are affected by this keyword.

This keyword produces an annotation value which is the largest index to which
this keyword applied a subschema. The value MAY be a boolean true if a subschema
was applied to every index of the instance, such as is produced by the `items`
keyword. This annotation affects the behavior of `items` and `unevaluatedItems`.

Omitting this keyword has the same assertion behavior as an empty array.

##### `items` {#items}

The value of `items` MUST be a valid JSON Schema.

This keyword applies its subschema to all instance elements at indexes greater
than the length of the `prefixItems` array in the same schema object, as
reported by the annotation result of that `prefixItems` keyword. If no such
annotation result exists, `items` applies its subschema to all instance array
elements.[^11]

[^11]: Note that the behavior of `items` without `prefixItems` is identical to
that of the schema form of `items` in prior drafts. When `prefixItems` is
present, the behavior of `items` is identical to the former `additionalItems`
keyword.

If the `items` subschema is applied to any positions within the instance array,
it produces an annotation result of boolean true, indicating that all remaining
array elements have been evaluated against this keyword's subschema. This
annotation affects the behavior of `unevaluatedItems`.

Omitting this keyword has the same assertion behavior as an empty schema.

Implementations MAY choose to implement or optimize this keyword in another way
that produces the same effect, such as by directly checking for the presence and
size of a `prefixItems` array. Implementations that do not support annotation
collection MUST do so.

#### Keywords for Applying Subschemas to Objects

##### `properties`

The value of `properties` MUST be an object. Each value of this object MUST be a
valid JSON Schema.

Validation succeeds if, for each name that appears in both the instance and as a
name within this keyword's value, the child instance for that name successfully
validates against the corresponding schema.

The annotation result of this keyword is the set of instance property names
which are also present under this keyword. This annotation affects the behavior
of `additionalProperties` and `unevaluatedProperties`.

Omitting this keyword has the same assertion behavior as an empty object.

##### `patternProperties`

The value of `patternProperties` MUST be an object. Each property name of this
object SHOULD be a valid regular expression, according to the ECMA-262 regular
expression dialect. Each property value of this object MUST be a valid JSON
Schema.

Validation succeeds if, for each instance name that matches any regular
expressions that appear as a property name in this keyword's value, the child
instance for that name successfully validates against each schema that
corresponds to a matching regular expression. Recall: regular expressions are
not implicitly anchored.

The annotation result of this keyword is the set of instance property names
matched by at least one property under this keyword. This annotation affects the
behavior of `additionalProperties` and `unevaluatedProperties`.

Omitting this keyword has the same assertion behavior as an empty object.

##### `additionalProperties` {#additionalproperties}

The value of `additionalProperties` MUST be a valid JSON Schema.

The behavior of this keyword depends on the presence and annotation results of
`properties` and `patternProperties` within the same schema object. Validation
with `additionalProperties` applies only to the child values of instance names
that do not appear in the annotation results of either `properties` or
`patternProperties`.

For all such properties, validation succeeds if the child instance validates
against the `additionalProperties` schema.

The annotation result of this keyword is the set of instance property names
validated by this keyword's subschema. This annotation affects the behavior of
`unevaluatedProperties`.

Omitting this keyword has the same assertion behavior as an empty schema.

Implementations MAY choose to implement or optimize this keyword in another way
that produces the same effect, such as by directly checking the names in
`properties` and the patterns in `patternProperties` against the instance
property set. Implementations that do not support annotation collection MUST do
so.[^12]

[^12]: In defining this option, it seems there is the potential for ambiguity in
the output format. The ambiguity does not affect validation results, but it does
affect the resulting output format. The ambiguity allows for multiple valid
output results depending on whether annotations are used or a solution that
"produces the same effect" as draft-07. It is understood that annotations from
failing schemas are dropped. See our [Decision
Record](https://github.com/json-schema-org/json-schema-spec/tree/HEAD/adr/2022-04-08-cref-for-ambiguity-and-fix-later-gh-spec-issue-1172.md)
for further details.

##### `propertyNames`

The value of `propertyNames` MUST be a valid JSON Schema.

If the instance is an object, this keyword validates if every property name in
the instance validates against the provided schema. Note the property name that
the schema is testing will always be a string.

Omitting this keyword has the same behavior as an empty schema.

#### Other Keywords for Applying Subschemas

##### `maxContains`

The value of this keyword MUST be a non-negative integer.

This keyword modifies the behavior of `contains` within the same schema object,
as described below in the section for that keyword.

Validation MUST always succeed against this keyword. The value of this keyword
is used as its annotation result.

##### `minContains`

The value of this keyword MUST be a non-negative integer.

This keyword modifies the behavior of `contains` within the same schema object,
as described below in the section for that keyword.

Validation MUST always succeed against this keyword. The value of this keyword
is used as its annotation result.

Per {{default-behaviors}}, omitted keywords MUST NOT produce annotation results.
However, as described in the section for `contains`, the absence of this
keyword's annotation causes `contains` to assume a minimum value of 1.

##### `contains`

The value of this keyword MUST be a valid JSON Schema.

This keyword applies its subschema to array elements.

An instance is valid against `contains` if the number of elements that are valid
against its subschema is with the inclusive range of the minimum and (if any)
maximum number of occurrences.

The maximum number of occurrences is provided by the `maxContains` keyword
within the same schema object as `contains`. If `maxContains` is absent, the
maximum number of occurrences MUST be unbounded.

The minimum number of occurrences is provided by the `minContains` keyword
within the same schema object as `contains`. If `minContains` is absent, the
minimum number of occurrences MUST be 1.

Implementations MAY implement the dependency on `minContains` and `maxContains`
by inspecting their values rather than reading annotations produced by those
keywords.

This keyword produces an annotation value which is an array of the indexes to
which this keyword validates successfully when applying its subschema, in
ascending order. The value MAY be a boolean `true` if the subschema validates
successfully when applied to every index of the instance. The annotation MUST be
present if the instance array to which this keyword's schema applies
is empty.

This annotation affects the behavior of `unevaluatedItems`.

The subschema MUST be applied to every array element even after the first match
has been found, in order to collect annotations for use by other keywords. This
is to ensure that all possible annotations are collected.

## Keywords for Unevaluated Locations

The purpose of these keywords is to enable schema authors to apply subschemas to
array items or object properties that have not been successfully evaluated
against any dynamic-scope subschema of any adjacent keywords.

These instance items or properties may have been unsuccessfully evaluated
against one or more adjacent keyword subschemas, such as when an assertion in a
branch of an `anyOf` fails. Such failed evaluations are not considered to
contribute to whether or not the item or property has been evaluated. Only
successful evaluations are considered.

If an item in an array or an object property is "successfully evaluated", it is
logically considered to be valid in terms of the representation of the object or
array that's expected. For example if a subschema represents a car, which
requires between 2-4 wheels, and the value of "wheels" is 6, the instance object
is not "evaluated" to be a car, and the "wheels" property is considered
"unevaluated (successfully as a known thing)", and does not retain any
annotations.

Recall that adjacent keywords are keywords within the same schema object, and
that the dynamic-scope subschemas include reference targets as well as lexical
subschemas.

The behavior of these keywords depend on the annotation results of adjacent
keywords that apply to the instance location being validated.

### Keyword Independence

Schema keywords typically operate independently, without affecting each other's
outcomes. However, these keywords are notable exceptions:

- `unevaluatedItems`, whose behavior is defined in terms of annotations from
  `prefixItems`, `items`, `contains`, and itself
- `unevaluatedProperties`, whose behavior is defined in terms of annotations
  from `properties`, `patternProperties`, `additionalProperties`, and itself

### `unevaluatedItems` {#unevaluateditems}

The value of `unevaluatedItems` MUST be a valid JSON Schema.

The behavior of this keyword depends on the annotation results of adjacent
keywords that apply to the instance location being validated. Specifically, the
annotations from `prefixItems`, `items`, and `contains`, which can come from
those keywords when they are adjacent to the `unevaluatedItems` keyword. Those
three annotations, as well as `unevaluatedItems`, can also result from any and
all adjacent [in-place applicator](#in-place) keywords. This includes but is not
limited to the in-place applicators defined in this document.

If no relevant annotations are present, the `unevaluatedItems` subschema MUST be
applied to all locations in the array. If a boolean true value is present from
any of the relevant annotations, `unevaluatedItems` MUST be ignored. Otherwise,
the subschema MUST be applied to any index greater than the largest annotation
value for `prefixItems`, which does not appear in any annotation value for
`contains`.

This means that `prefixItems`, `items`, `contains`, and all in-place applicators
MUST be evaluated before this keyword can be evaluated. Authors of extension
keywords MUST NOT define an in-place applicator that would need to be evaluated
after this keyword.

If the `unevaluatedItems` subschema is applied to any positions within the
instance array, it produces an annotation result of boolean true, analogous to
the behavior of `items`. This annotation affects the behavior of
`unevaluatedItems` in parent schemas.

Omitting this keyword has the same assertion behavior as an empty schema.

### `unevaluatedProperties` {#unevaluatedproperties}

The value of `unevaluatedProperties` MUST be a valid JSON Schema.

The behavior of this keyword depends on the annotation results of adjacent
keywords that apply to the instance location being validated. Specifically, the
annotations from `properties`, `patternProperties`, and `additionalProperties`,
which can come from those keywords when they are adjacent to the
`unevaluatedProperties` keyword. Those four annotations, as well as
`unevaluatedProperties`, can also result from any and all adjacent [in-place
applicator](#in-place) keywords. This includes but is not limited to the
in-place applicators defined in this document.

Validation with `unevaluatedProperties` applies only to the child values of
instance names that do not appear in the `properties`, `patternProperties`,
`additionalProperties`, or `unevaluatedProperties` annotation results that apply
to the instance location being validated.

For all such properties, validation succeeds if the child instance validates
against the `unevaluatedProperties` schema.

This means that `properties`, `patternProperties`, `additionalProperties`, and
all in-place applicators MUST be evaluated before this keyword can be evaluated.
Authors of extension keywords MUST NOT define an in-place applicator that would
need to be evaluated after this keyword.

The annotation result of this keyword is the set of instance property names
validated by this keyword's subschema. This annotation affects the behavior of
`unevaluatedProperties` in parent schemas.

Omitting this keyword has the same assertion behavior as an empty schema.

## Output Formatting {#output}

In order to foster increased usability and interoperability, implementations
SHOULD adhere to well-defined output formats.

Because JSON Schema has multiple uses cases, and those uses cases have different
intended consumers, this specification defers the details of any output formats
to other documents. Implementations are encouraged to support multiple output
formats as required by their target user base.

The scope of this section, therefore, is limited to defining common terms that
SHOULD be used in JSON Schema output specifications in order to align the
vernacular across differing formats. Output specifications which use this
information MUST use this terminology to describe it. Conversely, output
specifications which use these terms MUST maintain their meaning.

### Evaluation path

The evaluation path is the set of keys, starting from the schema root, through
which evaluation passes to reach the schema object that produced a specific
result. The value MUST be expressed as a JSON Pointer, and it MUST include any
by-reference applicators such as `$ref` or `$dynamicRef`.

```
/properties/width/$ref/allOf/1
```

Note that this pointer may not be resolvable on the root schema by the normal
JSON Pointer process. It is intended as an indication of the traversal path
only.

When represented in JSON, the key for this information MUST be "evaluationPath".

### Schema Location

The schema location is the canonical URI of the schema object plus a JSON
Pointer fragment indicating the subschema that produced a result. In contrast
with the evaluation path, the schema location MUST NOT include by-reference
applicators such as `$ref` or `$dynamicRef`.

```
https://example.com/schemas/common#/$defs/allOf/1
```

### Instance Location

The instance location is the location of the JSON value within the root instance
being validated. The value MUST be expressed as a JSON Pointer.

### Errors

Errors are textual representations of individual validation failures, often
intended for human consumers. This specification contains no requirements for
the content of these errors.

Output specifications which include errors SHOULD be written such that the
sources (schema and instance) of a given error is easily identifiable and SHOULD
use the terms defined by this document to do so.

### Annotations

Many keywords are defined to produce annotations, whether intended for
inter-keyword communication (e.g. between `properties` and
`unevaluatedProperties`) or for application consumption (e.g. `title` or
`readOnly`). Annotation values may be of any type and are defined by the
keywords that produced them.

Output specifications which include annotations SHOULD be written such that they
can be easily associated with the data defined in {{collect}} and SHOULD use the
terms defined by this document to do so.

### Dropped Annotations

A dropped annotation is any annotation produced and subsequently dropped by the
evaluation due to an unsuccessful validation result of the containing subschema.
This information MAY be included if the validation result of the containing
subschema was unsuccessful. It MUST NOT be included if the local validation
result of the containing subschema was successful.

As the intended purpose for including these annotations is debugging,
implementations that wish to provide dropped annotations SHOULD NOT provide them
as their default behavior. Dropped annotations SHOULD only be included when the
implementation is explicitly configured to do so or if the implementation is
specifically intended to be used as a debugging tool.

Output specifications which include dropped annotations SHOULD be written such
that they can be easily associated with the data defined in {{collect}} and
SHOULD use the terms defined by this document to do so.

## Security Considerations {#security}

Both schemas and instances are JSON values. As such, all security considerations
defined in [RFC 8259](#rfc8259) apply.

Instances and schemas are both frequently written by untrusted third parties, to
be deployed on public Internet servers. Implementations should take care that
the parsing and evaluating against schemas does not consume excessive system
resources. Implementations MUST NOT fall into an infinite loop.

A malicious party could cause an implementation to repeatedly collect a copy of
a very large value as an annotation. Implementations SHOULD guard against
excessive consumption of system resources in such a scenario.

Servers MUST ensure that malicious parties cannot change the functionality of
existing schemas by uploading a schema with a pre-existing or very similar
`$id`.

Individual JSON Schema extensions are liable to also have their own security
considerations. Consult the respective specifications for more information.

Schema authors should take care with `$comment` contents, as a malicious
implementation can display them to end-users in violation of a spec, or fail to
strip them if such behavior is expected.

A malicious schema author could place executable code or other dangerous
material within a `$comment`. Implementations MUST NOT parse or otherwise take
action based on `$comment` contents.

## IANA Considerations

### `application/schema+json`

The proposed MIME media type for JSON Schema is defined as follows:

Type name:: application

Subtype name:: schema+json

Required parameters:: N/A

Encoding considerations:: Encoding considerations are identical to those
specified for the `application/json` media type. See [JSON](#rfc8259).

Security considerations:: See {{security}} above.

Interoperability considerations:: See Sections [6.2](#language),
[6.3](#integers), and [6.4](#regex) above.

Fragment identifier considerations:: See {{schema-fragments}}

### `application/schema-instance+json`

The proposed MIME media type for JSON Schema Instances that require a JSON
Schema-specific media type is defined as follows:

Type name:: application

Subtype name:: schema-instance+json

Required parameters:: N/A

Encoding considerations:: Encoding considerations are identical to those
specified for the `application/json` media type. See [JSON](#rfc8259).

Security considerations:: See {{security}} above.

Interoperability considerations:: See Sections [6.2](#language),
[6.3](#integers), and [6.4](#regex) above.

Fragment identifier considerations:: See {{instance-fragments}}

## References

### Normative References

#### [RFC2119] {#rfc2119}

Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14,
RFC 2119, DOI 10.17487/RFC2119, March 1997,
<<https://www.rfc-editor.org/info/rfc2119>>.

#### [RFC3986] {#rfc3986}

Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier
(URI): Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005,
<<https://www.rfc-editor.org/info/rfc3986>>.

#### [RFC3987] {#rfc3987}

Duerst, M. and M. Suignard, "Internationalized Resource Identifiers (IRIs)", RFC
3987, DOI 10.17487/RFC3987, January 2005,
<<https://www.rfc-editor.org/info/rfc3987>>.

#### [RFC6839] {#rfc6839}

Hansen, T. and A. Melnikov, "Additional Media Type Structured Syntax Suffixes",
RFC 6839, DOI 10.17487/RFC6839, January 2013,
<<https://www.rfc-editor.org/info/rfc6839>>.

#### [RFC6901] {#rfc6901}

Bryan, P., Ed., Zyp, K., and M. Nottingham, Ed., "JavaScript Object Notation
(JSON) Pointer", RFC 6901, DOI 10.17487/RFC6901, April 2013,
<<https://www.rfc-editor.org/info/rfc6901>>.

#### [RFC8259] {#rfc8259}

Bray, T., Ed., "The JavaScript Object Notation (JSON) Data Interchange Format",
STD 90, RFC 8259, DOI 10.17487/RFC8259, December 2017,
<<https://www.rfc-editor.org/info/rfc8259>>.

#### [W3C.REC-ldp-20150226] {#w3crec-ldp-20150226}

Malhotra, A., Ed., Arwe, J., Ed., and S. Speicher, Ed., "Linked Data Platform
1.0", W3C REC REC-ldp-20150226, W3C REC-ldp-20150226, 26 February 2015,
<<https://www.w3.org/TR/2015/REC-ldp-20150226/>>.

#### [ecma262] {#ecma262}

"ECMA-262, 11th edition specification", June 2020,
<<https://www.ecma-international.org/ecma-262/11.0/index.html>>.

### Informative References

#### [RFC6596] {#rfc6596}

Ohye, M. and J. Kupke, "The Canonical Link Relation", RFC 6596, DOI
10.17487/RFC6596, April 2012, <<https://www.rfc-editor.org/info/rfc6596>>.

#### [RFC7049] {#rfc7049}

Bormann, C. and P. Hoffman, "Concise Binary Object Representation (CBOR)", RFC
7049, DOI 10.17487/RFC7049, October 2013,
<<https://www.rfc-editor.org/info/rfc7049>>.

#### [RFC7231] {#rfc7231}

Fielding, R., Ed. and J. Reschke, Ed., "Hypertext Transfer Protocol (HTTP/1.1):
Semantics and Content", RFC 7231, DOI 10.17487/RFC7231, June 2014,
<<https://www.rfc-editor.org/info/rfc7231>>.

#### [RFC8288] {#rfc8288}

Nottingham, M., "Web Linking", RFC 8288, DOI 10.17487/RFC8288, October 2017,
<<https://www.rfc-editor.org/info/rfc8288>>.

#### [W3C.WD-fragid-best-practices-20121025]
{#w3cwd-fragid-best-practices-20121025}

Tennison, J., Ed., "Best Practices for Fragment Identifiers and Media Type
Definitions", W3C WD WD-fragid-best-practices-20121025, W3C
WD-fragid-best-practices-20121025, 25 October 2012,
<<https://www.w3.org/TR/2012/WD-fragid-best-practices-20121025/>>.

#### [W3C.REC-xptr-framework-20030325] {#w3crec-xptr-framework-20030325}

Maler, E., Ed., Marsh, J., Ed., Walsh, N., Ed., and P. Grosso, Ed., "XPointer
Framework", W3C REC REC-xptr-framework-20030325, W3C
REC-xptr-framework-20030325, 25 March 2003,
<<https://www.w3.org/TR/2003/REC-xptr-framework-20030325/>>.

#### [json-schema-validation] {#json-schema-validation}

Wright, A., Andrews, H., and B. Hutton, "JSON Schema Validation: A Vocabulary
for Structural Validation of JSON", Work in Progress, Internet-Draft,
draft-bhutton-json-schema-validation-01, June 2022,
<<https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01>>.

#### [json-hyper-schema] {#json-hyper-schema}

Andrews, H. and A. Wright, "JSON Hyper-Schema: A Vocabulary for Hypermedia
Annotation of JSON", Work in Progress, Internet-Draft,
draft-handrews-json-schema-hyperschema-02, November 2017,
<<https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-hyperschema-02>>.

#### [xml-names] {#xml-names}

Bray, T., Ed., Hollander, D., Ed., Layman, A., Ed., and R. Tobin, Ed.,
"Namespaces in XML 1.1 (Second Edition)", August 2006,
<<http://www.w3.org/TR/2006/REC-xml-names11-20060816>>.

## [Appendix] Schema identification examples {#idexamples}

Consider the following schema, which shows `$id` being used to identify both the
root schema and various subschemas, and `$anchor` being used to define plain
name fragment identifiers.

```jsonschema
{
  "$id": "https://example.com/root.json",
  "$defs": {
    "A": { "$anchor": "foo" },
    "B": {
      "$id": "other.json",
      "$defs": {
        "X": { "$anchor": "bar" },
        "Y": {
          "$id": "t/inner.json",
          "$anchor": "bar"
        }
      }
    },
    "C": {
      "$id": "urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f"
    }
  }
}
```

The schemas at the following IRI-encoded [JSON Pointers](#rfc6901) (relative to
the root schema) have the following base IRIs, and are identifiable by any
listed IRI in accordance with {{schema-fragments}} and {{embedded}} above.

`#` (document root): canonical (and base) IRI: `https://example.com/root.json`
- canonical resource IRI plus pointer fragment: `https://example.com/root.json#`

`#/$defs/A`: base IRI: `https://example.com/root.json`
- canonical resource IRI plus plain fragment:
  `https://example.com/root.json#foo`
- canonical resource IRI plus pointer fragment:
  `https://example.com/root.json#/$defs/A`

`#/$defs/B`: canonical (and base) `IRI: https://example.com/other.json`
- canonical resource IRI plus pointer fragment:
  `https://example.com/other.json#`
- base IRI of enclosing (root.json) resource plus fragment:
  `https://example.com/root.json#/$defs/B`

`#/$defs/B/$defs/X`: base IRI: `https://example.com/other.json`
- canonical resource IRI plus plain fragment:
  `https://example.com/other.json#bar`
- canonical resource IRI plus pointer fragment:
  `https://example.com/other.json#/$defs/X`
- base IRI of enclosing (root.json) resource plus fragment:
  `https://example.com/root.json#/$defs/B/$defs/X`

`#/$defs/B/$defs/Y`: canonical (and base) IRI:
`https://example.com/t/inner.json`
- canonical IRI plus plain fragment: `https://example.com/t/inner.json#bar`
- canonical IRI plus pointer fragment: `https://example.com/t/inner.json#`
- base IRI of enclosing (other.json) resource plus fragment:
  `https://example.com/other.json#/$defs/Y`
- base IRI of enclosing (root.json) resource plus fragment:
  `https://example.com/root.json#/$defs/B/$defs/Y`

`#/$defs/C`: canonical (and base) IRI:
`urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f`
- canonical IRI plus pointer fragment:
  `urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f#`
- base IRI of enclosing (root.json) resource plus fragment:
  `https://example.com/root.json#/$defs/C`

Note: The fragment part of the IRI does not make it canonical or non-canonical,
rather, the base IRI used (as part of the full IRI with any fragment) is what
determines the canonical nature of the resulting full IRI.[^18]

[^18]: Multiple "canonical" IRIs? We Acknowledge this is potentially confusing,
and direct you to read the CREF located in the [JSON Pointer fragments and
embedded schema resources](#embedded) section for further comments.

## [Appendix] Manipulating schema documents and references

Various tools have been created to rearrange schema documents based on how and
where references (`$ref`) appear. This appendix discusses which use cases and
actions are compliant with this specification.

### Bundling schema resources into a single document

A set of schema resources intended for use together can be organized with each
in its own schema document, all in the same schema document, or any granularity
of document grouping in between.

Numerous tools exist to perform various sorts of reference removal. A common
case of this is producing a single file where all references can be resolved
within that file. This is typically done to simplify distribution, or to
simplify coding so that various invocations of JSON Schema libraries do not have
to keep track of and load a large number of resources.

This transformation can be safely and reversibly done as long as all static
references (e.g. `$ref`) use IRI-references that resolve to IRIs using the
canonical resource IRI as the base, and all schema resources have an
absolute-IRI as the `$id` in their root schema.

With these conditions met, each external resource can be copied under `$defs`,
without breaking any references among the resources' schema objects, and without
changing any aspect of validation or annotation results. The names of the
schemas under `$defs` do not affect behavior, assuming they are each unique, as
they do not appear in the canonical IRIs for the embedded resources.

### Reference removal is not always safe

Attempting to remove all references and produce a single schema document does
not, in all cases, produce a schema with identical behavior to the original
form.

Since `$ref` is now treated like any other keyword, with other keywords allowed
in the same schema objects, fully supporting non-recursive `$ref` removal in all
cases can require relatively complex schema manipulations. It is beyond the
scope of this specification to determine or provide a set of safe `$ref` removal
transformations, as they depend not only on the schema structure but also on the
intended usage.

## [Appendix] Example of recursive schema extension {#recursive-example}

Consider the following two schemas describing a simple recursive tree structure,
where each node in the tree can have a "data" field of any type. The first
schema allows and ignores other instance properties. The second is more strict
and only allows the "data" and "children" properties. An example instance with
"data" misspelled as "daat" is also shown.

```jsonschema "Tree schema, extensible"
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$id": "https://example.com/tree",
  "$dynamicAnchor": "node",

  "type": "object",
  "properties": {
    "data": true,
    "children": {
      "type": "array",
      "items": {
        "$dynamicRef": "#node"
      }
    }
  }
}
```

```jsonschema "Strict-tree schema, guards against misspelled properties"
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$id": "https://example.com/strict-tree",
  "$dynamicAnchor": "node",

  "$ref": "tree",
  "unevaluatedProperties": false
}
```

```jsonschema "Instance with misspelled field"
{
  "children": [ { "daat": 1 } ]
}
```

When we load these two schemas, we will notice the `$dynamicAnchor` named "node"
(note the lack of "#" as this is just the name) present in each, resulting in
the following full schema IRIs:

- `https://example.com/tree#node`
- `https://example.com/strict-tree#node`

In addition, JSON Schema implementations keep track of the fact that these
fragments were created with `$dynamicAnchor`.

If we apply the "strict-tree" schema to the instance, we will follow the `$ref`
to the "tree" schema, examine its "children" subschema, and find the
`$dynamicRef`: to "#node" (note the `#` for IRI fragment syntax) in its `items`
subschema. That reference resolves to `https://example.com/tree#node`, which is
a IRI with a fragment created by `$dynamicAnchor`. Therefore we must examine the
dynamic scope before following the reference.

At this point, the evaluation path is
`#/$ref/properties/children/items/$dynamicRef`, with a dynamic scope containing
(from the outermost scope to the innermost):

1. `https://example.com/strict-tree#`
1. `https://example.com/tree#`
1. `https://example.com/tree#/properties/children`
1. `https://example.com/tree#/properties/children/items`

Since we are looking for a plain name fragment, which can be defined anywhere
within a schema resource, the JSON Pointer fragments are irrelevant to this
check. That means that we can remove those fragments and eliminate consecutive
duplicates, producing:

1. `https://example.com/strict-tree`
1. `https://example.com/tree`

In this case, the outermost resource also has a "node" fragment defined by
`$dynamicAnchor`. Therefore instead of resolving the `$dynamicRef` to
`https://example.com/tree#node`, we resolve it to
`https://example.com/strict-tree#node`.

This way, the recursion in the "tree" schema recurses to the root of
"strict-tree", instead of only applying "strict-tree" to the instance root, but
applying "tree" to instance children.

This example shows both `$dynamicAnchor`s in the same place in each schema,
specifically the resource root schema. Since plain-name fragments are
independent of the JSON structure, this would work just as well if one or both
of the node schema objects were moved under `$defs`. It is the matching
`$dynamicAnchor` values which tell us how to resolve the dynamic reference, not
any sort of correlation in JSON structure.

## [Appendix] References and generative use cases

While the presence of references is expected to be transparent to validation
results, generative use cases such as code generators and UI renderers often
consider references to be semantically significant.

To make such use case-specific semantics explicit, the best practice is to
create an annotation keyword for use in the same schema object alongside of a
reference keyword such as `$ref`.

For example, here is a hypothetical keyword for determining whether a code
generator should consider the reference target to be a distinct class, and how
those classes are related. Note that this example is solely for illustrative
purposes, and is not intended to propose a functional code generation keyword.

```jsonschema
{
  "allOf": [
    {
      "classRelation": "is-a",
      "$ref": "classes/base.json"
    },
    {
      "$ref": "fields/common.json"
    }
  ],
  "properties": {
    "foo": {
      "classRelation": "has-a",
      "$ref": "classes/foo.json"
    },
    "date": {
      "$ref": "types/dateStruct.json",
    }
  }
}
```

Here, this schema represents some sort of object-oriented class. The first
reference in the `allOf` is noted as the base class. The second is not assigned
a class relationship, meaning that the code generator should combine the
target's definition with this one as if no reference were involved.

Looking at the properties, "foo" is flagged as object composition, while the
"date" property is not. It is simply a field with sub-fields, rather than an
instance of a distinct class.

This style of usage requires the annotation to be in the same object as the
reference, which must be recognizable as a reference.

## [Appendix] Acknowledgments

Thanks to Gary Court, Francis Galiegue, Kris Zyp, Geraint Luff, and Henry
Andrews for their work on the initial drafts of JSON Schema.

Thanks to Jason Desrosiers, Daniel Perrett, Erik Wilde, Evgeny Poberezkin, Brad
Bowman, Gowry Sankar, Donald Pipowitch, Dave Finlay, Denis Laxalde, Phil
Sturgeon, Shawn Silverman, and Karen Etheridge for their submissions and patches
to the document.

## [Appendix] Change Log[^19]

[^19]: This section to be removed before leaving Internet-Draft status.

### draft-bhutton-json-schema-next
- Use IRIs instead of URIs, including allowing unicode in plain-name fragments
- Clarify that detecting duplicate IRIs for different schemas SHOULD raise an error
- Consolidate and clarify the syntax and rationale for plain-name fragments
- "$id" MUST be an absolute-IRI, without any fragment, even an empty one
- Note that an empty string "$id" results in duplicate IRIs for different schemas
- Define empty schemas as empty (no longer allowing unrecognized keywords)
- Clarify that if unknown properties are not treated as annotations, they MUST be ignored
- Remove outdated pre-annotation-collection section on annotation-applicator interaction
- Clarify that regular expressions are not anchored
- Specify valid implementation-defined options for handling schemas without "$schema"
- Clarify that vocabularies omitted from "$vocabulary" MUST NOT be available for use
- Clarify that standard keywords are only available as vocabulary keywords, subject to "$vocabulary" control
- Clarify the nature and purpose of optional (set to false in "$vocabulary") vocabularies
- Clarify that optional simple-annotation-only vocabularies can be supported without custom code
- Fix typo that "$vocabulary" can only be in a document root; it is legal in resource roots
- Remove bookending requirement for `$dynamicRef`
- Clarify that "prefixItems" does not constrain the length of an array
- Move "minContains" and "maxContains" to the applicator vocabulary from validation
- "minContains" and "maxContains" no longer have their own assertion results
- "contains" assertion result now depends on "minContains" and "maxContains"
- Affirm that no keyword can un-fail an adjacent keyword ("minContains" previously violated this)
- "contains", "minContains", and "maxContains" now apply to objects as well as arrays
- As an object keyword, "contains" now affects "unevaluatedProperties"
- Add `propertyDependencies` keyword
- Add new "list" and "hierarchical" output formats in place of "basic", "detailed", and "verbose"
- Rename "absoluteKeywordLocation" and "keywordLocation" to "schemaLocation" and "evaluationPath"
- Output units in new format group by "schemaLocation", "instanceLocation", and "evaluationPath"
- Add "droppedAnnotations" to output formats

### draft-bhutton-json-schema-01
- Improve and clarify the `type`, `contains`, `unevaluatedProperties`, and
  `unevaluatedItems` keyword explanations
- Clarify various aspects of "canonical URIs"
- Comment on ambiguity around annotations and `additionalProperties`
- Clarify Vocabularies need not be formally defined
- Remove references to remaining media-type parameters
- Fix multiple examples

### draft-bhutton-json-schema-00
- `$schema` MAY change for embedded resources
- Array-value `items` functionality is now `prefixItems`
- `items` subsumes the old function of `additionalItems`
- `contains` annotation behavior, and `contains` and `unevaluatedItems`
  interactions now specified
- Rename $recursive* to $dynamic*, with behavior modification
- $dynamicAnchor defines a fragment like $anchor
- $dynamic* (previously $recursive) no longer use runtime base URI determination
- Define Compound Schema Documents (bundle) and processing
- Reference ECMA-262, 11th edition for regular expression support
- Regular expression should support unicode
- Remove media type parameters
- Specify Unknown keywords are collected as annotations
- Moved `unevaluatedItems` and `unevaluatedProperties` from core into their own
  vocabulary

### draft-handrews-json-schema-02
- Update to RFC 8259 for JSON specification
- Moved `definitions` from the Validation specification here as `$defs`
- Moved applicator keywords from the Validation specification as their own
  vocabulary
- Moved the schema form of `dependencies` from the Validation specification as
  `dependentSchemas`
- Formalized annotation collection
- Specified recommended output formats
- Defined keyword interactions in terms of annotation and assertion results
- Added `unevaluatedProperties` and `unevaluatedItems`
- Define `$ref` behavior in terms of the assertion, applicator, and annotation
  model
- Allow keywords adjacent to `$ref`
- Note undefined behavior for `$ref` targets involving unknown keywords
- Add recursive referencing, primarily for meta-schema extension
- Add the concept of formal vocabularies, and how they can be recognized through
  meta-schemas
- Additional guidance on initial base URIs beyond network retrieval
- Allow "schema" media type parameter for `application/schema+json`
- Better explanation of media type parameters and the HTTP Accept header
- Use `$id` to establish canonical and base absolute-URIs only, no fragments
- Replace plain-name-fragment-only form of `$id` with `$anchor`
- Clarified that the behavior of JSON Pointers across `$id` boundary is
  unreliable

### draft-handrews-json-schema-01
- This draft is purely a clarification with no functional changes
- Emphasized annotations as a primary usage of JSON Schema
- Clarified $id by use cases
- Exhaustive schema identification examples
- Replaced "external referencing" with how and when an implementation might know
  of a schema from another document
- Replaced "internal referencing" with how an implementation should recognized
  schema identifiers during parsing
- Dereferencing the former "internal" or "external" references is always the
  same process
- Minor formatting improvements

### draft-handrews-json-schema-00
- Make the concept of a schema keyword vocabulary more clear
- Note that the concept of "integer" is from a vocabulary, not the data model
- Classify keywords as assertions or annotations and describe their general
  behavior
- Explain the boolean schemas in terms of generalized assertions
- Reserve `$comment` for non-user-visible notes about the schema
- Wording improvements around `$id` and fragments
- Note the challenges of extending meta-schemas with recursive references
- Add `application/schema-instance+json` media type
- Recommend a "schema" link relation / parameter instead of "profile"

### draft-wright-json-schema-01
- Updated intro
- Allowed for any schema to be a boolean
- `$schema` SHOULD NOT appear in subschemas, although that may change
- Changed `id` to `$id`; all core keywords prefixed with "$"
- Clarify and formalize fragments for `application/schema+json`
- Note applicability to formats such as CBOR that can be represented in the JSON
  data model

### draft-wright-json-schema-00
- Updated references to JSON
- Updated references to HTTP
- Updated references to JSON Pointer
- Behavior for `id` is now specified in terms of RFC3986
- Aligned vocabulary usage for URIs with RFC3986
- Removed reference to draft-pbryan-zyp-json-ref-03
- Limited use of `$ref` to wherever a schema is expected
- Added definition of the "JSON Schema data model"
- Added additional security considerations
- Defined use of subschema identifiers for `id`
- Rewrote section on usage with HTTP
- Rewrote section on usage with rel="describedBy" and rel="profile"
- Fixed numerous invalid examples

### draft-zyp-json-schema-04
- Salvaged from draft v3.
- Split validation keywords into separate document.
- Split hypermedia keywords into separate document.
- Initial post-split draft.
- Mandate the use of JSON Reference, JSON Pointer.
- Define the role of `id`. Define URI resolution scope.
- Add interoperability considerations.

### draft-zyp-json-schema-00
- Initial draft.

## Authors' Addresses
| Author                   | Company | Email                   | URI                              |
|--------------------------|---------|-------------------------|----------------------------------|
| Austin Wright (*editor*) |         | <aaa@bzfx.net>          |                                  |
| Ben Hutton (*editor*)    | Postman | <ben@jsonschema.dev>    | <https://jsonschema.dev>         |
| Greg Dennis              |         | <gregsdennis@yahoo.com> | <https://github.com/gregsdennis> |
