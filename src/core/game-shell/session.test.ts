import { describe, expect, it } from "vitest";

import {
  createGameSession,
  createSessionPlayers,
  getPhaseAfterSetup,
} from "./session";

describe("game session", () => {
  it("assigns unique player IDs", () => {
    const players = createSessionPlayers(["Marco", "Giulia", "Luca"]);
    const ids = players.map((player) => player.id);

    expect(new Set(ids).size).toBe(3);
    expect(players.map((player) => player.name)).toEqual([
      "Marco",
      "Giulia",
      "Luca",
    ]);
  });

  it("creates a session with shuffled order and secrets", () => {
    const session = createGameSession("shell-demo", ["Marco", "Giulia"], () => ({
      placeholder: true,
    }));

    expect(session.gameId).toBe("shell-demo");
    expect(session.players).toHaveLength(2);
    expect(session.shuffledOrder).toHaveLength(2);
    expect(session.secrets).toEqual({ placeholder: true });
  });

  it("picks reveal as the first phase when configured", () => {
    expect(getPhaseAfterSetup(["reveal", "play", "resolve"])).toBe("reveal");
    expect(getPhaseAfterSetup(["play", "resolve"])).toBe("play");
    expect(getPhaseAfterSetup(["resolve"])).toBe("resolve");
  });
});
