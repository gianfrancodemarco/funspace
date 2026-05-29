import type { ComponentType } from "react";

export type ShellPhase = "setup" | "reveal" | "play" | "resolve";

export type SessionPlayer = {
  id: string;
  name: string;
};

export type GameSession = {
  gameId: string;
  players: SessionPlayer[];
  shuffledOrder: string[];
  secrets: Record<string, unknown>;
  gameConfig?: unknown;
};

export type GameStartInput = {
  playerNames: string[];
  gameConfig?: unknown;
};

export type GameSetupProps = {
  minPlayers: number;
  maxPlayers: number;
  onStart: (input: GameStartInput) => void;
};

export type GamePlayProps = {
  session: GameSession;
  onComplete: () => void;
};

export type GameResolveProps = {
  session: GameSession;
  onRematch: () => void;
  onExit: () => void;
};

export type GameRulesMeta = {
  rulesKeyPrefix: string;
  rulesRoleKeys: readonly string[];
  rulesStepCount: number;
};

export type GameDefinition = {
  id: string;
  nameKey: string;
  minPlayers: number;
  maxPlayers: number;
  phases: ShellPhase[];
  assignSecrets: (session: GameSession) => Record<string, unknown>;
  SetupView?: ComponentType<GameSetupProps>;
  PlayView: ComponentType<GamePlayProps>;
  ResolveView: ComponentType<GameResolveProps>;
  rulesKeyPrefix?: string;
  rulesRoleKeys?: readonly string[];
  rulesStepCount?: number;
};

export type ComingSoonGameEntry = {
  kind: "coming-soon";
  id: string;
  nameKey: string;
  minPlayers: number;
  maxPlayers: number;
};

export type PlayableGameEntry = {
  kind: "playable";
  definition: GameDefinition;
};

export type GameRegistryEntry = PlayableGameEntry | ComingSoonGameEntry;
