import { getTagColorClass } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

export function TagBadge({
  tag,
  label,
  className,
}: {
  tag: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        getTagColorClass(tag),
        className,
      )}
    >
      {label}
    </span>
  );
}
