8. Schema References With "$ref"

The "$ref" keyword can be used to reference a schema which is to be applied to the current instance location. "$ref" is an assertion key word, which MUST result in a boolean assertion when the resolved schema is applied.

The use of "$ref" MUST NOT effect adjacent keywords.

A schema with a "$ref" property where the value of the property is a string MUST be interpreted as a "$ref" reference. The value of the "$ref" property MUST be a URI reference.

According to RFC 3986, a URI may be a locator, a name, or both. 

A URI reference without a protocol MUST be considered a plain name fragment, and the URI reference location resolved according to section 9.2. The "$id" Keyword.

A URI reference with a network addressable locator defined MUST be provided with an interface to retrieve the network accessible resource.

Any URI may be resolvable by use of externally defined references as per section 9.2.2. External References.


Implementations SHOULD NOT attempt to dereference a schema by replacing any "$ref" keyword and value with a resolved reference schema. A schema author may want to reference schemas that they cannot control, which may be annotated to indicate a specific version of JSON Schema. Implementations MAY offer to dereference a schema by inclusion, however, it SHOULD NOT be the default behaviour, and by offering such, MUST comply with the following requirements when doing so:

- They MUST be able to re-evaluate the use of "$id" and "$ref" from external schemas
- They MUST throw an error if a resolved schema defines a different schema version to the base JSON Schema document
- They MUST be able to detect cyclical references (infinite loops), and MUST throw an error if encountered or allow only non cyclical references to be dereferenced
- The result MUST NOT effect previously adjacent keywords to the original "$ref" keyword
