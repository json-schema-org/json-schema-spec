import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: "1tbs",
    commaDangle: "never",
    flat: true,
    jsx: false,
    quotes: "double",
    semi: true
  }),
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node
      }
    },
    settings: {
      "import/resolver": {
        node: {}
      }
    },
    rules: {
      "no-unused-vars": ["error", { caughtErrorsIgnorePattern: "^_" }],
      "no-empty-function": "off",
      "no-console": ["error"],

      // Imports
      "import/extensions": ["error", "ignorePackages"],
      "import/newline-after-import": ["error", { count: 2, exactCount: false, considerComments: true }], // Doesn't respect @import

      // Stylistic
      "@stylistic/yield-star-spacing": ["error", "after"],
      "@stylistic/multiline-ternary": "off",
      "@stylistic/no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0, maxBOF: 0 }] // Allow max=2 for imports
    }
  }
];
