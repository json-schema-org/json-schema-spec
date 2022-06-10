<?xml version="1.0" encoding="US-ASCII"?>
<!DOCTYPE rfc SYSTEM "rfc2629.dtd" [
<!ENTITY RFC2119 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.2119.xml">
<!ENTITY RFC3986 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.3986.xml">
<!ENTITY RFC6596 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.6596.xml">
<!ENTITY RFC6839 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.6839.xml">
<!ENTITY RFC6901 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.6901.xml">
<!ENTITY RFC7049 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.7049.xml">
<!ENTITY RFC8259 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.8259.xml">
<!ENTITY RFC7231 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.7231.xml">
<!ENTITY RFC8288 SYSTEM "http://xml.resource.org/public/rfc/bibxml/reference.RFC.8288.xml">
<!ENTITY ldp SYSTEM "https://xml2rfc.tools.ietf.org/public/rfc/bibxml4/reference.W3C.REC-ldp-20150226.xml">
<!ENTITY fragid-best-practices SYSTEM "https://xml2rfc.tools.ietf.org/public/rfc/bibxml4/reference.W3C.WD-fragid-best-practices-20121025.xml">
]>
<?rfc toc="yes"?>
<?rfc symrefs="yes"?>
<?rfc compact="yes"?>
<?rfc subcompact="no"?>
<?rfc strict="no"?>
<?rfc rfcedstyle="yes"?>
<?rfc comments="yes"?>
<?rfc inline="yes" ?>
<rfc category="info" docName="draft-bhutton-json-schema-01" ipr="trust200902">
    <front>
        <title abbrev="JSON Schema">JSON Schema: A Media Type for Describing JSON Documents</title>

        <author fullname="Austin Wright" initials="A" surname="Wright" role="editor">
            <address>
                <email>aaa@bzfx.net</email>
            </address>
        </author>

        <author fullname="Henry Andrews" initials="H" surname="Andrews" role="editor">
            <address>
                <email>andrews_henry@yahoo.com</email>
            </address>
        </author>

        <author fullname="Ben Hutton" initials="B" surname="Hutton" role="editor">
            <organization>Postman</organization>
            <address>
                <email>ben@jsonschema.dev</email>
                <uri>https://jsonschema.dev</uri>
            </address>
        </author>

        <author fullname="Greg Dennis" initials="G" surname="Dennis">
            <address>
                <email>gregsdennis@yahoo.com</email>
                <uri>https://github.com/gregsdennis</uri>
            </address>
        </author>

        <date year="2022"/>
        <workgroup>Internet Engineering Task Force</workgroup>
        <keyword>JSON</keyword>
        <keyword>Schema</keyword>
        <keyword>Hyper Schema</keyword>
        <keyword>Hypermedia</keyword>

        <abstract>
            <t>
                JSON Schema defines the media type "application/schema+json", a JSON-based format
                for describing the structure of JSON data.
                JSON Schema asserts what a JSON document must look like,
                ways to extract information from it,
                and how to interact with it.
                The "application/schema-instance+json" media type provides additional
                feature-rich integration with "application/schema+json" beyond what can be offered
                for "application/json" documents.
            </t>
        </abstract>
        <note title="Note to Readers">
            <t>
                The issues list for this draft can be found at
                <eref target="https://github.com/json-schema-org/json-schema-spec/issues"/>.
            </t>
            <t>
                For additional information, see <eref target="https://json-schema.org/"/>.
            </t>
            <t>
                To provide feedback, use this issue tracker, the communication methods listed on the
                homepage, or email the document editors.
            </t>
        </note>
    </front>

    <middle>
        <section title="Introduction">
            <t>
                JSON Schema is a JSON media type for defining the structure of JSON data. JSON Schema
                is intended to define validation, documentation, hyperlink navigation, and interaction
                control of JSON data.
            </t>
            <t>
                This specification defines JSON Schema core terminology and mechanisms, including
                pointing to another JSON Schema by reference,
                dereferencing a JSON Schema reference,
                specifying the dialect being used,
                specifying a dialect's vocabulary requirements,
                and defining the expected output.
            </t>
            <t>
                Other specifications define the vocabularies that perform assertions about validation,
                linking, annotation, navigation, and interaction.
            </t>
        </section>

        <section title="Conventions and Terminology">
            <t>
                <!-- The text in this section has been copied from the official boilerplate,
                and should not be modified.-->

                The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
                "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
                interpreted as described in <xref target="RFC2119">RFC 2119</xref>.
            </t>

            <t>
                The terms "JSON", "JSON text", "JSON value", "member", "element", "object", "array",
                "number", "string", "boolean", "true", "false", and "null" in this document are to
                be interpreted as defined in <xref target="RFC8259">RFC 8259</xref>.
            </t>
        </section>

        <section title="Overview">
            <t>
                This document proposes a new media type "application/schema+json" to identify a JSON
                Schema for describing JSON data.
                It also proposes a further optional media type, "application/schema-instance+json",
                to provide additional integration features.
                JSON Schemas are themselves JSON documents.
                This, and related specifications, define keywords allowing authors to describe JSON
                data in several ways.
            </t>
            <t>
                JSON Schema uses keywords to assert constraints on JSON instances or annotate those
                instances with additional information.  Additional keywords are used to apply
                assertions and annotations to more complex JSON data structures, or based on
                some sort of condition.
            </t>
            <t>
                To facilitate re-use, keywords can be organized into vocabularies. A vocabulary
                consists of a list of keywords, together with their syntax and semantics.
                A dialect is defined as a set of vocabularies and their required support
                identified in a meta-schema.
            </t>
            <t>
                JSON Schema can be extended either by defining additional vocabularies,
                or less formally by defining additional keywords outside of any vocabulary.
                Unrecognized individual keywords simply have their values collected as annotations,
                while the behavior with respect to an unrecognized vocabulary can be controlled
                when declaring which vocabularies are in use.
            </t>
            <t>
                This document defines a core vocabulary that MUST be supported by any
                implementation, and cannot be disabled.  Its keywords are each prefixed
                with a "$" character to emphasize their required nature.  This vocabulary
                is essential to the functioning of the "application/schema+json" media
                type, and is used to bootstrap the loading of other vocabularies.
            </t>
            <t>
                Additionally, this document defines a RECOMMENDED vocabulary of keywords
                for applying subschemas conditionally, and for applying subschemas to
                the contents of objects and arrays.  Either this vocabulary or one very
                much like it is required to write schemas for non-trivial JSON instances,
                whether those schemas are intended for assertion validation, annotation,
                or both.  While not part of the required core vocabulary, for maximum
                interoperability this additional vocabulary is included in this document
                and its use is strongly encouraged.
            </t>
            <t>
                Further vocabularies for purposes such as structural validation or
                hypermedia annotation are defined in other documents.  These other
                documents each define a dialect collecting the standard sets of
                vocabularies needed to write schemas for that document's purpose.
            </t>
        </section>

        <section title="Definitions">

            <section title="JSON Document">
                <t>
                    A JSON document is an information resource (series of octets) described by the
                    application/json media type.
                </t>
                <t>
                    In JSON Schema, the terms "JSON document", "JSON text", and "JSON value" are
                    interchangeable because of the data model it defines.
                </t>
                <t>
                    JSON Schema is only defined over JSON documents. However, any document or memory
                    structure that can be parsed into or processed according to the JSON Schema data
                    model can be interpreted against a JSON Schema, including media types like
                    <xref target="RFC7049">CBOR</xref>.
                </t>
            </section>

            <section title="Instance">
                <t>
                    A JSON document to which a schema is applied is known as an "instance".
                </t>
                <t>
                    JSON Schema is defined over "application/json" or compatible documents,
                    including media types with the "+json" structured syntax suffix.
                </t>
                <t>
                    Among these, this specification defines the "application/schema-instance+json"
                    media type which defines handling for fragments in the URI.
                </t>

                <section title="Instance Data Model">
                    <t>
                        JSON Schema interprets documents according to a data model. A JSON value
                        interpreted according to this data model is called an "instance".
                    </t>
                    <t>
                        An instance has one of six primitive types, and a range of possible values
                        depending on the type:

                        <list style="hanging">
                            <t hangText="null:">A JSON "null" value</t>
                            <t hangText="boolean:">A "true" or "false" value, from the JSON "true" or "false" value</t>
                            <t hangText="object:">An unordered set of properties mapping a string to an instance, from the JSON "object" value</t>
                            <t hangText="array:">An ordered list of instances, from the JSON "array" value</t>
                            <t hangText="number:">An arbitrary-precision, base-10 decimal number value, from the JSON "number" value</t>
                            <t hangText="string:">A string of Unicode code points, from the JSON "string" value</t>
                        </list>
                    </t>
                    <t>
                        Whitespace and formatting concerns, including different lexical
                        representations of numbers that are equal within the data model, are thus
                        outside the scope of JSON Schema.  JSON Schema
                        <xref target="vocabulary">vocabularies</xref> that wish
                        to work with such differences in lexical representations SHOULD define
                        keywords to precisely interpret formatted strings within the data model
                        rather than relying on having the original JSON representation Unicode
                        characters available.
                    </t>
                    <t>
                        Since an object cannot have two properties with the same key, behavior for a
                        JSON document that tries to define two properties with
                        the same key in a single object is undefined.
                    </t>
                    <t>
                        Note that JSON Schema vocabularies are free to define their own extended
                        type system.  This should not be confused with the core data model types
                        defined here.  As an example, "integer" is a reasonable type for a
                        vocabulary to define as a value for a keyword, but the data model
                        makes no distinction between integers and other numbers.
                    </t>
                </section>

                <section title="Instance Equality">
                    <t>
                        Two JSON instances are said to be equal if and only if they are of the same type
                        and have the same value according to the data model. Specifically, this means:

                        <list>
                            <t>both are null; or</t>
                            <t>both are true; or</t>
                            <t>both are false; or</t>
                            <t>both are strings, and are the same codepoint-for-codepoint; or</t>
                            <t>both are numbers, and have the same mathematical value; or</t>
                            <t>both are arrays, and have an equal value item-for-item; or</t>
                            <t>both are objects, and each property in one has exactly one property with
                                a key equal to the other's, and that other property has an equal
                                value.</t>
                        </list>
                    </t>
                    <t>
                        Implied in this definition is that arrays must be the same length,
                        objects must have the same number of members,
                        properties in objects are unordered,
                        there is no way to define multiple properties with the same key,
                        and mere formatting differences (indentation, placement of commas, trailing
                        zeros) are insignificant.
                    </t>
                </section>

                <section title="Non-JSON Instances">
                    <t>
                        It is possible to use JSON Schema with a superset of the JSON Schema data model,
                        where an instance may be outside any of the six JSON data types.
                    </t>
                    <t>
                        In this case, annotations still apply; but most validation keywords will not be useful,
                        as they will always pass or always fail.
                    </t>
                    <t>
                        A custom vocabulary may define support for a superset of the core data model.
                        The schema itself may only be expressible in this superset;
                        for example, to make use of the "const" keyword.
                    </t>
                </section>
            </section>

            <section title="JSON Schema Documents" anchor="schema-document">
                <t>
                    A JSON Schema document, or simply a schema, is a JSON document used to describe
                    an instance.
                    A schema can itself be interpreted as an instance, but SHOULD always be given
                    the media type "application/schema+json" rather than
                    "application/schema-instance+json".  The "application/schema+json" media
                    type is defined to offer a superset of the
                    fragment identifier syntax and semantics provided by
                    "application/schema-instance+json".
                </t>
                <t>
                    A JSON Schema MUST be an object or a boolean.
                </t>
                <section title="JSON Schema Objects and Keywords">
                    <t>
                        Object properties that are applied to the instance are called keywords,
                        or schema keywords.  Broadly speaking, keywords fall into one
                        of five categories:
                        <list style="hanging">
                            <t hangText="identifiers:">
                                control schema identification through setting a URI
                                for the schema and/or changing how the base URI is determined
                            </t>
                            <t hangText="assertions:">
                                produce a boolean result when applied to an instance
                            </t>
                            <t hangText="annotations:">
                                attach information to an instance for application use
                            </t>
                            <t hangText="applicators:">
                                apply one or more subschemas to a particular location
                                in the instance, and combine or modify their results
                            </t>
                            <t hangText="reserved locations:">
                                do not directly affect results, but reserve a place
                                for a specific purpose to ensure interoperability
                            </t>
                        </list>
                    </t>
                    <t>
                        Keywords may fall into multiple categories, although applicators
                        SHOULD only produce assertion results based on their subschemas'
                        results.  They should not define additional constraints independent
                        of their subschemas.
                    </t>
                    <t>
                        Keywords which are properties within the same schema object are referred to as adjacent keywords.
                    </t>
                    <t>
                        Extension keywords, meaning those defined outside of this document
                        and its companions, are free to define other behaviors as well.
                    </t>
                    <t>
                        A JSON Schema MAY contain properties which are not schema keywords.
                        Unknown keywords SHOULD be treated as annotations, where the value
                        of the keyword is the value of the annotation.
                    </t>
                    <t>
                        An empty schema is a JSON Schema with no properties, or only unknown
                        properties.
                    </t>
                </section>
                <section title="Boolean JSON Schemas">
                    <t>
                        The boolean schema values "true" and "false" are trivial schemas that
                        always produce themselves as assertion results, regardless of the
                        instance value.  They never produce annotation results.
                    </t>
                    <t>
                        These boolean schemas exist to clarify schema author intent and
                        facilitate schema processing optimizations.  They behave identically
                        to the following schema objects (where "not" is part of the
                        subschema application vocabulary defined in this document).
                        <list style="hanging">
                            <t hangText="true:">
                                Always passes validation, as if the empty schema {}
                            </t>
                            <t hangText="false:">
                                Always fails validation, as if the schema { "not": {} }
                            </t>
                        </list>
                        While the empty schema object is unambiguous, there are many
                        possible equivalents to the "false" schema.  Using the boolean
                        values ensures that the intent is clear to both human readers
                        and implementations.
                    </t>
                </section>
                <section title="Schema Vocabularies">
                    <t>
                        A schema vocabulary, or simply a vocabulary, is a set of keywords,
                        their syntax, and their semantics.  A vocabulary is generally organized
                        around a particular purpose.  Different uses of JSON Schema, such
                        as validation, hypermedia, or user interface generation, will
                        involve different sets of vocabularies.
                    </t>
                    <t>
                        Vocabularies are the primary unit of re-use in JSON Schema, as schema
                        authors can indicate what vocabularies are required or optional in
                        order to process the schema.  Since vocabularies are identified by URIs
                        in the meta-schema, generic implementations can load extensions to support
                        previously unknown vocabularies.  While keywords can be supported outside
                        of any vocabulary, there is no analogous mechanism to indicate individual
                        keyword usage.
                    </t>
                    <t>
                        A schema vocabulary can be defined by anything from an informal description
                        to a standards proposal, depending on the audience and interoperability
                        expectations.  In particular, in order to facilitate vocabulary use within
                        non-public organizations, a vocabulary specification need not be published
                        outside of its scope of use.
                    </t>
                </section>
                <section title="Meta-Schemas">
                    <t>
                        A schema that itself describes a schema is called a meta-schema.
                        Meta-schemas are used to validate JSON Schemas and specify which vocabularies
                        they are using.
                    </t>
                    <t>
                        Typically, a meta-schema will specify a set of vocabularies, and validate
                        schemas that conform to the syntax of those vocabularies.  However, meta-schemas
                        and vocabularies are separate in order to allow meta-schemas to validate
                        schema conformance more strictly or more loosely than the vocabularies'
                        specifications call for.  Meta-schemas may also describe and validate
                        additional keywords that are not part of a formal vocabulary.
                    </t>
                </section>
                <section title="Root Schema and Subschemas and Resources" anchor="root">
                    <t>
                        A JSON Schema resource is a schema which is
                        <xref target="RFC6596">canonically</xref> identified by an
                        <xref target="RFC3986">absolute URI</xref>.  Schema resources MAY
                        also be identified by URIs, including URIs with fragments,
                        if the resulting secondary resource (as defined by
                        <xref target="RFC3986">section 3.5 of RFC 3986</xref>) is identical
                        to the primary resource.  This can occur with the empty fragment,
                        or when one schema resource is embedded in another.  Any such URIs
                        with fragments are considered to be non-canonical.
                    </t>
                    <t>
                        The root schema is the schema that comprises the entire JSON document
                        in question.  The root schema is always a schema resource, where the
                        URI is determined as described in section
                        <xref target="initial-base" format="counter"></xref>.
                        <cref>
                            Note that documents that embed schemas in another format will not
                            have a root schema resource in this sense.  Exactly how such usages
                            fit with the JSON Schema document and resource concepts will be
                            clarified in a future draft.
                        </cref>
                    </t>
                    <t>
                        Some keywords take schemas themselves, allowing JSON Schemas to be nested:
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
    "title": "root",
    "items": {
        "title": "array item"
    }
}
]]>
                        </artwork>
                    </figure>
                    <t>
                        In this example document, the schema titled "array item" is a subschema,
                        and the schema titled "root" is the root schema.
                    </t>
                    <t>
                        As with the root schema, a subschema is either an object or a boolean.
                    </t>
                    <t>
                        As discussed in section
                        <xref target="id-keyword" format="counter"></xref>, a JSON Schema document
                        can contain multiple JSON Schema resources.  When used without qualification,
                        the term "root schema" refers to the document's root schema.  In some
                        cases, resource root schemas are discussed.  A resource's root schema
                        is its top-level schema object, which would also be a document root schema
                        if the resource were to be extracted to a standalone JSON Schema document.
                    </t>
                    <t>
                        Whether multiple schema resources are embedded or linked with a reference,
                        they are processed in the same way, with the same available behaviors.
                    </t>
                </section>
            </section>

        </section>

        <section title="Fragment Identifiers" anchor="fragments">
            <t>
                In accordance with section 3.1 of <xref target="RFC6839">RFC 6839</xref>,
                the syntax and semantics of fragment identifiers specified for
                any +json media type SHOULD be as specified for "application/json".
                (At publication of this document, there is no fragment identification
                syntax defined for "application/json".)
            </t>
            <t>
                Additionally, the "application/schema+json" media type supports two
                fragment identifier structures: plain names and JSON Pointers.
                The "application/schema-instance+json" media type supports one
                fragment identifier structure: JSON Pointers.
            </t>
            <t>
                The use of JSON Pointers as URI fragment identifiers is described in
                <xref target="RFC6901">RFC 6901</xref>.
                For "application/schema+json", which supports two fragment identifier syntaxes,
                fragment identifiers matching the JSON Pointer syntax, including the empty string,
                MUST be interpreted as JSON Pointer fragment identifiers.
            </t>
            <t>
                Per the W3C's
                <xref target="W3C.WD-fragid-best-practices-20121025">best practices for fragment identifiers</xref>,
                plain name fragment identifiers in "application/schema+json" are reserved for referencing
                locally named schemas.  All fragment identifiers that do
                not match the JSON Pointer syntax MUST be interpreted as
                plain name fragment identifiers.
            </t>
            <t>
                Defining and referencing a plain name fragment identifier within an
                "application/schema+json" document are specified
                in the <xref target="anchor">"$anchor" keyword</xref> section.
            </t>
            <t>
            </t>
        </section>

        <section title="General Considerations">

            <section title="Range of JSON Values">
                <t>
                    An instance may be any valid JSON value as defined by <xref target="RFC8259">JSON</xref>.
                    JSON Schema imposes no restrictions on type: JSON Schema can describe any JSON
                    value, including, for example, null.
                </t>
            </section>

            <section title="Programming Language Independence" anchor="language">
                <t>
                    JSON Schema is programming language agnostic, and supports the full range of
                    values described in the data model.
                    Be aware, however, that some languages and JSON parsers may not be able to
                    represent in memory the full range of values describable by JSON.
                </t>
            </section>

            <section title="Mathematical Integers" anchor="integers">
                <t>
                    Some programming languages and parsers use different internal representations
                    for floating point numbers than they do for integers.
                </t>
                <t>
                    For consistency, integer JSON numbers SHOULD NOT be encoded with a fractional
                    part.
                </t>
            </section>

            <section title="Regular Expressions" anchor="regex">
                <t>
                    Keywords MAY use regular expressions to express constraints, or constrain
                    the instance value to be a regular expression.
                    These regular expressions SHOULD be valid according to the regular expression
                    dialect described in <xref target="ecma262">ECMA-262, section 21.2.1</xref>.
                </t>
                <t>
                    Regular expressions SHOULD be built with the "u" flag (or equivalent) to provide
                    Unicode support, or processed in such a way which provides Unicode support as
                    defined by ECMA-262.
                </t>
                <t>
                    Furthermore, given the high disparity in regular expression constructs support,
                    schema authors SHOULD limit themselves to the following regular expression
                    tokens:

                    <list>
                        <t>individual Unicode characters, as defined by the <xref
                        target="RFC8259">JSON specification</xref>;</t>
                        <t>simple character classes ([abc]), range character classes ([a-z]);</t>
                        <t>complemented character classes ([^abc], [^a-z]);</t>
                        <t>simple quantifiers: "+" (one or more), "*" (zero or more), "?" (zero or
                        one), and their lazy versions ("+?", "*?", "??");</t>
                        <t>range quantifiers: "{x}" (exactly x occurrences), "{x,y}" (at least x, at
                        most y, occurrences), {x,} (x occurrences or more), and their lazy
                        versions;</t>
                        <t>the beginning-of-input ("^") and end-of-input ("$") anchors;</t>
                        <t>simple grouping ("(...)") and alternation ("|").</t>
                    </list>
                </t>
                <t>
                    Finally, implementations MUST NOT take regular expressions to be
                    anchored, neither at the beginning nor at the end. This means, for instance,
                    the pattern "es" matches "expression".
                </t>
            </section>

            <section title="Extending JSON Schema" anchor="extending">
                <t>
                    Additional schema keywords and schema vocabularies MAY be defined
                    by any entity.  Save for explicit agreement, schema authors SHALL NOT
                    expect these additional keywords and vocabularies to be supported by
                    implementations that do not explicitly document such support.
                    Implementations SHOULD treat keywords they do not support as annotations,
                    where the value of the keyword is the value of the annotation.
                </t>
                <t>
                    Implementations MAY provide the ability to register or load handlers
                    for vocabularies that they do not support directly.  The exact mechanism
                    for registering and implementing such handlers is implementation-dependent.
                </t>
            </section>

        </section>

        <section title="Keyword Behaviors">
            <t>
                JSON Schema keywords fall into several general behavior categories.
                Assertions validate that an instance satisfies constraints, producing
                a boolean result.  Annotations attach information that applications
                may use in any way they see fit.
                Applicators apply subschemas to parts of the instance and combine
                their results.
            </t>
            <t>
                Extension keywords SHOULD stay within these categories, keeping in mind
                that annotations in particular are extremely flexible.  Complex behavior
                is usually better delegated to applications on the basis of annotation
                data than implemented directly as schema keywords.  However, extension
                keywords MAY define other behaviors for specialized purposes.
            </t>
            <t>
                Evaluating an instance against a schema involves processing all of the
                keywords in the schema against the appropriate locations within the instance.
                Typically, applicator keywords are processed until a schema object with no
                applicators (and therefore no subschemas) is reached.  The appropriate
                location in the instance is evaluated against the assertion and
                annotation keywords in the schema object, and their results are gathered
                into the parent schema according to the rules of the applicator.
            </t>
            <t>
                Evaluation of a parent schema object can complete once all of its
                subschemas have been evaluated, although in some circumstances evaluation
                may be short-circuited due to assertion results.  When annotations are
                being collected, some assertion result short-circuiting is not possible
                due to the need to examine all subschemas for annotation collection, including
                those that cannot further change the assertion result.
            </t>
            <section title="Lexical Scope and Dynamic Scope" anchor="scopes">
                <t>
                    While most JSON Schema keywords can be evaluated on their own,
                    or at most need to take into account the values or results of
                    adjacent keywords in the same schema object, a few have more
                    complex behavior.
                </t>
                <t>
                    The lexical scope of a keyword is determined by the nested JSON
                    data structure of objects and arrays.  The largest such scope
                    is an entire schema document.  The smallest scope is a single
                    schema object with no subschemas.
                </t>
                <t>
                    Keywords MAY be defined with a partial value, such as a URI-reference,
                    which must be resolved against another value, such as another
                    URI-reference or a full URI, which is found through the lexical
                    structure of the JSON document.  The "$id", "$ref", and
                    "$dynamicRef" core keywords, and the "base" JSON Hyper-Schema
                    keyword, are examples of this sort of behavior.
                </t>
                <t>
                    Note that some keywords, such as "$schema", apply to the lexical
                    scope of the entire schema resource, and therefore MUST only
                    appear in a schema resource's root schema.
                </t>
                <t>
                    Other keywords may take into account the dynamic scope that
                    exists during the evaluation of a schema, typically together
                    with an instance document.
                    The outermost dynamic scope is the schema object at
                    which processing begins, even if it is not a schema resource root.
                    The path from this root schema to any particular keyword (that
                    includes any "$ref" and "$dynamicRef" keywords that may have
                    been resolved) is considered the keyword's "validation path."
                </t>
                <t>
                    Lexical and dynamic scopes align until a reference keyword
                    is encountered.  While following the reference keyword moves processing
                    from one lexical scope into a different one, from the perspective
                    of dynamic scope, following a reference is no different from descending
                    into a subschema present as a value.  A keyword on the far side of
                    that reference that resolves information through the dynamic scope
                    will consider the originating side of the reference to be their
                    dynamic parent, rather than examining the local lexically enclosing parent.
                </t>
                <t>
                    The concept of dynamic scope is primarily used with "$dynamicRef" and
                    "$dynamicAnchor", and should be considered an advanced feature
                    and used with caution when defining additional keywords.  It also appears
                    when reporting errors and collected annotations, as it may be possible
                    to revisit the same lexical scope repeatedly with different dynamic
                    scopes.  In such cases, it is important to inform the user of the
                    dynamic path that produced the error or annotation.
                </t>
            </section>
            <section title="Keyword Interactions">
                <t>
                    Keyword behavior MAY be defined in terms of the annotation results
                    of <xref target="root">subschemas</xref> and/or adjacent keywords
                    (keywords within the same schema object) and their subschemas.
                    Such keywords MUST NOT result in a circular dependency.
                    Keywords MAY modify their behavior based on the presence or absence
                    of another keyword in the same
                    <xref target="schema-document">schema object</xref>.
                </t>
            </section>
            <section title="Default Behaviors">
                <t>
                    A missing keyword MUST NOT produce a false assertion result, MUST
                    NOT produce annotation results, and MUST NOT cause any other schema
                    to be evaluated as part of its own behavioral definition.
                    However, given that missing keywords do not contribute annotations,
                    the lack of annotation results may indirectly change the behavior
                    of other keywords.
                </t>
                <t>
                    In some cases, the missing keyword assertion behavior of a keyword is
                    identical to that produced by a certain value, and keyword definitions
                    SHOULD note such values where known.  However, even if the value which
                    produces the default behavior would produce annotation results if
                    present, the default behavior still MUST NOT result in annotations.
                </t>
                <t>
                    Because annotation collection can add significant cost in terms of both
                    computation and memory, implementations MAY opt out of this feature.
                    Keywords that are specified in terms of collected annotations SHOULD
                    describe reasonable alternate approaches when appropriate.
                    This approach is demonstrated by the
                    "<xref target="items" format="title"/>" and
                    "<xref target="additionalProperties" format="title"/>" keywords in this
                    document.
                </t>
                <t>
                    Note that when no such alternate approach is possible for a keyword,
                    implementations that do not support annotation collections will not
                    be able to support those keywords or vocabularies that contain them.
                </t>
            </section>
            <section title="Identifiers">
                <t>
                    Identifiers define URIs for a schema, or affect how such URIs are
                    resolved in <xref target="references">references</xref>, or both.
                    The Core vocabulary defined in this document defines several
                    identifying keywords, most notably "$id".
                </t>
                <t>
                    Canonical schema URIs MUST NOT change while processing an instance, but
                    keywords that affect URI-reference resolution MAY have behavior that
                    is only fully determined at runtime.
                </t>
                <t>
                    While custom identifier keywords are possible, vocabulary designers should
                    take care not to disrupt the functioning of core keywords. For example,
                    the "$dynamicAnchor" keyword in this specification limits its URI resolution
                    effects to the matching "$dynamicRef" keyword, leaving the behavior
                    of "$ref" undisturbed.
                </t>
            </section>
            <section title="Applicators" anchor="applicators">
                <t>
                    Applicators allow for building more complex schemas than can be accomplished
                    with a single schema object.  Evaluation of an instance against a
                    <xref target="schema-document">schema document</xref> begins by applying
                    the <xref target="root">root schema</xref> to the complete instance
                    document.  From there, keywords known as applicators are used to determine
                    which additional schemas are applied.  Such schemas may be applied in-place
                    to the current location, or to a child location.
                </t>
                <t>
                    The schemas to be applied may be present as subschemas comprising all or
                    part of the keyword's value.  Alternatively, an applicator may refer to
                    a schema elsewhere in the same schema document, or in a different one.
                    The mechanism for identifying such referenced schemas is defined by the
                    keyword.
                </t>
                <t>
                    Applicator keywords also define how subschema or referenced schema
                    boolean <xref target="assertions">assertion</xref>
                    results are modified and/or combined to produce the boolean result
                    of the applicator.  Applicators may apply any boolean logic operation
                    to the assertion results of subschemas, but MUST NOT introduce new
                    assertion conditions of their own.
                </t>
                <t>
                    <xref target="annotations">Annotation</xref> results are
                    preserved along with the instance location and the location of
                    the schema keyword, so that applications can decide how to
                    interpret multiple values.
                </t>
                <section title="Referenced and Referencing Schemas" anchor="referenced">
                    <t>
                        As noted in <xref target="applicators" />, an applicator keyword may
                        refer to a schema to be applied, rather than including it as a
                        subschema in the applicator's value.  In such situations, the
                        schema being applied is known as the referenced schema, while
                        the schema containing the applicator keyword is the referencing schema.
                    </t>
                    <t>
                        While root schemas and subschemas are static concepts based on a
                        schema's position within a schema document, referenced and referencing
                        schemas are dynamic.  Different pairs of schemas may find themselves
                        in various referenced and referencing arrangements during the evaluation
                        of an instance against a schema.
                    </t>
                    <t>
                        For some by-reference applicators, such as
                        <xref target="ref">"$ref"</xref>, the referenced schema can be determined
                        by static analysis of the schema document's lexical scope.  Others,
                        such as "$dynamicRef" (with "$dynamicAnchor"), may make use of dynamic
                        scoping, and therefore only be resolvable in the process of evaluating
                        the schema with an instance.
                    </t>
                </section>
            </section>

            <section title="Assertions" anchor="assertions">
                <t>
                    JSON Schema can be used to assert constraints on a JSON document, which
                    either passes or fails the assertions.  This approach can be used to validate
                    conformance with the constraints, or document what is needed to satisfy them.
                </t>
                <t>
                    JSON Schema implementations produce a single boolean result when evaluating
                    an instance against schema assertions.
                </t>
                <t>
                    An instance can only fail an assertion that is present in the schema.

                </t>
                <section title="Assertions and Instance Primitive Types">
                    <t>
                        Most assertions only constrain values within a certain
                        primitive type.  When the type of the instance is not of the type
                        targeted by the keyword, the instance is considered to conform
                        to the assertion.
                    </t>
                    <t>
                        For example, the "maxLength" keyword from the companion
                        <xref target="json-schema-validation">validation vocabulary</xref>:
                        will only restrict certain strings
                        (that are too long) from being valid.  If the instance is a number,
                        boolean, null, array, or object, then it is valid against this assertion.
                    </t>
                    <t>
                        This behavior allows keywords to be used more easily with instances
                        that can be of multiple primitive types.  The companion validation
                        vocabulary also includes a "type" keyword which can independently
                        restrict the instance to one or more primitive types.  This allows
                        for a concise expression of use cases such as a function that might
                        return either a string of a certain length or a null value:
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
    "type": ["string", "null"],
    "maxLength": 255
}
]]>
                        </artwork>
                        <postamble>
                            If "maxLength" also restricted the instance type to be a string,
                            then this would be substantially more cumbersome to express because
                            the example as written would not actually allow null values.
                            Each keyword is evaluated separately unless explicitly specified
                            otherwise, so if "maxLength" restricted the instance to strings,
                            then including "null" in "type" would not have any useful effect.
                        </postamble>
                    </figure>
                </section>
            </section>

            <section title="Annotations" anchor="annotations">
                <t>
                    JSON Schema can annotate an instance with information, whenever the instance
                    validates against the schema object containing the annotation, and all of its
                    parent schema objects.  The information can be a simple value, or can be
                    calculated based on the instance contents.
                </t>
                <t>
                    Annotations are attached to specific locations in an instance.
                    Since many subschemas can be applied to any single
                    location, applications may need to decide how to handle differing
                    annotation values being attached to the same instance location by
                    the same schema keyword in different schema objects.
                </t>
                <t>
                    Unlike assertion results, annotation data can take a wide variety of forms,
                    which are provided to applications to use as they see fit.  JSON Schema
                    implementations are not expected to make use of the collected information
                    on behalf of applications.
                </t>
                <t>
                    Unless otherwise specified, the value of an annotation keyword
                    is the keyword's value.  However, other behaviors are possible.
                    For example, <xref target="json-hyper-schema">JSON Hyper-Schema's</xref>
                    "links" keyword is a complex annotation that produces a value based
                    in part on the instance data.
                </t>
                <t>
                    While "short-circuit" evaluation is possible for assertions, collecting
                    annotations requires examining all schemas that apply to an instance
                    location, even if they cannot change the overall assertion result.
                    The only exception is that subschemas of a schema object that has
                    failed validation MAY be skipped, as annotations are not retained
                    for failing schemas.
                </t>

                <section title="Collecting Annotations">
                    <t>
                        Annotations are collected by keywords that explicitly define
                        annotation-collecting behavior.  Note that boolean schemas cannot
                        produce annotations as they do not make use of keywords.
                    </t>
                    <t>
                        A collected annotation MUST include the following information:
                        <list>
                            <t>
                                The name of the keyword that produces the annotation
                            </t>
                            <t>
                                The instance location to which it is attached, as a JSON Pointer
                            </t>
                            <t>
                                The schema location path, indicating how reference keywords
                                such as "$ref" were followed to reach the absolute schema location.
                            </t>
                            <t>
                                The absolute schema location of the attaching keyword, as a URI.
                                This MAY be omitted if it is the same as the schema location path
                                from above.
                            </t>
                            <t>
                                The attached value(s)
                            </t>
                        </list>
                    </t>
                    <section title="Distinguishing Among Multiple Values">
                        <t>
                            Applications MAY make decisions on which of multiple annotation values
                            to use based on the schema location that contributed the value.
                            This is intended to allow flexible usage.  Collecting the schema location
                            facilitates such usage.
                        </t>
                        <t>
                            For example, consider this schema, which uses annotations and assertions from
                            the <xref target="json-schema-validation">Validation specification</xref>:
                        </t>
                        <figure>
                            <preamble>
                                Note that some lines are wrapped for clarity.
                            </preamble>
                            <artwork>
<![CDATA[
{
    "title": "Feature list",
    "type": "array",
    "prefixItems": [
        {
            "title": "Feature A",
            "properties": {
                "enabled": {
                    "$ref": "#/$defs/enabledToggle",
                    "default": true
                }
            }
        },
        {
            "title": "Feature B",
            "properties": {
                "enabled": {
                    "description": "If set to null, Feature B
                                    inherits the enabled
                                    value from Feature A",
                    "$ref": "#/$defs/enabledToggle"
                }
            }
        }
    ],
    "$defs": {
        "enabledToggle": {
            "title": "Enabled",
            "description": "Whether the feature is enabled (true),
                            disabled (false), or under
                            automatic control (null)",
            "type": ["boolean", "null"],
            "default": null
        }
    }
}
]]>
                            </artwork>
                        </figure>
                        <t>
                            In this example, both Feature A and Feature B make use of the re-usable
                            "enabledToggle" schema.  That schema uses the "title", "description",
                            and "default" annotations.  Therefore the application has to decide how
                            to handle the additional "default" value for Feature A, and the additional
                            "description" value for Feature B.
                        </t>
                        <t>
                            The application programmer and the schema author need to agree on the
                            usage.  For this example, let's assume that they agree that the most
                            specific "default" value will be used, and any additional, more generic
                            "default" values will be silently ignored.  Let's also assume that they
                            agree that all "description" text is to be used, starting with the most
                            generic, and ending with the most specific.  This requires the schema
                            author to write descriptions that work when combined in this way.
                        </t>
                        <t>
                            The application can use the schema location path to determine which
                            values are which.  The values in the feature's immediate "enabled"
                            property schema are more specific, while the values under the re-usable
                            schema that is referenced to with "$ref" are more generic.  The schema
                            location path will show whether each value was found by crossing a
                            "$ref" or not.
                        </t>
                        <t>
                            Feature A will therefore use a default value of true, while Feature B
                            will use the generic default value of null.  Feature A will only
                            have the generic description from the "enabledToggle" schema, while
                            Feature B will use that description, and also append its locally
                            defined description that explains how to interpret a null value.
                        </t>
                        <t>
                            Note that there are other reasonable approaches that a different application
                            might take.  For example, an application may consider the presence of
                            two different values for "default" to be an error, regardless of their
                            schema locations.
                        </t>
                    </section>
                    <section title="Annotations and Assertions">
                        <t>
                            Schema objects that produce a false assertion result MUST NOT
                            produce any annotation results, whether from their own keywords
                            or from keywords in subschemas.
                        </t>
                        <t>
                            Note that the overall schema results may still include annotations
                            collected from other schema locations.  Given this schema:
                        </t>
                        <figure>
                            <artwork>
<![CDATA[
{
    "oneOf": [
        {
            "title": "Integer Value",
            "type": "integer"
        },
        {
            "title": "String Value",
            "type": "string"
        }
    ]
}
]]>
                            </artwork>
                        </figure>
                        <t>
                            Against the instance <spanx style="verb">"This is a string"</spanx>, the
                            title annotation "Integer Value" is discarded because the type assertion
                            in that schema object fails.  The title annotation "String Value"
                            is kept, as the instance passes the string type assertions.
                        </t>
                    </section>
                    <section title="Annotations and Applicators">
                        <t>
                            In addition to possibly defining annotation results of their own,
                            applicator keywords aggregate the annotations collected in their
                            subschema(s) or referenced schema(s).
                        </t>
                    </section>
                </section>
            </section>
            <section title="Reserved Locations">
                <t>
                    A fourth category of keywords simply reserve a location to hold re-usable
                    components or data of interest to schema authors that is not suitable
                    for re-use.  These keywords do not affect validation or annotation results.
                    Their purpose in the core vocabulary is to ensure that locations are
                    available for certain purposes and will not be redefined by extension
                    keywords.
                </t>
                <t>
                    While these keywords do not directly affect results, as explained in section
                    <xref target="non-schemas" format="counter"></xref> unrecognized
                    extension keywords that reserve locations for re-usable schemas may have
                    undesirable interactions with references in certain circumstances.
                </t>
            </section>
            <section title="Loading Instance Data">
                <t>
                    While none of the vocabularies defined as part of this or the associated documents
                    define a keyword which may target and/or load instance data, it is possible that
                    other vocabularies may wish to do so.
                </t>
                <t>
                    Keywords MAY be defined to use JSON Pointers or Relative JSON Pointers to examine
                    parts of an instance outside the current evaluation location.
                </t>
                <t>
                    Keywords that allow adjusting the location using a Relative JSON Pointer SHOULD
                    default to using the current location if a default is desireable.
                </t>
            </section>
        </section>
        <section title="The JSON Schema Core Vocabulary">
            <t>
                Keywords declared in this section, which all begin with "$", make up
                the JSON Schema Core vocabulary.  These keywords are either required in
                order to process any schema or meta-schema, including those split across
                multiple documents, or exist to reserve keywords for purposes that
                require guaranteed interoperability.
            </t>
            <t>
                The Core vocabulary MUST be considered mandatory at all times, in order
                to bootstrap the processing of further vocabularies.  Meta-schemas
                that use the <xref target="vocabulary">"$vocabulary"</xref> keyword
                to declare the vocabularies in use MUST explicitly list the Core vocabulary,
                which MUST have a value of true indicating that it is required.
            </t>
            <t>
                The behavior of a false value for this vocabulary (and only this
                vocabulary) is undefined, as is the behavior when "$vocabulary"
                is present but the Core vocabulary is not included.  However, it
                is RECOMMENDED that implementations detect these cases and raise
                an error when they occur.  It is not meaningful to declare that
                a meta-schema optionally uses Core.
            </t>
            <t>
                Meta-schemas that do not use "$vocabulary" MUST be considered to
                require the Core vocabulary as if its URI were present with a value of true.
            </t>
            <t>
                The current URI for the Core vocabulary is:
                &lt;https://json-schema.org/draft/2020-12/vocab/core&gt;.
            </t>
            <t>
                The current URI for the corresponding meta-schema is:
                <eref target="https://json-schema.org/draft/2020-12/meta/core"/>.
            </t>
            <t>
                While the "$" prefix is not formally reserved for the Core vocabulary,
                it is RECOMMENDED that extension keywords (in vocabularies or otherwise)
                begin with a character other than "$" to avoid possible future collisions.
            </t>

            <section title="Meta-Schemas and Vocabularies" anchor="vocabulary">
                <t>
                    Two concepts, meta-schemas and vocabularies, are used to inform an implementation
                    how to interpret a schema.  Every schema has a meta-schema, which can be declared
                    using the "$schema" keyword.
                </t>
                <t>
                    The meta-schema serves two purposes:
                    <list style="hanging">
                        <t hangText="Declaring the vocabularies in use">
                            The "$vocabulary" keyword, when it appears in a meta-schema, declares
                            which vocabularies are available to be used in schemas that refer
                            to that meta-schema.  Vocabularies define keyword semantics,
                            as well as their general syntax.
                        </t>
                        <t hangText="Describing valid schema syntax">
                            A schema MUST successfully validate against its meta-schema, which
                            constrains the syntax of the available keywords.  The syntax described
                            is expected to be compatible with the vocabularies declared; while
                            it is possible to describe an incompatible syntax, such a meta-schema
                            would be unlikely to be useful.
                        </t>
                    </list>
                </t>
                <t>
                    Meta-schemas are separate from vocabularies to allow for
                    vocabularies to be combined in different ways, and for meta-schema authors
                    to impose additional constraints such as forbidding certain keywords, or
                    performing unusually strict syntactical validation, as might be done
                    during a development and testing cycle.  Each vocabulary typically identifies
                    a meta-schema consisting only of the vocabulary's keywords.
                </t>
                <t>
                    Meta-schema authoring is an advanced usage of JSON Schema, so the design of
                    meta-schema features emphasizes flexibility over simplicity.
                </t>
                <section title='The "$schema" Keyword' anchor="keyword-schema">
                    <t>
                        The "$schema" keyword is both used as a JSON Schema dialect identifier and
                        as the identifier of a resource which is itself a JSON Schema, which describes the
                        set of valid schemas written for this particular dialect.
                    </t>
                    <t>
                        The value of this keyword MUST be a <xref target="RFC3986">URI</xref>
                        (containing a scheme) and this URI MUST be normalized.
                        The current schema MUST be valid against the meta-schema identified by this URI.
                    </t>
                    <t>
                        If this URI identifies a retrievable resource, that resource SHOULD be of
                        media type "application/schema+json".
                    </t>
                    <t>
                        The "$schema" keyword SHOULD be used in the document root schema object,
                        and MAY be used in the root schema objects of embedded schema resources.
                        It MUST NOT appear in non-resource root schema objects.  If absent from
                        the document root schema, the resulting behavior is implementation-defined.
                    </t>
                    <t>
                        Values for this property are defined elsewhere in this and other documents,
                        and by other parties.
                    </t>
                </section>
                <section title='The "$vocabulary" Keyword'>
                    <t>
                        The "$vocabulary" keyword is used in meta-schemas to identify the
                        vocabularies available for use in schemas described by that meta-schema.
                        It is also used to indicate whether each vocabulary is required or optional,
                        in the sense that an implementation MUST understand the required vocabularies
                        in order to successfully process the schema. Together, this information forms
                        a dialect. Any vocabulary that is understood by the implementation MUST be
                        processed in a manner consistent with the semantic definitions contained
                        within the vocabulary.
                    </t>
                    <t>
                        The value of this keyword MUST be an object.  The property names in the
                        object MUST be URIs (containing a scheme) and this URI MUST be normalized.
                        Each URI that appears as a property name identifies a specific set of
                        keywords and their semantics.
                    </t>
                    <t>
                        The URI MAY be a URL, but the nature of the retrievable resource is
                        currently undefined, and reserved for future use.  Vocabulary authors
                        MAY use the URL of the vocabulary specification, in a human-readable
                        media type such as text/html or text/plain, as the vocabulary URI.
                        <cref>
                            Vocabulary documents may be added in forthcoming drafts.
                            For now, identifying the keyword set is deemed sufficient as that,
                            along with meta-schema validation, is how the current "vocabularies"
                            work today.  Any future vocabulary document format will be specified
                            as a JSON document, so using text/html or other non-JSON formats
                            in the meantime will not produce any future ambiguity.
                        </cref>
                    </t>
                    <t>
                        The values of the object properties MUST be booleans.
                        If the value is true, then implementations that do not recognize
                        the vocabulary MUST refuse to process any schemas that declare
                        this meta-schema with "$schema".  If the value is false, implementations
                        that do not recognize the vocabulary SHOULD proceed with processing
                        such schemas.  The value has no impact if the implementation
                        understands the vocabulary.
                    </t>
                    <t>
                        Per <xref target="extending" format="counter"></xref>, unrecognized
                        keywords SHOULD be treated as annotations.
                        This remains the case for keywords defined
                        by unrecognized vocabularies.  It is not currently possible to distinguish
                        between unrecognized keywords that are defined in vocabularies from
                        those that are not part of any vocabulary.
                    </t>
                    <t>
                        The "$vocabulary" keyword SHOULD be used in the root schema of any schema
                        document intended for use as a meta-schema.  It MUST NOT appear in subschemas.
                    </t>
                    <t>
                        The "$vocabulary" keyword MUST be ignored in schema documents that
                        are not being processed as a meta-schema.  This allows validating
                        a meta-schema M against its own meta-schema M' without requiring
                        the validator to understand the vocabularies declared by M.
                    </t>
                    <section title="Default vocabularies">
                        <t>
                            If "$vocabulary" is absent, an implementation MAY determine
                            behavior based on the meta-schema if it is recognized from the
                            URI value of the referring schema's "$schema" keyword.
                            This is how behavior (such as Hyper-Schema usage) has been
                            recognized prior to the existence of vocabularies.
                        </t>
                        <t>
                            If the meta-schema, as referenced by the schema, is not recognized,
                            or is missing, then the behavior is implementation-defined.
                            If the implementation
                            proceeds with processing the schema, it MUST assume the use of the
                            core vocabulary.  If the implementation is built for a specific purpose,
                            then it SHOULD assume the use of all of the most relevant vocabularies
                            for that purpose.
                        </t>
                        <t>
                            For example, an implementation that is a validator
                            SHOULD assume the use of all vocabularies in this
                            specification and the companion Validation specification.
                        </t>
                    </section>
                    <section title="Non-inheritability of vocabularies ">
                        <t>
                            Note that the processing restrictions on "$vocabulary" mean that
                            meta-schemas that reference other meta-schemas using "$ref" or
                            similar keywords do not automatically inherit the vocabulary
                            declarations of those other meta-schemas.  All such declarations
                            must be repeated in the root of each schema document intended
                            for use as a meta-schema.  This is demonstrated in
                            <xref target="example-meta-schema">the example meta-schema</xref>.
                            <cref>
                                This requirement allows implementations to find all vocabulary
                                requirement information in a single place for each meta-schema.
                                As schema extensibility means that there are endless potential
                                ways to combine more fine-grained meta-schemas by reference,
                                requiring implementations to anticipate all possibilities and
                                search for vocabularies in referenced meta-schemas would
                                be overly burdensome.
                            </cref>
                        </t>
                    </section>
                </section>
                <section title="Updates to Meta-Schema and Vocabulary URIs">
                    <t>
                        Updated vocabulary and meta-schema URIs MAY be published between
                        specification drafts in order to correct errors.  Implementations
                        SHOULD consider URIs dated after this specification draft and
                        before the next to indicate the same syntax and semantics
                        as those listed here.
                    </t>
                </section>
            </section>

            <section title="Base URI, Anchors, and Dereferencing">
                <t>
                    To differentiate between schemas in a vast ecosystem, schemas are
                    identified by <xref target="RFC3986">URI</xref>, and can embed references
                    to other schemas by specifying their URI.
                </t>
                <t>
                    Several keywords can accept a relative <xref target="RFC3986">URI-reference</xref>,
                    or a value used to construct a relative URI-reference.  For these keywords,
                    it is necessary to establish a base URI in order to resolve the reference.
                </t>

                <section title='The "$id" Keyword' anchor="id-keyword">
                    <t>
                        The "$id" keyword identifies a schema resource with its
                        <xref target="RFC6596">canonical</xref> URI.
                    </t>
                    <t>
                        Note that this URI is an identifier and not necessarily a network locator.
                        In the case of a network-addressable URL, a schema need not be downloadable
                        from its canonical URI.
                    </t>
                    <t>
                        If present, the value for this keyword MUST be a string, and MUST represent a
                        valid <xref target="RFC3986">URI-reference</xref>.  This URI-reference
                        SHOULD be normalized, and MUST resolve to an
                        <xref target="RFC3986">absolute-URI</xref> (without a fragment),
                        or to a URI with an empty fragment.
                    </t>
                    <t>
                        The empty fragment form is NOT RECOMMENDED and is retained only
                        for backwards compatibility, and because the
                        application/schema+json media type defines that a URI with an
                        empty fragment identifies the same resource as the same URI
                        with the fragment removed.  However, since this equivalence is not
                        part of the <xref target="RFC3986">RFC 3986 normalization process</xref>,
                        implementers and schema authors cannot rely on generic URI libraries
                        understanding it.
                    </t>
                    <t>
                        Therefore, "$id" MUST NOT contain a non-empty fragment, and SHOULD NOT
                        contain an empty fragment.  The absolute-URI form MUST be considered
                        the canonical URI, regardless of the presence or absence of an empty fragment.
                        <cref>
                            An empty fragment is currently allowed because older meta-schemas have
                            an empty fragment in their $id (or previously, id).
                            A future draft may outright forbid even empty fragments in "$id".
                        </cref>
                    </t>
                    <t>
                        The absolute-URI also serves as the base URI for relative URI-references
                        in keywords within the schema resource, in accordance with
                        <xref target="RFC3986">RFC 3986 section 5.1.1</xref> regarding base URIs
                        embedded in content.
                    </t>
                    <t>
                        The presence of "$id" in a subschema indicates that the subschema constitutes
                        a distinct schema resource within a single schema document.  Furthermore,
                        in accordance with <xref target="RFC3986">RFC 3986 section 5.1.2</xref>
                        regarding encapsulating entities, if an "$id" in a subschema is a relative
                        URI-reference, the base URI for resolving that reference is the URI of
                        the parent schema resource.
                    </t>
                    <t>
                        If no parent schema object explicitly identifies itself as a resource
                        with "$id", the base URI is that of the entire document, as established
                        by the steps given in the <xref target="initial-base">previous section.</xref>
                    </t>
                    <section title="Identifying the root schema">
                        <t>
                            The root schema of a JSON Schema document SHOULD contain an "$id" keyword
                            with an <xref target="RFC3986">absolute-URI</xref> (containing a scheme,
                            but no fragment).
                        </t>
                    </section>
                </section>
                <section title="Defining location-independent identifiers" anchor="anchor">
                    <t>
                        Using JSON Pointer fragments requires knowledge of the structure of the schema.
                        When writing schema documents with the intention to provide re-usable
                        schemas, it may be preferable to use a plain name fragment that is not tied to
                        any particular structural location.  This allows a subschema to be relocated
                        without requiring JSON Pointer references to be updated.
                    </t>
                    <t>
                        The "$anchor" and "$dynamicAnchor" keywords are used to specify such
                        fragments.  They are identifier keywords that can only be used to create
                        plain name fragments, rather than absolute URIs as seen with "$id".
                    </t>
                    <t>
                        The base URI to which the resulting fragment is appended is the canonical
                        URI of the schema resource containing the "$anchor" or "$dynamicAnchor"
                        in question.  As discussed in the previous section, this is either the
                        nearest "$id" in the same or parent schema object, or the base URI
                        for the document as determined according to RFC 3986.
                    </t>
                    <t>
                        Separately from the usual usage of URIs, "$dynamicAnchor"
                        indicates that the fragment is an extension point when used with
                        the "$dynamicRef" keyword.  This low-level, advanced feature
                        makes it easier to extend recursive schemas such as the meta-schemas,
                        without imposing any particular semantics on that extension.
                        See the section on <xref target="dynamic-ref">"$dynamicRef"</xref>
                        for details.
                    </t>
                    <t>
                        In most cases, the normal fragment behavior both suffices and
                        is more intuitive.  Therefore it is RECOMMENDED that "$anchor"
                        be used to create plain name fragments unless there is a clear
                        need for "$dynamicAnchor".
                    </t>
                    <t>
                        If present, the value of this keyword MUST be a string and MUST start with
                        a letter ([A-Za-z]) or underscore ("_"), followed by any number of letters,
                        digits ([0-9]), hyphens ("-"), underscores ("_"), and periods (".").
                        This matches the US-ASCII part of XML's
                        <xref target="xml-names">NCName production</xref>.
                        <cref>
                            Note that the anchor string does not include the "#" character,
                            as it is not a URI-reference.  An "$anchor": "foo" becomes the
                            fragment "#foo" when used in a URI.  See below for full examples.
                        </cref>
                    </t>
                    <t>
                        The effect of specifying the same fragment name multiple times within
                        the same resource, using any combination of "$anchor" and/or
                        "$dynamicAnchor", is undefined.  Implementations MAY
                        raise an error if such usage is detected.
                    </t>
                </section>

                <section title="Schema References" anchor="references">
                    <t>
                        Several keywords can be used to reference a schema which is to be applied to the
                        current instance location. "$ref" and "$dynamicRef" are applicator
                        keywords, applying the referenced schema to the instance.
                    </t>
                    <t>
                        As the values of "$ref" and "$dynamicRef" are URI References, this allows
                        the possibility to externalise or divide a schema across multiple files,
                        and provides the ability to validate recursive structures through
                        self-reference.
                    </t>
                    <t>
                        The resolved URI produced by these keywords is not necessarily a network
                        locator, only an identifier. A schema need not be downloadable from the
                        address if it is a network-addressable URL, and implementations SHOULD NOT
                        assume they should perform a network operation when they encounter
                        a network-addressable URI.
                    </t>

                    <section title='Direct References with "$ref"' anchor="ref">
                        <t>
                            The "$ref" keyword is an applicator that is used to reference a statically
                            identified schema.  Its results are the results of the referenced schema.
                            <cref>
                                Note that this definition of how the results are determined means that
                                other keywords can appear alongside of "$ref" in the same schema object.
                            </cref>
                        </t>
                        <t>
                            The value of the "$ref" keyword MUST be a string which is a URI-Reference.
                            Resolved against the current URI base, it produces the URI of the schema
                            to apply.  This resolution is safe to perform on schema load, as the
                            process of evaluating an instance cannot change how the reference resolves.
                        </t>
                    </section>

                    <section title='Dynamic References with "$dynamicRef"' anchor="dynamic-ref">
                        <t>
                            The "$dynamicRef" keyword is an applicator that allows for deferring the
                            full resolution until runtime, at which point it is resolved each time it is
                            encountered while evaluating an instance.
                        </t>
                        <t>
                            Together with "$dynamicAnchor", "$dynamicRef" implements a cooperative
                            extension mechanism that is primarily useful with recursive schemas
                            (schemas that reference themselves).  Both the extension point and the
                            runtime-determined extension target are defined with "$dynamicAnchor",
                            and only exhibit runtime dynamic behavior when referenced with
                            "$dynamicRef".
                        </t>
                        <t>
                            The value of the "$dynamicRef" property MUST be a string which is
                            a URI-Reference.  Resolved against the current URI base, it produces
                            the URI used as the starting point for runtime resolution.  This initial
                            resolution is safe to perform on schema load.
                        </t>
                        <t>
                            If the initially resolved starting point URI includes a fragment that
                            was created by the "$dynamicAnchor" keyword, the initial URI MUST be
                            replaced by the URI (including the fragment) for the outermost schema
                            resource in the <xref target="scopes">dynamic scope</xref> that defines
                            an identically named fragment with "$dynamicAnchor".
                        </t>
                        <t>
                            Otherwise, its behavior is identical to "$ref", and no runtime
                            resolution is needed.
                        </t>
                        <t>
                            For a full example using these keyword, see appendix
                            <xref target="recursive-example" format="counter" />.
                            <cref>
                                The difference between the hyper-schema meta-schema in pre-2019
                                drafts and an this draft dramatically demonstrates the utility
                                of these keywords.
                            </cref>
                        </t>
                    </section>

                </section>

                <section title='Schema Re-Use With "$defs"' anchor="defs">
                    <t>
                        The "$defs" keyword reserves a location for schema
                        authors to inline re-usable JSON Schemas into a more general schema.
                        The keyword does not directly affect the validation result.
                    </t>
                    <t>
                        This keyword's value MUST be an object.
                        Each member value of this object MUST be a valid JSON Schema.
                    </t>
                    <t>
                        As an example, here is a schema describing an array of positive
                        integers, where the positive integer constraint is a subschema in
                        "$defs":
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
    "type": "array",
    "items": { "$ref": "#/$defs/positiveInteger" },
    "$defs": {
        "positiveInteger": {
            "type": "integer",
            "exclusiveMinimum": 0
        }
    }
}
]]>
                        </artwork>
                    </figure>
                </section>
            </section>

            <section title='Comments With "$comment"'>
                <t>
                    This keyword reserves a location for comments from schema authors
                    to readers or maintainers of the schema.
                </t>
                <t>
                    The value of this keyword MUST be a string. Implementations MUST NOT present this
                    string to end users.  Tools for editing schemas SHOULD support displaying and
                    editing this keyword.  The value of this keyword MAY be used in debug or error
                    output which is intended for developers making use of schemas.
                </t>
                <t>
                    Schema vocabularies SHOULD allow "$comment" within any object containing
                    vocabulary keywords.  Implementations MAY assume "$comment" is allowed
                    unless the vocabulary specifically forbids it.  Vocabularies MUST NOT
                    specify any effect of "$comment" beyond what is described in this
                    specification.
                </t>
                <t>
                    Tools that translate other media types or programming languages
                    to and from application/schema+json MAY choose to convert that media type or
                    programming language's native comments to or from "$comment" values.
                    The behavior of such translation when both native comments and "$comment"
                    properties are present is implementation-dependent.
                </t>
                <t>
                    Implementations MAY strip "$comment" values at any point during processing.
                    In particular, this allows for shortening schemas when the size of deployed
                    schemas is a concern.
                </t>
                <t>
                    Implementations MUST NOT take any other action based on the presence, absence,
                    or contents of "$comment" properties.  In particular, the value of "$comment"
                    MUST NOT be collected as an annotation result.
                </t>
            </section>
        </section>

        <section title="Loading and Processing Schemas">
            <t>
            </t>
            <section title="Loading a Schema">
                <section title="Initial Base URI" anchor="initial-base">
                    <t>
                        <xref target="RFC3986">RFC3986 Section 5.1</xref> defines how to determine the
                        default base URI of a document.
                    </t>
                    <t>
                        Informatively, the initial base URI of a schema is the URI at which it was
                        found, whether that was a network location, a local filesystem, or any other
                        situation identifiable by a URI of any known scheme.
                    </t>
                    <t>
                        If a schema document defines no explicit base URI with "$id"
                        (embedded in content), the base URI is that determined per
                        <xref target="RFC3986">RFC 3986 section 5</xref>.
                    </t>
                    <t>
                        If no source is known, or no URI scheme is known for the source, a suitable
                        implementation-specific default URI MAY be used as described in
                        <xref target="RFC3986"> RFC 3986 Section 5.1.4</xref>.  It is RECOMMENDED
                        that implementations document any default base URI that they assume.
                    </t>
                    <t>
                        If a schema object is embedded in a document of another media type, then
                        the initial base URI is determined according to the rules of that
                        media type.
                    </t>
                    <t>
                        Unless the "$id" keyword described in an earlier section is present in the
                        root schema, this base URI SHOULD be considered the canonical URI of the
                        schema document's root schema resource.
                    </t>
                </section>

                <section title="Loading a referenced schema">
                    <t>
                        The use of URIs to identify remote schemas does not necessarily mean anything is downloaded,
                        but instead JSON Schema implementations SHOULD understand ahead of time which schemas they will be using,
                        and the URIs that identify them.
                    </t>
                    <t>
                        When schemas are downloaded,
                        for example by a generic user-agent that does not know until runtime which schemas to download,
                        see <xref target="hypermedia">Usage for Hypermedia</xref>.
                    </t>
                    <t>
                        Implementations SHOULD be able to associate arbitrary URIs with an arbitrary
                        schema and/or automatically associate a schema's "$id"-given URI, depending
                        on the trust that the validator has in the schema.  Such URIs and schemas
                        can be supplied to an implementation prior to processing instances, or may
                        be noted within a schema document as it is processed, producing associations
                        as shown in appendix <xref target="idExamples" format="counter"></xref>.
                    </t>
                    <t>
                        A schema MAY (and likely will) have multiple URIs, but there is no way for a
                        URI to identify more than one schema. When multiple schemas try to identify
                        as the same URI, validators SHOULD raise an error condition.
                    </t>
                </section>

                <section title="Detecting a Meta-Schema">
                    <t>
                        Implementations MUST recognize a schema as a meta-schema if it
                        is being examined because it was identified as such by another
                        schema's "$schema" keyword.  This means that a single schema
                        document might sometimes be considered a regular schema, and
                        other times be considered a meta-schema.
                    </t>
                    <t>
                        In the case of examining a schema which is its own meta-schema,
                        when an implementation begins processing it as a regular schema,
                        it is processed under those rules.  However, when loaded a second
                        time as a result of checking its own "$schema" value, it is treated
                        as a meta-schema.  So the same document is processed both ways in
                        the course of one session.
                    </t>
                    <t>
                        Implementations MAY allow a schema to be explicitly passed as a meta-schema,
                        for implementation-specific purposes, such as pre-loading a commonly
                        used meta-schema and checking its vocabulary support requirements
                        up front.  Meta-schema authors MUST NOT expect such features to be
                        interoperable across implementations.
                    </t>
                </section>
            </section>

            <section title="Dereferencing">
                <t>
                    Schemas can be identified by any URI that has been given to them, including
                    a JSON Pointer or their URI given directly by "$id".  In all cases,
                    dereferencing a "$ref" reference involves first resolving its value as a
                    URI reference against the current base URI per
                    <xref target="RFC3986">RFC 3986</xref>.
                </t>
                <t>
                    If the resulting URI identifies a schema within the current document, or
                    within another schema document that has been made available to the implementation,
                    then that schema SHOULD be used automatically.
                </t>
                <t>
                    For example, consider this schema:
                </t>

                <figure>
                    <artwork>
<![CDATA[
{
    "$id": "https://example.net/root.json",
    "items": {
        "type": "array",
        "items": { "$ref": "#item" }
    },
    "$defs": {
        "single": {
            "$anchor": "item",
            "type": "object",
            "additionalProperties": { "$ref": "other.json" }
        }
    }
}
]]>
                    </artwork>
                </figure>
                <t>
                    When an implementation encounters the &lt;#/$defs/single&gt; schema,
                    it resolves the "$anchor" value as a fragment name against the current
                    base URI to form &lt;https://example.net/root.json#item&gt;.
                </t>
                <t>
                    When an implementation then looks inside the &lt;#/items&gt; schema, it
                    encounters the &lt;#item&gt; reference, and resolves this to
                    &lt;https://example.net/root.json#item&gt;, which it has seen defined in
                    this same document and can therefore use automatically.
                </t>
                <t>
                    When an implementation encounters the reference to "other.json", it resolves
                    this to &lt;https://example.net/other.json&gt;, which is not defined in this
                    document.  If a schema with that identifier has otherwise been supplied to
                    the implementation, it can also be used automatically.
                    <cref>
                        What should implementations do when the referenced schema is not known?
                        Are there circumstances in which automatic network dereferencing is
                        allowed?  A same origin policy?  A user-configurable option?  In the
                        case of an evolving API described by Hyper-Schema, it is expected that
                        new schemas will be added to the system dynamically, so placing an
                        absolute requirement of pre-loading schema documents is not feasible.
                    </cref>
                </t>

                <section title="JSON Pointer fragments and embedded schema resources"
                         anchor="embedded">
                    <t>
                        Since JSON Pointer URI fragments are constructed based on the structure
                        of the schema document, an embedded schema resource and its subschemas
                        can be identified by JSON Pointer fragments relative to either its own
                        canonical URI, or relative to any containing resource's URI.
                    </t>
                    <t>
                        Conceptually, a set of linked schema resources should behave
                        identically whether each resource is a separate document connected with
                        <xref target="references">schema references</xref>, or is structured as
                        a single document with one or more schema resources embedded as
                        subschemas.
                    </t>
                    <t>
                        Since URIs involving JSON Pointer fragments relative to the parent
                        schema resource's URI cease to be valid when the embedded schema
                        is moved to a separate document and referenced, applications and schemas
                        SHOULD NOT use such URIs to identify embedded schema resources or
                        locations within them.
                    </t>
                    <figure>
                        <preamble>
                            Consider the following schema document that contains another
                            schema resource embedded within it:
                        </preamble>
                        <artwork>
<![CDATA[
{
    "$id": "https://example.com/foo",
    "items": {
        "$id": "https://example.com/bar",
        "additionalProperties": { }
    }
}
]]>
                        </artwork>
                    </figure>
                    <t>
                        The URI "https://example.com/foo#/items" points to the "items" schema,
                        which is an embedded resource.  The canonical URI of that schema
                        resource, however, is "https://example.com/bar".
                    </t>
                    <t>
                        For the "additionalProperties" schema within that embedded resource,
                        the URI "https://example.com/foo#/items/additionalProperties" points
                        to the correct object, but that object's URI relative to its resource's
                        canonical URI is "https://example.com/bar#/additionalProperties".
                    </t>
                    <figure>
                        <preamble>
                            Now consider the following two schema resources linked by reference
                            using a URI value for "$ref":
                        </preamble>
                        <artwork>
<![CDATA[
{
    "$id": "https://example.com/foo",
    "items": {
        "$ref": "bar"
    }
}

{
    "$id": "https://example.com/bar",
    "additionalProperties": { }
}
]]>
                        </artwork>
                        <postamble>
                            Here we see that "https://example.com/bar#/additionalProperties",
                            using a JSON Pointer fragment appended to the canonical URI of
                            the "bar" schema resource, is still valid, while
                            "https://example.com/foo#/items/additionalProperties", which relied
                            on a JSON Pointer fragment appended to the canonical URI of the
                            "foo" schema resource, no longer resolves to anything.
                        </postamble>
                    </figure>
                    <t>
                        Note also that "https://example.com/foo#/items" is valid in both
                        arrangements, but resolves to a different value.  This URI ends up
                        functioning similarly to a retrieval URI for a resource.  While this URI
                        is valid, it is more robust to use the "$id" of the embedded or referenced
                        resource unless it is specifically desired to identify the object containing
                        the "$ref" in the second (non-embedded) arrangement.
                    </t>
                    <t>
                        An implementation MAY choose not to support addressing schema resource
                        contents by URIs using a base other than the resource's canonical URI,
                        plus a JSON Pointer fragment relative to that base.  Therefore, schema
                        authors SHOULD NOT rely on such URIs, as using them may reduce interoperability.
                        <cref>
                            This is to avoid requiring implementations to keep track of a whole
                            stack of possible base URIs and JSON Pointer fragments for each,
                            given that all but one will be fragile if the schema resources
                            are reorganized.  Some
                            have argued that this is easy so there is
                            no point in forbidding it, while others have argued that it complicates
                            schema identification and should be forbidden.  Feedback on this
                            topic is encouraged.
                            After some discussion, we feel that we need to remove the use of
                            "canonical" in favour of talking about JSON Pointers which reference
                            across schema resource boundaries as undefined or even forbidden behavior
                            (https://github.com/json-schema-org/json-schema-spec/issues/937,
                            https://github.com/json-schema-org/json-schema-spec/issues/1183)
                        </cref>
                    </t>
                    <t>
                        Further examples of such non-canonical URI construction, as well as
                        the appropriate canonical URI-based fragments to use instead,
                        are provided in appendix <xref target="idExamples" format="counter"></xref>.
                    </t>
                </section>
            </section>

            <section title="Compound Documents">
                <t>
                    A Compound Schema Document is defined as a JSON document (sometimes called a "bundled" schema)
                    which has multiple embedded JSON Schema Resources bundled into the same document to
                    ease transportation.
                </t>
                <t>
                    Each embedded Schema Resource MUST be treated as an individual Schema Resource, following standard
                    schema loading and processing requirements, including determining vocabulary support.
                </t>
                <section title="Bundling">
                    <t>
                        The bundling process for creating a Compound Schema Document is defined as taking
                        references (such as "$ref") to an external Schema Resource and embedding the referenced
                        Schema Resources within the referring document. Bundling SHOULD be done in such a way that
                        all URIs (used for referencing) in the base document and any referenced/embedded
                        documents do not require altering.
                    </t>
                    <t>
                        Each embedded JSON Schema Resource MUST identify itself with a URI using the "$id" keyword,
                        and SHOULD make use of the "$schema" keyword to identify the dialect it is using, in the root of the
                        schema resource. It is RECOMMENDED that the URI identifier value of "$id" be an Absolute URI.
                    </t>
                    <t>
                        When the Schema Resource referenced by a by-reference applicator is bundled, it is RECOMMENDED that
                        the Schema Resource be located as a value of a "$defs" object at the containing schema's root.
                        The key of the "$defs" for the now embedded Schema Resource MAY be the "$id" of the bundled schema
                        or some other form of application defined unique identifer (such as a UUID). This key is not
                        intended to be referenced in JSON Schema, but may be used by an application to aid the
                        bundling process.
                    </t>
                    <t>
                        A Schema Resource MAY be embedded in a location other than "$defs" where the location is defined
                        as a schema value.
                    </t>
                    <t>
                        A Bundled Schema Resource MUST NOT be bundled by replacing the schema object from which it was
                        referenced, or by wrapping the Schema Resource in other applicator keywords.
                    </t>
                    <t>
                        In order to produce identical output, references in the containing schema document to the
                        previously external Schema Resources MUST NOT be changed, and now resolve to a schema using the
                        "$id" of an embedded Schema Resource. Such identical output includes validation evaluation and URIs
                        or paths used in resulting annotations or errors.
                    </t>
                    <t>
                        While the bundling process will often be the main method for creating a Compound Schema Document,
                        it is also possible and expected that some will be created by hand, potentially without individual
                        Schema Resources existing on their own previously.
                    </t>
                </section>
                <section title="Differing and Default Dialects">
                    <t>
                        When multiple schema resources are present in a single document,
                        schema resources which do not define with which dialect they should be processed
                        MUST be processed with the same dialect as the enclosing resource.
                    </t>
                    <t>
                        Since any schema that can be referenced can also be embedded, embedded schema resources MAY
                        specify different processing dialects using the "$schema" values from their enclosing resource.
                    </t>
                </section>
                <section title="Validating">
                    <t>
                        Given that a Compound Schema Document may have embedded resources which identify as using different
                        dialects, these documents SHOULD NOT be validated by applying a meta-schema
                        to the Compound Schema Document as an instance. It is RECOMMENDED that an alternate
                        validation process be provided in order to validate Schema Documents. Each Schema Resource
                        SHOULD be separately validated against its associated meta-schema.
                        <cref>
                            If you know a schema is what's being validated, you can identify if the schemas
                            is a Compound Schema Document or not, by way of use of "$id", which identifies an
                            embedded resource when used not at the document's root.
                        </cref>
                    </t>
                    <t>
                        A Compound Schema Document in which all embedded resources identify as using the same
                        dialect, or in which "$schema" is omitted and therefore defaults to that of the enclosing resource,
                        MAY be validated by applying the appropriate meta-schema.
                    </t>
                </section>
            </section>

            <section title="Caveats">
                <section title="Guarding Against Infinite Recursion">
                    <t>
                        A schema MUST NOT be run into an infinite loop against an instance. For
                        example, if two schemas "#alice" and "#bob" both have an "allOf" property
                        that refers to the other, a naive validator might get stuck in an infinite
                        recursive loop trying to validate the instance.  Schemas SHOULD NOT make
                        use of infinite recursive nesting like this; the behavior is undefined.
                    </t>
                </section>

                <section title="References to Possible Non-Schemas" anchor="non-schemas">
                    <t>
                        Subschema objects (or booleans) are recognized by their use with known
                        applicator keywords or with location-reserving keywords such as
                        <xref target="defs">"$defs"</xref> that take one or more subschemas
                        as a value.  These keywords may be "$defs" and the standard applicators
                        from this document, or extension keywords from a known vocabulary, or
                        implementation-specific custom keywords.
                    </t>
                    <t>
                        Multi-level structures of unknown keywords are capable of introducing
                        nested subschemas, which would be subject to the processing rules for
                        "$id".  Therefore, having a reference target in such an unrecognized
                        structure cannot be reliably implemented, and the resulting behavior
                        is undefined.  Similarly, a reference target under a known keyword,
                        for which the value is known not to be a schema, results in undefined
                        behavior in order to avoid burdening implementations with the need
                        to detect such targets.
                        <cref>
                            These scenarios are analogous to fetching a schema over HTTP
                            but receiving a response with a Content-Type other than
                            application/schema+json.  An implementation can certainly
                            try to interpret it as a schema, but the origin server
                            offered no guarantee that it actually is any such thing.
                            Therefore, interpreting it as such has security implications
                            and may produce unpredictable results.
                        </cref>
                    </t>
                    <t>
                        Note that single-level custom keywords with identical syntax and
                        semantics to "$defs" do not allow for any intervening "$id" keywords,
                        and therefore will behave correctly under implementations that attempt
                        to use any reference target as a schema.  However, this behavior is
                        implementation-specific and MUST NOT be relied upon for interoperability.
                    </t>
                </section>
            </section>

            <section title="Associating Instances and Schemas">

                <section title="Usage for Hypermedia" anchor="hypermedia">

                    <t>
                        JSON has been adopted widely by HTTP servers for automated APIs and robots. This
                        section describes how to enhance processing of JSON documents in a more RESTful
                        manner when used with protocols that support media types and
                        <xref target="RFC8288">Web linking</xref>.
                    </t>

                    <section title='Linking to a Schema'>
                        <t>
                            It is RECOMMENDED that instances described by a schema provide a link to
                            a downloadable JSON Schema using the link relation "describedby", as defined by
                            <xref target="W3C.REC-ldp-20150226">Linked Data Protocol 1.0, section 8.1</xref>.
                        </t>

                        <t>
                            In HTTP, such links can be attached to any response using the
                            <xref target="RFC8288">Link header</xref>. An example of such a header would be:
                        </t>

                        <figure>
                            <artwork>
        <![CDATA[
        Link: <https://example.com/my-hyper-schema>; rel="describedby"
        ]]>
                            </artwork>
                        </figure>

                    </section>

                    <section title="Usage Over HTTP">
                        <t>
                            When used for hypermedia systems over a network,
                            <xref target="RFC7231">HTTP</xref> is frequently the protocol of choice for
                            distributing schemas. Misbehaving clients can pose problems for server
                            maintainers if they pull a schema over the network more frequently than
                            necessary, when it's instead possible to cache a schema for a long period of
                            time.
                        </t>
                        <t>
                            HTTP servers SHOULD set long-lived caching headers on JSON Schemas.
                            HTTP clients SHOULD observe caching headers and not re-request documents within
                            their freshness period.
                            Distributed systems SHOULD make use of a shared cache and/or caching proxy.
                        </t>
                        <t>
                            Clients SHOULD set or prepend a User-Agent header specific to the JSON Schema
                            implementation or software product. Since symbols are listed in decreasing order
                            of significance, the JSON Schema library name/version should precede the more
                            generic HTTP library name (if any). For example:
                        </t>
                        <figure>
                            <artwork>
        <![CDATA[
        User-Agent: product-name/5.4.1 so-cool-json-schema/1.0.2 curl/7.43.0
        ]]>
                            </artwork>
                        </figure>
                        <t>
                            Clients SHOULD be able to make requests with a "From" header so that server
                            operators can contact the owner of a potentially misbehaving script.
                        </t>
                    </section>

                </section>

            </section>

        </section>

        <section title="A Vocabulary for Applying Subschemas">
            <t>
                This section defines a vocabulary of applicator keywords that
                are RECOMMENDED for use as the basis of other vocabularies.
            </t>
            <t>
                Meta-schemas that do not use "$vocabulary" SHOULD be considered to
                require this vocabulary as if its URI were present with a value of true.
            </t>
            <t>
                The current URI for this vocabulary, known as the Applicator vocabulary, is:
                &lt;https://json-schema.org/draft/2020-12/vocab/applicator&gt;.
            </t>
            <t>
                The current URI for the corresponding meta-schema is:
                <eref target="https://json-schema.org/draft/2020-12/meta/applicator"/>.
            </t>
            <section title="Keyword Independence">
                <t>
                    Schema keywords typically operate independently, without
                    affecting each other's outcomes.
                </t>
                <t>
                    For schema author convenience, there are some exceptions among the
                    keywords in this vocabulary:
                    <list>
                        <t>
                            "additionalProperties", whose behavior is defined in terms of
                            "properties" and "patternProperties"
                        </t>
                        <t>
                            "items", whose behavior is defined in terms of "prefixItems"
                        </t>
                        <t>
                            "contains", whose behavior is affected by the presence and value of
                            "minContains", in the Validation vocabulary
                        </t>
                    </list>
                </t>
            </section>

            <section title="Keywords for Applying Subschemas in Place" anchor="in-place">
                <t>
                    These keywords apply subschemas to the same location in the instance
                    as the parent schema is being applied.  They allow combining
                    or modifying the subschema results in various ways.
                </t>

                <t>
                    Subschemas of these keywords evaluate the instance completely independently
                    such that the results of one such subschema MUST NOT impact the results of sibling
                    subschemas.  Therefore subschemas may be applied in
                    any order.
                </t>

                <section title="Keywords for Applying Subschemas With Logic" anchor="logic">
                    <t>
                        These keywords correspond to logical operators for combining or modifying
                        the boolean assertion results of the subschemas.  They have no direct
                        impact on annotation collection, although they enable the same annotation
                        keyword to be applied to an instance location with different values.
                        Annotation keywords define their own rules for combining such values.
                    </t>
                    <section title="allOf" anchor="allOf">
                        <t>
                            This keyword's value MUST be a non-empty array.
                            Each item of the array MUST be a valid JSON Schema.
                        </t>
                        <t>
                            An instance validates successfully against this keyword if it validates
                            successfully against all schemas defined by this keyword's value.
                        </t>
                    </section>

                    <section title="anyOf">
                        <t>
                            This keyword's value MUST be a non-empty array.
                            Each item of the array MUST be a valid JSON Schema.
                        </t>
                        <t>
                            An instance validates successfully against this keyword if it validates
                            successfully against at least one schema defined by this keyword's value.
                            Note that when annotations are being collected, all subschemas MUST
                            be examined so that annotations are collected from each subschema
                            that validates successfully.
                        </t>
                    </section>

                    <section title="oneOf">
                        <t>
                            This keyword's value MUST be a non-empty array.
                            Each item of the array MUST be a valid JSON Schema.
                        </t>
                        <t>
                            An instance validates successfully against this keyword if it validates
                            successfully against exactly one schema defined by this keyword's value.
                        </t>
                    </section>

                    <section title="not" anchor="not">
                        <t>
                            This keyword's value MUST be a valid JSON Schema.
                        </t>
                        <t>
                            An instance is valid against this keyword if it fails to validate
                            successfully against the schema defined by this keyword.
                        </t>
                    </section>
                </section>

                <section title="Keywords for Applying Subschemas Conditionally" anchor="conditional">
                    <t>
                        Three of these keywords work together to implement conditional
                        application of a subschema based on the outcome of another subschema.
                        The fourth is a shortcut for a specific conditional case.
                    </t>
                    <t>
                        "if", "then", and "else" MUST NOT interact with each other across
                        subschema boundaries.  In other words, an "if" in one
                        branch of an "allOf" MUST NOT have an impact on a "then"
                        or "else" in another branch.
                    </t>
                    <t>
                        There is no default behavior for "if", "then", or "else"
                        when they are not present.  In particular, they MUST NOT
                        be treated as if present with an empty schema, and when
                        "if" is not present, both "then" and "else" MUST be
                        entirely ignored.
                    </t>
                    <section title="if">
                        <t>
                            This keyword's value MUST be a valid JSON Schema.
                        </t>
                        <t>
                            This validation outcome of this keyword's subschema
                            has no direct effect on the overall validation
                            result.  Rather, it controls which of the "then"
                            or "else" keywords are evaluated.
                        </t>
                        <t>
                            Instances that successfully validate against this
                            keyword's subschema MUST also be valid against
                            the subschema value of the "then" keyword, if
                            present.
                        </t>
                        <t>
                            Instances that fail to validate against this
                            keyword's subschema MUST also be valid against
                            the subschema value of the "else" keyword, if
                            present.
                        </t>
                        <t>
                            If <xref target="annotations">annotations</xref>
                            are being collected, they are collected from this
                            keyword's subschema in the usual way, including when
                            the keyword is present without either "then" or "else".
                        </t>
                    </section>
                    <section title="then">
                        <t>
                            This keyword's value MUST be a valid JSON Schema.
                        </t>
                        <t>
                            When "if" is present, and the instance successfully
                            validates against its subschema, then validation
                            succeeds against this keyword if the instance also
                            successfully validates against this keyword's subschema.
                        </t>
                        <t>
                            This keyword has no effect when "if" is absent, or
                            when the instance fails to validate against its
                            subschema.  Implementations MUST NOT evaluate
                            the instance against this keyword, for either validation
                            or annotation collection purposes, in such cases.
                        </t>
                    </section>
                    <section title="else">
                        <t>
                            This keyword's value MUST be a valid JSON Schema.
                        </t>
                        <t>
                            When "if" is present, and the instance fails to
                            validate against its subschema, then validation
                            succeeds against this keyword if the instance
                            successfully validates against this keyword's subschema.
                        </t>
                        <t>
                            This keyword has no effect when "if" is absent, or
                            when the instance successfully validates against its
                            subschema.  Implementations MUST NOT evaluate
                            the instance against this keyword, for either validation
                            or annotation collection purposes, in such cases.
                        </t>
                    </section>
                    <section title="dependentSchemas">
                        <t>
                            This keyword specifies subschemas that are evaluated if the instance
                            is an object and contains a certain property.
                        </t>
                        <t>
                            This keyword's value MUST be an object.
                            Each value in the object MUST be a valid JSON Schema.
                        </t>
                        <t>
                            If the object key is a property in the instance, the entire
                            instance must validate against the subschema.  Its use is
                            dependent on the presence of the property.
                        </t>
                        <t>
                            Omitting this keyword has the same behavior as an empty object.
                        </t>
                    </section>
                </section>
            </section>
            <section title="Keywords for Applying Subschemas to Child Instances">
                <t>
                    Each of these keywords defines a rule for applying its
                    subschema(s) to child instances, specifically object
                    properties and array items, and combining their results.
                </t>
                <section title="Keywords for Applying Subschemas to Arrays">
                    <section title="prefixItems">
                        <t>
                            The value of "prefixItems" MUST be a non-empty array of valid JSON Schemas.
                        </t>
                        <t>
                            Validation succeeds if each element of the instance validates
                            against the schema at the same position, if any.  This keyword
                            does not constrain the length of the array.  If the array is longer
                            than this keyword's value, this keyword validates only the
                            prefix of matching length.
                        </t>
                        <t>
                            This keyword produces an annotation value which is the largest
                            index to which this keyword applied a subschema.  The value
                            MAY be a boolean true if a subschema was applied to every
                            index of the instance, such as is produced by the "items" keyword.
                            This annotation affects the behavior of "items" and "unevaluatedItems".
                        </t>
                        <t>
                            Omitting this keyword has the same assertion behavior as
                            an empty array.
                        </t>
                    </section>

                    <section title="items" anchor="items">
                        <t>
                            The value of "items" MUST be a valid JSON Schema.
                        </t>
                        <t>
                            This keyword applies its subschema to all instance elements
                            at indexes greater than the length of the "prefixItems" array
                            in the same schema object, as reported by the annotation result
                            of that "prefixItems" keyword.  If no such annotation
                            result exists, "items" applies its subschema to all instance
                            array elements.
                            <cref>
                                Note that the behavior of "items" without "prefixItems" is
                                identical to that of the schema form of "items" in prior drafts.
                                When "prefixItems" is present, the behavior of "items" is
                                identical to the former "additionalItems" keyword.
                            </cref>
                        </t>
                        <t>
                            If the "items" subschema is applied to any
                            positions within the instance array, it produces an
                            annotation result of boolean true, indicating that all remaining array
                            elements have been evaluated against this keyword's subschema.
                            This annotation affects the behavior of "unevaluatedItems" in the
                            Unevaluated vocabulary.
                        </t>
                        <t>
                            Omitting this keyword has the same assertion behavior as
                            an empty schema.
                        </t>
                        <t>
                            Implementations MAY choose to implement or optimize this keyword
                            in another way that produces the same effect, such as by directly
                            checking for the presence and size of a "prefixItems" array.
                            Implementations that do not support annotation collection MUST do so.
                        </t>
                    </section>

                    <section title="contains">
                        <t>
                            The value of this keyword MUST be a valid JSON Schema.
                        </t>
                        <t>
                            An array instance is valid against "contains" if at least one of
                            its elements is valid against the given schema,
                            except when "minContains" is present and has a value of 0, in which
                            case an array instance MUST be considered valid against the "contains" keyword,
                            even if none of its elements is valid against the given schema.
                        </t>
                        <t>
                            This keyword produces an annotation value which is an array of
                            the indexes to which this keyword validates successfully when applying
                            its subschema, in ascending order. The value MAY be a boolean "true" if
                            the subschema validates successfully when applied to every index of the
                            instance. The annotation MUST be present if the instance array to which
                            this keyword's schema applies is empty.
                        </t>
                        <t>
                            This annotation affects the behavior of "unevaluatedItems" in the
                            Unevaluated vocabulary, and MAY also be used to implement the
                            "minContains" and "maxContains" keywords in the Validation vocabulary.
                        </t>
                        <t>
                            The subschema MUST be applied to every array element even after the first
                            match has been found, in order to collect annotations for use by other
                            keywords. This is to ensure that all possible annotations are collected.
                        </t>
                    </section>
                </section>

                <section title="Keywords for Applying Subschemas to Objects">
                    <section title="properties">
                        <t>
                            The value of "properties" MUST be an object.
                            Each value of this object MUST be a valid JSON Schema.
                        </t>
                        <t>
                            Validation succeeds if, for each name that appears in both
                            the instance and as a name within this keyword's value, the child
                            instance for that name successfully validates against the
                            corresponding schema.
                        </t>
                        <t>
                            The annotation result of this keyword is the set of instance
                            property names matched by this keyword.
                            This annotation affects the behavior of "additionalProperties" (in
                            this vocabulary) and "unevaluatedProperties" in the Unevaluated vocabulary.
                        </t>
                        <t>
                            Omitting this keyword has the same assertion behavior as
                            an empty object.
                        </t>
                    </section>

                    <section title="patternProperties">
                        <t>
                            The value of "patternProperties" MUST be an object. Each property name
                            of this object SHOULD be a valid regular expression, according to the
                            ECMA-262 regular expression dialect. Each property value of this object
                            MUST be a valid JSON Schema.
                        </t>
                        <t>
                            Validation succeeds if, for each instance name that matches any
                            regular expressions that appear as a property name in this keyword's value,
                            the child instance for that name successfully validates against each
                            schema that corresponds to a matching regular expression.
                        </t>
                        <t>
                            The annotation result of this keyword is the set of instance
                            property names matched by this keyword.
                            This annotation affects the behavior of "additionalProperties" (in this
                            vocabulary) and "unevaluatedProperties" (in the Unevaluated vocabulary).
                        </t>
                        <t>
                            Omitting this keyword has the same assertion behavior as
                            an empty object.
                        </t>
                    </section>

                    <section title="additionalProperties" anchor="additionalProperties">
                        <t>
                            The value of "additionalProperties" MUST be a valid JSON Schema.
                        </t>
                        <t>
                            The behavior of this keyword depends on the presence and
                            annotation results of "properties" and "patternProperties"
                            within the same schema object.
                            Validation with "additionalProperties" applies only to the child
                            values of instance names that do not appear in the annotation
                            results of either "properties" or "patternProperties".
                        </t>
                        <t>
                            For all such properties, validation succeeds if the child instance
                            validates against the "additionalProperties" schema.
                        </t>
                        <t>
                            The annotation result of this keyword is the set of instance
                            property names validated by this keyword's subschema.
                            This annotation affects the behavior of "unevaluatedProperties"
                            in the Unevaluated vocabulary.
                        </t>
                        <t>
                            Omitting this keyword has the same assertion behavior as
                            an empty schema.
                        </t>
                        <t>
                            Implementations MAY choose to implement or optimize this keyword
                            in another way that produces the same effect, such as by directly
                            checking the names in "properties" and the patterns in
                            "patternProperties" against the instance property set.
                            Implementations that do not support annotation collection MUST do so.
                            <cref>
                                In defining this option, it seems there is the potential for
                                ambiguity in the output format. The ambiguity does not affect validation results,
                                but it does affect the resulting output format.
                                The ambiguity allows for multiple valid output results depending on whether annotations
                                are used or a solution that "produces the same effect" as draft-07. It is understood
                                that annotations from failing schemas are dropped.
                                See our
                                [Decision Record](https://github.com/json-schema-org/json-schema-spec/tree/HEAD/adr/2022-04-08-cref-for-ambiguity-and-fix-later-gh-spec-issue-1172.md)
                                for further details.
                            </cref>
                        </t>
                    </section>

                    <section title="propertyNames">
                        <t>
                            The value of "propertyNames" MUST be a valid JSON Schema.
                        </t>
                        <t>
                            If the instance is an object, this keyword validates if every property name in
                            the instance validates against the provided schema.
                            Note the property name that the schema is testing will always be a string.
                        </t>
                        <t>
                            Omitting this keyword has the same behavior as an empty schema.
                        </t>
                    </section>
                </section>
            </section>
        </section>

        <section title="A Vocabulary for Unevaluated Locations">
            <t>
                The purpose of these keywords is to enable schema authors to apply
                subschemas to array items or object properties that have not been
                successfully evaluated against any dynamic-scope subschema of any
                adjacent keywords.
            </t>
            <t>
                These instance items or properties may have been unsuccessfully evaluated
                against one or more adjacent keyword subschemas, such as when an assertion
                in a branch of an "anyOf" fails.  Such failed evaluations are not considered
                to contribute to whether or not the item or property has been evaluated.
                Only successful evaluations are considered.
            </t>
            <t>
                If an item in an array or an object property is "successfully evaluated", it
                is logically considered to be valid in terms of the representation of the
                object or array that's expected. For example if a subschema represents a car,
                which requires between 2-4 wheels, and the value of "wheels" is 6, the instance
                object is not "evaluated" to be a car, and the "wheels" property is considered
                "unevaluated (successfully as a known thing)", and does not retain any annotations.
            </t>
            <t>
                Recall that adjacent keywords are keywords within the same schema object,
                and that the dynamic-scope subschemas include reference targets as well as
                lexical subschemas.
            </t>
            <t>
                The behavior of these keywords depend on the annotation results of
                adjacent keywords that apply to the instance location being validated.
            </t>
            <t>
                Meta-schemas that do not use "$vocabulary" SHOULD be considered to
                require this vocabulary as if its URI were present with a value of true.
            </t>
            <t>
                The current URI for this vocabulary, known as the Unevaluated Applicator
                vocabulary, is:
                &lt;https://json-schema.org/draft/2020-12/vocab/unevaluated&gt;.
            </t>
            <t>
                The current URI for the corresponding meta-schema is:
                <eref target="https://json-schema.org/draft/2020-12/meta/unevaluated"/>.
            </t>

            <section title="Keyword Independence">
                <t>
                    Schema keywords typically operate independently, without
                    affecting each other's outcomes. However, the keywords in this
                    vocabulary are notable exceptions:
                    <list>
                        <t>
                            "unevaluatedItems", whose behavior is defined in terms of annotations
                            from "prefixItems", "items", "contains", and itself
                        </t>
                        <t>
                            "unevaluatedProperties", whose behavior is defined in terms of
                            annotations from "properties", "patternProperties",
                            "additionalProperties" and itself
                        </t>
                    </list>
                </t>
            </section>

            <section title="unevaluatedItems" anchor="unevaluatedItems">
                <t>
                    The value of "unevaluatedItems" MUST be a valid JSON Schema.
                </t>
                <t>
                    The behavior of this keyword depends on the annotation results of
                    adjacent keywords that apply to the instance location being validated.
                    Specifically, the annotations from "prefixItems", "items", and "contains",
                    which can come from those keywords when they are adjacent to the
                    "unevaluatedItems" keyword. Those three annotations, as well as
                    "unevaluatedItems", can also result from any and all adjacent
                    <xref target="in-place">in-place applicator</xref> keywords.
                    This includes but is not limited to the in-place applicators
                    defined in this document.
                </t>
                <t>
                    If no relevant annotations are present, the "unevaluatedItems"
                    subschema MUST be applied to all locations in the array.
                    If a boolean true value is present from any of the relevant annotations,
                    "unevaluatedItems" MUST be ignored.  Otherwise, the subschema
                    MUST be applied to any index greater than the largest annotation
                    value for "prefixItems", which does not appear in any annotation
                    value for "contains".
                </t>
                <t>
                    This means that "prefixItems", "items", "contains", and all in-place
                    applicators MUST be evaluated before this keyword can be evaluated.
                    Authors of extension keywords MUST NOT define an in-place applicator
                    that would need to be evaluated after this keyword.
                </t>
                <t>
                    If the "unevaluatedItems" subschema is applied to any
                    positions within the instance array, it produces an
                    annotation result of boolean true, analogous to the
                    behavior of "items".
                    This annotation affects the behavior of "unevaluatedItems" in parent schemas.
                </t>
                <t>
                    Omitting this keyword has the same assertion behavior as
                    an empty schema.
                </t>
            </section>

            <section title="unevaluatedProperties" anchor="unevaluatedProperties">
                <t>
                    The value of "unevaluatedProperties" MUST be a valid JSON Schema.
                </t>
                <t>
                    The behavior of this keyword depends on the annotation results of
                    adjacent keywords that apply to the instance location being validated.
                    Specifically, the annotations from "properties", "patternProperties",
                    and "additionalProperties", which can come from those keywords when
                    they are adjacent to the "unevaluatedProperties" keyword.  Those
                    three annotations, as well as "unevaluatedProperties", can also
                    result from any and all adjacent
                    <xref target="in-place">in-place applicator</xref> keywords.
                    This includes but is not limited to the in-place applicators
                    defined in this document.
                </t>
                <t>
                    Validation with "unevaluatedProperties" applies only to the child
                    values of instance names that do not appear in the "properties",
                    "patternProperties", "additionalProperties", or
                    "unevaluatedProperties" annotation results that apply to the
                    instance location being validated.
                </t>
                <t>
                    For all such properties, validation succeeds if the child instance
                    validates against the "unevaluatedProperties" schema.
                </t>
                <t>
                    This means that "properties", "patternProperties", "additionalProperties",
                    and all in-place applicators MUST be evaluated before this keyword can
                    be evaluated.  Authors of extension keywords MUST NOT define an in-place
                    applicator that would need to be evaluated after this keyword.
                </t>
                <t>
                    The annotation result of this keyword is the set of instance
                    property names validated by this keyword's subschema.
                    This annotation affects the behavior of "unevaluatedProperties" in parent schemas.
                </t>
                <t>
                    Omitting this keyword has the same assertion behavior as
                    an empty schema.
                </t>
            </section>
        </section>

        <section title="Output Formatting" anchor="output">
            <t>
                JSON Schema is defined to be platform-independent.  As such, to increase compatibility
                across platforms, implementations SHOULD conform to a standard validation output
                format.  This section describes the minimum requirements that consumers will need to
                properly interpret validation results.
            </t>

            <section title="Format">
                <t>
                    JSON Schema output is defined using the JSON Schema data instance model as described
                    in section 4.2.1.  Implementations MAY deviate from this as supported by their
                    specific languages and platforms, however it is RECOMMENDED that the output be
                    convertible to the JSON format defined herein via serialization or other means.
                </t>
            </section>

            <section title="Output Formats">
                <t>
                    This specification defines four output formats.  See the "Output Structure"
                    section for the requirements of each format.
                    <list>
                        <t>
                            Flag - A boolean which simply indicates the overall validation result
                            with no further details.
                        </t>
                        <t>
                            Basic - Provides validation information in a flat list structure.
                        </t>
                        <t>
                            Detailed - Provides validation information in a condensed hierarchical
                            structure based on the structure of the schema.
                        </t>
                        <t>
                            Verbose - Provides validation information in an uncondensed hierarchical
                            structure that matches the exact structure of the schema.
                        </t>
                    </list>
                    An implementation SHOULD provide at least one of the "flag", "basic", or "detailed"
                    format and MAY provide the "verbose" format.  If it provides one or more of the
                    "detailed" or "verbose" formats, it MUST also provide the "flag" format.
                    Implementations SHOULD specify in their documentation which formats they support.
                </t>

            </section>

            <section title="Minimum Information">
                <t>
                    Beyond the simplistic "flag" output, additional information is useful to aid in
                    debugging a schema or instance.  Each sub-result SHOULD contain the information
                    contained within this section at a minimum.
                </t>
                <t>
                    A single object that contains all of these components is considered an
                    output unit.
                </t>
                <t>
                    Implementations MAY elect to provide additional information.
                </t>

                <section title="Keyword Relative Location">
                    <t>
                        The relative location of the validating keyword that follows the validation
                        path.  The value MUST be expressed as a JSON Pointer, and it MUST include
                        any by-reference applicators such as "$ref" or "$dynamicRef".
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
/properties/width/$ref/minimum
]]>
                        </artwork>
                    </figure>
                    <t>
                    Note that this pointer may not be resolvable by the normal JSON Pointer process
                    due to the inclusion of these by-reference applicator keywords.
                    </t>
                    <t>
                        The JSON key for this information is "keywordLocation".
                    </t>
                </section>

                <section title="Keyword Absolute Location">
                    <t>
                        The absolute, dereferenced location of the validating keyword.  The value MUST
                        be expressed as a full URI using the canonical URI of the relevant schema resource
                        with a JSON Pointer fragment, and it MUST NOT include by-reference applicators
                        such as "$ref" or "$dynamicRef" as non-terminal path components.
                        It MAY end in such keywords if the error or annotation is for that
                        keyword, such as an unresolvable reference.
                        <cref>
                            Note that "absolute" here is in the sense of "absolute filesystem path"
                            (meaning the complete location) rather than the "absolute-URI"
                            terminology from RFC 3986 (meaning with scheme but without fragment).
                            Keyword absolute locations will have a fragment in order to
                            identify the keyword.
                        </cref>
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
https://example.com/schemas/common#/$defs/count/minimum
]]>
                        </artwork>
                    </figure>
                    <t>
                        This information MAY be omitted only if either the dynamic scope did not pass
                        over a reference or if the schema does not declare an absolute URI as its "$id".
                    </t>
                    <t>
                        The JSON key for this information is "absoluteKeywordLocation".
                    </t>
                </section>

                <section title="Instance Location">
                    <t>
                        The location of the JSON value within the instance being validated.  The
                        value MUST be expressed as a JSON Pointer.
                    </t>
                    <t>
                        The JSON key for this information is "instanceLocation".
                    </t>
                </section>

                <section title="Error or Annotation">
                    <t>
                        The error or annotation that is produced by the validation.
                    </t>
                    <t>
                        For errors, the specific wording for the message is not defined by this
                        specification.  Implementations will need to provide this.
                    </t>
                    <t>
                        For annotations, each keyword that produces an annotation specifies its
                        format.  By default, it is the keyword's value.
                    </t>
                    <t>
                        The JSON key for failed validations is "error"; for successful validations
                        it is "annotation".
                    </t>
                </section>

                <section title="Nested Results">
                    <t>
                        For the two hierarchical structures, this property will hold nested errors
                        and annotations.
                    </t>
                    <t>
                        The JSON key for nested results in failed validations is "errors"; for
                        successful validations it is "annotations".  Note the plural forms, as
                        a keyword with nested results can also have a local error or annotation.
                    </t>
                </section>

            </section>

            <section title="Output Structure">
                <t>
                    The output MUST be an object containing a boolean property named "valid".  When
                    additional information about the result is required, the output MUST also contain
                    "errors" or "annotations" as described below.
                    <list>
                        <t>
                            "valid" - a boolean value indicating the overall validation success or
                            failure
                        </t>
                        <t>
                            "errors" - the collection of errors or annotations produced by a failed
                            validation
                        </t>
                        <t>
                            "annotations" - the collection of errors or annotations produced by a
                            successful validation
                        </t>
                    </list>
                    For these examples, the following schema and instance will be used.
                </t>
                <figure>
                    <artwork>
<![CDATA[
{
  "$id": "https://example.com/polygon",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "point": {
      "type": "object",
      "properties": {
        "x": { "type": "number" },
        "y": { "type": "number" }
      },
      "additionalProperties": false,
      "required": [ "x", "y" ]
    }
  },
  "type": "array",
  "items": { "$ref": "#/$defs/point" },
  "minItems": 3
}

[
  {
    "x": 2.5,
    "y": 1.3
  },
  {
    "x": 1,
    "z": 6.7
  }
]
]]>
                    </artwork>
                </figure>
                <t>
                    This instance will fail validation and produce errors, but it's trivial to deduce
                    examples for passing schemas that produce annotations.
                </t>
                <t>
                    Specifically, the errors it will produce are:
                    <list>
                        <t>
                            The second object is missing a "y" property.
                        </t>
                        <t>
                            The second object has a disallowed "z" property.
                        </t>
                        <t>
                            There are only two objects, but three are required.
                        </t>
                    </list>
                    Note that the error message wording as depicted in these examples is not a
                    requirement of this specification.  Implementations SHOULD craft error messages
                    tailored for their audience or provide a templating mechanism that allows their
                    users to craft their own messages.
                </t>

                <section title="Flag">
                    <t>
                        In the simplest case, merely the boolean result for the "valid" valid property
                        needs to be fulfilled.
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
  "valid": false
}
]]>
                        </artwork>
                    </figure>
                    <t>
                        Because no errors or annotations are returned with this format, it is
                        RECOMMENDED that implementations use short-circuiting logic to return
                        failure or success as soon as the outcome can be determined.  For example,
                        if an "anyOf" keyword contains five sub-schemas, and the second one
                        passes, there is no need to check the other three.  The logic can simply
                        return with success.
                    </t>
                </section>

                <section title="Basic">
                    <t>
                        The "Basic" structure is a flat list of output units.
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
  "valid": false,
  "errors": [
    {
      "keywordLocation": "",
      "instanceLocation": "",
      "error": "A subschema had errors."
    },
    {
      "keywordLocation": "/items/$ref",
      "absoluteKeywordLocation":
        "https://example.com/polygon#/$defs/point",
      "instanceLocation": "/1",
      "error": "A subschema had errors."
    },
    {
      "keywordLocation": "/items/$ref/required",
      "absoluteKeywordLocation":
        "https://example.com/polygon#/$defs/point/required",
      "instanceLocation": "/1",
      "error": "Required property 'y' not found."
    },
    {
      "keywordLocation": "/items/$ref/additionalProperties",
      "absoluteKeywordLocation":
        "https://example.com/polygon#/$defs/point/additionalProperties",
      "instanceLocation": "/1/z",
      "error": "Additional property 'z' found but was invalid."
    },
    {
      "keywordLocation": "/minItems",
      "instanceLocation": "",
      "error": "Expected at least 3 items but found 2"
    }
  ]
}
]]>
                        </artwork>
                    </figure>
                </section>

                <section title="Detailed">
                    <t>
                        The "Detailed" structure is based on the schema and can be more readable
                        for both humans and machines.  Having the structure organized this way makes
                        associations between the errors more apparent.  For example, the fact that
                        the missing "y" property and the extra "z" property both stem from the same
                        location in the instance is not immediately obvious in the "Basic" structure.
                        In a hierarchy, the correlation is more easily identified.
                    </t>
                    <t>
                        The following rules govern the construction of the results object:
                        <list>
                            <t>
                                All applicator keywords ("*Of", "$ref", "if"/"then"/"else", etc.) require
                                a node.
                            </t>
                            <t>
                                Nodes that have no children are removed.
                            </t>
                            <t>
                                Nodes that have a single child are replaced by the child.
                            </t>
                        </list>
                        Branch nodes do not require an error message or an annotation.
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
{
  "valid": false,
  "keywordLocation": "",
  "instanceLocation": "",
  "errors": [
    {
      "valid": false,
      "keywordLocation": "/items/$ref",
      "absoluteKeywordLocation":
        "https://example.com/polygon#/$defs/point",
      "instanceLocation": "/1",
      "errors": [
        {
          "valid": false,
          "keywordLocation": "/items/$ref/required",
          "absoluteKeywordLocation":
            "https://example.com/polygon#/$defs/point/required",
          "instanceLocation": "/1",
          "error": "Required property 'y' not found."
        },
        {
          "valid": false,
          "keywordLocation": "/items/$ref/additionalProperties",
          "absoluteKeywordLocation":
            "https://example.com/polygon#/$defs/point/additionalProperties",
          "instanceLocation": "/1/z",
          "error": "Additional property 'z' found but was invalid."
        }
      ]
    },
    {
      "valid": false,
      "keywordLocation": "/minItems",
      "instanceLocation": "",
      "error": "Expected at least 3 items but found 2"
    }
  ]
}
]]>
                        </artwork>
                    </figure>
                </section>

                <section title="Verbose">
                    <t>
                        The "Verbose" structure is a fully realized hierarchy that exactly matches
                        that of the schema.  This structure has applications in form generation and
                        validation where the error's location is important.
                    </t>
                    <t>
                        The primary difference between this and the "Detailed" structure is that
                        all results are returned.  This includes sub-schema validation results that
                        would otherwise be removed (e.g. annotations for failed validations,
                        successful validations inside a `not` keyword, etc.).  Because of this, it
                        is RECOMMENDED that each node also carry a `valid` property to indicate the
                        validation result for that node.
                    </t>
                    <t>
                        Because this output structure can be quite large, a smaller example is given
                        here for brevity.  The URI of the full output structure of the example above is:
                        <eref target="https://json-schema.org/draft/2020-12/output/verbose-example"/>.
                    </t>
                    <figure>
                        <artwork>
<![CDATA[
// schema
{
  "$id": "https://example.com/polygon",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "validProp": true,
  },
  "additionalProperties": false
}

// instance
{
  "validProp": 5,
  "disallowedProp": "value"
}

// result
{
  "valid": false,
  "keywordLocation": "",
  "instanceLocation": "",
  "errors": [
    {
      "valid": true,
      "keywordLocation": "/type",
      "instanceLocation": ""
    },
    {
      "valid": true,
      "keywordLocation": "/properties",
      "instanceLocation": ""
    },
    {
      "valid": false,
      "keywordLocation": "/additionalProperties",
      "instanceLocation": "",
      "errors": [
        {
          "valid": false,
          "keywordLocation": "/additionalProperties",
          "instanceLocation": "/disallowedProp",
          "error": "Additional property 'disallowedProp' found but was invalid."
        }
      ]
    }
  ]
}
]]>
                        </artwork>
                    </figure>
                </section>

                <section title="Output validation schemas">
                    <t>
                        For convenience, JSON Schema has been provided to validate output generated
                        by implementations.  Its URI is:
                        <eref target="https://json-schema.org/draft/2020-12/output/schema"/>.
                    </t>
                </section>

            </section>

        </section>

        <section title="Security Considerations" anchor="security">
            <t>
                Both schemas and instances are JSON values. As such, all security considerations
                defined in <xref target="RFC8259">RFC 8259</xref> apply.
            </t>
            <t>
                Instances and schemas are both frequently written by untrusted third parties, to be
                deployed on public Internet servers.
                Validators should take care that the parsing and validating against schemas does not consume excessive
                system resources.
                Validators MUST NOT fall into an infinite loop.
            </t>
            <t>
                A malicious party could cause an implementation to repeatedly collect a copy
                of a very large value as an annotation.  Implementations SHOULD guard against
                excessive consumption of system resources in such a scenario.
            </t>
            <t>
                Servers MUST ensure that malicious parties cannot change the functionality of
                existing schemas by uploading a schema with a pre-existing or very similar "$id".
            </t>
            <t>
                Individual JSON Schema vocabularies are liable to also have their own security
                considerations. Consult the respective specifications for more information.
            </t>
            <t>
                Schema authors should take care with "$comment" contents, as a malicious
                implementation can display them to end-users in violation of a spec, or
                fail to strip them if such behavior is expected.
            </t>
            <t>
                A malicious schema author could place executable code or other dangerous
                material within a "$comment".  Implementations MUST NOT parse or otherwise
                take action based on "$comment" contents.
            </t>
        </section>

        <section title="IANA Considerations">
            <section title="application/schema+json">
                <t>
                    The proposed MIME media type for JSON Schema is defined as follows:

                    <list>
                        <t>Type name: application</t>
                        <t>Subtype name: schema+json</t>
                        <t>Required parameters: N/A</t>
                        <t>
                            Encoding considerations: Encoding considerations are
                            identical to those specified for the "application/json"
                            media type.  See <xref target="RFC8259">JSON</xref>.
                        </t>
                        <t>
                            Security considerations: See Section
                            <xref target="security" format="counter"></xref> above.
                        </t>
                        <t>
                            Interoperability considerations: See Sections
                            <xref target="language" format="counter"></xref>,
                            <xref target="integers" format="counter"></xref>, and
                            <xref target="regex" format="counter"></xref> above.
                        </t>
                        <t>
                            Fragment identifier considerations: See Section
                            <xref target="fragments" format="counter"></xref>
                        </t>
                    </list>
                </t>
            </section>
            <section title="application/schema-instance+json">
                <t>
                    The proposed MIME media type for JSON Schema Instances that require
                    a JSON Schema-specific media type is defined as follows:

                    <list>
                        <t>Type name: application</t>
                        <t>Subtype name: schema-instance+json</t>
                        <t>Required parameters: N/A</t>
                        <t>
                            Encoding considerations: Encoding considerations are
                            identical to those specified for the "application/json"
                            media type.  See <xref target="RFC8259">JSON</xref>.
                        </t>
                        <t>
                            Security considerations: See Section
                            <xref target="security" format="counter"></xref> above.
                        </t>
                        <t>
                            Interoperability considerations: See Sections
                            <xref target="language" format="counter"></xref>,
                            <xref target="integers" format="counter"></xref>, and
                            <xref target="regex" format="counter"></xref> above.
                        </t>
                        <t>
                            Fragment identifier considerations: See Section
                            <xref target="fragments" format="counter"></xref>
                        </t>
                    </list>
                </t>
            </section>
        </section>
    </middle>

    <back>
        <!-- References Section -->
        <references title="Normative References">
            &RFC2119;
            &RFC3986;
            &RFC6839;
            &RFC6901;
            &RFC8259;
            &ldp;
            <reference anchor="ecma262"
            target="https://www.ecma-international.org/ecma-262/11.0/index.html">
                <front>
                    <title>ECMA-262, 11th edition specification</title>
                    <author/>
                    <date month="June" year="2020" />
                </front>
            </reference>
        </references>

        <references title="Informative References">
            &RFC6596;
            &RFC7049;
            &RFC7231;
            &RFC8288;
            &fragid-best-practices;
            <reference anchor="json-schema-validation">
                <front>
                    <title>JSON Schema Validation: A Vocabulary for Structural Validation of JSON</title>
                    <author initials="A." surname="Wright">
                        <organization/>
                    </author>
                    <author initials="H." surname="Andrews">
                        <organization/>
                    </author>
                    <author initials="B." surname="Hutton">
                        <organization/>
                    </author>
                    <date year="2022" month="June"/>
                </front>
                <seriesInfo name="Internet-Draft" value="draft-bhutton-json-schema-validation-01" />
            </reference>
            <reference anchor="json-hyper-schema">
                <front>
                    <title>JSON Hyper-Schema: A Vocabulary for Hypermedia Annotation of JSON</title>
                    <author initials="H." surname="Andrews">
                        <organization/>
                    </author>
                    <author initials="A." surname="Wright">
                        <organization/>
                    </author>
                    <date year="2017" month="November"/>
                </front>
                <seriesInfo name="Internet-Draft" value="draft-handrews-json-schema-hyperschema-02" />
            </reference>
            <reference anchor="xml-names" target="http://www.w3.org/TR/2006/REC-xml-names11-20060816">
                <front>
                    <title>Namespaces in XML 1.1 (Second Edition)</title>
                    <author fullname="Tim Bray" role="editor">
                        <organization>Textuality</organization>
                        <address>
                            <email>tbray@textuality.com</email>
                        </address>
                    </author>
                    <author fullname="Dave Hollander" role="editor">
                        <organization>Contivo, Inc.</organization>
                        <address>
                            <email>dmh@contivo.com</email>
                        </address>
                    </author>
                    <author fullname="Andrew Layman" role="editor">
                        <organization>Microsoft</organization>
                        <address>
                            <email>andrewl@microsoft.com</email>
                        </address>
                    </author>
                    <author fullname="Richard Tobin" role="editor">
                        <organization>University of Edinburgh and Markup Technology Ltd</organization>
                        <address>
                            <email>richard@cogsci.ed.ac.uk</email>
                        </address>
                    </author>
                    <date month="August" year="2006"/>
                </front>
            </reference>
        </references>

        <section title="Schema identification examples" anchor="idExamples">
            <figure>
                <preamble>
                    Consider the following schema, which shows "$id" being used to identify
                    both the root schema and various subschemas, and "$anchor" being used
                    to define plain name fragment identifiers.
                </preamble>
                <artwork>
<![CDATA[
{
    "$id": "https://example.com/root.json",
    "$defs": {
        "A": { "$anchor": "foo" },
        "B": {
            "$id": "other.json",
            "$defs": {
                "X": { "$anchor": "bar" },
                "Y": {
                    "$id": "t/inner.json",
                    "$anchor": "bar"
                }
            }
        },
        "C": {
            "$id": "urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f"
        }
    }
}
]]>
                </artwork>
            </figure>
            <t>
                The schemas at the following URI-encoded <xref target="RFC6901">JSON
                Pointers</xref> (relative to the root schema) have the following
                base URIs, and are identifiable by any listed URI in accordance with
                sections <xref target="fragments" format="counter"></xref> and
                <xref target="embedded" format="counter"></xref> above.
            </t>
            <t>
                <list style="hanging">
                    <t hangText="# (document root)">
                        <list style="hanging">
                            <t hangText="canonical (and base) URI">
                                https://example.com/root.json
                            </t>
                            <t hangText="canonical resource URI plus pointer fragment">
                                https://example.com/root.json#
                            </t>
                        </list>
                    </t>
                    <t hangText="#/$defs/A">
                        <list>
                            <t hangText="base URI">https://example.com/root.json</t>
                            <t hangText="canonical resource URI plus plain fragment">
                                https://example.com/root.json#foo
                            </t>
                            <t hangText="canonical resource URI plus pointer fragment">
                                https://example.com/root.json#/$defs/A
                            </t>
                        </list>
                    </t>
                    <t hangText="#/$defs/B">
                        <list style="hanging">
                            <t hangText="canonical (and base) URI">https://example.com/other.json</t>
                            <t hangText="canonical resource URI plus pointer fragment">
                                https://example.com/other.json#
                            </t>
                            <t hangText="base URI of enclosing (root.json) resource plus fragment">
                                https://example.com/root.json#/$defs/B
                            </t>
                        </list>
                    </t>
                    <t hangText="#/$defs/B/$defs/X">
                        <list style="hanging">
                            <t hangText="base URI">https://example.com/other.json</t>
                            <t hangText="canonical resource URI plus plain fragment">
                                https://example.com/other.json#bar
                            </t>
                            <t hangText="canonical resource URI plus pointer fragment">
                                https://example.com/other.json#/$defs/X
                            </t>
                            <t hangText="base URI of enclosing (root.json) resource plus fragment">
                                https://example.com/root.json#/$defs/B/$defs/X
                            </t>
                        </list>
                    </t>
                    <t hangText="#/$defs/B/$defs/Y">
                        <list style="hanging">
                            <t hangText="canonical (and base) URI">https://example.com/t/inner.json</t>
                            <t hangText="canonical URI plus plain fragment">
                                https://example.com/t/inner.json#bar
                            </t>
                            <t hangText="canonical URI plus pointer fragment">
                                https://example.com/t/inner.json#
                            </t>
                            <t hangText="base URI of enclosing (other.json) resource plus fragment">
                                https://example.com/other.json#/$defs/Y
                            </t>
                            <t hangText="base URI of enclosing (root.json) resource plus fragment">
                                https://example.com/root.json#/$defs/B/$defs/Y
                            </t>
                        </list>
                    </t>
                    <t hangText="#/$defs/C">
                        <list style="hanging">
                            <t hangText="canonical (and base) URI">
                                urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f
                            </t>
                            <t hangText="canonical URI plus pointer fragment">
                                urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f#
                            </t>
                            <t hangText="base URI of enclosing (root.json) resource plus fragment">
                                https://example.com/root.json#/$defs/C
                            </t>
                        </list>
                    </t>
                </list>
            </t>
            <t>
                Note: The fragment part of the URI does not make it canonical or non-canonical,
                rather, the base URI used (as part of the full URI with any fragment) is what
                determines the canonical nature of the resulting full URI.
                <cref>
                    Multiple "canonical" URIs? We Acknowledge this is potentially confusing, and
                    direct you to read the CREF located in the
                    <xref target="embedded">JSON Pointer fragments and embedded schema resources</xref>
                    section for futher comments.
                </cref>
            </t>

        </section>

        <section title="Manipulating schema documents and references">
            <t>
                Various tools have been created to rearrange schema documents
                based on how and where references ("$ref") appear.  This appendix discusses
                which use cases and actions are compliant with this specification.
            </t>
            <section title="Bundling schema resources into a single document">
                <t>
                    A set of schema resources intended for use together can be organized
                    with each in its own schema document, all in the same schema document,
                    or any granularity of document grouping in between.
                </t>
                <t>
                    Numerous tools exist to perform various sorts of reference removal.
                    A common case of this is producing a single file where all references
                    can be resolved within that file.  This is typically done to simplify
                    distribution, or to simplify coding so that various invocations
                    of JSON Schema libraries do not have to keep track of and load
                    a large number of resources.
                </t>
                <t>
                    This transformation can be safely and reversibly done as long as
                    all static references (e.g. "$ref") use URI-references that resolve
                    to URIs using the canonical resource URI as the base, and all schema
                    resources have an absolute-URI as the "$id" in their root schema.
                </t>
                <t>
                    With these conditions met, each external resource can be copied
                    under "$defs", without breaking any references among the resources'
                    schema objects, and without changing any aspect of validation or
                    annotation results.  The names of the schemas under "$defs" do
                    not affect behavior, assuming they are each unique, as they
                    do not appear in the canonical URIs for the embedded resources.
                </t>
            </section>
            <section title="Reference removal is not always safe">
                <t>
                    Attempting to remove all references and produce a single schema document does not,
                    in all cases, produce a schema with identical behavior to the original form.
                </t>
                <t>
                    Since "$ref" is now treated like any other keyword, with other keywords allowed
                    in the same schema objects, fully supporting non-recursive "$ref" removal in
                    all cases can require relatively complex schema manipulations.  It is beyond
                    the scope of this specification to determine or provide a set of safe "$ref"
                    removal transformations, as they depend not only on the schema structure
                    but also on the intended usage.
                </t>
            </section>
        </section>

        <section title="Example of recursive schema extension" anchor="recursive-example">
            <figure>
                <preamble>
                    Consider the following two schemas describing a simple
                    recursive tree structure, where each node in the tree
                    can have a "data" field of any type.  The first schema
                    allows and ignores other instance properties.  The second is
                    more strict and only allows the "data" and "children" properties.
                    An example instance with "data" misspelled as "daat" is also shown.
                </preamble>
                <artwork>
<![CDATA[
// tree schema, extensible
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/tree",
    "$dynamicAnchor": "node",

    "type": "object",
    "properties": {
        "data": true,
        "children": {
            "type": "array",
            "items": {
                "$dynamicRef": "#node"
            }
        }
    }
}

// strict-tree schema, guards against misspelled properties
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/strict-tree",
    "$dynamicAnchor": "node",

    "$ref": "tree",
    "unevaluatedProperties": false
}

// instance with misspelled field
{
    "children": [ { "daat": 1 } ]
}
]]>
                </artwork>
            </figure>
            <t>
                When we load these two schemas, we will notice the "$dynamicAnchor"
                named "node" (note the lack of "#" as this is just the name)
                present in each, resulting in the following full schema URIs:
                <list style="symbols">
                    <t>"https://example.com/tree#node"</t>
                    <t>"https://example.com/strict-tree#node"</t>
                </list>
                In addition, JSON Schema implementations keep track of the fact
                that these fragments were created with "$dynamicAnchor".
            </t>
            <t>
                If we apply the "strict-tree" schema to the instance, we will follow
                the "$ref" to the "tree" schema, examine its "children" subschema,
                and find the "$dynamicRef": to "#node" (note the "#" for URI fragment syntax)
                in its "items" subschema.  That reference resolves to
                "https://example.com/tree#node", which is a URI with a fragment
                created by "$dynamicAnchor".  Therefore we must examine the dynamic
                scope before following the reference.
            </t>
            <t>
                At this point, the dynamic path is
                "#/$ref/properties/children/items/$dynamicRef", with a dynamic scope
                containing (from the outermost scope to the innermost):
                <list style="numbers">
                  <t>"https://example.com/strict-tree#"</t>
                  <t>"https://example.com/tree#"</t>
                  <t>"https://example.com/tree#/properties/children"</t>
                  <t>"https://example.com/tree#/properties/children/items"</t>
                </list>
            </t>
            <t>
                Since we are looking for a plain name fragment, which can be
                defined anywhere within a schema resource, the JSON Pointer fragments
                are irrelevant to this check.  That means that we can remove those
                fragments and eliminate consecutive duplicates, producing:
                <list style="numbers">
                  <t>"https://example.com/strict-tree"</t>
                  <t>"https://example.com/tree"</t>
                </list>
            </t>
            <t>
                In this case, the outermost resource also has a "node" fragment
                defined by "$dynamicAnchor".  Therefore instead of resolving the
                "$dynamicRef" to "https://example.com/tree#node", we resolve it to
                "https://example.com/strict-tree#node".
            </t>
            <t>
                This way, the recursion in the "tree" schema recurses to the root
                of "strict-tree", instead of only applying "strict-tree" to the
                instance root, but applying "tree" to instance children.
            </t>
            <t>
                This example shows both "$dynamicAnchor"s in the same place
                in each schema, specifically the resource root schema.
                Since plain-name fragments are independent of the JSON structure,
                this would work just as well if one or both of the node schema objects
                were moved under "$defs".  It is the matching "$dynamicAnchor" values
                which tell us how to resolve the dynamic reference, not any sort of
                correlation in JSON structure.
            </t>
        </section>

        <section title="Working with vocabularies">
            <section title="Best practices for vocabulary and meta-schema authors">
                <t>
                    Vocabulary authors should
                    take care to avoid keyword name collisions if the vocabulary is intended
                    for broad use, and potentially combined with other vocabularies.  JSON
                    Schema does not provide any formal namespacing system, but also does
                    not constrain keyword names, allowing for any number of namespacing
                    approaches.
                </t>
                <t>
                    Vocabularies may build on each other, such as by defining the behavior
                    of their keywords with respect to the behavior of keywords from another
                    vocabulary, or by using a keyword from another vocabulary with
                    a restricted or expanded set of acceptable values.  Not all such
                    vocabulary re-use will result in a new vocabulary that is compatible
                    with the vocabulary on which it is built.  Vocabulary authors should
                    clearly document what level of compatibility, if any, is expected.
                </t>
                <t>
                    Meta-schema authors should not use "$vocabulary" to combine multiple
                    vocabularies that define conflicting syntax or semantics for the same
                    keyword.  As semantic conflicts are not generally detectable through
                    schema validation, implementations are not expected to detect such
                    conflicts.  If conflicting vocabularies are declared, the resulting
                    behavior is undefined.
                </t>
                <t>
                    Vocabulary authors SHOULD provide a meta-schema that validates the
                    expected usage of the vocabulary's keywords on their own.  Such meta-schemas
                    SHOULD not forbid additional keywords, and MUST not forbid any
                    keywords from the Core vocabulary.
                </t>
                <t>
                    It is recommended that meta-schema authors reference each vocabulary's
                    meta-schema using the <xref target="allOf">"allOf"</xref> keyword,
                    although other mechanisms for constructing the meta-schema may be
                    appropriate for certain use cases.
                </t>
                <t>
                    The recursive nature of meta-schemas makes the "$dynamicAnchor"
                    and "$dynamicRef" keywords particularly useful for extending
                    existing meta-schemas, as can be seen in the JSON Hyper-Schema meta-schema
                    which extends the Validation meta-schema.
                </t>
                <t>
                    Meta-schemas may impose additional constraints, including describing
                    keywords not present in any vocabulary, beyond what the meta-schemas
                    associated with the declared vocabularies describe.  This allows for
                    restricting usage to a subset of a vocabulary, and for validating
                    locally defined keywords not intended for re-use.
                </t>
                <t>
                    However, meta-schemas should not contradict any vocabularies that
                    they declare, such as by requiring a different JSON type than
                    the vocabulary expects.  The resulting behavior is undefined.
                </t>
                <t>
                    Meta-schemas intended for local use, with no need to test for
                    vocabulary support in arbitrary implementations, can safely omit
                    "$vocabulary" entirely.
                </t>
            </section>

            <section title="Example meta-schema with vocabulary declarations"
                     anchor="example-meta-schema">
                <t>
                    This meta-schema explicitly declares both the Core and Applicator vocabularies,
                    together with an extension vocabulary, and combines their meta-schemas with
                    an "allOf".  The extension vocabulary's meta-schema, which describes only the
                    keywords in that vocabulary, is shown after the main example meta-schema.
                </t>
                <t>
                    The main example meta-schema also restricts the usage of the Unevaluated
                    vocabulary by forbidding the keywords prefixed with "unevaluated", which
                    are particularly complex to implement.  This does not change the semantics
                    or set of keywords defined by the other vocabularies. It just ensures
                    that schemas using this meta-schema that attempt to use the keywords
                    prefixed with "unevaluated" will fail validation against this meta-schema.
                </t>
                <t>
                    Finally, this meta-schema describes the syntax of a keyword, "localKeyword",
                    that is not part of any vocabulary.  Presumably, the implementors and users
                    of this meta-schema will understand the semantics of "localKeyword".
                    JSON Schema does not define any mechanism for expressing keyword semantics
                    outside of vocabularies, making them unsuitable for use except in a
                    specific environment in which they are understood.
                </t>
                <figure>
                    <preamble>
                        This meta-schema combines several vocabularies for general use.
                    </preamble>
                    <artwork>
<![CDATA[
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/meta/general-use-example",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://example.com/vocab/example-vocab": true
  },
  "allOf": [
    {"$ref": "https://json-schema.org/draft/2020-12/meta/core"},
    {"$ref": "https://json-schema.org/draft/2020-12/meta/applicator"},
    {"$ref": "https://json-schema.org/draft/2020-12/meta/validation"},
    {"$ref": "https://example.com/meta/example-vocab"}
  ],
  "patternProperties": {
    "^unevaluated": false
  },
  "properties": {
    "localKeyword": {
      "$comment": "Not in vocabulary, but validated if used",
      "type": "string"
    }
  }
}
]]>
                    </artwork>
                </figure>
                <figure>
                    <preamble>
                        This meta-schema describes only a single extension vocabulary.
                    </preamble>
                    <artwork>
<![CDATA[
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/meta/example-vocab",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://example.com/vocab/example-vocab": true,
  },
  "type": ["object", "boolean"],
  "properties": {
    "minDate": {
      "type": "string",
      "pattern": "\d\d\d\d-\d\d-\d\d",
      "format": "date",
    }
  }
}
]]>
                    </artwork>
                </figure>
                <t>
                    As shown above, even though each of the single-vocabulary meta-schemas
                    referenced in the general-use meta-schema's "allOf" declares its
                    corresponding vocabulary, this new meta-schema must re-declare them.
                </t>
                <t>
                    The standard meta-schemas that combine all vocabularies defined by
                    the Core and Validation specification, and that combine all vocabularies
                    defined by those specifications as well as the Hyper-Schema specification,
                    demonstrate additional complex combinations.  These URIs for these
                    meta-schemas may be found in the Validation and Hyper-Schema specifications,
                    respectively.
                </t>
                <t>
                    While the general-use meta-schema can validate the syntax of "minDate",
                    it is the vocabulary that defines the logic behind the semantic meaning
                    of "minDate".  Without an understanding of the semantics (in this example,
                    that the instance value must be a date equal to or after the date
                    provided as the keyword's value in the schema), an implementation can
                    only validate the syntactic usage.  In this case, that means validating
                    that it is a date-formatted string (using "pattern" to ensure that it is
                    validated even when "format" functions purely as an annotation, as explained
                    in the <xref target="json-schema-validation">Validation specification</xref>.
                </t>
            </section>
        </section>

        <section title="References and generative use cases">
            <t>
                While the presence of references is expected to be transparent
                to validation results, generative use cases such as code generators
                and UI renderers often consider references to be semantically significant.
            </t>
            <t>
                To make such use case-specific semantics explicit, the best practice
                is to create an annotation keyword for use in the same
                schema object alongside of a reference keyword such as "$ref".
            </t>
            <figure>
                <preamble>
                    For example, here is a hypothetical keyword for determining
                    whether a code generator should consider the reference
                    target to be a distinct class, and how those classes are related.
                    Note that this example is solely for illustrative purposes, and is
                    not intended to propose a functional code generation keyword.
                </preamble>
                <artwork>
<![CDATA[
{
    "allOf": [
        {
            "classRelation": "is-a",
            "$ref": "classes/base.json"
        },
        {
            "$ref": "fields/common.json"
        }
    ],
    "properties": {
        "foo": {
            "classRelation": "has-a",
            "$ref": "classes/foo.json"
        },
        "date": {
            "$ref": "types/dateStruct.json",
        }
    }
}
]]>
                </artwork>
            </figure>
            <t>
                Here, this schema represents some sort of object-oriented class.
                The first reference in the "allOf" is noted as the base class.
                The second is not assigned a class relationship, meaning that the
                code generator should combine the target's definition with this
                one as if no reference were involved.
            </t>
            <t>
                Looking at the properties, "foo" is flagged as object composition,
                while the "date" property is not.  It is simply a field with
                sub-fields, rather than an instance of a distinct class.
            </t>
            <t>
                This style of usage requires the annotation to be in the same object
                as the reference, which must be recognizable as a reference.
            </t>
        </section>

        <section title="Acknowledgments">
            <t>
                Thanks to
                Gary Court,
                Francis Galiegue,
                Kris Zyp,
                and Geraint Luff
                for their work on the initial drafts of JSON Schema.
            </t>
            <t>
                Thanks to
                Jason Desrosiers,
                Daniel Perrett,
                Erik Wilde,
                Evgeny Poberezkin,
                Brad Bowman,
                Gowry Sankar,
                Donald Pipowitch,
                Dave Finlay,
                Denis Laxalde,
                Phil Sturgeon,
                Shawn Silverman,
                and Karen Etheridge
                for their submissions and patches to the document.
            </t>
        </section>

        <section title="ChangeLog">
            <t>
                <cref>This section to be removed before leaving Internet-Draft status.</cref>
            </t>
            <t>
                <list style="hanging">
                    <t hangText="draft-bhutton-json-schema-01">
                        <list style="symbols">
                            <t>Improve and clarify the "type", "contains", "unevaluatedProperties", and "unevaluatedItems" keyword explanations</t>
                            <t>Clarify various aspects of "canonical URIs"</t>
                            <t>Comment on ambiguity around annotations and "additionalProperties"</t>
                            <t>Clarify Vocabularies need not be formally defined</t>
                            <t>Remove references to remaining media-type parameters</t>
                            <t>Fix multiple examples</t>
                        </list>
                    </t>
                    <t hangText="draft-bhutton-json-schema-00">
                        <list style="symbols">
                            <t>"$schema" MAY change for embedded resources</t>
                            <t>Array-value "items" functionality is now "prefixItems"</t>
                            <t>"items" subsumes the old function of "additionalItems"</t>
                            <t>"contains" annotation behavior, and "contains" and "unevaluatedItems" interactions now specified</t>
                            <t>Rename $recursive* to $dynamic*, with behavior modification</t>
                            <t>$dynamicAnchor defines a fragment like $anchor</t>
                            <t>$dynamic* (previously $recursive) no longer use runtime base URI determination</t>
                            <t>Define Compound Schema Documents (bundle) and processing</t>
                            <t>Reference ECMA-262, 11th edition for regular expression support</t>
                            <t>Regular expression should support unicode</t>
                            <t>Remove media type parameters</t>
                            <t>Specify Unknown keywords are collected as annotations</t>
                            <t>Moved "unevaluatedItems" and "unevaluatedProperties" from core into their own vocabulary</t>
                        </list>
                    </t>
                    <t hangText="draft-handrews-json-schema-02">
                        <list style="symbols">
                            <t>Update to RFC 8259 for JSON specification</t>
                            <t>Moved "definitions" from the Validation specification here as "$defs"</t>
                            <t>Moved applicator keywords from the Validation specification as their own vocabulary</t>
                            <t>Moved the schema form of "dependencies" from the Validation specification as "dependentSchemas"</t>
                            <t>Formalized annotation collection</t>
                            <t>Specified recommended output formats</t>
                            <t>Defined keyword interactions in terms of annotation and assertion results</t>
                            <t>Added "unevaluatedProperties" and "unevaluatedItems"</t>
                            <t>Define "$ref" behavior in terms of the assertion, applicator, and annotation model</t>
                            <t>Allow keywords adjacent to "$ref"</t>
                            <t>Note undefined behavior for "$ref" targets involving unknown keywords</t>
                            <t>Add recursive referencing, primarily for meta-schema extension</t>
                            <t>Add the concept of formal vocabularies, and how they can be recognized through meta-schemas</t>
                            <t>Additional guidance on initial base URIs beyond network retrieval</t>
                            <t>Allow "schema" media type parameter for "application/schema+json"</t>
                            <t>Better explanation of media type parameters and the HTTP Accept header</t>
                            <t>Use "$id" to establish canonical and base absolute-URIs only, no fragments</t>
                            <t>Replace plain-name-fragment-only form of "$id" with "$anchor"</t>
                            <t>Clarified that the behavior of JSON Pointers across "$id" boundary is unreliable</t>
                        </list>
                    </t>
                    <t hangText="draft-handrews-json-schema-01">
                        <list style="symbols">
                            <t>This draft is purely a clarification with no functional changes</t>
                            <t>Emphasized annotations as a primary usage of JSON Schema</t>
                            <t>Clarified $id by use cases</t>
                            <t>Exhaustive schema identification examples</t>
                            <t>Replaced "external referencing" with how and when an implementation might know of a schema from another document</t>
                            <t>Replaced "internal referencing" with how an implementation should recognized schema identifiers during parsing</t>
                            <t>Dereferencing the former "internal" or "external" references is always the same process</t>
                            <t>Minor formatting improvements</t>
                        </list>
                    </t>
                    <t hangText="draft-handrews-json-schema-00">
                        <list style="symbols">
                            <t>Make the concept of a schema keyword vocabulary more clear</t>
                            <t>Note that the concept of "integer" is from a vocabulary, not the data model</t>
                            <t>Classify keywords as assertions or annotations and describe their general behavior</t>
                            <t>Explain the boolean schemas in terms of generalized assertions</t>
                            <t>Reserve "$comment" for non-user-visible notes about the schema</t>
                            <t>Wording improvements around "$id" and fragments</t>
                            <t>Note the challenges of extending meta-schemas with recursive references</t>
                            <t>Add "application/schema-instance+json" media type</t>
                            <t>Recommend a "schema" link relation / parameter instead of "profile"</t>
                        </list>
                    </t>
                    <t hangText="draft-wright-json-schema-01">
                        <list style="symbols">
                            <t>Updated intro</t>
                            <t>Allowed for any schema to be a boolean</t>
                            <t>"$schema" SHOULD NOT appear in subschemas, although that may change</t>
                            <t>Changed "id" to "$id"; all core keywords prefixed with "$"</t>
                            <t>Clarify and formalize fragments for application/schema+json</t>
                            <t>Note applicability to formats such as CBOR that can be represented in the JSON data model</t>
                        </list>
                    </t>
                    <t hangText="draft-wright-json-schema-00">
                        <list style="symbols">
                            <t>Updated references to JSON</t>
                            <t>Updated references to HTTP</t>
                            <t>Updated references to JSON Pointer</t>
                            <t>Behavior for "id" is now specified in terms of RFC3986</t>
                            <t>Aligned vocabulary usage for URIs with RFC3986</t>
                            <t>Removed reference to draft-pbryan-zyp-json-ref-03</t>
                            <t>Limited use of "$ref" to wherever a schema is expected</t>
                            <t>Added definition of the "JSON Schema data model"</t>
                            <t>Added additional security considerations</t>
                            <t>Defined use of subschema identifiers for "id"</t>
                            <t>Rewrote section on usage with HTTP</t>
                            <t>Rewrote section on usage with rel="describedBy" and rel="profile"</t>
                            <t>Fixed numerous invalid examples</t>
                        </list>
                    </t>
                    <t hangText="draft-zyp-json-schema-04">
                        <list style="symbols">
                            <t>Salvaged from draft v3.</t>
                            <t>Split validation keywords into separate document.</t>
                            <t>Split hypermedia keywords into separate document.</t>
                            <t>Initial post-split draft.</t>
                            <t>Mandate the use of JSON Reference, JSON Pointer.</t>
                            <t>Define the role of "id". Define URI resolution scope.</t>
                            <t>Add interoperability considerations.</t>
                        </list>
                    </t>
                    <t hangText="draft-zyp-json-schema-00">
                        <list style="symbols">
                            <t>Initial draft.</t>
                        </list>
                    </t>
                </list>
            </t>
        </section>
    </back>
</rfc>
