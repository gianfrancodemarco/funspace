"use client";

import { useMachine } from "@xstate/react";
import { createContext, useContext, type ReactNode } from "react";

import { shellMachine, type ShellMachineEvent } from "./shell-machine";
import type { GameDefinition, GameSession, ShellPhase } from "./types";

type GameShellContextValue = {
  game: GameDefinition;
  session: GameSession | null;
  phase: ShellPhase | "setup";
  send: (event: ShellMachineEvent) => void;
  isSetup: boolean;
  isReveal: boolean;
  isPlay: boolean;
  isResolve: boolean;
};

const GameShellContext = createContext<GameShellContextValue | null>(null);

type GameShellProviderProps = {
  game: GameDefinition;
  children: ReactNode;
};

export function GameShellProvider({ game, children }: GameShellProviderProps) {
  const [state, send] = useMachine(shellMachine, { input: { game } });

  const value: GameShellContextValue = {
    game,
    session: state.context.session,
    phase: state.matches("setup")
      ? "setup"
      : state.context.phase,
    send,
    isSetup: state.matches("setup"),
    isReveal: state.matches("reveal"),
    isPlay: state.matches("play"),
    isResolve: state.matches("resolve"),
  };

  return (
    <GameShellContext.Provider value={value}>
      {children}
    </GameShellContext.Provider>
  );
}

export function useGameShell() {
  const context = useContext(GameShellContext);
  if (!context) {
    throw new Error("useGameShell must be used within GameShellProvider");
  }
  return context;
}
