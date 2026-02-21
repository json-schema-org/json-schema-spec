import { text, link } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";
import { findAndReplace } from "mdast-util-find-and-replace";


const referenceLink = /\{\{(?<id>.*?)\}\}/ug;

const remarkReferenceLinks = () => (tree, file) => {
  findAndReplace(tree, [referenceLink, (value, id) => {
    // file.data.headings comes from ./remark-headings.js
    if (!Object.prototype.hasOwnProperty.call(file.data.headings, id)) {
      throw Error(`ReferenceLinkError: No header found with id "${id}"`);
    }

    const headingNode = file.data.headings[id];
    const headerText = nodeToString(headingNode);
    const linkText = text(headingNode.data.section);
    return link(`#${id}`, headerText, [linkText]);
  }]);
};

export default remarkReferenceLinks;
