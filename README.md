# Welcome to JSON Schema

JSON Schema is a vocabulary that allows you to validate, annotate, and manipulate JSON documents.

This repository contains the sources for the **work in progress** of the next set of JSON Schema IETF Internet Draft (I-D) documents.
For the latest released I-Ds, please see the [Specification page](http://json-schema.org/documentation.html) on the website.

## Call for contributions and feedback

Reviews, comments and suggestions are most welcome!
Please read our [guidelines for contributing](CONTRIBUTING.md).

## Status
For the current status of issues and pull requests, please see the following labels

[![Financial Contributors on Open Collective](https://opencollective.com/json-schema/all/badge.svg?label=financial+contributors)](https://opencollective.com/json-schema) [![Available](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20Available.svg?color=brightgreen)](https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aopen+is%3Aissue+label%3A%22Status%3A+Available%22) [![In Progress](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20In%20Progress.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Status:%20In%20Progress) [![Review Needed](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Status:%20Review%20Needed.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Status%3A%20Review%20Needed)

[![Critical](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Critical.svg?color=critical
)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Critical) [![High](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20High.svg?color=important)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20High) [![Medium](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Medium.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Medium) [![Low](https://img.shields.io/github/issues/json-schema-org/json-schema-spec/Priority:%20Low.svg)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Low) 


Labels are assigned based on [Sensible Github Labels](https://github.com/Relequestual/sensible-github-labels).

## Contents

* Makefile - scripts to build the Internet-Draft txt/html
* _Internet-Draft sources_
    * jsonschema-core.xml - source for JSON Schema's "core" I-D
    * jsonschema-validation.xml - source for the validation vocabulary I-D
    * jsonschema-hyperschema.xml - source for the hyper-schema vocabulary I-D
    * relative-json-pointer.xml - source for the Relative JSON Pointer I-D
* _meta-schemas and recommended output formats_
    * schema.json - JSON Schema "core" and Validation meta-schema
    * hyper-schema.json - JSON Hyper-Schema meta-schema
    * links.json - JSON Hyper-Schema's Link Description Object meta-schema
    * hyper-schema-output.json - The recommended output format for JSON Hyper-Schema links

Type "make" at a shell to build the .txt and .html spec files.

Descriptions of the xml2rfc, I-D documents, and RFC processes:

* https://xml2rfc.tools.ietf.org/authoring/draft-mrose-writing-rfcs.html
* https://www.ietf.org/tao.html
* https://www.ietf.org/ietf-ftp/1id-guidelines.html
* https://www.rfc-editor.org/rfc/rfc7322.txt

## Test suites

Conformance tests for JSON Schema and its vocabularies may be found
[in their own repository](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## The website

The JSON Schema web site is at http://json-schema.org/

The source for the website is [maintained in a separate repository](https://github.com/json-schema-org/json-schema-org.github.io).

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/json-schema-org/json-schema-spec/graphs/contributors"><img src="https://opencollective.com/json-schema/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/json-schema/contribute)]

#### Individuals

<a href="https://opencollective.com/json-schema"><img src="https://opencollective.com/json-schema/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/json-schema/contribute)]

<a href="https://opencollective.com/json-schema/organization/0/website"><img src="https://opencollective.com/json-schema/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/1/website"><img src="https://opencollective.com/json-schema/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/2/website"><img src="https://opencollective.com/json-schema/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/3/website"><img src="https://opencollective.com/json-schema/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/4/website"><img src="https://opencollective.com/json-schema/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/5/website"><img src="https://opencollective.com/json-schema/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/6/website"><img src="https://opencollective.com/json-schema/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/7/website"><img src="https://opencollective.com/json-schema/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/8/website"><img src="https://opencollective.com/json-schema/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/json-schema/organization/9/website"><img src="https://opencollective.com/json-schema/organization/9/avatar.svg"></a>

## License

The source material in this repository is licensed under the AFL or BSD license.
