import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import type { GameSession } from "@/core/game-shell";
import { NeverHaveIEverPlayView } from "@/games/never-have-i-ever/components/NeverHaveIEverPlayView";
import { NEVER_HAVE_I_EVER_STATE_KEY } from "@/games/never-have-i-ever/types";
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
  gameId: "never-have-i-ever",
  players: [
    { id: "p1", name: "Alex" },
    { id: "p2", name: "Blake" },
    { id: "p3", name: "Casey" },
  ],
  shuffledOrder: ["p1", "p2", "p3"],
  secrets: {
    [NEVER_HAVE_I_EVER_STATE_KEY]: {
      config: {
        promptPackIds: ["classic"],
        locale: "en",
      },
      deck: ["Never have I ever gone camping.", "Never have I ever sung karaoke."],
      currentIndex: 0,
      skippedCount: 0,
      status: "playing",
    },
  },
};

describe("NeverHaveIEverPlayView", () => {
  it("shows the current prompt and advances on next", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NeverHaveIEverPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByText("Never have I ever gone camping."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next prompt" }));

    expect(
      screen.getByText("Never have I ever sung karaoke."),
    ).toBeInTheDocument();
    expect(send).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("completes the session when ending early", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NeverHaveIEverPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "End session" }));
    expect(onComplete).toHaveBeenCalled();
  });

  it("completes when the deck is exhausted", () => {
    const onComplete = vi.fn();
    const lastPrompt = {
      ...session,
      secrets: {
        [NEVER_HAVE_I_EVER_STATE_KEY]: {
          ...(session.secrets[NEVER_HAVE_I_EVER_STATE_KEY] as object),
          deck: ["Never have I ever gone camping."],
          currentIndex: 0,
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NeverHaveIEverPlayView session={lastPrompt} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next prompt" }));
    expect(onComplete).toHaveBeenCalled();
  });
});
