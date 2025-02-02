import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import dotenv from "dotenv";
import remarkTorchLight from "remark-torchlight";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeDocument from "rehype-document";
import specsPreset from "./.remarkrc-specs.js";
import rehypeLinkTransformer from "../remark/rehype-link-transformer.js";


dotenv.config();

export default {
  plugins: [
    specsPreset,
    remarkTorchLight,
    remarkRehype,
    rehypeLinkTransformer,
    [rehypeDocument, {
      css: ["https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css"],
      style: readFileSync(resolve(import.meta.dirname, "spec.css"), "utf8")
    }],
    rehypeStringify,
    () => (_tree, file) => {
      if (file.extname) {
        file.extname = ".html";
      }
    }
  ]
};
