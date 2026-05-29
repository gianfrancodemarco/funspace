/** @typedef {{ crewWord: string, spyWord: string }} WordPair */

/** @param [string, string][] tuples */
export function fromTuples(tuples) {
  return tuples.map(([crewWord, spyWord]) => ({ crewWord, spyWord }));
}
