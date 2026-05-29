export type GameStatus = "coming-soon" | "available";

export interface GameMeta {
  id: string;
  nameKey: string;
  descriptionKey: string;
  tags: string[];
  minPlayers: number;
  maxPlayers: number;
  status: GameStatus;
}
