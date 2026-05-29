import type { SessionPlayer } from "@/core/game-shell";

import type { QuestionImpostorRole } from "../types";

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
): Record<string, QuestionImpostorRole> {
  const roles: QuestionImpostorRole[] = [
    ...Array.from({ length: impostorCount }, () => "impostor" as const),
    ...Array.from(
      { length: players.length - impostorCount },
      () => "civilian" as const,
    ),
  ];

  const shuffledRoles = shuffle(roles);
  return Object.fromEntries(
    players.map((player, index) => [player.id, shuffledRoles[index]]),
  );
}
