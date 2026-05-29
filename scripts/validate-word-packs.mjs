import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/games/impostor/word-packs/data");
const MIN_PAIRS = 200;

const locales = ["en", "it"];
const categories = ["general", "food", "animals", "places"];

let failed = false;

for (const locale of locales) {
  for (const category of categories) {
    const file = path.join(dataDir, locale, `${category}.json`);
    if (!fs.existsSync(file)) {
      console.error(`Missing: ${locale}/${category}.json`);
      failed = true;
      continue;
    }

    const pairs = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Array.isArray(pairs)) {
      console.error(`${locale}/${category}.json: expected array`);
      failed = true;
      continue;
    }

    const count = pairs.length;
    if (count < MIN_PAIRS) {
      console.error(
        `${locale}/${category}.json: ${count} pairs (need >= ${MIN_PAIRS})`,
      );
      failed = true;
      continue;
    }

    for (const [index, pair] of pairs.entries()) {
      if (
        !pair ||
        typeof pair.crewWord !== "string" ||
        typeof pair.spyWord !== "string" ||
        !pair.crewWord.trim() ||
        !pair.spyWord.trim()
      ) {
        console.error(
          `${locale}/${category}.json[${index}]: invalid pair`,
          pair,
        );
        failed = true;
      }
    }

    console.log(`OK ${locale}/${category}.json (${count})`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`All word packs have at least ${MIN_PAIRS} pairs.`);
