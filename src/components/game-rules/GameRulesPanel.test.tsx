import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { GameRulesPanel } from "@/components/game-rules/GameRulesPanel";
import messages from "@/messages/en.json";

function renderPanel() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <GameRulesPanel
        rulesKeyPrefix="impostor.rules"
        roleKeys={["civilian", "impostor", "spy"]}
        stepCount={5}
      />
    </NextIntlClientProvider>,
  );
}

describe("GameRulesPanel", () => {
  it("renders all four rules sections", () => {
    renderPanel();

    expect(screen.getByText("Goal")).toBeInTheDocument();
    expect(screen.getByText("Roles")).toBeInTheDocument();
    expect(screen.getByText("How to play")).toBeInTheDocument();
    expect(screen.getByText("Win conditions")).toBeInTheDocument();
  });

  it("renders role items and numbered steps", () => {
    renderPanel();

    expect(
      screen.getByText(/Civilian — knows the secret word/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Impostor — does not know the word/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Spy \(optional\) — gets a similar decoy word/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Choose players and options, then start the game."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Civilians \(and any spy\) win when all impostors have been eliminated/,
      ),
    ).toBeInTheDocument();
  });
});
