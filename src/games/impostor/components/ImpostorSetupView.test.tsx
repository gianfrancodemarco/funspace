import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import type { GameDefinition } from "@/core/game-shell/types";
import { ImpostorSetupView } from "@/games/impostor/components/ImpostorSetupView";
import messages from "@/messages/en.json";

const mockPlayers = ["Marco", "Giulia"];

vi.mock("@/core/player-roster", () => ({
  usePlayerRoster: () => ({
    players: mockPlayers,
    isLoading: false,
    addPlayer: vi.fn(),
    removePlayer: vi.fn(),
    renamePlayer: vi.fn(),
  }),
}));

describe("ImpostorSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ImpostorSetupView minPlayers={3} maxPlayers={20} onStart={onStart} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
  });
});

describe("GameDefinition setup routing", () => {
  it("stores optional SetupView on game definition", () => {
    const SetupView = () => null;
    const game: GameDefinition = {
      id: "impostor",
      nameKey: "games.impostor.name",
      minPlayers: 3,
      maxPlayers: 20,
      phases: ["reveal", "play", "resolve"],
      SetupView,
      assignSecrets: () => ({}),
      PlayView: () => null,
      ResolveView: () => null,
    };

    expect(game.SetupView).toBe(SetupView);
  });
});
