import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import messages from "@/messages/en.json";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from "next-themes";

function renderThemeToggle(theme = "light") {
  vi.mocked(useTheme).mockReturnValue({
    theme,
    setTheme,
    themes: ["light", "dark", "system"],
    resolvedTheme: theme === "system" ? "light" : theme,
    systemTheme: "light",
    forcedTheme: undefined,
  });

  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeToggle />
    </NextIntlClientProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    setTheme.mockClear();
  });

  it("renders with light mode aria label", async () => {
    renderThemeToggle("light");

    expect(
      await screen.findByRole("button", { name: "Light mode" }),
    ).toBeInTheDocument();
  });

  it("cycles from light to dark", async () => {
    renderThemeToggle("light");

    fireEvent.click(await screen.findByRole("button", { name: "Light mode" }));

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("cycles from dark to system", async () => {
    renderThemeToggle("dark");

    fireEvent.click(await screen.findByRole("button", { name: "Dark mode" }));

    expect(setTheme).toHaveBeenCalledWith("system");
  });

  it("cycles from system to light", async () => {
    renderThemeToggle("system");

    fireEvent.click(
      await screen.findByRole("button", { name: "System theme" }),
    );

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
