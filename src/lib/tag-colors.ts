const tagColorClasses: Record<string, string> = {
  deduction:
    "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-200",
  bluff:
    "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-200",
  words: "bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-200",
  social: "bg-pink-100 text-pink-800 dark:bg-pink-950/80 dark:text-pink-200",
  quick: "bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-200",
};

const defaultTagClass =
  "bg-secondary text-secondary-foreground";

export function getTagColorClass(tag: string): string {
  return tagColorClasses[tag] ?? defaultTagClass;
}
