import { describe, it, expect } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkTableOfContents from "./remark-table-of-contents.js";


describe("remarkTableOfContents", () => {
  it("should process multiple documents consecutively without options mutation errors", () => {
    const customSkip = ["Skip Section"];
    const processor = unified()
      .use(remarkParse)
      .use(remarkTableOfContents, { skip: customSkip })
      .use(remarkStringify);

    const doc1 = "# Table of Contents\n\n# Section 1\n";
    const doc2 = "# Table of Contents\n\n# Section 2\n";

    expect(() => processor.processSync(doc1)).not.toThrow();
    expect(() => processor.processSync(doc2)).not.toThrow();
    expect(customSkip).toEqual(["Skip Section"]);
  });

  it("should not create empty nested lists for skipped headings", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkTableOfContents, { startDepth: 2, skip: ["Skip Me"] })
      .use(remarkStringify);

    const doc = [
      "## Table of Contents",
      "## Section 1",
      "### Skip Me",
      "## Section 2"
    ].join("\n\n");

    const result = processor.processSync(doc).toString();
    expect(result).not.toContain("* \n");
  });
});

