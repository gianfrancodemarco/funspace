import type { GameSession } from "@/core/game-shell";

import { getQuestionPacksForLocale } from "../question-packs";
import type { QuestionImpostorConfig } from "../types";
import {
  QUESTION_IMPOSTOR_STATE_KEY,
  type QuestionImpostorGameState,
} from "../types";
import { assignRoles } from "./assign-roles";
import { pickQuestionPair } from "./pick-question-pair";

export function initializeQuestionImpostorState(
  session: GameSession,
): QuestionImpostorGameState {
  const config = session.gameConfig as QuestionImpostorConfig;
  const roles = assignRoles(session.players, config.impostorCount);
  const packs = getQuestionPacksForLocale(config.locale);
  const pair = pickQuestionPair(packs, config.questionPackIds);

  return {
    roles,
    pair,
    alivePlayerIds: session.players.map((player) => player.id),
    eliminatedPlayerIds: [],
  };
}

export function assignQuestionImpostorSecrets(
  session: GameSession,
): Record<string, unknown> {
  const state = initializeQuestionImpostorState(session);
  return {
    [QUESTION_IMPOSTOR_STATE_KEY]: state,
  };
}
