import { assign, setup } from "xstate";

import {
  createGameSession,
  getPhaseAfterPlay,
  getPhaseAfterReveal,
  getPhaseAfterSetup,
} from "./session";
import type { GameDefinition, GameSession, ShellPhase } from "./types";

export type ShellMachineContext = {
  game: GameDefinition | null;
  session: GameSession | null;
  phase: ShellPhase;
  lastPlayerNames: string[];
};

export type ShellMachineInput = {
  game: GameDefinition;
};

export type ShellMachineEvent =
  | { type: "START"; playerNames: string[] }
  | { type: "REVEAL_DONE" }
  | { type: "PLAY_DONE" }
  | { type: "REMATCH" }
  | { type: "BACK_TO_SETUP" };

export const shellMachine = setup({
  types: {
    context: {} as ShellMachineContext,
    input: {} as ShellMachineInput,
    events: {} as ShellMachineEvent,
  },
}).createMachine({
  id: "gameShell",
  initial: "setup",
  context: ({ input }) => ({
    game: input.game,
    session: null,
    phase: "setup",
    lastPlayerNames: [],
  }),
  states: {
    setup: {
      on: {
        START: {
          target: "running",
          actions: assign(({ context, event }) => {
            if (!context.game) {
              return {};
            }

            const session = createGameSession(
              context.game.id,
              event.playerNames,
              context.game.assignSecrets,
            );

            return {
              session,
              lastPlayerNames: event.playerNames,
              phase: getPhaseAfterSetup(context.game.phases),
            };
          }),
        },
      },
    },
    running: {
      always: [
        { guard: ({ context }) => context.phase === "reveal", target: "reveal" },
        { guard: ({ context }) => context.phase === "play", target: "play" },
        { target: "resolve" },
      ],
    },
    reveal: {
      on: {
        REVEAL_DONE: {
          target: "running",
          actions: assign(({ context }) => ({
            phase: context.game
              ? getPhaseAfterReveal(context.game.phases)
              : "resolve",
          })),
        },
      },
    },
    play: {
      on: {
        PLAY_DONE: {
          target: "resolve",
          actions: assign({
            phase: getPhaseAfterPlay(),
          }),
        },
      },
    },
    resolve: {
      on: {
        REMATCH: {
          target: "running",
          actions: assign(({ context }) => {
            if (!context.game || context.lastPlayerNames.length === 0) {
              return { phase: "setup" as const };
            }

            const session = createGameSession(
              context.game.id,
              context.lastPlayerNames,
              context.game.assignSecrets,
            );

            return {
              session,
              phase: getPhaseAfterSetup(context.game.phases),
            };
          }),
        },
        BACK_TO_SETUP: {
          target: "setup",
          actions: assign({
            session: null,
            phase: "setup" as ShellPhase,
          }),
        },
      },
    },
  },
});

export function getActiveShellPhase(state: {
  matches: (value: string) => boolean;
  context: ShellMachineContext;
}): ShellPhase | "setup" {
  if (state.matches("setup")) {
    return "setup";
  }

  return state.context.phase;
}
