import { describe, expect, test } from "vitest";
import fs from "node:fs/promises";


const outputSchema = JSON.parse(await fs.readFile(new URL("./schema.json", import.meta.url), "utf8"));

// The validator does not support draft/next. The keywords used by this schema
// have the same semantics in Draft 2020-12.
const schema = { ...outputSchema, $schema: "https://json-schema.org/draft/2020-12/schema" };
const nonObjects = [null, 42, 3.14, "hello", [], true, false];
const outputUnit = {
  valid: true,
  evaluationPath: "",
  schemaLocation: "https://example.com/schema",
  instanceLocation: ""
};
const examples = {
  root: { valid: true },
  flag: { valid: true },
  list: { valid: true, details: [outputUnit] },
  outputUnit,
  hierarchical: { ...outputUnit, details: [outputUnit] }
};

for (const [name, example] of Object.entries(examples)) {
  // Select each definition directly so the flag alternative cannot mask errors.
  const targetSchema = name === "root" ? schema : {
    ...schema,
    anyOf: [{ $ref: `#/$defs/${name}` }]
  };

  describe(`output schema: ${name}`, () => {
    test.for(nonObjects)("rejects non-object %j", async (instance) => {
      await expect(instance).to.not.matchJsonSchema(targetSchema);
    });

    test("rejects an object missing required properties", async () => {
      await expect({}).to.not.matchJsonSchema(targetSchema);
    });

    test.for([true, false])("accepts an output object with valid: %j", async (valid) => {
      await expect({ ...example, valid }).to.matchJsonSchema(targetSchema);
    });

    if (["list", "outputUnit", "hierarchical"].includes(name)) {
      test.for(nonObjects)("rejects non-object details item %j", async (instance) => {
        await expect({ ...example, details: [instance] }).to.not.matchJsonSchema(targetSchema);
      });

      test.for(nonObjects)("rejects non-object nested details item %j", async (instance) => {
        await expect({
          ...example,
          details: [{ ...outputUnit, details: [instance] }]
        }).to.not.matchJsonSchema(targetSchema);
      });
    }
  });
}
