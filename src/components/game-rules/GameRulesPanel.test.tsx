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

  it("renders role items with bold labels and numbered step badges", () => {
    renderPanel();

    expect(screen.getByText("Civilian")).toBeInTheDocument();
    expect(
      screen.getByText(/knows the secret word and tries to find the impostors/),
    ).toBeInTheDocument();
    expect(screen.getByText("Impostor")).toBeInTheDocument();
    expect(screen.getByText("Spy (optional)")).toBeInTheDocument();
    expect(
      screen.getByText("Choose players and options, then start the game."),
    ).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Civilians \(and any spy\) win when all impostors have been eliminated/,
      ),
    ).toBeInTheDocument();
  });
});
