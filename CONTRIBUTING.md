# JSON Schema

## Issues

Issues should identify an problem, enhancement, or use case; and propose some course of action for the draft. For alternate support channels, [see the json-schema.org website](http://json-schema.org/).

Issues waiting for user feedback will be tagged "Feedback". Up to two weeks will be given for feedback to be provided.

If there seems to be consensus around an issue, the issue will be taken up (and tagged with a milestone) or closed.

## Pull requests

We welcome pull requests, both for editorial suggestions and to resolve open issues.

If the pull request would solve a particular issue, reference the issue in the pull request description.

Changes that would affect implementation behavior should typically be opened as an issue first.

Pull requests should be made to master.

## Writing guidelines

An Internet-Draft publication replaces previous documents in their entirety. Behavorial changes to the document should be reverse-compatible with existing written schemas, or allow for implementations to implement old and removed behavior.

The meta-schema URI is used to differentiate between different vocabularies (Validation and Hyper-schema). The authority on JSON Schema behavior is the respective specification document, not the JSON meta-schema; the JSON version of the meta-schema is maintained in an informative capacity only. However, the meta-schema URI referred to in the document should desginate a fixed JSON document, and updates to this document should be publised at a new URI. Updates should be made to the meta-schema and published at a time when it becomes desirable for new behaviors and features to be described in this fashion.

The "master" branch should always be Internet-Draft ready. The document editor is responsible for ensuring that the writing meets best practices for an I-D. An I-D will be published from "master" branch when wider review is desired, at the editor's discretion.

## Conduct

All official channels including the mailing list, GitHub organization, and Freenode channel, follow the IETF Guidelines for Conduct as specified in [RFC7154](https://tools.ietf.org/html/rfc7154).
