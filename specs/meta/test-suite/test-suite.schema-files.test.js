import { describe, expect, test } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";


describe("meta test suite files", () => {
  test("suite files match the test suite schema", async () => {
    for (const entry of await fs.readdir(`${import.meta.dirname}/tests`, { withFileTypes: true })) {
      if (entry.isDirectory() || path.extname(entry.name) !== ".json") {
        continue;
      }

      const suiteJson = await fs.readFile(`${entry.parentPath}/${entry.name}`, "utf8");
      const suite = JSON.parse(suiteJson);
      await expect(suite).to.matchJsonSchema("specs/meta/test-suite/test-suite.schema.json");
    }
  });
});
