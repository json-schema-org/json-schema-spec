import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import { VFile } from "vfile";
import { text, link } from "mdast-builder";
import { toString as nodeToString } from "mdast-util-to-string";
import { findAndReplace } from "mdast-util-find-and-replace";
import remarkHeadings from "./remark-headings.js";


const referenceLink = /\{\{(?<ref>.*?)\}\}/ug;

const remarkReferenceLinks = (options = {}) => (tree, file) => {
  const headingsCache = {};

  // Headings for other documents are computed the same way ./remark-headings.js
  // computes them for this document so section numbers match.
  const getHeadings = (path) => {
    if (!path) {
      // file.data.headings comes from ./remark-headings.js
      return file.data.headings;
    }

    const fullPath = resolve(file.dirname ?? file.cwd, path);
    if (!(fullPath in headingsCache)) {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkHeadingId)
        .use(remarkHeadings, options.headingsOptions);
      const targetFile = new VFile({ path: fullPath, value: readFileSync(fullPath, "utf8") });
      processor.runSync(processor.parse(targetFile), targetFile);
      headingsCache[fullPath] = targetFile.data.headings;
    }

    return headingsCache[fullPath];
  };

  findAndReplace(tree, [referenceLink, (_value, ref) => {
    const hashIndex = ref.lastIndexOf("#");
    const path = hashIndex === -1 ? "" : ref.slice(0, hashIndex);
    const id = hashIndex === -1 ? ref : ref.slice(hashIndex + 1);

    const headings = getHeadings(path);
    if (!Object.hasOwn(headings, id)) {
      throw Error(`ReferenceLinkError: No header found with id "${id}"${path ? ` in "${path}"` : ""}`);
    }

    const headerText = nodeToString(headings[id]);
    const linkText = text(headings[id].data.section);
    return link(`${path}#${id}`, headerText, [linkText]);
  }]);
};

export default remarkReferenceLinks;
