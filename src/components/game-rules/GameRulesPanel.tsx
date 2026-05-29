"use client";

import { useTranslations } from "next-intl";

type GameRulesPanelProps = {
  rulesKeyPrefix: string;
  roleKeys: readonly string[];
  stepCount: number;
};

function RulesSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold tracking-wide uppercase">{title}</h3>
      {children}
    </section>
  );
}

export function GameRulesPanel({
  rulesKeyPrefix,
  roleKeys,
  stepCount,
}: GameRulesPanelProps) {
  const t = useTranslations(rulesKeyPrefix);

  const steps = Array.from({ length: stepCount }, (_, index) =>
    t(`sections.howToPlay.steps.${index + 1}`),
  );

  return (
    <div className="space-y-6 text-sm leading-relaxed">
      <RulesSection title={t("sections.goal.title")}>
        <p className="text-muted-foreground">{t("sections.goal.body")}</p>
      </RulesSection>

      <RulesSection title={t("sections.roles.title")}>
        <ul className="text-muted-foreground list-disc space-y-2 pl-5">
          {roleKeys.map((roleKey) => (
            <li key={roleKey}>{t(`sections.roles.items.${roleKey}`)}</li>
          ))}
        </ul>
      </RulesSection>

      <RulesSection title={t("sections.howToPlay.title")}>
        <ol className="text-muted-foreground list-decimal space-y-2 pl-5">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </RulesSection>

      <RulesSection title={t("sections.winConditions.title")}>
        <ul className="text-muted-foreground list-disc space-y-2 pl-5">
          <li>{t("sections.winConditions.items.civilians")}</li>
          <li>{t("sections.winConditions.items.impostors")}</li>
        </ul>
      </RulesSection>
    </div>
  );
}
