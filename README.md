# JSON Schema

## Welcome

This repository contains the current, and historical, JSON Schema
specifications.

## Call for reviews

Specifications are starting to get written. Reviews, comments, and suggestions
are of paramount importance to JSON Schema. It is humbly asked of you, dear
reader, that you bring your contributions.

## The website

The JSON Schema web site is at <http://json-schema.org/>.

## License

The source material in this repository is licensed under the AFL v3.0
or BSD 3 revised license.

## Development

1.  [Download and install Python](https://www.python.org/downloads/), being
    sure to add Python to the system path.

2.  Follow the [install instructions for xml2rfc](https://pypi.python.org/pypi/xml2rfc/).
    (It was problematic for me on Windows, so for me the simplest solution
    was to downgrade Python to 2.7.11 and utilize the [lxml installer](https://pypi.python.org/pypi/lxml/3.5.0#downloads)
    for 2.7, avoiding certain errors for the C++ compiler with this library
    used by xml2rfc.)

3.  Run `npm install`.
