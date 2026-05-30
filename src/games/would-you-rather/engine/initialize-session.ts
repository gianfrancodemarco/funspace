import type { GameSession } from "@/core/game-shell";

import { getDilemmaDecksForLocale } from "../dilemma-decks";
import type { WouldYouRatherConfig } from "../types";
import {
  WOULD_YOU_RATHER_STATE_KEY,
  type WouldYouRatherGameState,
} from "../types";
import { buildDeck } from "./build-deck";

export function initializeWouldYouRatherState(
  session: GameSession,
): WouldYouRatherGameState {
  const config = session.gameConfig as WouldYouRatherConfig;
  const decks = getDilemmaDecksForLocale(config.locale);
  const deck = buildDeck(decks, config.promptPackIds);

  return {
    config,
    deck,
    currentIndex: 0,
    skippedCount: 0,
    status: deck.length === 0 ? "complete" : "playing",
  };
}

export function assignWouldYouRatherSecrets(
  session: GameSession,
): Record<string, unknown> {
  const state = initializeWouldYouRatherState(session);
  return {
    [WOULD_YOU_RATHER_STATE_KEY]: state,
  };
}
