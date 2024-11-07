import remarkGfm from "remark-gfm";
import lintPreset from "./.remarkrc-lint.js";


export default {
  plugins: [
    remarkGfm,
    lintPreset
  ]
};
