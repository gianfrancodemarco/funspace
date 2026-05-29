import type { ComingSoonGameEntry, GameRegistryEntry } from "@/core/game-shell";

import { shellDemoDefinition } from "./shell-demo";

const comingSoonGames: ComingSoonGameEntry[] = [
  {
    kind: "coming-soon",
    id: "impostor",
    nameKey: "games.impostor.name",
    minPlayers: 4,
    maxPlayers: 12,
  },
  {
    kind: "coming-soon",
    id: "hangman",
    nameKey: "games.hangman.name",
    minPlayers: 2,
    maxPlayers: 8,
  },
  {
    kind: "coming-soon",
    id: "never-have-i-ever",
    nameKey: "games.neverHaveIEver.name",
    minPlayers: 3,
    maxPlayers: 20,
  },
];

const registry = new Map<string, GameRegistryEntry>([
  [
    shellDemoDefinition.id,
    {
      kind: "playable",
      definition: shellDemoDefinition,
    },
  ],
  ...comingSoonGames.map((entry) => [entry.id, entry] as const),
]);

export function getGameById(gameId: string): GameRegistryEntry | undefined {
  return registry.get(gameId);
}

export function getAllRegisteredGameIds(): string[] {
  return [...registry.keys()];
}
