# JSON Schema Specification Development Process
This document formally defines the process used to evolve the JSON Schema
specification as of the first stable release in 2023. It applies to the core
specification and the specifications for any dialects and vocabularies
maintained by the JSON Schema Org, but it doesn't necessarily apply to
everything the JSON Schema Org maintains. For example, media type registration
follows the IETF process. Certain components used within JSON Schema, such as
Relative JSON Pointer, may also follow a separate process.

This process doesn't apply to third-party dialects, vocabularies, or other
extensions. However, third-parties are welcome to use this as a basis for the
process they use for their specifications.

_**This process is under development. The details will evolve over time, but
changes will remain compatible with previous versions of this document.**_

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Canonical URLs
There MUST be a canonical URL for referencing the current version of any
specification that follows this process. If the specification is made available
from any other URLs, they SHOULD redirect to the canonical URL. If the canonical
URL is changed in the future, all previous canonical URLs MUST remain accessible
as redirects to the current URL.

## Compatible Releases
Any part of the specification that is considered "stable" is subject to
compatibility guarantees. Any changes to stable behaviors in the specification
MUST be backward-compatible with previous versions of the specification and MUST
NOT change in ways that could be problematic for forward compatibility.

_Note: How, when, and how often the specification will be updated are all open
questions that will be decided before any changes are issued following the
initial release._

Compatibility is defined with respect to the true/false validation result of a
schema. If an instance is valid or invalid against a schema according to one
release, all other releases including future releases MUST define the same
validation result or define the result to be indeterminate. An indeterminate
result is neither valid nor invalid.

_Note: Additional compatibility constraints may be added in the future such as
output format results._
