import dotenv from "dotenv";
import { readFileSync, writeFileSync } from "node:fs";
import { reporter } from "vfile-reporter";
import { remark } from "remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFlexibleContainers from "remark-flexible-containers";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import remarkHeadings from "@vcarl/remark-headings";
import remarkNumberHeadings from "./remark-number-headings.js";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkRehype from "remark-rehype";
import remarkSectionLinks from "./remark-section-links.js";
import remarkToc from "remark-toc";
import remarkValidateLinks from "remark-validate-links";
import torchLight from "remark-torchlight";


dotenv.config();

(async function () {
  const md = readFileSync(0, "utf-8");
  const html = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkGfm)
    .use(torchLight)
    .use(remarkFlexibleContainers)
    .use(remarkHeadingId)
    .use(remarkNumberHeadings, {
      startDepth: 2,
      skip: ["Abstract", "Note to Readers", "Table of Contents", "Authors' Addresses", "\\[.*\\]", "draft-.*"],
      appendixToken: "[Appendix]",
      appendixPrefix: "Appendix"
    })
    .use(remarkHeadings)
    .use(remarkSectionLinks)
    .use(remarkToc, {
      tight: true,
      heading: "Table of Contents",
      skip: "\\[.*\\]|draft-.*"
    })
    .use(remarkValidateLinks)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(md);

  writeFileSync(1, `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <style>
      svg {
        fill: currentColor;
      }

      /* Torchlight */
      pre {
        border-radius: 0.25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        overflow-x: auto;
      }

      pre.torchlight code {
        display: block;
        min-width: -webkit-max-content;
        min-width: -moz-max-content;
        min-width: max-content;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      pre.torchlight code .line {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      pre.torchlight code .line-number,
      pre.torchlight code .summary-caret {
        margin-right: 1rem;
      }

      /* Flexible Containers */
      .remark-container {
        border: thin solid black;
        border-radius: 1rem;
        margin-bottom: 1rem;
      }

      .remark-container-title {
        border-radius: 1rem 1rem 0 0;
        position: relative;
        padding: .5rem 0 .5rem 2.5rem;
        background-color: var(--background);
        background-repeat: no-repeat;
        background-size: 1.75rem;
        background-position-y: center;
        background-position-x: .25rem;
      }

      .remark-container > :not(.remark-container-title) {
        padding: 0 1rem 0 1rem;
      }

      .remark-container-title.warning {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ccircle cx='12' cy='17' r='1' fill='%23ffffff'%3E%3C/circle%3E%3Cpath d='M12 10L12 14' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
      }

      .remark-container-title.note {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' fill='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3Enote-text%3C/title%3E%3Cdesc%3ECreated with Sketch Beta.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'%3E%3Cg id='Icon-Set' sketch:type='MSLayerGroup' transform='translate(-308.000000, -99.000000)' fill='%23ffffff'%3E%3Cpath d='M332,107 L316,107 C315.447,107 315,107.448 315,108 C315,108.553 315.447,109 316,109 L332,109 C332.553,109 333,108.553 333,108 C333,107.448 332.553,107 332,107 L332,107 Z M338,127 C338,128.099 336.914,129.012 335.817,129.012 L311.974,129.012 C310.877,129.012 309.987,128.122 309.987,127.023 L309.987,103.165 C309.987,102.066 310.902,101 312,101 L336,101 C337.098,101 338,101.902 338,103 L338,127 L338,127 Z M336,99 L312,99 C309.806,99 308,100.969 308,103.165 L308,127.023 C308,129.22 309.779,131 311.974,131 L335.817,131 C338.012,131 340,129.196 340,127 L340,103 C340,100.804 338.194,99 336,99 L336,99 Z M332,119 L316,119 C315.447,119 315,119.448 315,120 C315,120.553 315.447,121 316,121 L332,121 C332.553,121 333,120.553 333,120 C333,119.448 332.553,119 332,119 L332,119 Z M332,113 L316,113 C315.447,113 315,113.448 315,114 C315,114.553 315.447,115 316,115 L332,115 C332.553,115 333,114.553 333,114 C333,113.448 332.553,113 332,113 L332,113 Z' id='note-text' sketch:type='MSShapeGroup'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      .remark-container-title.experimental {
        background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='designs' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 32 32' xml:space='preserve' fill='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cstyle type='text/css'%3E .sketchy_een%7Bfill:%23ffffff;%7D %3C/style%3E%3Cpath class='sketchy_een' d='M27.958,26.693c-0.023-0.207-0.066-0.377-0.22-0.531c-0.006-0.006-0.015-0.008-0.021-0.014 c0.06-0.187,0.051-0.395-0.057-0.573c-0.326-0.538-0.64-1.08-0.942-1.631c-0.345-0.629-0.716-1.241-1.059-1.87 c-0.351-0.642-0.676-1.296-1.016-1.942c-0.352-0.675-0.773-1.309-1.142-1.974c-0.506-0.907-0.961-1.842-1.47-2.749 c-0.494-0.88-0.958-1.772-1.422-2.667c0.008-0.161-0.007-0.328-0.012-0.488c-0.004-0.168-0.009-0.337-0.017-0.506 c-0.015-0.364-0.042-0.726-0.064-1.087c-0.045-0.722-0.102-1.444-0.133-2.167c-0.062-1.561-0.036-3.121,0.043-4.68 c0.159,0.001,0.318,0.002,0.478,0.001c0.26-0.004,0.519-0.023,0.779-0.011c0.485,0.023,0.89-0.422,0.89-0.89 c0-0.235-0.095-0.462-0.261-0.629c-0.176-0.178-0.386-0.242-0.629-0.261C21.443,2.005,21.202,2,20.96,2 c-0.264,0-0.528,0.006-0.789,0.008C20.05,2.01,19.929,2.01,19.808,2.01c-0.201,0-0.402,0-0.602,0.002 c-0.347,0.004-0.695,0.026-1.042,0.034c-0.39,0.006-0.782,0.002-1.173,0.01c-0.402,0.01-0.803,0.028-1.203,0.042 c-0.769,0.025-1.536,0.068-2.308,0.068c-0.441,0-0.883,0.004-1.322,0c-0.5-0.004-0.998-0.045-1.499-0.066 c-0.445-0.021-0.818,0.386-0.818,0.818c0,0.458,0.373,0.805,0.818,0.82c0.12,0.004,0.24,0.003,0.36,0.006 c0.038,0.704,0.098,1.408,0.133,2.114c0.036,0.722,0.028,1.444,0.049,2.165c0.021,0.68,0.04,1.362,0.061,2.042 c0.019,0.608,0.055,1.214,0.07,1.822c-0.354,0.653-0.68,1.32-1.049,1.964c-0.195,0.341-0.385,0.682-0.563,1.031 c-0.172,0.333-0.316,0.68-0.468,1.023c-0.15,0.337-0.296,0.676-0.46,1.006c-0.165,0.328-0.333,0.656-0.489,0.987 c-0.165,0.352-0.324,0.708-0.493,1.061c-0.155,0.33-0.328,0.652-0.489,0.979c-0.263,0.534-0.496,1.082-0.746,1.622 c-0.267,0.58-0.525,1.165-0.777,1.752c-0.241,0.561-0.519,1.104-0.758,1.665c-0.225,0.529-0.428,1.068-0.647,1.6 c-0.039,0.093-0.079,0.184-0.118,0.278c-0.052,0.117-0.081,0.229-0.091,0.344c-0.087,0.136-0.152,0.288-0.159,0.459 c-0.019,0.46-0.019,0.911,0.218,1.324c0.159,0.281,0.358,0.478,0.618,0.663c0.135,0.095,0.305,0.14,0.457,0.199 c0.241,0.095,0.519,0.097,0.777,0.114c0.368,0.023,0.733,0.002,1.101-0.009c0.402-0.013,0.801-0.034,1.203-0.062 c0.405-0.03,0.813-0.036,1.218-0.047c0.801-0.025,1.605-0.019,2.406-0.004c0.762,0.013,1.519,0.038,2.279,0.1 c0.765,0.064,1.525,0.066,2.292,0.064c0.159,0,0.32,0,0.479,0c0.64,0.002,1.281,0.002,1.923-0.032 c0.756-0.042,1.514-0.053,2.271-0.085c0.392-0.017,0.781-0.055,1.169-0.093c0.377-0.036,0.756-0.047,1.133-0.062 c0.686-0.027,1.37-0.023,2.05-0.117c0.138-0.019,0.277-0.042,0.415-0.07c0.195-0.042,0.369-0.116,0.551-0.195 c0.282-0.121,0.527-0.314,0.748-0.525c0.275-0.261,0.421-0.599,0.53-0.957c0.097-0.314,0.138-0.656,0.114-0.983 C27.973,26.817,27.965,26.756,27.958,26.693z M15.375,3.768c0.449-0.004,0.9-0.002,1.351,0.002c0.322,0.002,0.644,0.006,0.966,0.004 c0.385-0.001,0.77,0.01,1.154,0.021c-0.028,0.789-0.017,1.581-0.015,2.372c0,0.754-0.009,1.51,0.01,2.264 c0.019,0.716,0.047,1.434,0.1,2.15c0.019,0.259,0.042,0.521,0.062,0.782c-0.342,0.013-0.685,0.025-1.027,0.039 c-0.572,0.021-1.146,0.025-1.718,0.068c-1.152,0.088-2.305,0.091-3.46,0.077c-0.036-0.807-0.057-1.615-0.065-2.424 c0.384-0.011,0.768-0.021,1.152-0.032c0.424-0.013,0.781-0.345,0.781-0.781c0-0.42-0.352-0.781-0.774-0.781 c-0.002,0-0.004,0-0.007,0c-0.389,0.004-0.779,0.008-1.168,0.011c-0.002-0.539,0.001-1.077-0.023-1.615 c-0.032-0.719-0.05-1.437-0.076-2.154C13.537,3.779,14.456,3.778,15.375,3.768z M26.457,27.054c-0.021,0.106-0.049,0.21-0.085,0.312 c-0.036,0.076-0.077,0.15-0.122,0.221c-0.054,0.056-0.112,0.108-0.172,0.159c-0.078,0.053-0.159,0.1-0.243,0.141 c-0.225,0.079-0.462,0.123-0.698,0.158c-0.307,0.032-0.615,0.033-0.922,0.049c-0.311,0.015-0.62,0.043-0.928,0.059 c-0.771,0.034-1.535,0.121-2.306,0.154c-0.758,0.032-1.519,0.034-2.279,0.061c-0.803,0.028-1.608,0.028-2.412,0.019 c-0.377-0.004-0.754-0.002-1.131-0.011c-0.366-0.008-0.729-0.034-1.095-0.059c-0.779-0.049-1.557-0.042-2.338-0.03 c-0.799,0.011-1.599,0.04-2.398,0.057c-0.798,0.017-1.591,0.055-2.389,0.055c-0.263,0.002-0.525-0.011-0.786-0.034 c-0.09-0.015-0.179-0.033-0.266-0.059c-0.03-0.015-0.059-0.032-0.087-0.049c-0.01-0.01-0.021-0.02-0.031-0.03 c-0.011-0.018-0.022-0.036-0.032-0.054c-0.005-0.17,0.01-0.342,0.017-0.511c0.005-0.097-0.021-0.188-0.051-0.275 c0.126-0.329,0.26-0.655,0.383-0.984c0.13-0.346,0.26-0.691,0.401-1.033c0.134-0.304,0.277-0.606,0.412-0.91 c0.007-0.015,0.013-0.031,0.02-0.046c0.333,0.005,0.668,0.002,1-0.004c0.582-0.008,1.165-0.017,1.749,0.021 c0.404,0.027,0.741-0.356,0.741-0.741c0-0.411-0.337-0.731-0.741-0.741c-0.692-0.016-1.384-0.045-2.076-0.07 c0.233-0.516,0.471-1.031,0.707-1.547c0.116-0.252,0.241-0.499,0.365-0.746c0.093,0.037,0.192,0.061,0.296,0.058 c0.36-0.008,0.722-0.021,1.082-0.04c0.258-0.013,0.523-0.049,0.782-0.032c0.436,0.03,0.801-0.386,0.801-0.801 c0-0.458-0.366-0.777-0.801-0.803c-0.023-0.002-0.045-0.002-0.068-0.002c-0.083,0-0.165,0.009-0.249,0.014 c-0.15,0.006-0.301,0.006-0.451,0.008c-0.209,0.002-0.419,0.003-0.628,0.004c0.099-0.22,0.198-0.441,0.301-0.66 c0.157-0.33,0.32-0.654,0.468-0.987c0.078-0.177,0.155-0.354,0.232-0.532c0.057,0.012,0.111,0.034,0.171,0.031 c0.754-0.044,1.506-0.097,2.262-0.14c0.419-0.023,0.771-0.333,0.771-0.771c0-0.426-0.35-0.765-0.771-0.773 c-0.067-0.001-0.133-0.001-0.2-0.001c-0.495,0-0.991,0.026-1.486,0.054c0.052-0.101,0.095-0.206,0.15-0.305 c0.34-0.613,0.68-1.226,1.023-1.838c0.055,0.013,0.107,0.034,0.166,0.034c1.25,0.002,2.497-0.082,3.745-0.146 c0.572-0.028,1.146-0.036,1.718-0.049c0.246-0.006,0.494-0.002,0.741,0c0.059,0.002,0.119,0.002,0.18,0.002 c0.034,0,0.069,0.003,0.103,0.003c0,0.14,0.021,0.28,0.091,0.41c0.383,0.71,0.799,1.404,1.203,2.101 c0.385,0.669,0.763,1.338,1.122,2.021c0.356,0.676,0.709,1.355,1.097,2.012c0.189,0.318,0.4,0.623,0.584,0.945 c0.188,0.324,0.358,0.657,0.53,0.991c0.466,0.89,0.949,1.77,1.47,2.631c0.241,0.398,0.468,0.803,0.703,1.205 c0.21,0.356,0.441,0.705,0.629,1.072c0.021,0.042,0.058,0.068,0.088,0.103c-0.04,0.091-0.062,0.19-0.059,0.295 C26.462,26.814,26.465,26.934,26.457,27.054z M24.139,25.03c0.191,0.358,0.093,0.807-0.267,1.017 c-0.172,0.1-0.381,0.129-0.572,0.076c-0.172-0.047-0.368-0.174-0.445-0.341c-0.481-1.029-1.029-2.027-1.555-3.031 c-0.286-0.546-0.557-1.099-0.852-1.641c-0.313-0.576-0.61-1.157-0.894-1.747c-0.093-0.193-0.136-0.383-0.078-0.593 c0.053-0.193,0.182-0.36,0.354-0.46c0.117-0.069,0.253-0.105,0.389-0.105c0.069,0,0.137,0.009,0.204,0.027 c0.178,0.049,0.379,0.182,0.458,0.354c0.28,0.593,0.557,1.186,0.851,1.771c0.277,0.551,0.54,1.11,0.832,1.654 c0.28,0.521,0.57,1.038,0.839,1.565c0.131,0.26,0.26,0.519,0.396,0.773C23.917,24.575,24.02,24.807,24.139,25.03z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
      }
    </style>
  </head>
  <body>
    ${String(html)}
  </body>
</html>`);

  console.error(reporter(html));
}());
