import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { HangmanSetupView } from "@/games/hangman/components/HangmanSetupView";
import messages from "@/messages/en.json";

const mockPlayers = ["Alex"];

vi.mock("@/core/player-roster", () => ({
  usePlayerRoster: () => ({
    players: mockPlayers,
    isLoading: false,
    addPlayer: vi.fn(),
    removePlayer: vi.fn(),
    renamePlayer: vi.fn(),
  }),
}));

describe("HangmanSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HangmanSetupView minPlayers={2} maxPlayers={8} onStart={onStart} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Start game" })).toBeDisabled();
  });
});

describe("hangmanDefinition", () => {
  it("skips reveal phase", async () => {
    const { hangmanDefinition } = await import("@/games/hangman");
    expect(hangmanDefinition.phases).toEqual(["play", "resolve"]);
    expect(hangmanDefinition.phases).not.toContain("reveal");
  });
});
