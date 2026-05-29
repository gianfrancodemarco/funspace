import type { HangmanGameState } from "../types";

export function getDisplayWord(word: string, guessedLetters: string[]): string {
  return word
    .split("")
    .map((char) => (guessedLetters.includes(char) ? char : "_"))
    .join(" ");
}

export function isWordComplete(word: string, guessedLetters: string[]): boolean {
  return word.split("").every((char) => guessedLetters.includes(char));
}

export type GuessResult = "continue" | "won" | "lost" | "duplicate";

export function guessLetter(
  state: HangmanGameState,
  letter: string,
): { state: HangmanGameState; result: GuessResult } {
  const normalized = letter.toLowerCase();

  if (!/^[a-z]$/.test(normalized)) {
    return { state, result: "duplicate" };
  }

  if (state.status !== "playing") {
    return { state, result: "duplicate" };
  }

  if (state.guessedLetters.includes(normalized)) {
    return { state, result: "duplicate" };
  }

  const guessedLetters = [...state.guessedLetters, normalized];
  const inWord = state.word.includes(normalized);
  const wrongCount = inWord ? state.wrongCount : state.wrongCount + 1;

  if (isWordComplete(state.word, guessedLetters)) {
    return {
      state: {
        ...state,
        guessedLetters,
        wrongCount,
        status: "won",
      },
      result: "won",
    };
  }

  if (wrongCount >= state.config.maxWrongGuesses) {
    return {
      state: {
        ...state,
        guessedLetters,
        wrongCount,
        status: "lost",
      },
      result: "lost",
    };
  }

  return {
    state: {
      ...state,
      guessedLetters,
      wrongCount,
      status: "playing",
    },
    result: "continue",
  };
}
