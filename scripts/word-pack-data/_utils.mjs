/** @typedef {{ crewWord: string, spyWord: string }} WordPair */

/** @param [string, string][] tuples */
export function fromTuples(tuples) {
  return tuples.map(([crewWord, spyWord]) => ({ crewWord, spyWord }));
}

/** Strip accents and keep letters only for Hangman normalization. */
function normalizeHangmanWord(raw) {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z]/g, "");
}

/** @param {{ crewWord: string, spyWord: string }[]} pairs */
export function pairsToHangmanWords(pairs) {
  const seen = new Set();
  const words = [];

  for (const { crewWord, spyWord } of pairs) {
    for (const raw of [crewWord, spyWord]) {
      const normalized = normalizeHangmanWord(raw);
      if (normalized.length < 3 || normalized.length > 20) {
        continue;
      }
      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      words.push(normalized);
    }
  }

  return words.sort((a, b) => a.localeCompare(b));
}
