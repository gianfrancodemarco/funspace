import type { SessionPlayer } from "@/core/game-shell";

import type { ImpostorRole } from "../types";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function assignRoles(
  players: SessionPlayer[],
  impostorCount: number,
  spyCount: number,
): Record<string, ImpostorRole> {
  const roles: ImpostorRole[] = [
    ...Array.from({ length: impostorCount }, () => "impostor" as const),
    ...Array.from({ length: spyCount }, () => "spy" as const),
    ...Array.from(
      { length: players.length - impostorCount - spyCount },
      () => "civilian" as const,
    ),
  ];

  const shuffledRoles = shuffle(roles);
  return Object.fromEntries(
    players.map((player, index) => [player.id, shuffledRoles[index]]),
  );
}
