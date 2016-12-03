Welcome to the json-schema-spec wiki!

## Issues

Issues should idenfify an issue, problem, or use case; and propose some course of action for the draft. 

Issues waiting for user feedback will be tagged "Feedback". Up to two weeks will be given for feedback to be provided.

If there seems to be consensus around an issue, the issue will be taken up (and tagged with a milestone) or closed.

## Pull requests

If the pull request would solve a particular issue, reference the issue in the pull request description.

Changes that would affect implementation behavior should typically be opened as an issue first.

Pull requests should be made to master.

## I-D publish process

1. If a new meta-schema URI is required, change the "id"
2. Perform a `make json-schema.tar.gz` and publish a release to GitHub, tagging with the expected name of json-schema-core if it has any updates, or if not, the name of the document being updated.
3. Publish the new draft through the IETF Datatracker I-D submission page
4. Update the HTML versions on the website