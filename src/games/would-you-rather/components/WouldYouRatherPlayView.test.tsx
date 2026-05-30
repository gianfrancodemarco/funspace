import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import type { GameSession } from "@/core/game-shell";
import { WouldYouRatherPlayView } from "@/games/would-you-rather/components/WouldYouRatherPlayView";
import { WOULD_YOU_RATHER_STATE_KEY } from "@/games/would-you-rather/types";
import messages from "@/messages/en.json";

const send = vi.fn();

vi.mock("@/core/game-shell", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/core/game-shell")>();
  return {
    ...actual,
    useGameShell: () => ({ send }),
  };
});

const session: GameSession = {
  gameId: "would-you-rather",
  players: [
    { id: "p1", name: "Alex" },
    { id: "p2", name: "Blake" },
    { id: "p3", name: "Casey" },
  ],
  shuffledOrder: ["p1", "p2", "p3"],
  secrets: {
    [WOULD_YOU_RATHER_STATE_KEY]: {
      config: {
        promptPackIds: ["classic"],
        locale: "en",
      },
      deck: [
        { optionA: "Live without music", optionB: "Live without movies" },
        { optionA: "Always be late", optionB: "Always be early" },
      ],
      currentIndex: 0,
      skippedCount: 0,
      status: "playing",
    },
  },
};

describe("WouldYouRatherPlayView", () => {
  it("shows both options and advances when an option is chosen", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WouldYouRatherPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("Live without music")).toBeInTheDocument();
    expect(screen.getByText("Live without movies")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next dilemma" })).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Choose: Live without music" }),
    );

    expect(screen.getByText("Always be late")).toBeInTheDocument();
    expect(screen.getByText("Always be early")).toBeInTheDocument();
    expect(send).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("completes the session when ending early", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WouldYouRatherPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "End session" }));
    expect(onComplete).toHaveBeenCalled();
  });

  it("completes when the deck is exhausted", () => {
    const onComplete = vi.fn();
    const lastDilemma = {
      ...session,
      secrets: {
        [WOULD_YOU_RATHER_STATE_KEY]: {
          ...(session.secrets[WOULD_YOU_RATHER_STATE_KEY] as object),
          deck: [
            { optionA: "Live without music", optionB: "Live without movies" },
          ],
          currentIndex: 0,
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WouldYouRatherPlayView session={lastDilemma} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Choose: Live without movies" }),
    );
    expect(onComplete).toHaveBeenCalled();
  });
});
