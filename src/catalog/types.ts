export type GameStatus = "coming-soon" | "available" | "playable";

export type GameAccentColor =
  | "impostor"
  | "hangman"
  | "never-have-i-ever"
  | "question-impostor"
  | "truth-or-dare"
  | "would-you-rather";

export interface GameMeta {
  id: string;
  nameKey: string;
  descriptionKey: string;
  tags: string[];
  minPlayers: number;
  maxPlayers: number;
  status: GameStatus;
  accentColor: GameAccentColor;
}
