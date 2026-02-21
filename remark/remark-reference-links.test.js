import assert from "node:assert/strict";
import test from "node:test";
import remarkHeadings from "./remark-headings.js";
import remarkReferenceLinks from "./remark-reference-links.js";

const createFile = () => ({
    data: {},
    message: () => { }
});

test("throws ReferenceLinkError for prototype key without real heading", () => {
    const tree = {
        type: "root",
        children: [{
            type: "paragraph",
            children: [{ type: "text", value: "Reference: {{constructor}}" }]
        }]
    };
    const file = createFile();
    remarkHeadings({ startDepth: 2, skip: [] })(tree, file);

    assert.throws(
        () => remarkReferenceLinks()(tree, file),
        /ReferenceLinkError: No header found with id "constructor"/
    );
});

test("resolves constructor reference when real heading exists", () => {
    const tree = {
        type: "root",
        children: [
            {
                type: "heading",
                depth: 2,
                data: { id: "constructor", hProperties: { id: "constructor" } },
                children: [{ type: "text", value: "constructor" }]
            },
            {
                type: "paragraph",
                children: [{ type: "text", value: "Reference: {{constructor}}" }]
            }
        ]
    };
    const file = createFile();
    remarkHeadings({ startDepth: 2, skip: [] })(tree, file);
    remarkReferenceLinks()(tree, file);

    const paragraphNode = tree.children[1];
    const referenceNode = paragraphNode.children.find((node) => node.type === "link");

    assert.ok(referenceNode);
    assert.equal(referenceNode.url, "#constructor");
});
