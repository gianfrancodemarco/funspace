import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import type { GameSession } from "@/core/game-shell";
import { HangmanPlayView } from "@/games/hangman/components/HangmanPlayView";
import { HANGMAN_STATE_KEY } from "@/games/hangman/types";
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
  gameId: "hangman",
  players: [
    { id: "p1", name: "Alex" },
    { id: "p2", name: "Blake" },
  ],
  shuffledOrder: ["p1", "p2"],
  secrets: {
    [HANGMAN_STATE_KEY]: {
      config: {
        wordPackIds: ["general"],
        maxWrongGuesses: 6,
        locale: "en",
      },
      word: "apple",
      guessedLetters: [],
      wrongCount: 0,
      status: "playing",
    },
  },
};

describe("HangmanPlayView", () => {
  it("reveals letters on correct guesses", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HangmanPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "a" }));

    expect(screen.getByText("a _ _ _ _")).toBeInTheDocument();
    expect(send).toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("completes the game when the word is guessed", () => {
    const onComplete = vi.fn();
    const almostDone = {
      ...session,
      secrets: {
        [HANGMAN_STATE_KEY]: {
          ...(session.secrets[HANGMAN_STATE_KEY] as object),
          guessedLetters: ["a", "p", "l"],
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HangmanPlayView session={almostDone} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "e" }));
    expect(onComplete).toHaveBeenCalled();
  });
});
