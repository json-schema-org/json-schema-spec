import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import rehypeHighlight from "rehype-highlight";
import { all } from "lowlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeDocument from "rehype-document";
import specsPreset from "./.remarkrc-specs.js";
import rehypeLinkTransformer from "../remark/rehype-link-transformer.js";


export default {
  plugins: [
    specsPreset,
    remarkRehype,
    [rehypeHighlight, { languages: all }],
    [rehypeHighlightCodeLines, { showLineNumbers: true }],
    rehypeLinkTransformer,
    [rehypeDocument, {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github-dark-dimmed.min.css",
          media: "(prefers-color-scheme: dark)"
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github.css",
          media: "(prefers-color-scheme: light)"
        }
      ],
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
