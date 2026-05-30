import type { GameSession } from "@/core/game-shell";

import { getPromptDecksForLocale } from "../prompt-decks";
import type { TruthOrDareConfig } from "../types";
import {
  TRUTH_OR_DARE_STATE_KEY,
  type TruthOrDareGameState,
} from "../types";
import { buildDecks } from "./build-decks";
import { createGameState } from "./advance-prompt";

export function initializeTruthOrDareState(
  session: GameSession,
): TruthOrDareGameState {
  const config = session.gameConfig as TruthOrDareConfig;
  const packs = getPromptDecksForLocale(config.locale);
  const { truthDeck, dareDeck } = buildDecks(packs, config.promptPackIds);
  const playerIds = session.players.map((player) => player.id);

  return createGameState(config, truthDeck, dareDeck, playerIds);
}

export function assignTruthOrDareSecrets(
  session: GameSession,
): Record<string, unknown> {
  const state = initializeTruthOrDareState(session);
  return {
    [TRUTH_OR_DARE_STATE_KEY]: state,
  };
}
