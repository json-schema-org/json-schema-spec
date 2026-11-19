import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";


const releaseNames = new Map([
  ["jsonschema-core.html", "core.html"],
  ["jsonschema-validation.html", "validation.html"],
  ["json-schema-media-types.html", "json-schema-media-types.html"]
]);

const releaseBase = new URL("https://json-schema.org/v1/2026/");
const html = unified().use(rehypeParse).use(rehypeStringify);

export const stageRelease = async (source, destination) => {
  const pages = new Map();
  for (const [input, output] of releaseNames) {
    let contents;
    try {
      contents = await readFile(join(source, input), "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
      const command = input === "json-schema-media-types.html"
        ? "npm run build-ietf"
        : "npm run build -- specs";
      throw Error(`Missing ${join(source, input)}. Run \`${command}\` first.`);
    }

    const tree = html.parse(contents);
    const anchors = new Set();
    visit(tree, "element", ({ properties, tagName }) => {
      if (typeof properties.id === "string") {
        anchors.add(properties.id);
      }
      if (tagName === "a" && typeof properties.name === "string") {
        anchors.add(properties.name);
      }
    });
    pages.set(output, { tree, anchors, contents });
  }

  const problems = [];
  for (const name of ["core.html", "validation.html"]) {
    const pageUrl = new URL(name, releaseBase);
    const page = pages.get(name);
    visit(page.tree, "element", ({ tagName, properties }) => {
      const href = properties.href;
      if (tagName !== "a" || typeof href !== "string") {
        return;
      }

      // The website serves absolute links and root-relative paths separately.
      if (/^(?:[a-z][a-z\d+.-]*:|\/)/iu.test(href.trim())) {
        return;
      }

      try {
        const target = new URL(href, pageUrl);
        if (!target.pathname.startsWith(releaseBase.pathname)) {
          throw Error("relative target leaves the staged directory");
        }

        const oldName = decodeURIComponent(target.pathname.slice(releaseBase.pathname.length));
        const targetName = releaseNames.get(oldName) ?? oldName;
        const targetPage = pages.get(targetName);
        if (!targetPage) {
          throw Error(`missing page ${targetName}`);
        }

        const fragment = decodeURIComponent(target.hash.slice(1));
        if (fragment && !targetPage.anchors.has(fragment)) {
          throw Error(`missing fragment #${fragment} in ${targetName}`);
        }

        if (targetName !== oldName) {
          properties.href = `${targetName}${target.search}${target.hash}`;
        }
      } catch (error) {
        problems.push(`${name}: ${JSON.stringify(href)}: ${error.message}`);
      }
    });
    page.contents = html.stringify(page.tree);
  }

  if (problems.length > 0) {
    throw Error(`Broken staged specification links:\n${problems.join("\n")}`);
  }

  await mkdir(destination, { recursive: true });
  for (const [name, { contents }] of pages) {
    await writeFile(join(destination, name), contents);
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await stageRelease("web", "web/release");
    process.stdout.write("Staged and verified specification HTML in web/release.\n");
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
