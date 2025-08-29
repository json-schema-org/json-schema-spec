import lintPreset from "../.remarkrc-lint.js";
import remarkLintNoMultipleToplevelHeadings from "remark-lint-no-multiple-toplevel-headings";
import remarkLintFencedCodeMarker from "remark-lint-fenced-code-marker";


export default {
  plugins: [
    lintPreset,
    [remarkLintNoMultipleToplevelHeadings, false],
    [remarkLintFencedCodeMarker, "~"]
  ]
};
