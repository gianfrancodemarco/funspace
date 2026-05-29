"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locale");

  return (
    <div
      role="group"
      aria-label={t("switch")}
      className="inline-flex rounded-md border border-primary/20 p-0.5"
    >
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          type="button"
          variant={locale === loc ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-7 px-2.5 text-xs font-semibold uppercase",
            locale === loc && "pointer-events-none",
          )}
          aria-current={locale === loc ? "true" : undefined}
          aria-label={t(loc)}
          onClick={() => {
            if (loc !== locale) {
              router.replace(pathname, { locale: loc });
            }
          }}
        >
          {loc}
        </Button>
      ))}
    </div>
  );
}
