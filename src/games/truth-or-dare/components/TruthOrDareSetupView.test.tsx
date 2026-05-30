import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { TruthOrDareSetupView } from "@/games/truth-or-dare/components/TruthOrDareSetupView";
import messages from "@/messages/en.json";

const mockPlayers = ["Alex", "Blake", "Casey"];

vi.mock("@/core/player-roster", () => ({
  usePlayerRoster: () => ({
    players: mockPlayers,
    isLoading: false,
    addPlayer: vi.fn(),
    removePlayer: vi.fn(),
    renamePlayer: vi.fn(),
  }),
}));

describe("TruthOrDareSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDareSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Alex" }));
    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Start game" })).toBeDisabled();
  });

  it("requires confirmation before enabling the Spicy pack", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDareSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={vi.fn()}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: /Spicy/ }));
    expect(
      screen.getByText(/adult-themed truths and dares/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Include Spicy pack" }));
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).toBeChecked();
  });

  it("prevents starting with no prompt packs selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDareSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Silly night" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Classic" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Silly" }));

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Start game" })).toBeDisabled();
  });

  it("allows selecting a prompt mode", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDareSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    const modeButtons = screen.getAllByRole("button", { name: "Dares only" });
    fireEvent.click(modeButtons[modeButtons.length - 1]!);
    fireEvent.click(screen.getByRole("button", { name: "Start game" }));

    expect(onStart).toHaveBeenCalledWith(
      expect.objectContaining({
        gameConfig: expect.objectContaining({
          promptMode: "dare_only",
        }),
      }),
    );
  });
});

describe("truthOrDareDefinition", () => {
  it("skips reveal phase", async () => {
    const { truthOrDareDefinition } = await import("@/games/truth-or-dare");
    expect(truthOrDareDefinition.phases).toEqual(["play", "resolve"]);
    expect(truthOrDareDefinition.phases).not.toContain("reveal");
  });
});
