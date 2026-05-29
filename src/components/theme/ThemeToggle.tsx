"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const THEME_CYCLE = ["light", "dark", "system"] as const;
type ThemeMode = (typeof THEME_CYCLE)[number];

function nextTheme(current: ThemeMode): ThemeMode {
  const index = THEME_CYCLE.indexOf(current);
  return THEME_CYCLE[(index + 1) % THEME_CYCLE.length];
}

function ThemeIcon({ theme }: { theme: ThemeMode }) {
  if (theme === "dark") {
    return <MoonIcon className="size-5" />;
  }
  if (theme === "system") {
    return <MonitorIcon className="size-5" />;
  }
  return <SunIcon className="size-5" />;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme: ThemeMode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";

  const labelKey =
    currentTheme === "light"
      ? "light"
      : currentTheme === "dark"
        ? "dark"
        : "system";

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("toggle")}
        disabled
      >
        <SunIcon className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t(labelKey)}
      title={t(labelKey)}
      onClick={() => setTheme(nextTheme(currentTheme))}
    >
      <ThemeIcon theme={currentTheme} />
    </Button>
  );
}
