# Output formatting

## Summary

JSON Schema is defined to be platform-independent.  As such, to increase compatibility across platforms, implementations SHOULD conform to a standard validation output format.  This section describes the minimum requirements that consumers will need to properly interpret validation results.

## Format

JSON Schema output is defined using JSON.  Implementations MAY deviate from this as supported by their specific languages and platforms, however it is RECOMMENDED that the output be convertible to the JSON format defined herein via serialization or other means.

## Output Levels **<span style="color:red">(is "levels" the right word?)</span>**

This specification defines four levels of output.  See the *Output Structure* section for the requirements of each level.

- **Pass/Fail** - A boolean which simply indicates whether the schema was validated.
- **Basic** - Provides validation information in a flat list structure.
- **Detailed** - Provides validation information in a condensed hierarchical structure based on the structure of the schema.
- **Verbose** - Provides validation information in an uncondensed hierarchical structure that matches the exact structure of the schema.

Implementations SHOULD specify which levels of validation they support.

## Minimum Information

Beyond a simplistic pass/fail, additional information is useful to aid in debugging a schema or instance.  Each sub-result SHOULD contain the information contained within this section at a minimum.

A single object that contains all of these components is considered an output unit.

Implementations MAY elect to provide additional information.

### Keyword relative location

The relative location of the validating keyword that follows the validation path.  The value MUST be expressed as a JSON Pointer, and it MUST include `$ref` or `$recursiveRef` segments for any reference jumps **<span style="color:red">(wording?)</span>**.

```
#/properties/minLength/$ref/minimum
```

The JSON key for this information is `keywordLocation`.

### Keyword absolute location

The absolute, dereferenced location of the validating keyword.  The value MUST be expressed as an absolute URI, and it MUST NOT include `$ref` or `$recursiveRef` segments.

```
http://json-schema.org/draft-08/schema#/$defs/nonNegativeInteger/minimum
```

This information MAY be omitted if either the relative location contains no references or if the schema does not declare an absolute URI as its `$id`.

The JSON key for this information is `absoluteKeywordLocation`.

### Instance location

The location of the JSON value within the instance being validated.  The value MUST be expressed as a JSON Pointer.

The JSON key for this information is `instanceLocation`.

### Error/Annotation

The error or annotation that is produced by the validation.

For errors, the specific wording for the message is not defined by this specification.  Implementations will need to provide this.

The JSON key for failed validations is `error`; for successful validations it is `annotation`.

### Nested results

For the two hierarchical structures, this property will hold nested errors and annotations.

The JSON key for nested results in failed validations is `errors`; for successful validations it is `annotations`.

## Output Structure

The output MUST be an object containing two properties

- `valid` - a boolean value indicating the overall validation success or failure
- `errors` - the collection of errors or annotations produced by a failed validation
- `annotations` - the collection of errors or annotations produced by a successful validation

For these examples, the following schema and instance will be used.

```json
{
  "$id": "http://example.com/polygon#",
  "$schema": "http://json-schema.org/draft-08/schema#",
  "$defs": {
    "point": {
      "type": "object",
      "properties": {
        "x": { "type": "number" },
        "y": { "type": "number" }
      },
      "additionalProperties": false,
      "required": [ "x", "y" ]
    }
  },
  "type": "array",
  "items": { "$ref": "#/$defs/point" },
  "minItems": 3
}

[
  {
    "x": 2.5,
    "y": 1.3,
  },
  {
    "x": 1,
    "z": 6.7
  }
]
```

This instance will fail validation and produce errors, but it's trivial to deduce examples for passing schemas that produce annotations.

Specifically, the errors it will produce are:

1. The second element in the `vertices` property is missing a `y` property.
2. The second element in the `vertices` property has a disallowed `z` property.
3. There are only two vertices, but three are required.

Note that the wording in the error messages depicted in these examples is not a requirement of this specification.  Implementations SHOULD craft error messages tailored for their audience.

### Pass/Fail

In the simplest case, merely the boolean result for the `valid` valid property needs to be fulfilled.

```json
{
  "valid": false
}
```

Because no errors or annotations are returned with this format, it is RECOMMENDED that implementations use short-circuiting logic to return failure or success as soon as the outcome can be determined.  For example, if an `anyOf` keyword contains five sub-schemas, and the second one passes, there is no need to check the other three.  The logic can simply return with success.

### Basic

The **Basic** structure is a flat list of output units.

```json
{
  "valid": false,
  "errors": [
    {
      "keywordLocation": "#",
      "instanceLocation": "#",
      "error": "A subschema had errors."
    },
    {
      "keywordLocation": "#/items/$ref",
      "absoluteKeywordLocation":
        "http://example.com/polygon#/definitions/point",
      "instanceLocation": "#/1",
      "error": "A subschema had errors."
    },
    {
      "keywordLocation": "#/items/$ref/required",
      "absoluteKeywordLocation":
        "http://example.com/polygon#/definitions/point/required",
      "instanceLocation": "#/1",
      "keyword": "required",
      "error": "Required property 'y' not found."
    },
    {
      "keywordLocation": "#/items/$ref/additionalProperties",
      "absoluteKeywordLocation":
        "http://example.com/polygon#/definitions/point/additionalProperties",
      "instanceLocation": "#/1/z",
      "error": "Additional property 'z' found but was invalid."
    },
    {
      "keywordLocation": "#/minItems",
      "instanceLocation": "#",
      "keyword": "minItems",
      "error": "Expected at least 3 items but found 2"
    }
  ]
}
```

### Detailed

The **Detailed** structure is based on the schema and can be more readable for both humans and machines.  Having the structure organized this way makes associations between the errors more apparent.  For example, the fact that the missing `y` property and the extra `z` property both stem from the same location in the instance is not immediately obvious in the **Basic** structure.  In a hierarchy, the correllation is more easily identified.

The following rules govern the construction of the results object:

1. All applicator keywords (`*Of`, `$ref`, `if`/`then`/`else`, etc.) require a node.
2. Nodes that have no children are removed.
3. Nodes that have a single child are replaced by the child.

Branch nodes do not require an error message or an annotation.

```json
{
  "valid": false,
  "keywordLocation": "#",
  "instanceLocation": "#",
  "errors": [
    {
      "valid": false,
      "keywordLocation": "#/items/$ref",
      "absoluteKeywordLocation":
        "http://example.com/polygon#/definitions/point",
      "instanceLocation": "#/1",
      "errors": [
        {
          "valid": false,
          "keywordLocation": "#/items/$ref/required",
          "absoluteKeywordLocation":
            "http://example.com/polygon#/definitions/point/required",
          "instanceLocation": "#/1",
          "error": "Required property 'y' not found."
        },
        {
          "valid": false,
          "keywordLocation": "#/items/$ref/additionalProperties",
          "absoluteKeywordLocation":
            "http://example.com/polygon#/definitions/point/additionalProperties",
          "instanceLocation": "#/1/z",
          "error": "Additional property 'z' found but was invalid."
        }
      ]
    },
    {
      "valid": false,
      "keywordLocation": "#/minItems",
      "instanceLocation": "#",
      "error": "Expected at least 3 items but found 2"
    }
  ]
}
```

### Verbose

The **Verbose** structure is a fully realized hierarchy that exactly matches that of the schema.  This structure has applications in form generation and validation where the error's location is important.

The primary difference between this and the **Detailed** structure is that *all* results are returned.  This includes sub-schema validation results that would otherwise be removed (e.g. annotations for failed validations, successful validations inside a `not` keyword, etc.).  Because of this, it is RECOMMENDED that each node also carry a `valid` property to indicate the validation result for that node.

Because this output structure can be quite large, a smaller example is given here for brevity.  The full output structure of the example above can be found [here](standardized-output-verbose.json)

```json
// schema
{
  "$id": "http://example.com/polygon#",
  "$schema": "http://json-schema.org/draft-08/schema#",
  "type": "object",
  "properties": {
    "validProp": true,
  },
  "additionalProperties": false
}

// instance
{
  "validProp": 5,
  "disallowedProp": "value"
}

// result
{
  "valid": false,
  "keywordLocation": "#",
  "instanceLocation": "#",
  "errors": [
    {
      "valid": true,
      "keywordLocation": "#/type",
      "instanceLocation": "#"
    },
    {
      "valid": true,
      "keywordLocation": "#/properties",
      "instanceLocation": "#"
    },
    {
      "valid": false,
      "keywordLocation": "#/additionalProperties",
      "instanceLocation": "#",
      "errors": [
        {
          "valid": false,
          "keywordLocation": "#/additionalProperties",
          "instanceLocation": "#/disallowedProp",
          "error": "Additional property 'disallowedProp' found but was invalid."
        }
      ]
    }
  ]
}
```
