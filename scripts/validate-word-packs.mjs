import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/games/impostor/word-packs/data");

const CORE_MIN_PAIRS = 200;
const THEME_MIN_PAIRS = 50;

const locales = ["en", "it"];
const coreCategories = ["general", "food", "animals", "places"];
const themeCategories = ["anime", "movies", "music"];
const categories = [...coreCategories, ...themeCategories];

function minPairsFor(category) {
  return themeCategories.includes(category) ? THEME_MIN_PAIRS : CORE_MIN_PAIRS;
}

let failed = false;

for (const locale of locales) {
  for (const category of categories) {
    const file = path.join(dataDir, locale, `${category}.json`);
    const minPairs = minPairsFor(category);

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
    if (count < minPairs) {
      console.error(
        `${locale}/${category}.json: ${count} pairs (need >= ${minPairs})`,
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

    console.log(`OK ${locale}/${category}.json (${count}, min ${minPairs})`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `All word packs valid (core >= ${CORE_MIN_PAIRS}, theme >= ${THEME_MIN_PAIRS}).`,
);
