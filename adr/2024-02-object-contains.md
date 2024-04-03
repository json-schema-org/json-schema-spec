# `contains` and JSON Objects

* Status: Proposed, accepted, reconsidered, and ultimately reverted.
* Deciders: @gregsdennis, @jdesrosiers, @handrews, @awwright, @karenetheridge, @relequestual (with input from a couple non-core members)
* Date: 2023-11-14 (documented 2024-02-09)

Technical Story:

- Original proposal [#1077](https://github.com/json-schema-org/json-schema-spec/issues/1077) and [PR](https://github.com/json-schema-org/json-schema-spec/pull/1092)
- Reversion discussion [#1358](https://github.com/json-schema-org/json-schema-spec/issues/1358) and [PR](https://github.com/json-schema-org/json-schema-spec/pull/1452)

## Context and Problem Statement

[2021-02]
The original proposal was for `contains` to apply to objects as well as arrays since there was no functionality to do so.
The discussion covered the options of modifying `contains` or introducing a new `objectContains` (or similar) keyword set (also needs separate min/max).
The decision was voted on and modifying `contains` won.

[2021-06]
A change was applied.

[2022-12]
With the team shifting focus to stability between spec releases, the question was raised again with the argument that allowing `contains` to apply to objects is a breaking change.
It was conceded that the better approach would be to retain `contains` only for arrays and introduce a new keyword set to apply to objects.

[2023-11]
The change was applied (reverted to previous behavior).

## Decision Drivers <!-- optional -->

* The original decision to allow `contains` to apply to objects was driven by the fact that no such functionality existed.
* The decision to revert was driven by a desire to not break current usages of `contains`.

## Considered Options

* `contains` could be modified to apply to objects.
* a new keyword set (e.g. `objectContains` along with associated min/max) could be added.

## Decision Outcome

Ultimately, `contains` will continue to apply to only arrays.
New keywords will need to be introduced to apply to objects.
(Such a proposal has not yet been made.)

### Positive Consequences <!-- optional -->

* Schemas which currently use `contains` without a `type: array` specifier will not suddenly start applying to objects also.

### Negative Consequences <!-- optional -->

* The functionality of `contains` as applied to objects is still unsupported.

## Pros and Cons of the Options <!-- optional -->

### Change `contains`

(Example provided recently by a user in [Slack](https://json-schema.slack.com/archives/C5CF75URH/p1707258032879409))

The requirement is that an object may contain any number of properties, but one and only one of them must contain an object with a `title` property.

✔️ valid
```json
{
  "foo": { "title": "a title" },
  "bar": { "baz": 42 }
}
```

❌ invalid
```json
{
  "foo": { "quux": false },
  "bar": { "baz": 42 }
}
```

❌ invalid
```json
{
  "foo": { "title": "a title" },
  "bar": { "title": "a title" }
}
```

Currently, this is impossible since there is no way to conditionally count property values.
However, with `contains` applying to objects, the following is possible:

```json
{
  "type": "object",
  "contains": {
    "type": "object",
    "required": ["title"]
  },
  "minContains": 1,
  "maxContains": 1
}
```

* Good, because it provides functionality that previously did not exist
* Bad, because is can potentially break some schemas
* … <!-- numbers of pros and cons can vary -->

### New keywords

Same examples as [changing `contains`](#change-contains), except we use new keywords instead.

The schema would be something like this instead:

```json
{
  "type": "object",
  "objectContains": {
    "type": "object",
    "required": ["title"]
  },
  "objectMinContains": 1,
  "objectMaxContains": 1
}
```

* Good, because it provides functionality that previously did not exist
* Good, because it doesn't break anyone
* Bad, because we have to introduce three new keywords
* … <!-- numbers of pros and cons can vary -->
