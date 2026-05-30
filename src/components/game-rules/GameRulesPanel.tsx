"use client";

import {
  Check,
  ListOrdered,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type GameRulesPanelProps = {
  rulesKeyPrefix: string;
  roleKeys: readonly string[];
  stepCount: number;
};

type SectionVariant = "default" | "goal";

function splitLabelBody(text: string): { label: string; body: string | null } {
  const separator = " — ";
  const index = text.indexOf(separator);
  if (index === -1) {
    return { label: text, body: null };
  }

  return {
    label: text.slice(0, index),
    body: text.slice(index + separator.length),
  };
}

function RulesSectionCard({
  title,
  icon: Icon,
  variant = "default",
  children,
}: {
  title: string;
  icon: LucideIcon;
  variant?: SectionVariant;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "space-y-3 rounded-xl border p-4",
        variant === "goal" && "border-primary/20 bg-primary/5",
        variant === "default" && "bg-card",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            variant === "goal"
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className={cn(variant !== "goal" && "pl-10")}>{children}</div>
    </section>
  );
}

function RoleItem({ text }: { text: string }) {
  const { label, body } = splitLabelBody(text);

  return (
    <li className="space-y-0.5">
      <span className="font-medium text-foreground">{label}</span>
      {body && <p className="text-muted-foreground text-sm">{body}</p>}
    </li>
  );
}

function StepItem({ index, text }: { index: number; text: string }) {
  return (
    <li className="flex gap-3">
      <span
        className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
        aria-hidden
      >
        {index}
      </span>
      <span className="text-muted-foreground pt-0.5 text-sm">{text}</span>
    </li>
  );
}

function WinItem({ text }: { text: string }) {
  return (
    <li className="flex gap-2.5">
      <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
      <span className="text-muted-foreground text-sm">{text}</span>
    </li>
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
    <div className="space-y-4">
      <RulesSectionCard
        title={t("sections.goal.title")}
        icon={Target}
        variant="goal"
      >
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("sections.goal.body")}
        </p>
      </RulesSectionCard>

      <RulesSectionCard title={t("sections.roles.title")} icon={Users}>
        <ul className="space-y-3">
          {roleKeys.map((roleKey) => (
            <RoleItem
              key={roleKey}
              text={t(`sections.roles.items.${roleKey}`)}
            />
          ))}
        </ul>
      </RulesSectionCard>

      <RulesSectionCard
        title={t("sections.howToPlay.title")}
        icon={ListOrdered}
      >
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <StepItem key={index} index={index + 1} text={step} />
          ))}
        </ol>
      </RulesSectionCard>

      <RulesSectionCard
        title={t("sections.winConditions.title")}
        icon={Trophy}
      >
        <ul className="space-y-2">
          <WinItem text={t("sections.winConditions.items.civilians")} />
          <WinItem text={t("sections.winConditions.items.impostors")} />
        </ul>
      </RulesSectionCard>
    </div>
  );
}
