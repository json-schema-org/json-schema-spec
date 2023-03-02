# A Specification for Machine-Readable JSON Schema Output

JSON Schema is defined to be platform-independent.  As such, to increase compatibility across platforms, implementations SHOULD conform to a standard validation output format.  This section describes the minimum requirements that consumers will need to properly interpret validation results.

## Textual Format and Encoding

JSON Schema output is defined using the JSON Schema data instance model as described in [JSON Schema, section 4.2.1]().  Implementations MAY deviate from this as supported by their specific languages and platforms, however it is RECOMMENDED that the output be convertible to the JSON format defined herein via serialization or other means.

## Output Formats

This specification defines three output formats.  See the "Output Structure" section for the requirements of each format.

- **Flag** - A boolean which simply indicates the overall validation result with no further details.
- **List** - Provides validation information in a flat list structure.
- **Hierarchical** - Provides validation information in a hierarchical structure that follows the evaluation paths generated while processing the schema.

An implementation MUST provide the "flag" format and SHOULD provide at least one of the "list" or "hierarchical" formats. Implementations SHOULD specify in their documentation which formats they support.

## Minimum Information

Beyond the simplistic "flag" output, additional information is useful to aid in debugging a schema or instance.  Each sub-result MUST contain the information contained within this section at a minimum, unless otherwise specified.

A single object that contains all of these components is considered an "output unit."

Implementations MAY elect to provide additional information.

### Evaluation path

The evaluation path to the schema object that produced the output unit. The value MUST be expressed as a JSON Pointer, and it MUST include any by-reference applicators such as `$ref` or `$dynamicRef`.

<!--
The schema may not actually have a value at the location indicated by this pointer. It is provided as an indication of the traversal path only.
-->

```
/properties/width/$ref/allOf/1
```

Note that this pointer may not be resolvable by the normal JSON Pointer process due to the inclusion of these by-reference applicator keywords.

The JSON key for this information is `evaluationPath`.

### Schema Location

The absolute, dereferenced location of the schema object that produced the output unit.  The value MUST be expressed using the canonical IRI of the relevant schema resource plus a JSON Pointer fragment that indicates the schema object that produced the output.  It MUST NOT include by-reference applicators such as `$ref` or `$dynamicRef`.

<!--
Note that "absolute" here is in the sense of "absolute filesystem path" (meaning the complete location) rather than the "absolute-IRI" terminology from RFC 3987 (meaning with scheme and without fragment). Schema locations will have a fragment in order to identify the specific schema object.
-->

```
https://example.com/schemas/common#/$defs/allOf/1
```

The JSON key for this information is `schemaLocation`.

### Instance Location

The location of the JSON value within the instance being validated.  The value MUST be expressed as a JSON Pointer.

The JSON key for this information is `instanceLocation`.

### Errors

Any errors produced by the validation.  This property MUST NOT be included if the validation was successful.  The value
for this property MUST be an object where the keys are the names of keywords and the values are the error message produced by the associated keyword.

If the subschema itself is producing the error, that error MUST be listed with an empty string key.

<!--
Although there may be other cases where a subschema can produce an error, the most common case is the "false" schema.  In cases like these, there is no keyword that produces the error, so there is nothing to use as a key.  Thus the empty string is used instead.
-->

The specific wording for the message is not defined by this specification.  Implementations will need to provide this.

The JSON key for this information is `errors`.

### Annotations

Any annotations produced by the evaluation.  This property MUST NOT be included if the validation result of the containing subschema was unsuccessful.

The value for this property MUST be an object where the keys are the names of keywords and the values are the annotations
produced by the associated keyword.

Each keyword defines its own annotation data type (e.g. `properties` produces a list of keywords, whereas `title` produces a string).

The JSON key for this information is `annotations`.

### Dropped Annotations

Any annotations produced and subsequently dropped by the evaluation due to an unsuccessful validation result of the containing subschema. This property MAY be included if the validation result of the containing subschema was unsuccessful.  It MUST NOT be included if the local validation result of the containing subschema was successful.

Implementations that wish to provide these annotations MUST NOT provide them as their default behavior.  These annotations MUST only be included by explicitly configuring the implementation to do so.

The value for this property MUST be an object where the keys are the names of keywords and the values are the annotations produced by the associated keyword.

Each keyword defines its own annotation data type (e.g. `properties` produces a list of keywords, whereas `title` produces a string).

The JSON key for this information is `droppedAnnotations`.

### Results from Subschemas

Evaluation results generated by applying a subschema to the instance or a child of the instance. Keywords which have multiple subschemas (e.g. `anyOf`) will generally generate an output unit for each subschema.  In order to accommodate potentially multiple results, the value of this property MUST be an array of output units, even if only a single output unit is produced.

For "list", this property will appear only at the root output unit and will hold all output units in a flat list.

For "hierarchical", this property will contain results in a tree structure where each output unit may itself have further nested results.

The sequence of output units within this list is not specified and MAY be determined by the implementation.  Sets of output units are considered equivalent if they contain the same units, in any order.

The JSON key for these additional results is `details`.

## Output Structure

The output MUST be an object containing a boolean property named `valid`.  When additional information about the result is required, the output MUST also contain `details` as described below.

- `valid` - a boolean value indicating the overall validation success or failure
- `details` - the collection of results produced by subschemas

For these examples, the following schema and instances will be used.

```jsonc
// schema
{
  "$schema": "https://json-schema.org/draft/next/schema",
  "$id": "https://json-schema.org/schemas/example",
  "type": "object",
  "title": "root",
  "properties": {
    "foo": {
      "allOf": [
        { "required": [ "unspecified-prop" ] },
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
    "bar": {
      "$ref": "#/$defs/bar"
    }
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

// failing instance
{
  "foo": {"foo-prop": "not 1", "other-prop": false},
  "bar": {"bar-prop": 2}
}

// passing instance
{
  "foo": {
    "foo-prop": 1,
    "unspecified-prop": true
  },
  "bar": {"bar-prop": 20}
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

In the simplest case, merely the boolean result for the `valid` valid property needs to be fulfilled.  For this format, all other information is explicitly omitted.

```json
{
  "valid": false
}
```

Because no errors or annotations are returned with this format, it is RECOMMENDED that implementations use short-circuiting logic to return failure or success as soon as the outcome can be determined.  For example, if an `anyOf` keyword contains five subschemas, and the second one passes, there is no need to check the other three.  The logic can simply return with success.

### List

The "list" structure is a flat list of output units contained within a root output unit.

The root output unit contains `valid` for the overall result and `details` for the list of specific results.  All other information is explicitly omitted from the root output unit.  If the root schema produces errors or annotations, then the output node for the root MUST be present within the root output unit's `details` list with those errors or annotations.

Output units which do not contain errors or annotations SHOULD be excluded from this format, however implementations MAY choose to include them for
completeness.

```jsonc
// failing results
{
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

// passing results
{
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

The "Hierarchical" structure is a tree structure that follows the evaluation path during the validation process.  Typically, it will resemble the schema as if all referenced schemas were inlined in place of their associated by-reference keywords.

All output units are included in this format.

The location properties of the root output unit MAY be omitted.

```jsonc
// failing results (errors)
{
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

// passing results (annotations)
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
```

## Output validation schemas

For convenience, JSON Schema has been provided to validate output generated by implementations.  Its IRI is: https://json-schema.org/draft/next/output/schema
