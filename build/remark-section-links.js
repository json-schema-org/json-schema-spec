import { visit } from "unist-util-visit";


const sectionLink = /\{\{(?<id>.*?)\}\}/u;

const remarkSectionLinks = (options) => (tree, vfile) => {
  // Heading data comes from @vcarl/remark-headings
  const headings = {};
  for (const heading of vfile.data.headings) {
    if (heading?.data?.id) {
      headings[heading.data.id] = heading.value;
    }
  }

  visit(tree, "text", (node, index, parent) => {
    const match = node.value.match(sectionLink);

    if (match) {
      if (!(match.groups.id in headings)) {
        throw Error(`SectionLinkError: No header found with id "${match.groups.id}"`)
      }
      const headerText = headings[match.groups.id];

      const beforeNode = { type: "text", value: node.value.slice(0, match.index) };
      const afterNode = { type: "text", value: node.value.slice(match.index + match[0].length) };
      const linkNode = {
        type: "link",
        title: headerText,
        url: `#${match.groups.id}`,
        children: [
          {
            type: "text",
            value: "Section " + headerText.slice(0, headerText.indexOf(". "))
          }
        ]
      };

      parent.children.splice(index, 1, beforeNode, linkNode, afterNode);
    }
  });
};

export default remarkSectionLinks;
