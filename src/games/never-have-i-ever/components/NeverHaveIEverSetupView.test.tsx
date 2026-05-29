import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { NeverHaveIEverSetupView } from "@/games/never-have-i-ever/components/NeverHaveIEverSetupView";
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

describe("NeverHaveIEverSetupView", () => {
  it("prevents starting with too few players selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NeverHaveIEverSetupView
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
        <NeverHaveIEverSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={vi.fn()}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: /Spicy/ }));
    expect(
      screen.getByText(/adult-themed prompts/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Include Spicy pack" }));
    expect(screen.getByRole("checkbox", { name: /Spicy/ })).toBeChecked();
  });

  it("prevents starting with no prompt packs selected", () => {
    const onStart = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NeverHaveIEverSetupView
          minPlayers={3}
          maxPlayers={20}
          onStart={onStart}
        />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Classic" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Travel" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Food & Fun" }));

    fireEvent.click(screen.getByRole("button", { name: "Start game" }));
    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Start game" })).toBeDisabled();
  });
});

describe("neverHaveIEverDefinition", () => {
  it("skips reveal phase", async () => {
    const { neverHaveIEverDefinition } = await import(
      "@/games/never-have-i-ever"
    );
    expect(neverHaveIEverDefinition.phases).toEqual(["play", "resolve"]);
    expect(neverHaveIEverDefinition.phases).not.toContain("reveal");
  });
});
