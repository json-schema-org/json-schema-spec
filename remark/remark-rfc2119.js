import { text } from "mdast-builder";
import { visit } from "unist-util-visit";


/**
 * RFC 2119 / RFC 8174 keywords
 * Order matters: longer phrases first
 */
const KEYWORDS = [
  "MUST NOT",
  "NOT REQUIRED",
  "SHALL NOT",
  "SHOULD NOT",
  "NOT RECOMMENDED",
  "MUST",
  "REQUIRED",
  "SHALL",
  "SHOULD",
  "RECOMMENDED",
  "MAY",
  "OPTIONAL"
];

const KEYWORD_REGEX = new RegExp(`(?:${KEYWORDS.map((k) => k.replace(" ", "\\s")).join("|")})`, "gm");

const skipNodes = new Set(["code", "inlineCode", "link", "definition", "html"]);

export default function remarkRfc2119() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      // Do not touch code, inlineCode, links, or HTML
      if (skipNodes.has(parent.type)) {
        return;
      }

      const value = node.value;
      let match;
      let lastIndex = 0;
      const children = [];

      KEYWORD_REGEX.lastIndex = 0;

      while ((match = KEYWORD_REGEX.exec(value)) !== null) {
        const [keyword] = match;
        const start = match.index;
        const end = start + keyword.length;

        if (start > lastIndex) {
          children.push(text(value.slice(lastIndex, start)));
        }

        const keywordNode = text(keyword);
        keywordNode.data = {
          hName: "span",
          hProperties: {
            className: ["rfc2119", keyword.toLowerCase().replace(/\s+/g, "-")]
          }
        };
        children.push(keywordNode);

        lastIndex = end;
      }

      if (children.length === 0) {
        return;
      }

      if (lastIndex < value.length) {
        children.push(text(value.slice(lastIndex)));
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
