import type { QuestionImpostorGameState, QuestionImpostorRole } from "../types";

export type WinSide = "civilians" | "impostors";

export function checkWin(
  alivePlayerIds: string[],
  roles: Record<string, QuestionImpostorRole>,
): WinSide | null {
  const aliveRoles = alivePlayerIds.map((id) => roles[id]);
  const aliveImpostors = aliveRoles.filter((role) => role === "impostor").length;
  const aliveNonImpostors = aliveRoles.length - aliveImpostors;

  if (aliveImpostors === 0) {
    return "civilians";
  }

  if (aliveNonImpostors === 0) {
    return "impostors";
  }

  return null;
}

export function eliminatePlayer(
  state: QuestionImpostorGameState,
  playerId: string,
): QuestionImpostorGameState {
  if (!state.alivePlayerIds.includes(playerId)) {
    return state;
  }

  const alivePlayerIds = state.alivePlayerIds.filter((id) => id !== playerId);
  const eliminatedPlayerIds = [...state.eliminatedPlayerIds, playerId];
  const winner = checkWin(alivePlayerIds, state.roles);

  return {
    ...state,
    alivePlayerIds,
    eliminatedPlayerIds,
    winner: winner ?? undefined,
  };
}
