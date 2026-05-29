export type HangmanGameStatus = "playing" | "won" | "lost";

export type HangmanConfig = {
  wordPackIds: string[];
  maxWrongGuesses: number;
  locale: string;
};

export type HangmanGameState = {
  config: HangmanConfig;
  word: string;
  guessedLetters: string[];
  wrongCount: number;
  status: HangmanGameStatus;
};

export const HANGMAN_STATE_KEY = "hangmanState";

export function getHangmanState(
  secrets: Record<string, unknown>,
): HangmanGameState | null {
  const state = secrets[HANGMAN_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as HangmanGameState;
}
