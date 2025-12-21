# JSON Schema Meta-Schema

The *meta.json* file contains the meta-schema for the in-progress JSON Schema
specifications. You can find the latest published version on the [JSON Schema
website](https://json-schema.org).

## Table of Contents

## Meta-Schemas

A meta-schema is a schema that itself describes a schema. This is possible
because JSON Schema can be written as JSON.

Furthermore, the JSON Schema meta-schema is self-validating. That is, its JSON
form validates against the meta-schema.

## Extensions and Unknown Keywords

The JSON Schema specification allows for extension keywords to be introduced,
however it also disallows unknown keywords. While seemingly contradictory, the
meta-schema has been set up to allow for extension.

For this example, we'll add two hypothetical keywords: `odds` and `evens`, which
validate the odd and even indexed values in an array, respectively.

First, create a schema that just defines the new keywords.

```json
{
  "$schema": "https://json-schema.org/v1",
  "$id": "https://example.com/schema/odds-evens",

  "properties": {
    "odds": { "$dynamicRef": "meta" },
    "evens": { "$dynamicRef": "meta" }
  }
}
```

Second, create a new meta-schema that

- references the above schema
- references the JSON Schema meta-schema
- includes an extension point in a `$defs`

```json
{
  "$schema": "https://json-schema.org/v1",
  "$id": "https://example.com/schema/odds-evens-extension",

  "$ref": "https://json-schema.org/v1",

  "$defs": {
    "extension": {
      "$dynamicAnchor": "extension",
      "$ref": "https://example.com/schema/odds-evens"
    }
  }
}
```

Now you can use `https://example.com/schema/odds-evens-extension` in your
schemas to make use of the new `odds` and `evens` keywords.

```json
{
  "$schema": "https://example.com/schema/odds-evens-extension",
  "$id": "https://example.com/schema/model",

  "type": "array",
  "odds": { "type": "string" },
  "evens": { "type": "number" }
}
```

This schema will validate arrays whose items alternate between strings and
numbers.
