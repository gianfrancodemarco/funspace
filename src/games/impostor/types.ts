export type ImpostorRole = "civilian" | "impostor" | "spy";

export type ImpostorConfig = {
  impostorCount: number;
  spyCount: number;
  wordPackIds: string[];
  locale: string;
};

export type WordPair = {
  crewWord: string;
  spyWord: string;
};

export type ImpostorGameState = {
  roles: Record<string, ImpostorRole>;
  wordPair: WordPair;
  alivePlayerIds: string[];
  eliminatedPlayerIds: string[];
  winner?: "civilians" | "impostors";
};

export const IMPOSTOR_STATE_KEY = "impostorState";

export function getImpostorState(
  secrets: Record<string, unknown>,
): ImpostorGameState | null {
  const state = secrets[IMPOSTOR_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as ImpostorGameState;
}
