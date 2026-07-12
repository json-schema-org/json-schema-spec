import { describe, expect, test } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";


for (const entry of await fs.readdir(`${import.meta.dirname}/tests`, { withFileTypes: true })) {
  if (entry.isDirectory() || path.extname(entry.name) !== ".json") {
    continue;
  }

  const suiteJson = await fs.readFile(`${entry.parentPath}/${entry.name}`, "utf8");
  const suite = JSON.parse(suiteJson);

  describe(suite.description, () => {
    for (const testCase of suite.tests) {
      test(testCase.description, async () => {
        const metaSchemaUrl = new URL("../meta.schema.json", import.meta.url).href;
        if (testCase.valid) {
          await expect(testCase.schema).to.matchJsonSchema(metaSchemaUrl);
        } else {
          await expect(testCase.schema).to.not.matchJsonSchema(metaSchemaUrl);
        }
      });
    }
  });
}
