import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import messages from "@/messages/en.json";

const replace = vi.fn();

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({
    push: vi.fn(),
    replace,
    prefetch: vi.fn(),
  }),
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));

vi.mock("next-intl", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next-intl")>();
  return {
    ...actual,
    useLocale: () => "en",
  };
});

function renderLanguageSwitcher() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <LanguageSwitcher />
    </NextIntlClientProvider>,
  );
}

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it("renders locale options with accessible group label", () => {
    renderLanguageSwitcher();

    expect(
      screen.getByRole("group", { name: "Switch language" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "Italian" })).toBeInTheDocument();
  });

  it("switches locale while preserving pathname", () => {
    renderLanguageSwitcher();

    fireEvent.click(screen.getByRole("button", { name: "Italian" }));

    expect(replace).toHaveBeenCalledWith("/about", { locale: "it" });
  });

  it("does not navigate when selecting the active locale", () => {
    renderLanguageSwitcher();

    fireEvent.click(screen.getByRole("button", { name: "English" }));

    expect(replace).not.toHaveBeenCalled();
  });
});
