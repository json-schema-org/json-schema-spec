// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config";
// eslint-disable-next-line import/no-unresolved
import { jsonSchemaCoveragePlugin } from "@hyperjump/json-schema-coverage/vitest";


export default defineConfig({
  plugins: [jsonSchemaCoveragePlugin()],
  test: {
    include: ["**/*-schema.test.js"],
    coverage: {
      include: ["specs/meta/*.schema.json"]
    }
  }
});
