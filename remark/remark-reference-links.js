import { text, link } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";
import { findAndReplace } from "mdast-util-find-and-replace";

const referenceLink = /\{\{(?<id>.*?)\}\}/ug;

const remarkReferenceLinks = () => (tree, file) => {
  findAndReplace(tree, [referenceLink, (value, id) => {
    // file.data.headings comes from ./remark-headings.js
    const headings = file.data.headings || {};
    const headingIds = Object.keys(headings);
    
    const actualId = headingIds.find(key => key.toLowerCase() === id.toLowerCase());

    if (actualId) {
      const headerNode = headings[actualId];
      const headerText = nodeToString(headerNode);
      const linkText = text(headerNode.data.section);
      return link(`#${actualId}`, headerText, [linkText]);
    }

    // Log a warning so we know it's broken, but don't crash the build.
    file.message(`Warning: Link reference "{{${id}}}" was not found in headings. Creating a placeholder link.`);
    
    return link(`#${id.toLowerCase()}`, id, [text(id)]);
  }]);
};

export default remarkReferenceLinks;
