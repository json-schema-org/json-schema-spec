import { visit } from "unist-util-visit";
import { link, text } from "mdast-builder";
import { findAndReplace } from "mdast-util-find-and-replace";
import { toString as nodeToString } from "mdast-util-to-string";


const defaultOptions = {
  startDepth: 1,
  skip: [],
  appendixToken: "%appendix%",
  appendixPrefix: "Appendix"
};

const remarkNumberHeadings = (options) => (tree, file) => {
  options = { ...defaultOptions, ...options };
  options.skip = new RegExp(`^(${options.skip.join("|")})$`, "u");

  // Auto-number headings
  let sectionNumbers = [];

  visit(tree, "heading", (headingNode) => {
    if (headingNode.depth < options.startDepth) {
      return;
    }

    const headingText = nodeToString(headingNode);
    if (options.skip.test(headingText)) {
      return;
    }

    if (!("data" in headingNode)) {
      headingNode.data = {};
    }

    if (!("hProperties" in headingNode.data)) {
      headingNode.data.hProperties = {};
    }

    if (headingText.startsWith(options.appendixToken)) {
      findAndReplace(headingNode, [options.appendixToken]);

      const currentIndex = typeof sectionNumbers[headingNode.depth] === "string"
        ? sectionNumbers[headingNode.depth]
        : "@";
      sectionNumbers[headingNode.depth] = String.fromCharCode(currentIndex.charCodeAt(0) + 1);
      sectionNumbers = sectionNumbers.slice(0, headingNode.depth + 1);

      const sectionNumber = sectionNumbers.slice(options.startDepth, headingNode.depth + 1).join(".");
      headingNode.data.section = `${options.appendixPrefix} ${sectionNumber}`;

      headingNode.children.splice(0, 0, text(`${headingNode.data.section}. `));
    } else {
      sectionNumbers[headingNode.depth] = (sectionNumbers[headingNode.depth] ?? 0) + 1;
      sectionNumbers = sectionNumbers.slice(0, headingNode.depth + 1);

      const sectionNumber = sectionNumbers.slice(options.startDepth, headingNode.depth + 1).join(".");
      const prefix = typeof sectionNumbers[options.startDepth] === "string"
        ? options.appendixPrefix
        : "Section";
      headingNode.data.section = `${prefix} ${sectionNumber}`;

      headingNode.children.splice(0, 0, text(`${sectionNumber}. `));
    }

    if (!("id" in headingNode.data)) {
      const sectionSlug = headingNode.data?.id
        ?? headingNode.data.section.replaceAll(/[ .]/g, "-").toLowerCase();
      headingNode.data.hProperties.id = sectionSlug;
      headingNode.data.id = sectionSlug;
    }
  });

  // Build headings data used by ./remark-reference-links.js
  if (!("data" in file)) {
    file.data = {};
  }

  file.data.headings = {};

  visit(tree, "heading", (headingNode) => {
    if (headingNode.data?.id) {
      if (headingNode.data.id in file.data.headings) {
        file.message(`Found duplicate heading id "${headingNode.data.id}"`);
      }
      file.data.headings[headingNode.data.id] = headingNode;
    }
  });

  // Make heading a link
  visit(tree, "heading", (headingNode) => {
    if (headingNode.data?.id) {
      headingNode.children = [link(`#${headingNode.data.id}`, "", headingNode.children)];
    }
  });
};

export default remarkNumberHeadings;
