8. Schema References With "$ref"

The "$ref" keyword is used to reference a schema, and provides the ability to validate recursive structures through self-reference.

An object schema with a "$ref" property MUST be interpreted as a "$ref" reference. The value of the "$ref" property MUST be a URI Reference. Resolved against the current URI base, it identifies the URI of a schema to use. All other properties in a "$ref" object MUST be ignored.

The URI is not a network locator, only an identifier. A schema need not be downloadable from the address if it is a network-addressable URL, and implementations SHOULD NOT assume they should perform a network operation when they encounter a network-addressable URI.

A schema MUST NOT be run into an infinite loop against a schema. For example, if two schemas "#alice" and "#bob" both have an "allOf" property that refers to the other, a naive validator might get stuck in an infinite recursive loop trying to validate the instance. Schemas SHOULD NOT make use of infinite recursive nesting like this; the behavior is undefined. 
