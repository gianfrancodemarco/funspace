import type { GameSession } from "@/core/game-shell";

import type { HangmanConfig } from "../types";
import { HANGMAN_STATE_KEY, type HangmanGameState } from "../types";
import { getWordListsForLocale } from "../word-lists";
import { pickWord } from "./pick-word";

export function initializeHangmanState(session: GameSession): HangmanGameState {
  const config = session.gameConfig as HangmanConfig;
  const lists = getWordListsForLocale(config.locale);
  const word = pickWord(lists, config.wordPackIds);

  return {
    config,
    word,
    guessedLetters: [],
    wrongCount: 0,
    status: "playing",
  };
}

export function assignHangmanSecrets(
  session: GameSession,
): Record<string, unknown> {
  const state = initializeHangmanState(session);
  return {
    [HANGMAN_STATE_KEY]: state,
  };
}
