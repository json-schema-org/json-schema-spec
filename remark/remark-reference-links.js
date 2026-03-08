import { text, link } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";
import { findAndReplace } from "mdast-util-find-and-replace";

const referenceLink = /\{\{(?<id>.*?)\}\}/ug;

const remarkReferenceLinks = () => (tree, file) => {
  findAndReplace(tree, [
    referenceLink,
    (value, id) => {
      // Remove accidental spaces inside {{ }}
      id = id.trim();

      // Ensure headings data exists
      if (!file.data || !file.data.headings) {
        throw new Error(
          "ReferenceLinkError: Heading data not found. Ensure remark-headings plugin runs before remark-reference-links."
        );
      }

      // Validate that referenced section exists
      if (!(id in file.data.headings)) {
        throw new Error(`ReferenceLinkError: No header found with id "${id}"`);
      }

      const heading = file.data.headings[id];

      const headerText = nodeToString(heading);
      const linkText = text(heading.data.section);

      return link(`#${id}`, headerText, [linkText]);
    }
  ]);
};

export default remarkReferenceLinks;