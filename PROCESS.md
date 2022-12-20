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
There MUST be a stable canonical URL for referencing any specification that
follows this process. If the specification is made available from any other
URLs, they SHOULD redirect to the canonical URL. If the canonical URL is changed
in the future, all previous canonical URLs MUST remain accessible as redirects
to the current URL.

## Compatible Releases
Everything in the specification is considered "stable" by default and subject to
compatibility guarantees. Any changes to stable behaviors in the specification
MUST be backward-compatible with previous versions of the specification and MUST
NOT change in ways that could be problematic for forward-compatibility.
Therefore, it's not necessary for implementations to support previous versions
of the specification separately (excluding "draft" releases).

_Note: How, when, and how often the specification will be updated are all open
questions that will be decided before any changes are issued following the
initial release. Because releases are compatible, these things shouldn't affect
choices made by implementers or schema authors the same way the "draft" releases
did._

### Experimental Behaviors
The specification MAY include sections that introduce experimental behaviors.
These sections MUST be clearly marked and aren't subject to the compatibility
guarantees of stable behaviors. Experimental behaviors MUST be compatible with
all current stable behaviors.

_Note: How and when experimental behaviors are promoted to stable behaviors is
an open discussion and will be defined before a promotion is considered. The
process of how an experimental behavior goes from proposal to stable will be
defined in more detail and is likely to evolve as we learn what works best. Such
evolution will always be compatible with previous versions of this document._

### Compliance
Implementations that express support for a particular release MUST support all
of that release's stable behaviors and SHOULD support any experimental
behaviors. Because releases are compatible, expressing support for a given
release implies support for all previous releases (excluding "draft" releases).
Support for previous releases might have limitations if an implementation
chooses not to support a deprecated behavior.

### Deprecation
Stable behaviors MAY be marked as "deprecated". Implementations SHOULD support
these behaviors to maintain backward compatibility. Schema authors SHOULD
migrate away from using deprecated behaviors as implementations MAY begin
dropping support for these behaviors at some point.
