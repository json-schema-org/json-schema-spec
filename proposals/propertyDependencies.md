# JSON Schema Proposal: `propertyDependencies` Keyword

## Abstract

This document proposes a change to the JSON Schema Core specification and
Applicator vocabulary by adding the `propertyDependencies` keyword.

## Note to Readers

The issues list for this proposal can be found at
<https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aissue+propertydependencies>.

For additional information, see <https://json-schema.org/>.

To provide feedback, use this issue tracker or any of the communication methods
listed on the homepage.

## Table of Contents

## Conventions and Terminology

All conventions and terms used and defined by the JSON Schema Core specification
also apply to this document.

## Overview

### Problem Statement

<!-- What problem exists that needs solving? -->

### Solution

<!-- What is the solution? -->

### Alternatives

<!-- What other options have been considered? (summary, not detailed) -->

### Limitations

<!-- Are there any limitations inherent to the proposal? -->

### Examples

<!-- How will this feature be used? -->

## Proposal

### Target for Change

<!-- Where does this change go? -->

This proposal will add the {{propertyDependencies}} section contained herein as
a subsection of JSON Schema Core, section 10.2.2 "Keywords for Applying
Subschemas Conditionally."

<!-- What is the exact change? -->

### New Keyword: `propertyDependencies` {#propertyDependencies}

This keyword specifies subschemas that are evaluated if the instance is an
object and contains a certain property with a certain string value.

This keyword's value MUST be an object. Each value in the object MUST be an
object whose values MUST be valid JSON Schemas.

If the outer object key is a property in the instance and the inner object key
is equal to the value of that property, the entire instance must validate
against the schema. Its use is dependent on the presence and value of the
property.

Omitting this keyword has the same behavior as an empty object.

## Champions

| Champion                   | Company | Email                   | URI                              |
|----------------------------|---------|-------------------------|----------------------------------|
| Jason Desrosiers           | Postman | <tbd> | <https://github.com/jdesrosiers> |
