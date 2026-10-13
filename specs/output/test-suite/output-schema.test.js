import { describe, expect, test } from "vitest";
import fs from "node:fs/promises";


for (const type of ["flag", "list", "hierarchical"]) {
  const suiteJson = await fs.readFile(`${import.meta.dirname}/tests/${type}.json`, "utf8");
  const suite = JSON.parse(suiteJson);
  const schema = `specs/output/schema.json#/$defs/${type}`;

  describe(suite.description, () => {
    for (const testCase of suite.tests) {
      test(testCase.description, async () => {
        if (testCase.valid) {
          await expect(testCase.instance).to.matchJsonSchema(schema);
        } else {
          await expect(testCase.instance).to.not.matchJsonSchema(schema);
        }
      });
    }
  });
}
