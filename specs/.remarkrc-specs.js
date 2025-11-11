import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import remarkFlexibleContainers from "remark-flexible-containers";
import remarkCodeTitles from "../remark/remark-code-titles.js";
import remarkHeadings from "../remark/remark-headings.js";
import remarkReferenceLinks from "../remark/remark-reference-links.js";
import remarkTableOfContents from "../remark/remark-table-of-contents.js";


export default {
  plugins: [
    remarkGfm,
    remarkHeadingId,
    [remarkHeadings, {
      startDepth: 2,
      skip: [
        "Abstract",
        "Status",
        "Note to Readers",
        "Table of Contents",
        "Contributors",
        "Champions",
        "\\[.*\\]",
        "draft-.*"
      ]
    }],
    remarkReferenceLinks,
    [remarkTableOfContents, {
      startDepth: 2,
      skip: [
        "Abstract",
        "Note to Readers",
        "Authors' Addresses",
        "Champions",
        "\\[.*\\]",
        "draft-.*"
      ]
    }],
    remarkFlexibleContainers,
    remarkCodeTitles
  ]
};
