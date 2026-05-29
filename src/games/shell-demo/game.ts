import type { GameSession } from "@/core/game-shell";

export function assignShellDemoSecrets(
  session: GameSession,
): Record<string, unknown> {
  return Object.fromEntries(
    session.players.map((player) => [player.id, { number: 42 }]),
  );
}

export const shellDemoGame = {
  id: "shell-demo",
  nameKey: "games.shellDemo.name",
  minPlayers: 2,
  maxPlayers: 20,
  phases: ["reveal", "play", "resolve"] as const,
  assignSecrets: assignShellDemoSecrets,
};
