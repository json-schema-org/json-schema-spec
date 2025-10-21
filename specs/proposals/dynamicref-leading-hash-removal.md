# JSON Schema Proposal: Remove Leading `#` from `$dynamicRef` Values

## Status
**Proposal** - Under consideration

## Summary
This proposal addresses the inconsistency between `$dynamicRef` and `$dynamicAnchor` syntax by removing the requirement for leading `#` in `$dynamicRef` values, transitioning from fragment-only IRI syntax to plain text identifiers.

## Motivation

### Current Inconsistency
Currently, JSON Schema has an acknowledged inconsistency between related keywords:
- `$dynamicAnchor`: uses plain text (e.g., `"node"`)
- `$dynamicRef`: uses fragment-only IRI syntax (e.g., `"#node"`)

As noted in the specification footnote: "Although, for historical reasons, the value of `$dynamicRef` still uses a fragment-only IRI syntax, e.g. `#foo`."

### Technical Rationale
After removing the bookending and initial resolution steps in previous changes (#1064, #1140), there's no technical reason for `$dynamicRef` values to look like URIs anymore. The fragment-only IRI requirement adds unnecessary complexity without providing functional benefit.

## Proposal

### Three Options Considered

#### Option 1: Remove Leading `#` Completely
**Change**: `"$dynamicRef": "#meta"` → `"$dynamicRef": "meta"`

**Pros:**
- Complete consistency with `$dynamicAnchor`
- Simplified implementation (no IRI fragment validation)
- Cleaner, more intuitive syntax

**Cons:**
- Breaking change for all existing schemas
- Immediate migration burden on ecosystem

#### Option 2: Deprecate Leading `#` (Recommended)
**Change**: Support both formats with deprecation path

**Pros:**
- Backward compatibility maintained
- Gradual migration path
- Ecosystem-friendly transition

**Cons:**
- Implementation complexity during transition
- Specification documentation overhead

#### Option 3: Keep Current Behavior
**Change**: No change

**Pros:**
- Zero breaking changes
- No migration required

**Cons:**
- Perpetuates acknowledged inconsistency
- Maintains unnecessary complexity

## Recommended Approach: Option 2 (Deprecation Path)

### Specification Changes
The value of `$dynamicRef` MUST be either:
1. **A plain name fragment identifier (recommended)**: `"node"`
2. **A fragment-only IRI (deprecated)**: `"#node"`

The plain name format is preferred and the fragment-only IRI format is deprecated and will be removed in a future version.

### Implementation Timeline
- **Phase 1** (6-12 months): Support both formats, mark `#` as deprecated
- **Phase 2** (12-24 months): Issue warnings for `#` usage  
- **Phase 3** (24+ months): Remove support for `#` format

## Examples

### Current Usage
```json
{
  "$schema": "https://json-schema.org/v1",
  "$id": "https://example.com/tree",
  "$dynamicAnchor": "node",
  
  "type": "object",
  "properties": {
    "children": {
      "type": "array", 
      "items": { "$dynamicRef": "#node" }
    }
  }
}
```

### After Migration
```json
{
  "$schema": "https://json-schema.org/v1",
  "$id": "https://example.com/tree",
  "$dynamicAnchor": "node",
  
  "type": "object",
  "properties": {
    "children": {
      "type": "array",
      "items": { "$dynamicRef": "node" }
    }
  }
}
```

### During Transition (Both Valid)
```json
{
  "legacy": { "$dynamicRef": "#node" },    // Deprecated but valid
  "preferred": { "$dynamicRef": "node" }   // New recommended format
}
```

## Migration Strategy

### For Schema Authors
- Update `$dynamicRef` values to remove leading `#`
- Use migration tools when available
- Test schemas with updated validators

### For Implementation Authors  
- Accept both formats during transition period
- Issue deprecation warnings for `#` format
- Update documentation and examples

### Tooling Support
- Linters should warn about deprecated `#` usage
- Code generators should emit new format
- Migration tools should automate conversion

## Impact Analysis

### Breaking Changes
- **Option 1**: Immediate breaking change for all `$dynamicRef` usage
- **Option 2**: No immediate breaking changes, controlled migration
- **Option 3**: No breaking changes

### Ecosystem Considerations
- Large number of existing schemas use `$dynamicRef` with `#`
- Meta-schemas and validation tools require updates
- Documentation and examples need revision

### Benefits
- Resolves long-standing inconsistency
- Simplifies implementation requirements  
- Improves developer experience
- Aligns with existing `$dynamicAnchor` pattern

## Conclusion

The deprecation approach (Option 2) provides the best balance between technical improvement and ecosystem stability. It addresses the acknowledged "historical reasons" inconsistency while providing a practical migration path that minimizes disruption to existing JSON Schema users.

This change would complete the cleanup begun with the removal of bookending requirements, resulting in a more consistent and simplified dynamic reference system.
