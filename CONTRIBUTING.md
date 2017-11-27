# Guidelines for contributing to the JSON Schema project

## Issues

Issues should identify an problem, enhancement, or use case; and propose some course of action for the draft. For alternate support channels, [see the json-schema.org website](http://json-schema.org/) or the [jsonschema tag on stackoverflow](https://stackoverflow.com/tags/jsonschema).

## Milestones

Each milestone is an estimation of the work that will be done for the next draft.  Milestones are typically named after the meta-schema draft number, and the *open* milestone with the lowest draft number is the current active project.

Issues may be removed from a milestoned due to lack of consensus, lack of anyone with the correct expertise to make a PR, or simply because we wish to publish a draft and defer the remaining issues to the next draft.

Numbered milestones other than the lowest-numbered one are used to tentatively organize future work, but may be completely reorganized once work on that draft actually begins.

The `draft-future` milestone is for issues for which there is an agreement that they should be addressed, but no specific timeline.

## Pull requests

We welcome pull requests, both for editorial suggestions and to resolve open issues.

If the pull request would solve a particular issue, reference the issue in the pull request description.

Changes that would affect implementation behavior should typically be opened as an issue first.

Pull requests should be made to master.

Most PRs, including all PRs that impact implementation behavior, will be left open for a minimum of 14 days.  Minor wording fixes may be merged more quickly once approved by a project member.

## Internet-Drafts and meta-schemas

An Internet-Draft (I-D) publication replaces previous documents in their entirety.

I-D updates that are purely editorial bug fixes (with no implementation-impacting changes) will continue to use the same meta-schemas as the version that they fix.

I-D updates that impact behavior, whether as a bug fix or a new, changed, or removed feature, will have new meta-schemas published along with them.

The meta-schema URI is used to differentiate between different vocabularies (currently only Validation and Hyper-Schema).

The authority on JSON Schema behavior is the respective specification document, not the JSON meta-schema; the JSON version of the meta-schema is maintained in an informative capacity only.

As an informative document, bugs in the meta-schema may be fixed in place to align them with the normative specification.  Examples of in-place fixes include adding an accidentally omitted keyword or fixing an incorrect type.  By definition, no correct schema should fail validation against the meta-schema after a bug fix, although previously validating incorrect schemas may start to (correctly) fail validation.

## Conduct

All official channels including the mailing list, GitHub organization, and Freenode channel, follow the IETF Guidelines for Conduct as specified in [RFC7154](https://tools.ietf.org/html/rfc7154).
