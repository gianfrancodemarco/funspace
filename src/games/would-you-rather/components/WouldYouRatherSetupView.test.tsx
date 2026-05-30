import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { WouldYouRatherSetupView } from "@/games/would-you-rather/components/WouldYouRatherSetupView";
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

describe("WouldYouRatherSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WouldYouRatherSetupView
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
        <WouldYouRatherSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={vi.fn()}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: /Spicy/ }));
    expect(
      screen.getByText(/adult-themed dilemmas/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Include Spicy pack" }));
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).toBeChecked();
  });

  it("prevents starting with no dilemma packs selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WouldYouRatherSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Classic" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Gross" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Hypothetical" }));

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Start game" })).toBeDisabled();
  });
});

describe("wouldYouRatherDefinition", () => {
  it("skips reveal phase", async () => {
    const { wouldYouRatherDefinition } = await import(
      "@/games/would-you-rather"
    );
    expect(wouldYouRatherDefinition.phases).toEqual(["play", "resolve"]);
    expect(wouldYouRatherDefinition.phases).not.toContain("reveal");
  });
});
