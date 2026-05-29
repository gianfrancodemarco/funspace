import type { GameMeta } from "./types";

export const games: GameMeta[] = [
  {
    id: "impostor",
    nameKey: "games.impostor.name",
    descriptionKey: "games.impostor.description",
    tags: ["deduction", "bluff", "quick"],
    minPlayers: 3,
    maxPlayers: 20,
    status: "playable",
    accentColor: "impostor",
  },
  {
    id: "hangman",
    nameKey: "games.hangman.name",
    descriptionKey: "games.hangman.description",
    tags: ["words", "quick"],
    minPlayers: 2,
    maxPlayers: 8,
    status: "playable",
    accentColor: "hangman",
  },
  {
    id: "never-have-i-ever",
    nameKey: "games.neverHaveIEver.name",
    descriptionKey: "games.neverHaveIEver.description",
    tags: ["social", "quick"],
    minPlayers: 3,
    maxPlayers: 20,
    status: "playable",
    accentColor: "never-have-i-ever",
  },
  {
    id: "question-impostor",
    nameKey: "games.questionImpostor.name",
    descriptionKey: "games.questionImpostor.description",
    tags: ["deduction", "bluff", "questions"],
    minPlayers: 3,
    maxPlayers: 20,
    status: "playable",
    accentColor: "question-impostor",
  },
];
