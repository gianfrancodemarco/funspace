import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { TagBadge } from "@/components/catalog/TagBadge";
import messages from "@/messages/en.json";

describe("TagBadge", () => {
  it("renders label with category color class", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TagBadge tag="deduction" label="Deduction" />
      </NextIntlClientProvider>,
    );

    const badge = screen.getByText("Deduction");
    expect(badge).toHaveClass("bg-purple-100");
  });
});
