import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { QuestionImpostorSetupView } from "@/games/question-impostor/components/QuestionImpostorSetupView";
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

describe("QuestionImpostorSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuestionImpostorSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
  });
});
