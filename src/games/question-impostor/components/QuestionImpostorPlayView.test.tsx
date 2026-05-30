import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { QuestionImpostorPlayView } from "@/games/question-impostor/components/QuestionImpostorPlayView";
import { QUESTION_IMPOSTOR_STATE_KEY } from "@/games/question-impostor/types";
import messages from "@/messages/en.json";

const send = vi.fn();

vi.mock("@/core/game-shell", async () => {
  const actual = await vi.importActual("@/core/game-shell");
  return {
    ...actual,
    useGameShell: () => ({ send }),
  };
});

describe("QuestionImpostorPlayView", () => {
  it("lets a player check their role and eliminates with destructive confirm", () => {
    const onComplete = vi.fn();
    const session = {
      gameId: "question-impostor",
      players: [
        { id: "a", name: "Marco" },
        { id: "b", name: "Giulia" },
        { id: "c", name: "Luca" },
      ],
      shuffledOrder: ["a", "b", "c"],
      secrets: {
        [QUESTION_IMPOSTOR_STATE_KEY]: {
          roles: { a: "civilian", b: "impostor", c: "civilian" },
          pair: {
            crewQuestion: "How many countries have you visited?",
            impostorQuestion: "How many cities have you lived in?",
            answerType: "number",
          },
          alivePlayerIds: ["a", "b", "c"],
          eliminatedPlayerIds: [],
        },
      },
    };

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <QuestionImpostorPlayView session={session} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Check role" })[1]!);
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(
      screen.getByText("How many cities have you lived in?"),
    ).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Back to game" }));

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminate" })[1]!);
    fireEvent.click(screen.getByRole("button", { name: "Confirm elimination" }));

    expect(send).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalledOnce();
  });
});
