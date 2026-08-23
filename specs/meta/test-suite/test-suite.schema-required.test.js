import { describe, expect, test } from "vitest";


describe("meta test suite schema", () => {
  test("requires description, schema, and valid in each test case", async () => {
    await expect({
      description: "bad suite",
      tests: [
        { description: "missing schema and valid" }
      ]
    }).to.not.matchJsonSchema("specs/meta/test-suite/test-suite.schema.json");
  });
});
