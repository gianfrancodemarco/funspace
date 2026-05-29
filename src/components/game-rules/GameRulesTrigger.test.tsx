import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { GameRulesTrigger } from "@/components/game-rules/GameRulesTrigger";
import messages from "@/messages/en.json";

describe("GameRulesTrigger", () => {
  it("renders how to play button for Impostor rules", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <GameRulesTrigger
          rulesKeyPrefix="impostor.rules"
          rulesRoleKeys={["civilian", "impostor", "spy"]}
          rulesStepCount={5}
        />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("button", { name: "How to play" }),
    ).toBeInTheDocument();
  });
});
