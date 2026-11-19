import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test } from "vitest";
import { stageRelease } from "./stage-release.js";


let source;
let destination;

const fixture = (name, contents) => writeFile(join(source, name), contents);
const core = (href) => `<h1 id="core">Core</h1><a href="${href}">Reference</a>`;

beforeEach(async () => {
  source = await mkdtemp(join(tmpdir(), "json-schema-release-"));
  destination = join(source, "release");
  await fixture("jsonschema-core.html", core("jsonschema-validation.html?view=full#rules"));
  await fixture("jsonschema-validation.html", `
    <h1 id="rules">Validation</h1>
    <a href="./jsonschema-core.html#core">Core</a>
    <a href="#rules">Rules</a>
    <a href="json-schema-media-types.html#schema-json">Media types</a>
    <a href="https://example.com/other.html">External resource</a>
    <a href="/specification">Website resource</a>
  `);
  await fixture("json-schema-media-types.html", "<a name=\"schema-json\">Media Types</a>");
});

afterEach(async () => {
  await rm(source, { recursive: true, force: true });
});

test("writes the public filenames with working page links and anchors", async () => {
  await stageRelease(source, destination);
  const publishedCore = await readFile(join(destination, "core.html"), "utf8");
  const publishedValidation = await readFile(join(destination, "validation.html"), "utf8");
  expect(publishedCore).toContain("href=\"validation.html?view=full#rules\"");
  expect(publishedValidation).toContain("href=\"core.html#core\"");
  expect(publishedValidation).toContain("href=\"#rules\"");
  expect(publishedValidation).toContain("href=\"json-schema-media-types.html#schema-json\"");
  expect(publishedValidation).toContain("href=\"https://example.com/other.html\"");
  expect(publishedValidation).toContain("href=\"/specification\"");
  const mediaTypes = "json-schema-media-types.html";
  expect(await readFile(join(destination, mediaTypes), "utf8"))
    .toBe(await readFile(join(source, mediaTypes), "utf8"));
  expect(await readFile(join(source, "jsonschema-core.html"), "utf8"))
    .toBe(core("jsonschema-validation.html?view=full#rules"));
});

test.each([
  ["missing.html", "missing page missing.html"],
  ["jsonschema-validation.html#missing", "missing fragment #missing in validation.html"],
  ["#missing", "missing fragment #missing in core.html"]
])("rejects %s before writing release files", async (href, detail) => {
  await fixture("jsonschema-core.html", core(href));
  await expect(stageRelease(source, destination))
    .rejects.toThrow(`core.html: "${href}": ${detail}`);
  await expect(readFile(join(destination, "core.html"))).rejects.toMatchObject({ code: "ENOENT" });
});

test("identifies the command for a missing media-types artifact", async () => {
  await rm(join(source, "json-schema-media-types.html"));
  await expect(stageRelease(source, destination)).rejects.toThrow("npm run build-ietf");
  await expect(readFile(join(destination, "core.html"))).rejects.toMatchObject({ code: "ENOENT" });
});
