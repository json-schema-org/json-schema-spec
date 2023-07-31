import { text, link } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";
import { findAndReplace } from "mdast-util-find-and-replace";


const referenceLink = /\{\{(?<id>.*?)\}\}/ug;

const remarkReferenceLinks = () => (tree, file) => {
  findAndReplace(tree, [referenceLink, (value, id) => {
    // file.data.headings comes from ./remark-headings.js
    if (!(id in file.data.headings)) {
      throw Error(`ReferenceLinkError: No header found with id "${id}"`);
    }

    const headerText = nodeToString(file.data.headings[id]);
    const linkText = text(file.data.headings[id].data.section);
    return link(`#${id}`, headerText, [linkText]);
  }]);
};

export default remarkReferenceLinks;
