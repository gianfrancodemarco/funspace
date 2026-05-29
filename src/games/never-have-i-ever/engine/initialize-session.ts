import type { GameSession } from "@/core/game-shell";

import { getPromptDecksForLocale } from "../prompt-decks";
import type { NeverHaveIEverConfig } from "../types";
import {
  NEVER_HAVE_I_EVER_STATE_KEY,
  type NeverHaveIEverGameState,
} from "../types";
import { buildDeck } from "./build-deck";

export function initializeNeverHaveIEverState(
  session: GameSession,
): NeverHaveIEverGameState {
  const config = session.gameConfig as NeverHaveIEverConfig;
  const decks = getPromptDecksForLocale(config.locale);
  const deck = buildDeck(decks, config.promptPackIds);

  return {
    config,
    deck,
    currentIndex: 0,
    skippedCount: 0,
    status: deck.length === 0 ? "complete" : "playing",
  };
}

export function assignNeverHaveIEverSecrets(
  session: GameSession,
): Record<string, unknown> {
  const state = initializeNeverHaveIEverState(session);
  return {
    [NEVER_HAVE_I_EVER_STATE_KEY]: state,
  };
}
