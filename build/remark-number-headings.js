import { visit } from "unist-util-visit";


const defaultOptions = {
  startDepth: 1,
  skip: []
};

const remarkNumberHeadings = (options) => (tree) => {
  options = { ...defaultOptions, ...options };

  let sectionNumbers = [];

  visit(tree, "heading", (node) => {
    if (node.depth < options.startDepth) {
      return;
    }

    visit(node, "text", (textNode) => {
      const text = textNode.value ? textNode.value.trim() : "";

      if (options.skip.includes(text)) {
        return;
      }

      sectionNumbers[node.depth] = (sectionNumbers[node.depth] ?? 0) + 1;
      sectionNumbers = sectionNumbers.slice(0, node.depth + 1);

      const sectionNumber = sectionNumbers.slice(options.startDepth, node.depth + 1).join(".");
      textNode.value = `${sectionNumber}. ${text}`;
    });
  });
};

export default remarkNumberHeadings;
