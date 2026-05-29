import type { GameSession } from "@/core/game-shell";

import type { ImpostorConfig } from "../types";
import { IMPOSTOR_STATE_KEY, type ImpostorGameState } from "../types";
import { getWordPacksForLocale } from "../word-packs";
import { assignRoles } from "./assign-roles";
import { pickWordPair } from "./pick-word-pair";

export function initializeImpostorState(session: GameSession): ImpostorGameState {
  const config = session.gameConfig as ImpostorConfig;
  const roles = assignRoles(
    session.players,
    config.impostorCount,
    config.spyCount,
  );
  const packs = getWordPacksForLocale(config.locale);
  const wordPair = pickWordPair(packs, config.wordPackIds);

  return {
    roles,
    wordPair,
    alivePlayerIds: session.players.map((player) => player.id),
    eliminatedPlayerIds: [],
  };
}

export function assignImpostorSecrets(session: GameSession): Record<string, unknown> {
  const state = initializeImpostorState(session);
  return {
    [IMPOSTOR_STATE_KEY]: state,
  };
}
