import { existsSync } from "fs";
import { visit } from "unist-util-visit";
import url from "url";


const rehypeLinkTransformer = () => (tree, vfile) => {
  visit(tree, "element", (node) => {
    if (node.tagName === "a") {
      const href = url.parse(node.properties.href);
      if (href.hostname === null && href.pathname?.endsWith(".md") && existsSync(vfile.history[0])) {
        href.pathname = href.pathname.replace(/.md$/, ".html");
        node.properties.href = url.format(href);
      }
    }
  });
};

export default rehypeLinkTransformer;
