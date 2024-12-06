import { test, expect } from "@jest/globals";

console.log("Minimal test file loaded");

test("Minimal test", () => {
  console.log("Running minimal test");
  expect(true).toBe(true);
});

console.log("Minimal test file execution completed");
