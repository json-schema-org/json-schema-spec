## Welcome to JSON Schema

This repository contains the current, and historical, JSON Schema
specifications.

It should be noted that the master branch of this repo does not constitute a currently released version.
For draft 3 or 4, please see <https://tools.ietf.org/html/draft-zyp-json-schema-03> and <https://tools.ietf.org/html/draft-zyp-json-schema-04> respectivly

## Call for reviews

Specifications are starting to get written. Reviews, comments and suggestions
are of paramount importance to JSON Schema. It is humbly asked to you, dear
reader, that you bring your contribution.

## Status
For the current status of issues and pull requests, please see the following labels

[![Available](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Status:%20Available.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/issues?q=is%3Aopen+is%3Aissue+label%3A%22Status%3A+Available%22) [![In Progress](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Status:%20In%20Progress.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/labels/Status:%20In%20Progress) [![Review Needed](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Status:%20Review%20Needed.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/labels/Status%3A%20Review%20Needed)

[![Critical](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Priority:%20Critical.svg?style=flat
)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Critical) [![High](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Priority:%20High.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20High) [![Medium](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Priority:%20Medium.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Medium) [![Low](https://img.shields.io/waffle/label/json-schema-org/json-schema-spec/Priority:%20Low.svg?style=flat)](https://github.com/json-schema-org/json-schema-spec/labels/Priority%3A%20Low) 

Labels are assigned based on [Sensible Github Labels](https://github.com/Relequestual/sensible-github-labels).


## Contents

* Makefile - scripts to build the Internet-Draft txt/html
* archive/ - files for other/older JSON Schema implementations
* hyper-schema.json - the JSON Hyper-schema meta-schema
* schema.json - the JSON Schema meta-schema
* jsonschema-core.xml - sources for "core" spec
* jsonschema-validation - sources for JSON Schema validation
* jsonschema-hyperschema.xml - sources for hyper-schema spec

Type "make" at a shell to build the .txt and .html spec files.

Descriptions of the xml2rfc, I-D documents, and RFC processes:

* https://xml2rfc.tools.ietf.org/authoring/draft-mrose-writing-rfcs.html
* https://www.ietf.org/tao.html
* https://www.ietf.org/ietf-ftp/1id-guidelines.html
* https://www.rfc-editor.org/rfc/rfc7322.txt


## The website

The JSON Schema web site is at http://json-schema.org/

The source for the website is maintained in a separate repository.


## License

The source material in this repository is licensed under the AFL or BSD license.
