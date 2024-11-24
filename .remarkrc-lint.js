import remarkValidateLinks from "remark-validate-links";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkLintListItemIndent from "remark-lint-list-item-indent";
import remarkLintListItemSpacing from "remark-lint-list-item-spacing";
import remarkLintNoFileNameMixedCase from "remark-lint-no-file-name-mixed-case";
import remarkLintNoFileNameIrregularCharacters from "remark-lint-no-file-name-irregular-characters";


export default {
  plugins: [
    remarkValidateLinks,
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    remarkPresetLintMarkdownStyleGuide,
    [remarkLintListItemIndent, "one"],
    [remarkLintListItemSpacing, { checkBlanks: true }],
    [remarkLintNoFileNameMixedCase, false],
    [remarkLintNoFileNameIrregularCharacters, false]
  ]
};
