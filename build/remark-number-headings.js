import { visit } from "unist-util-visit";


const defaultOptions = {
  startDepth: 1,
  skip: []
};

const remarkNumberHeadings = (options) => (tree) => {
  options = { ...defaultOptions, ...options };
  options.skip = new RegExp(`^(${options.skip.join("|")})$`, "u");

  let sectionNumbers = [];

  visit(tree, "heading", (node) => {
    if (node.depth < options.startDepth) {
      return;
    }

    visit(node, "text", (textNode) => {
      let text = textNode.value ? textNode.value.trim() : "";

      if (options.skip.test(text)) {
        return;
      }

      if (text.startsWith(options.appendixToken)) {
        const currentIndex = typeof sectionNumbers[node.depth] === "string"
          ? sectionNumbers[node.depth]
          : "@";
        sectionNumbers[node.depth] = String.fromCharCode(currentIndex.charCodeAt(0) + 1);
        sectionNumbers = sectionNumbers.slice(0, node.depth + 1);

        const sectionNumber = sectionNumbers.slice(options.startDepth, node.depth + 1).join(".");
        textNode.value = `${options.appendixPrefix} ${sectionNumber}. ${text.slice(options.appendixToken.length + 1)}`;
      } else {
        sectionNumbers[node.depth] = (sectionNumbers[node.depth] ?? 0) + 1;
        sectionNumbers = sectionNumbers.slice(0, node.depth + 1);

        const sectionNumber = sectionNumbers.slice(options.startDepth, node.depth + 1).join(".");
        textNode.value = `${sectionNumber}. ${text}`;
      }
    });
  });
};

export default remarkNumberHeadings;
