export type {
  ComingSoonGameEntry,
  GameDefinition,
  GamePlayProps,
  GameRegistryEntry,
  GameResolveProps,
  GameSession,
  GameSetupProps,
  PlayableGameEntry,
  SessionPlayer,
  ShellPhase,
} from "./types";

export {
  createGameSession,
  createSessionPlayers,
  getPhaseAfterPlay,
  getPhaseAfterReveal,
  getPhaseAfterSetup,
  getPlayerName,
  shuffle,
} from "./session";

export { shellMachine, getActiveShellPhase } from "./shell-machine";
export type { ShellMachineContext, ShellMachineEvent } from "./shell-machine";

export { GameShellProvider, useGameShell } from "./GameShellProvider";
