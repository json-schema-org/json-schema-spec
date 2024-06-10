# JSON Schema Proposal: <TODO>

## Abstract

The current approach to extending JSON Schema by providing custom keywords is
very implementation-specific and therefore not interoperable.

To address this deficiency, this document proposes vocabularies as a concept
and a new Core keyword, `$vocabulary` to support it.

While the Core specification will define and describe vocabularies in general,
the Validation specification will also need to change to incorporate some of
these ideas. This proposal will be updated as necessary to reflect the changes
in both documents.

## Current Status

This proposal was originally integrated into both specifications, starting with
the 2019-09 release, and has been extracted as the feature is incomplete. The
feature, at best effort, was extracted in such a way as to retain the
functionality present in the 2020-12 release.

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

The specification allows implementations to support user-defined keywords.
However, this vague and open allowance has drawbacks.

1. This isn't a requirement, it is a permission. An implementation could just as
   easily (_more_ easily) choose _not_ to support user-defined keywords.
2. There is no prescribed mechanism by which an implementation should provide
   this support. As a result, each implementation that _does_ have the feature
   supports it in different ways.
3. Support for any given user-defined keyword will be limited to that
   implementation. Unless the user explicitly configures another
   implementation, their keywords likely will not be supported.

This exposes a need for the specification(s) to define a way for implementations
to share knowledge of a keyword or group of keywords.

### Solution

<!-- What is the solution?  Include examples of use. -->

### Limitations

<!-- Are there any limitations inherent to the proposal? -->

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

## [Appendix] Change Log

* [MMMM YYYY] Created

## [Appendix] Champions

| Champion                   | Company | Email                   | URI                              |
|----------------------------|---------|-------------------------|----------------------------------|
| Your Name                  |         |                         | < GitHub profile page >          |
