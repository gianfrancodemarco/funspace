import type { ComingSoonGameEntry, GameRegistryEntry } from "@/core/game-shell";

import { hangmanDefinition } from "./hangman";
import { impostorDefinition } from "./impostor";
import { shellDemoDefinition } from "./shell-demo";

const comingSoonGames: ComingSoonGameEntry[] = [
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
      definition: {
        ...shellDemoDefinition,
        phases: [...shellDemoDefinition.phases],
      },
    },
  ],
  [
    impostorDefinition.id,
    {
      kind: "playable",
      definition: {
        ...impostorDefinition,
        phases: [...impostorDefinition.phases],
      },
    },
  ],
  [
    hangmanDefinition.id,
    {
      kind: "playable",
      definition: {
        ...hangmanDefinition,
        phases: [...hangmanDefinition.phases],
      },
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
