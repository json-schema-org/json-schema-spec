import { describe, expect, test } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { VFile } from "vfile";
import remarkHeadings from "./remark-headings.js";


describe("Heading numbering", () => {
  test("Reuses a processor without leaking options or numbering between documents", () => {
    const options = { startDepth: 2, skip: ["Abstract"] };
    const processor = unified().use(remarkParse).use(remarkHeadings, options);

    const first = new VFile("## Abstract\n\n## First\n\n### Child\n\n## Second");
    processor.runSync(processor.parse(first), first);
    expect(Object.keys(first.data.headings)).toEqual(["section-1", "section-1-1", "section-2"]);

    const second = new VFile("## Abstract\n\n## Another\n\n### Nested");
    processor.runSync(processor.parse(second), second);
    expect(Object.keys(second.data.headings)).toEqual(["section-1", "section-1-1"]);
    expect(second.data.headings["section-1"].data.section).toBe("Section 1");
    expect(first.data.headings["section-2"].data.section).toBe("Section 2");
    expect(options).toEqual({ startDepth: 2, skip: ["Abstract"] });
  });

  test("Reuses a processor with default options", () => {
    const processor = unified().use(remarkParse).use(remarkHeadings);
    for (const value of ["# First", "# Second"]) {
      const file = new VFile(value);
      processor.runSync(processor.parse(file), file);
      expect(Object.keys(file.data.headings)).toEqual(["section-1"]);
    }
  });
});
