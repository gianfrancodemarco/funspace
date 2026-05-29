import { describe, expect, it } from "vitest";
import { createActor } from "xstate";

import { getPhaseAfterSetup } from "./session";
import { shellMachine } from "./shell-machine";
import type { GameDefinition } from "./types";

const demoGame: GameDefinition = {
  id: "shell-demo",
  nameKey: "games.shellDemo.name",
  minPlayers: 2,
  maxPlayers: 4,
  phases: ["reveal", "play", "resolve"],
  assignSecrets: () => ({}),
  PlayView: () => null,
  ResolveView: () => null,
};

describe("shellMachine", () => {
  it("starts in setup and moves through reveal and play", () => {
    const actor = createActor(shellMachine, { input: { game: demoGame } });
    actor.start();

    expect(actor.getSnapshot().matches("setup")).toBe(true);

    actor.send({ type: "START", playerNames: ["Marco", "Giulia", "Luca"] });

    expect(actor.getSnapshot().matches("reveal")).toBe(true);
    expect(actor.getSnapshot().context.session?.players).toHaveLength(3);
    expect(actor.getSnapshot().context.phase).toBe("reveal");

    actor.send({ type: "REVEAL_DONE" });
    expect(actor.getSnapshot().matches("play")).toBe(true);

    actor.send({ type: "PLAY_DONE" });
    expect(actor.getSnapshot().matches("resolve")).toBe(true);
  });

  it("skips reveal when not configured", () => {
    const playOnlyGame: GameDefinition = {
      ...demoGame,
      phases: ["play", "resolve"],
    };
    const actor = createActor(shellMachine, { input: { game: playOnlyGame } });
    actor.start();

    actor.send({ type: "START", playerNames: ["Marco", "Giulia"] });

    expect(actor.getSnapshot().matches("reveal")).toBe(false);
    expect(actor.getSnapshot().matches("play")).toBe(true);
    expect(getPhaseAfterSetup(playOnlyGame.phases)).toBe("play");
  });

  it("rematch creates a new session with the same players", () => {
    const actor = createActor(shellMachine, { input: { game: demoGame } });
    actor.start();

    actor.send({ type: "START", playerNames: ["Marco", "Giulia"] });
    actor.send({ type: "REVEAL_DONE" });
    actor.send({ type: "PLAY_DONE" });

    const firstSessionId = actor.getSnapshot().context.session?.players[0].id;

    actor.send({ type: "REMATCH" });

    expect(actor.getSnapshot().matches("reveal")).toBe(true);
    expect(actor.getSnapshot().context.session?.players[0].id).not.toBe(
      firstSessionId,
    );
  });
});
