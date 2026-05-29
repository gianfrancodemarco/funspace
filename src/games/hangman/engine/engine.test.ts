import { describe, expect, it } from "vitest";

import { getWordListsForLocale } from "../word-lists";
import { guessLetter, isWordComplete, pickWord } from "./index";
import type { HangmanGameState } from "../types";

function createState(
  word: string,
  maxWrongGuesses = 6,
  guessedLetters: string[] = [],
  wrongCount = 0,
): HangmanGameState {
  return {
    config: {
      wordPackIds: ["general"],
      maxWrongGuesses,
      locale: "en",
    },
    word,
    guessedLetters,
    wrongCount,
    status: "playing",
  };
}

describe("pickWord", () => {
  it("returns a word from selected lists", () => {
    const lists = getWordListsForLocale("en");
    const word = pickWord(lists, ["general"]);
    expect(word).toMatch(/^[a-z]+$/);
    expect(lists.find((list) => list.id === "general")?.words).toContain(word);
  });
});

describe("guessLetter", () => {
  it("reveals correct letters without increasing wrong count", () => {
    const { state, result } = guessLetter(createState("apple"), "p");
    expect(result).toBe("continue");
    expect(state.guessedLetters).toContain("p");
    expect(state.wrongCount).toBe(0);
  });

  it("increments wrong count for incorrect letters", () => {
    const { state, result } = guessLetter(createState("apple"), "z");
    expect(result).toBe("continue");
    expect(state.wrongCount).toBe(1);
  });

  it("ignores duplicate guesses", () => {
    const initial = createState("apple", 6, ["a"]);
    const { state, result } = guessLetter(initial, "a");
    expect(result).toBe("duplicate");
    expect(state).toEqual(initial);
  });

  it("detects a win when the word is complete", () => {
    const initial = createState("apple", 6, ["a", "p", "l"]);
    const { state, result } = guessLetter(initial, "e");
    expect(result).toBe("won");
    expect(state.status).toBe("won");
    expect(isWordComplete(state.word, state.guessedLetters)).toBe(true);
  });

  it("detects a loss at max wrong guesses", () => {
    const initial = createState("apple", 2, ["b"], 1);
    const { state, result } = guessLetter(initial, "z");
    expect(result).toBe("lost");
    expect(state.status).toBe("lost");
  });
});
