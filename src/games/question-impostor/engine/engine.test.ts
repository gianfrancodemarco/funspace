import { describe, expect, it } from "vitest";

import type { GameSession } from "@/core/game-shell";

import { assignRoles } from "./assign-roles";
import { checkWin, eliminatePlayer } from "./check-win";
import { initializeQuestionImpostorState } from "./initialize-session";

describe("question impostor engine", () => {
  it("assigns the correct number of each role", () => {
    const players = [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
      { id: "3", name: "C" },
      { id: "4", name: "D" },
      { id: "5", name: "E" },
    ];

    const roles = assignRoles(players, 2);
    const roleValues = Object.values(roles);

    expect(roleValues.filter((role) => role === "impostor")).toHaveLength(2);
    expect(roleValues.filter((role) => role === "civilian")).toHaveLength(3);
  });

  it("detects civilian and impostor wins", () => {
    const roles = {
      a: "civilian" as const,
      b: "impostor" as const,
      c: "civilian" as const,
    };

    expect(checkWin(["a", "c"], roles)).toBe("civilians");
    expect(checkWin(["b"], roles)).toBe("impostors");
    expect(checkWin(["a", "b", "c"], roles)).toBeNull();
  });

  it("eliminates players and sets winner", () => {
    const state = {
      roles: {
        a: "civilian" as const,
        b: "impostor" as const,
        c: "civilian" as const,
      },
      pair: {
        crewQuestion: "How many days in a week?",
        impostorQuestion: "How many hours in a day?",
        answerType: "number" as const,
      },
      alivePlayerIds: ["a", "b", "c"],
      eliminatedPlayerIds: [],
    };

    const afterElimination = eliminatePlayer(state, "b");
    expect(afterElimination.alivePlayerIds).toEqual(["a", "c"]);
    expect(afterElimination.winner).toBe("civilians");
  });

  it("initializes session state from config", () => {
    const session: GameSession = {
      gameId: "question-impostor",
      players: [
        { id: "a", name: "Marco" },
        { id: "b", name: "Giulia" },
        { id: "c", name: "Luca" },
      ],
      shuffledOrder: ["a", "b", "c"],
      secrets: {},
      gameConfig: {
        impostorCount: 1,
        questionPackIds: ["general"],
        locale: "en",
      },
    };

    const state = initializeQuestionImpostorState(session);
    expect(state.alivePlayerIds).toHaveLength(3);
    expect(state.pair.crewQuestion).toBeTruthy();
    expect(state.pair.impostorQuestion).toBeTruthy();
    expect(Object.values(state.roles)).toContain("impostor");
  });
});
