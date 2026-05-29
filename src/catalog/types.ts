export type GameStatus = "coming-soon" | "available" | "playable";

export type GameAccentColor = "impostor" | "hangman" | "never-have-i-ever";

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
