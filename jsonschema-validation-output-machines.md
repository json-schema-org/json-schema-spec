# A Specification for Machine-Readable Output for JSON Schema Validation and Annotation

JSON Schema is defined to be platform-independent. As such, to increase
compatibility across platforms, implementations SHOULD conform to a standard
validation output format. This specification describes the minimum requirements
for machine consumers to properly interpret validation results.

## Table of Contents

## Schema Identifiers

The output defined in this specification requires that the evaluation root be
defined with an absolute IRI, i.e. using the `$id` keyword. In the event an
absolute IRI has not been defined, the implementation MUST generate one.

There are no requirements on the form of IRI itself, except that it MUST be
absolute.

## Textual Format and Encoding

JSON Schema output is defined using the JSON Schema data instance model as
described in [JSON Schema](#json-schema) "Instance Data Model". Implementations
MAY deviate from this in their internal modelling, as supported by their
specific languages and platforms, however it is RECOMMENDED that the output be
convertible to the JSON format defined herein via serialization or other means.

## Applicability

The formats described in this document apply only for a successful evaluation,
irrespective of whether validation passes or fails. If the implementation
encounters a scenario for which JSON Schema requires that evaluation halts, the
requirements herein do not apply, and the implementation SHOULD react as
appropriate for its language/environment.

## Overview

The root of JSON Schema output MUST be a JSON object. This object MUST contain
the following metadata regarding the validation:

| JSON Property Name | Description |
|:-:|:-|
| `baseUri` | Evaluation root base URI (`$id` value) |
| `valid` | Boolean containing the overall validation result |
| `details` | Contains the detailed subschema evaluation results in one of the [formats](#output-structure) below<br> Required only for "list" and "hierarchical" formats |
<!-- Placeholder for other metadata ideas -->

## Minimum Information for Subschema Validation and Annotation

Beyond the simplistic "flag" output, additional information is useful to aid in
debugging evaluation of an instance by a schema.

The output of a subschema validation is considered an "output unit." The
contents of each output unit is specified by this section.

Each output unit MUST contain the [validation result](#validation-result) for
the associated subschema as well as the following information defined by
[JSON Schema](#json-schema) "Output Formatting":

- Evaluation Path
- Schema Location
- Instance Location

The following information MAY be included conditionally:

- When subschema validation has succeeded
  - Annotations
- When subschema validation has failed
  - Errors
  - Dropped Annotations

Implementations MAY elect to provide additional information.

### Validation Result {#validation-result}

The validation result is a boolean that indicates whether the local instance
passed validation by the local subschema.

The JSON key for these additional results is `valid`.

## Output Structure {#output-structure}

This specification defines three output formats.

- **Flag** - Only the top-level overview needs to be populated; `details` is omitted.
- **List** - Provides all subschema results in a flat array.
- **Hierarchical** - Provides validation information in a hierarchical structure
  that follows the evaluation paths generated while processing the schema.

An implementation MUST provide the "flag" format and SHOULD provide at least one
of the "list" or "hierarchical" formats. Implementations SHOULD specify in their
documentation which formats they support.

For these examples, the following schema and instances will be used.

```jsonschema "Example Schema"
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$id": "https://json-schema.org/schemas/example",
  "type": "object",
  "title": "root",
  "properties": {
    "foo": {
      "allOf": [
        { "required": ["unspecified-prop"] },
        {
          "type": "object",
          "title": "foo-title",
          "properties": {
            "foo-prop": {
              "const": 1,
              "title": "foo-prop-title"
            }
          },
          "additionalProperties": { "type": "boolean" }
        }
      ]
    },
    "bar": { "$ref": "#/$defs/bar" }
  },
  "$defs": {
    "bar": {
      "type": "object",
      "title": "bar-title",
      "properties": {
        "bar-prop": {
          "type": "integer",
          "minimum": 10,
          "title": "bar-prop-title"
        }
      }
    }
  }
}
```

```json "Failing Instance"
{
  "foo": { "foo-prop": "not 1", "other-prop": false },
  "bar": { "bar-prop": 2 }
}
```

```json "Passing Instance"
{
  "foo": {
    "foo-prop": 1,
    "unspecified-prop": true
  },
  "bar": { "bar-prop": 20 }
}
```

The failing instance will produce the following errors:

- The instance value at `/foo`
  evaluated at `/properties/foo/allOf/0`
  by following the path `/properties/foo/allOf/0`
  by the `required` keyword
  is missing the property `unspecified-prop`.
- The value at `/foo/foo-prop`
  evaluated at `/properties/foo/allOf/1/properties/foo-prop`
  by following the path `/properties/foo/allOf/1/properties/foo-prop`
  by the `const` keyword
  is not the constant value 1.
- The value at `/bar/bar-prop`
  evaluated at `/$defs/bar/properties/bar-prop`
  by following the path `/properties/bar/$ref/properties/bar-prop`
  by the `type` keyword
  is not a number.

<!--
"minimum" doesn't produce an error because it only operates on instances that are numbers.
-->
<!--
Note that the error message wording as depicted in the examples below is not a requirement of this specification.  Implementations SHOULD craft error messages tailored for their audience or provide a templating mechanism that allows their users to craft their own messages.
-->

The passing instance will produce the following annotations:

- The keyword `title`
  evaluated at ``
  by following the path ``
  will produce `"root"`.
- The keyword `properties`
  evaluated at ``
  by following the path ``
  will produce `["foo", "bar"]`.
- The keyword `title`
  evaluated at `/properties/foo`
  by following the path `/properties/foo`
  will produce `"foo-title"`.
- The keyword `properties`
  evaluated at `/properties/foo/allOf/1`
  by following the path `/properties/foo/allOf/1`
  will produce `["foo-prop"]`.
- The keyword `additionalProperties`
  evaluated at `/properties/foo/allOf/1`
  by following the path `/properties/foo/allOf/1`
  will produce `["unspecified-prop"]`.
- The keyword `title`
  evaluated at `/properties/foo/allOf/1/properties/foo-prop`
  by following the path `/properties/foo/allOf/1/properties/foo-prop`
  will produce `"foo-prop-title"`.
- The keyword `title`
  evaluated at `/$defs/bar`
  by following the path `/properties/bar/$ref`
  will produce `"bar-title"`.
- The keyword `properties`
  evaluated at `/$defs/bar`
  by following the path `/properties/var/$ref`
  will produce `["bar-prop"]`.
- The keyword `title`
  evaluated at `/$defs/bar/properties/bar-prop`
  by following the path `/properties/bar/$ref/properties/bar-prop`
  will produce `"bar-prop-title"`.

### Flag

In the simplest case, only the overview needs to be fulfilled. For the "flag"
format, all other information is explicitly omitted.

```json "Flag Results"
{
  "dialect": "https://json-schema.org/draft/next/schema",
  "baseUri": "https://json-schema.org/schemas/example",
  "results": false
}
```

Because no errors or annotations are returned with this format, it is
RECOMMENDED that implementations use short-circuiting logic to return failure or
success as soon as the outcome can be determined. For example, if an `anyOf`
keyword contains five subschemas, and the second one passes, there is no need to
check the other three. The logic can simply return with success.

### List

The "list" format is a flat list of output units contained within a root output
unit.

Output units which do not contain errors or annotations SHOULD be excluded from
this format, however implementations MAY choose to include them for
completeness.

```json "Failing Results"
{
  "baseUri": "https://json-schema.org/schemas/example",
  "valid": false,
  "details": [
    {
      "valid": false,
      "evaluationPath": "/properties/foo/allOf/0",
      "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/0",
      "instanceLocation": "/foo",
      "errors": {
        "required": "Required properties [\"unspecified-prop\"] were not present"
      }
    },
    {
      "valid": false,
      "evaluationPath": "/properties/foo/allOf/1/properties/foo-prop",
      "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/properties/foo-prop",
      "instanceLocation": "/foo/foo-prop",
      "errors": {
        "const": "Expected \"1\""
      }
    },
    {
      "valid": false,
      "evaluationPath": "/properties/bar/$ref/properties/bar-prop",
      "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar/properties/bar-prop",
      "instanceLocation": "/bar/bar-prop",
      "errors": {
        "minimum": "2 is less than or equal to 10"
      }
    }
  ]
}
```

```json "Passing Results"
{
  "baseUri": "https://json-schema.org/schemas/example",
  "valid": true,
  "details": [
    {
      "valid": true,
      "evaluationPath": "",
      "schemaLocation": "https://json-schema.org/schemas/example#",
      "instanceLocation": "",
      "annotations": {
        "title": "root",
        "properties": [
          "foo",
          "bar"
        ]
      }
    },
    {
      "valid": true,
      "evaluationPath": "/properties/foo/allOf/1",
      "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1",
      "instanceLocation": "/foo",
      "annotations": {
        "title": "foo-title",
        "properties": [
          "foo-prop"
        ],
        "additionalProperties": [
          "unspecified-prop"
        ]
      }
    },
    {
      "valid": true,
      "evaluationPath": "/properties/bar/$ref",
      "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar",
      "instanceLocation": "/bar",
      "annotations": {
        "title": "bar-title",
        "properties": [
          "bar-prop"
        ]
      }
    },
    {
      "valid": true,
      "evaluationPath": "/properties/foo/allOf/1/properties/foo-prop",
      "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/properties/foo-prop",
      "instanceLocation": "/foo/foo-prop",
      "annotations": {
        "title": "foo-prop-title"
      }
    },
    {
      "valid": true,
      "evaluationPath": "/properties/bar/$ref/properties/bar-prop",
      "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar/properties/bar-prop",
      "instanceLocation": "/bar/bar-prop",
      "annotations": {
        "title": "bar-prop-title"
      }
    }
  ]
}
```

### Hierarchical

The "hierarchical" format is a tree structure that follows the evaluation path
during the validation process. Typically, it will resemble the schema as if all
referenced schemas were inlined in place of their associated by-reference
keywords.

For each output unit, evaluation results generated by any subschemas are
provided under a `details` property, and each such subschema will generate an
output unit. In order to accommodate keywords with multiple subschemas, the
value of this property MUST be an array of output units, even if only a single
output unit is produced. The sequence of output units within this list is not
specified and MAY be determined by the implementation.

All output units are included in this format.

```json "failing Results
{
  "baseUri": "https://json-schema.org/schemas/example",
  "valid": false,
  "details": {
    "valid": false,
    "evaluationPath": "",
    "schemaLocation": "https://json-schema.org/schemas/example#",
    "instanceLocation": "",
    "details": [
      {
        "valid": false,
        "evaluationPath": "/properties/foo",
        "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo",
        "instanceLocation": "/foo",
        "details": [
          {
            "valid": false,
            "evaluationPath": "/properties/foo/allOf/0",
            "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/0",
            "instanceLocation": "/foo",
            "errors": {
              "required": "Required properties [\"unspecified-prop\"] were not present"
            }
          },
          {
            "valid": false,
            "evaluationPath": "/properties/foo/allOf/1",
            "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1",
            "instanceLocation": "/foo",
            "droppedAnnotations": {
              "properties": [ "foo-prop" ],
              "title": "foo-title"
            },
            "details": [
              {
                "valid": false,
                "evaluationPath": "/properties/foo/allOf/1/properties/foo-prop",
                "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/properties/foo-prop",
                "instanceLocation": "/foo/foo-prop",
                "errors": {
                  "const": "Expected \"1\""
                },
                "droppedAnnotations": {
                  "title": "foo-prop-title"
                }
              },
              {
                "valid": true,
                "evaluationPath": "/properties/foo/allOf/1/additionalProperties",
                "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/additionalProperties",
                "instanceLocation": "/foo/other-prop"
              }
            ]
          }
        ]
      },
      {
        "valid": false,
        "evaluationPath": "/properties/bar",
        "schemaLocation": "https://json-schema.org/schemas/example#/properties/bar",
        "instanceLocation": "/bar",
        "details": [
          {
            "valid": false,
            "evaluationPath": "/properties/bar/$ref",
            "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar",
            "instanceLocation": "/bar",
            "droppedAnnotations": {
              "properties": [ "bar-prop" ],
              "title": "bar-title"
            },
            "details": [
              {
                "valid": false,
                "evaluationPath": "/properties/bar/$ref/properties/bar-prop",
                "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar/properties/bar-prop",
                "instanceLocation": "/bar/bar-prop",
                "errors": {
                  "minimum": "2 is less than or equal to 10"
                },
                "droppedAnnotations": {
                  "title": "bar-prop-title"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

```json "Passing Results
{
  "baseUri": "https://json-schema.org/schemas/example",
  "valid": false,
  "details": {
    "valid": true,
    "evaluationPath": "",
    "schemaLocation": "https://json-schema.org/schemas/example#",
    "instanceLocation": "",
    "annotations": {
      "title": "root",
      "properties": [
        "foo",
        "bar"
      ]
    },
    "details": [
      {
        "valid": true,
        "evaluationPath": "/properties/foo",
        "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo",
        "instanceLocation": "/foo",
        "details": [
          {
            "valid": true,
            "evaluationPath": "/properties/foo/allOf/0",
            "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/0",
            "instanceLocation": "/foo"
          },
          {
            "valid": true,
            "evaluationPath": "/properties/foo/allOf/1",
            "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1",
            "instanceLocation": "/foo",
            "annotations": {
              "title": "foo-title",
              "properties": [
                "foo-prop"
              ],
              "additionalProperties": [
                "unspecified-prop"
              ]
            },
            "details": [
              {
                "valid": true,
                "evaluationPath": "/properties/foo/allOf/1/properties/foo-prop",
                "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/properties/foo-prop",
                "instanceLocation": "/foo/foo-prop",
                "annotations": {
                  "title": "foo-prop-title"
                }
              },
              {
                "valid": true,
                "evaluationPath": "/properties/foo/allOf/1/additionalProperties",
                "schemaLocation": "https://json-schema.org/schemas/example#/properties/foo/allOf/1/additionalProperties",
                "instanceLocation": "/foo/unspecified-prop"
              }
            ]
          }
        ]
      },
      {
        "valid": true,
        "evaluationPath": "/properties/bar",
        "schemaLocation": "https://json-schema.org/schemas/example#/properties/bar",
        "instanceLocation": "/bar",
        "details": [
          {
            "valid": true,
            "evaluationPath": "/properties/bar/$ref",
            "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar",
            "instanceLocation": "/bar",
            "annotations": {
              "title": "bar-title",
              "properties": [
                "bar-prop"
              ]
            },
            "details": [
              {
                "valid": true,
                "evaluationPath": "/properties/bar/$ref/properties/bar-prop",
                "schemaLocation": "https://json-schema.org/schemas/example#/$defs/bar/properties/bar-prop",
                "instanceLocation": "/bar/bar-prop",
                "annotations": {
                  "title": "bar-prop-title"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Output validation schemas

For convenience, JSON Schema has been provided to validate output generated by
implementations. Its IRI is: <https://json-schema.org/draft/next/output/schema>

## Filtering

For various reasons, including human readability and performance during
evaluation, a user may desire to omit certain details from the output. To
address this, implementations MAY provide filtering output information.

This section defines several RECOMMENDED approaches to filtering, however
implementations MAY choose to provide these features in a way that suits them
and their users best.

For those implementations which support filtering behaviors, the behaviors MUST
be configurable and disabled by default.

### Annotation Filtering

Collecting and storing annotations can require increasing amounts of system
resources as evaluation proceeds. The strain on systems can be reduced by only
collecting those annotations which users care about.

For annotation filtering, implementations SHOULD provide a mechanism which
allows users to configure either the set annotations they would like to keep or
the set they would like to ignore.

For a "keep" list, an implementation MUST include in the output only those
annotations which are configured.

For an "ignore" list, an implementation MUST NOT include in the output those
annotations which are configured.

#### Annotations Required for Evaluation

Some implementations may be annotation-driven. That is, the evaluation of some
keywords depends on the annotation results of other keywords. For example, which
properties are seen by `additionalProperties` can be determined by looking at
the annotation results of `properties` and `patternProperties`.

For these implementations, the annotation results of these dependent keywords
must still be collected for proper evaluation. However, these annotations MUST
NOT be included in the output unless they are configured accordingly.

### Output Unit Pruning

In many cases, the output structures defined herein produce output units for
more than is necessary to identify evaluation issues. Implementations SHOULD
provide a mechanism which removes unimportant output units from the final
structure in order to highlight those units which impact the final result.

Reasons to omit output units may include, but are not limited to:

- Child output units whose validation result does not impact the validation
  result of the parent. For example, a subschema of an `anyOf` which has a false
  validation result when there exists a sibling subschema with a true validation
  result.
- Child output units which have a true validation result but contain no
  annotations.

Output units which include annotations MUST NOT be pruned.

Implementations which provide this behavior SHOULD provide configuration
mechanisms appropriate for their users' needs.

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

#### [RFC6901] {#rfc6901}

Bryan, P., Ed., Zyp, K., and M. Nottingham, Ed., "JavaScript Object Notation
(JSON) Pointer", RFC 6901, DOI 10.17487/RFC6901, April 2013,
<<https://www.rfc-editor.org/info/rfc6901>>.

#### [RFC8259] {#rfc8259}

Bray, T., Ed., "The JavaScript Object Notation (JSON) Data Interchange Format",
STD 90, RFC 8259, DOI 10.17487/RFC8259, December 2017,
<<https://www.rfc-editor.org/info/rfc8259>>.

#### [json-schema] {#json-schema}

Wright, A., Andrews, H., Hutton, B., and G. Dennis, "JSON Schema: A Media Type
for Describing JSON Documents", Work in Progress, Internet-Draft,
draft-bhutton-json-schema-01, June 2022,
<<https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-01>>.
