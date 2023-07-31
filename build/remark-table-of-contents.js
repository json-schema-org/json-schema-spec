import { visit } from "unist-util-visit";
import { list, listItem } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";


const defaultOptions = {
  heading: "Table of Contents",
  startDepth: 1,
  skip: []
};

const remarkTableOfContents = (options) => (tree, file) => {
  options = { ...defaultOptions, ...options };
  options.skip.push(options.heading);
  options.skip = new RegExp(`^(${options.skip.join("|")})$`, "u");

  let insertTableOfContents;

  const tableOfContents = list("unordered");
  let currentList = tableOfContents;
  const listStack = [currentList];
  let currentDepth = options.startDepth;

  visit(tree, "heading", (headingNode, index, parent) => {
    const headingText = nodeToString(headingNode);

    if (headingText === options.heading) {
      insertTableOfContents = () => {
        parent.children.splice(index + 1, 0, tableOfContents);
      };
    }

    if (headingNode.depth < options.startDepth) {
      return;
    }

    while (headingNode.depth > currentDepth) {
      const newList = list("unordered");
      listStack.push(newList);
      currentList.children.push(newList);
      currentList = newList;
      currentDepth++;
    }

    while (headingNode.depth < currentDepth) {
      listStack.pop();
      currentList = listStack[listStack.length - 1];
      currentDepth--;
    }

    if (options.skip.test(headingText)) {
      return;
    }

    currentList.children.push(listItem(headingNode.children));
  });

  if (insertTableOfContents) {
    insertTableOfContents();
  } else {
    file.message(`Table of Contents not added. Add a heading with the text "${options.heading}" or set the 'heading' option to use a different heading.`);
  }
};

export default remarkTableOfContents;
