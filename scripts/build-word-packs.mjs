import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "src/games/impostor/word-packs/data");

const locales = {
  en: ["general", "food", "animals", "places"],
  it: ["general", "food", "animals", "places"],
};

for (const [locale, categories] of Object.entries(locales)) {
  for (const category of categories) {
    const mod = await import(`./word-pack-data/${locale}-${category}.mjs`);
    const dir = path.join(outDir, locale);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${category}.json`);
    fs.writeFileSync(file, `${JSON.stringify(mod.pairs, null, 2)}\n`);
    console.log(`${locale}/${category}.json`, mod.pairs.length);
  }
}
