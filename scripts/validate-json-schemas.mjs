import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemasDir = resolve("reference/schemas");
const files = readdirSync(schemasDir).filter((f) => f.endsWith(".schema.json"));

if (files.length === 0) {
  console.log("No .schema.json files found — skipping.");
  process.exit(0);
}

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

let failed = false;

for (const file of files) {
  const filePath = join(schemasDir, file);
  const content = JSON.parse(readFileSync(filePath, "utf-8"));

  try {
    ajv.compile(content);
    console.log(`✓ ${file}`);
  } catch (err) {
    console.error(`✗ ${file}`);
    console.error(`  ${err.message}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
