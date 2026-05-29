import type { GameSession, SessionPlayer, ShellPhase } from "./types";

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createSessionPlayers(names: string[]): SessionPlayer[] {
  return names.map((name) => ({
    id: crypto.randomUUID(),
    name,
  }));
}

export function createGameSession(
  gameId: string,
  playerNames: string[],
  assignSecrets: (session: GameSession) => Record<string, unknown>,
): GameSession {
  const players = createSessionPlayers(playerNames);
  const shuffledOrder = shuffle(players.map((player) => player.id));
  const baseSession: GameSession = {
    gameId,
    players,
    shuffledOrder,
    secrets: {},
  };

  return {
    ...baseSession,
    secrets: assignSecrets(baseSession),
  };
}

export function getPlayerName(
  session: GameSession,
  playerId: string,
): string {
  return session.players.find((player) => player.id === playerId)?.name ?? "";
}

export function getPhaseAfterSetup(phases: ShellPhase[]): ShellPhase {
  if (phases.includes("reveal")) {
    return "reveal";
  }
  if (phases.includes("play")) {
    return "play";
  }
  return "resolve";
}

export function getPhaseAfterReveal(phases: ShellPhase[]): ShellPhase {
  if (phases.includes("play")) {
    return "play";
  }
  return "resolve";
}

export function getPhaseAfterPlay(): ShellPhase {
  return "resolve";
}
