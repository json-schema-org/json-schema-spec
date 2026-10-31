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

describe("Output schema root", () => {
  const schema = "specs/output/schema.json";

  test("Rejects malformed known list properties even when valid is present", async () => {
    await expect({ valid: true, details: "not-an-array" }).to.not.matchJsonSchema(schema);
  });

  test("Allows unknown extension properties on flag output", async () => {
    await expect({ valid: true, implementation: "example" }).to.matchJsonSchema(schema);
  });
});
