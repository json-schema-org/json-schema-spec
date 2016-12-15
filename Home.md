Welcome to the json-schema-spec wiki!

## Issues

Issues should idenfify an problem, enhancement, or use case; and propose some course of action for the draft. 

Issues waiting for user feedback will be tagged "Feedback". Up to two weeks will be given for feedback to be provided.

If there seems to be consensus around an issue, the issue will be taken up (and tagged with a milestone) or closed.

## Pull requests

If the pull request would solve a particular issue, reference the issue in the pull request description.

Changes that would affect implementation behavior should typically be opened as an issue first.

Pull requests should be made to master.

## Writing guidelines

An Internet-Draft publication replaces previous documents in their entirety. Behavorial changes to the document should be reverse-compatible with existing written schemas, or allow for implementations to implement old and removed behavior.

The meta-schema URI is used to differentiate between different vocabularies (Validation and Hyper-schema). The authority on JSON Schema behavior is the respective specification document, not the JSON meta-schema; the JSON version of the meta-schema is maintained in an informative capacity only. However, the meta-schema URI referred to in the document should desginate a fixed JSON document, and updates to this document should be publised at a new URI. Updates should be made to the meta-schema and published at a time when it becomes desirable for new behaviors and features to be described in this fashion.

The "master" branch should always be Internet-Draft ready. The document editor is responsible for ensuring that the writing meets best practices for an I-D. An I-D will be published from "master" branch when wider review is desired, at the editor's discretion.

## I-D publish process

1. If a new meta-schema URI is required, change the "id"
2. Perform a `make json-schema.tar.gz` and publish a release to GitHub, tagging with the expected name of json-schema-core if it has any updates, or if not, the name of the document being updated.
3. Publish the new draft through the IETF Datatracker I-D submission page
4. Update the HTML versions on the website

## Meta-schema publish process

1. Create a new directory in archive/ with an incremented number
1. Copy the meta-schemas to archive/
1. Edit the meta-schema URIs
1. Issue a PR to the website to publish the meta-schema
1. Issue a PR to <https://github.com/awwright/json-metaschema> to update the meta-schemas