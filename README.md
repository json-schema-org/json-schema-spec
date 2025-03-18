# Welcome to JSON Schema
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/json-schema-org/.github/blob/main/CODE_OF_CONDUCT.md)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Financial Contributors on Open Collective](https://opencollective.com/json-schema/all/badge.svg?label=financial+contributors)](https://opencollective.com/json-schema)

JSON Schema is a vocabulary that allows you to validate, annotate, and
manipulate JSON documents.

This repository contains the sources for the **work in progress** of the next
set of JSON Schema IETF Internet Draft (I-D) documents. For the latest released
I-Ds, please see the
[Specification page](http://json-schema.org/specification.html) on the website.

## Call for contributions and feedback

Reviews, comments and suggestions are most welcome!
Please read our [guidelines for contributing](CONTRIBUTING.md).

## Status

For the current status of issues and pull requests, please see the following
labels

[![Available](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20Available.svg?color=brightgreen)](https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aopen+is%3Aissue+label%3A%22Status%3A+Available%22)
[![In Progress](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20In%20Progress.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Status:%20In%20Progress)
[![Review Needed](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20Review%20Needed.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Status%3A%20Review%20Needed)
[![Critical](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Critical.svg?color=critical
)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Critical)
[![High](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20High.svg?color=important)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20High)
[![Medium](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Medium.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Medium)
[![Low](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Low.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Low)

Labels are assigned based on
[Sensible Github Labels](https://github.com/Relequestual/sensible-github-labels).

## Authoring and Building

### Specification
To build all the spec files to HTML from the Markdown sources, run `npm run
build -- specs`. You can also build each individually with `npm run build --
specs/filename.md` (Example: `npm run build -- specs/jsonschema-core.md`). You
can also use wildcards to build multiple specs at the same time: `npm run build
-- specs/jsonschema-*.md`. The HTML files will be available in the `web` folder.

The spec is built using [Remark](https://remark.js.org/), a markdown engine with
good support for plugins and lots of existing plugins we can use. Remark also
has a [language server](https://github.com/remarkjs/remark-language-server) and
a [VSCode extension](https://github.com/remarkjs/vscode-remark) we can use to
get linting an link checking while developing the spec.

#### Plugins

The following is a not-necessarily-complete list of configured plugins and the
features they make available to you.

- [remark-lint](https://github.com/remarkjs/remark-lint) -- Enforce markdown
  styles guide.
- [remark-validate-links](https://github.com/remarkjs/remark-validate-links) --
  Check for broken links.
- [remark-gfm](https://github.com/remarkjs/remark-gfm) -- Adds support for
  Github Flavored Markdown specific markdown features such as autolink literals,
  footnotes, strikethrough, tables, and tasklists.
- [remark-heading-id](https://github.com/imcuttle/remark-heading-id) -- Adds
  support for `{#my-anchor}` syntax to add an `id` to an element so it can be
  referenced using URI fragment syntax.
- [remark-headings](./remark/remark-headings.js)
  -- A collection of enhancements for headings.
  - Adds hierarchical section numbers to headings.
    - Use the `%appendix%` prefix on headings that should be numbered as an
      appendix.
  - Adds id anchors to headers that don't have one
    - Example: `#section-2-13`
    - Example: `#appendix-a`
  - Makes the heading a link utilizing its anchor
- [remark-reference-links](./remark/remark-reference-links.js)
  -- Adds new syntax for referencing a section of the spec using the section
  number as the link text.
  - Example:
    ```markdown
    ## Foo {#foo}
    ## Bar
    This is covered in {{foo}} // --> Renders to "This is covered in [Section 2.3](#foo)"
    - Link text will use "Section" or "Appendix" as needed
    ```
- [remark-table-of-contents](./remark/remark-table-of-contents.js)
  -- Adds a table of contents in a section with a header called "Table of
  Contents".
- [remark-code-titles](./remark/remark-code-titles.js)
  -- Add titles to code blocks
  - Example:
    ```markdown
    \`\`\`jsonschema "My Fun Title"
    { "type": "string" }
    \`\`\`
    ```
  - The languages `jsonschema` and `json` have special styling
  - The title will be parsed as a JSON string, but you have to double escape
    escaped characters. So, to get `My "quoted" title`, you would need to be
    `"My \\\\"quoted\\\\" title"`.
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight) --
  Syntax highlighting.
- [rehype-highlight-code-lines](https://github.com/ipikuka/rehype-highlight-code-lines)
  -- Adds line numbers to code blocks. Supports ranges.
- [remark-flexible-containers](https://github.com/ipikuka/remark-flexible-containers)
  -- Add a callout box using the following syntax. Supported container types are
  `warning`, `note`, and `experimental`.
  ```markdown
  ::: {type} {title}
  {content}
  :::
  ```

### Internet-Drafts

To build components that are being maintained as IETF Internet-Drafts, run
`make`. The Makefile will create the necessary Python venv for you as part of
the regular make target.

`make clean` will remove all output including the venv. To clean just the spec
output and keep the venv, use `make spec-clean`.

If you want to run `xml2rfc` manually after running make for the first time, you
will need to activate the virtual environment: `source .venv/bin/activate`.

The version of "xml2rfc" that this project uses is updated by modifying
`requirements.in` and running `pip-compile requirements.in`.

Descriptions of the xml2rfc, I-D documents, and RFC processes:

- <https://xml2rfc.tools.ietf.org/authoring/draft-mrose-writing-rfcs.html>
- <https://www.ietf.org/tao.html>
- <https://www.ietf.org/ietf-ftp/1id-guidelines.html>
- <https://www.rfc-editor.org/rfc/rfc7322.txt>

## Test suites

Conformance tests for JSON Schema and its vocabularies may be found
[in their own repository](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## The website

The JSON Schema web site is at <http://json-schema.org/>

The source for the website is [maintained in a separate repository](https://github.com/json-schema-org/website).

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. \[[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/json-schema-org/json-schema-spec/graphs/contributors"><img src="https://opencollective.com/json-schema/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. \[[Contribute](https://opencollective.com/json-schema/contribute)]

#### Sponsors

Here are our top sponsors. You could be next! \[[Become a sponsor](https://opencollective.com/json-schema#sponsor)]

<a href="https://opencollective.com/json-schema/sponsor/0/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/1/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/2/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/3/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/4/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/5/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/6/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/7/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/8/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/sponsor/9/website" target="_blank"><img src="https://opencollective.com/json-schema/sponsor/9/avatar.svg"></a>

#### Individuals

<a href="https://opencollective.com/json-schema"><img src="https://opencollective.com/json-schema/individuals.svg?width=890"></a>

## License

The contents of this repository are [licensed under](./LICENSE) either the BSD
3-clause license *or* the Academic Free License v3.0.
