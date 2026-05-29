import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pairsToHangmanWords } from "./word-pack-data/_utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const impostorOutDir = path.join(root, "src/games/impostor/word-packs/data");
const hangmanOutDir = path.join(root, "src/games/hangman/word-lists/data");

const locales = {
  en: ["general", "food", "animals", "places", "anime", "movies", "music"],
  it: ["general", "food", "animals", "places", "anime", "movies", "music"],
};

for (const [locale, categories] of Object.entries(locales)) {
  for (const category of categories) {
    const mod = await import(`./word-pack-data/${locale}-${category}.mjs`);
    const pairs = mod.pairs;

    const impostorDir = path.join(impostorOutDir, locale);
    fs.mkdirSync(impostorDir, { recursive: true });
    const impostorFile = path.join(impostorDir, `${category}.json`);
    fs.writeFileSync(impostorFile, `${JSON.stringify(pairs, null, 2)}\n`);

    const hangmanDir = path.join(hangmanOutDir, locale);
    fs.mkdirSync(hangmanDir, { recursive: true });
    const hangmanFile = path.join(hangmanDir, `${category}.json`);
    const hangmanWords = pairsToHangmanWords(pairs);
    fs.writeFileSync(hangmanFile, `${JSON.stringify(hangmanWords, null, 2)}\n`);

    console.log(
      `${locale}/${category}.json`,
      `${pairs.length} pairs → ${hangmanWords.length} hangman words`,
    );
  }
}
