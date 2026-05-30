import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { ImpostorPlayView } from "@/games/impostor/components/ImpostorPlayView";
import { IMPOSTOR_STATE_KEY } from "@/games/impostor/types";
import messages from "@/messages/en.json";

const send = vi.fn();

vi.mock("@/core/game-shell", async () => {
  const actual = await vi.importActual("@/core/game-shell");
  return {
    ...actual,
    useGameShell: () => ({ send }),
  };
});

describe("ImpostorPlayView", () => {
  it("eliminates a player and patches session secrets", () => {
    const onComplete = vi.fn();
    const session = {
      gameId: "impostor",
      players: [
        { id: "a", name: "Marco" },
        { id: "b", name: "Giulia" },
        { id: "c", name: "Luca" },
      ],
      shuffledOrder: ["a", "b", "c"],
      secrets: {
        [IMPOSTOR_STATE_KEY]: {
          roles: { a: "civilian", b: "impostor", c: "civilian" },
          wordPair: { crewWord: "Pizza", spyWord: "Pasta" },
          alivePlayerIds: ["a", "b", "c"],
          eliminatedPlayerIds: [],
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ImpostorPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminate" })[1]!);
    fireEvent.click(screen.getByRole("button", { name: "Confirm elimination" }));

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "PATCH_SECRETS",
      }),
    );
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it("lets a player check their role during play", () => {
    const session = {
      gameId: "impostor",
      players: [
        { id: "a", name: "Marco" },
        { id: "b", name: "Giulia" },
        { id: "c", name: "Luca" },
      ],
      shuffledOrder: ["a", "b", "c"],
      secrets: {
        [IMPOSTOR_STATE_KEY]: {
          roles: { a: "civilian", b: "impostor", c: "civilian" },
          wordPair: { crewWord: "Pizza", spyWord: "Pasta" },
          alivePlayerIds: ["a", "b", "c"],
          eliminatedPlayerIds: [],
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ImpostorPlayView session={session} onComplete={vi.fn()} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Check role" })[1]!);
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText("You are the Impostor")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Back to game" }));
    expect(screen.getByText("Giulia")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Eliminate" })).toHaveLength(3);
  });
});
