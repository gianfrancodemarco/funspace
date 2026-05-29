import type { GameRegistryEntry } from "@/core/game-shell";

import { hangmanDefinition } from "./hangman";
import { impostorDefinition } from "./impostor";
import { neverHaveIEverDefinition } from "./never-have-i-ever";
import { questionImpostorDefinition } from "./question-impostor";
import { shellDemoDefinition } from "./shell-demo";

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
  [
    neverHaveIEverDefinition.id,
    {
      kind: "playable",
      definition: {
        ...neverHaveIEverDefinition,
        phases: [...neverHaveIEverDefinition.phases],
      },
    },
  ],
  [
    questionImpostorDefinition.id,
    {
      kind: "playable",
      definition: {
        ...questionImpostorDefinition,
        phases: [...questionImpostorDefinition.phases],
      },
    },
  ],
]);

export function getGameById(gameId: string): GameRegistryEntry | undefined {
  return registry.get(gameId);
}

export function getAllRegisteredGameIds(): string[] {
  return [...registry.keys()];
}
