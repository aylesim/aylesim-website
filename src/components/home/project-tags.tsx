import type { ProjectCategory } from "@/lib/roles";

const TAG_PILL_STYLES: Record<ProjectCategory, string> = {
  devices: "border-(--role-audio)/35 bg-(--role-audio)/10 text-(--role-audio)",
  "web-interactive":
    "border-(--role-web)/35 bg-(--role-web)/10 text-(--role-web)",
  installations:
    "border-(--role-creative)/35 bg-(--role-creative)/10 text-(--role-creative)",
  community: "border-(--accent)/35 bg-(--accent)/10 text-(--accent)",
};

const NEUTRAL_PILL =
  "border-(--foreground)/18 bg-surface-subtle text-(--text-muted)";

export function ProjectTags({
  tags,
  category,
  className,
}: {
  tags: string[];
  category?: ProjectCategory | null;
  className?: string;
}) {
  if (tags.length === 0) {
    return null;
  }

  const pillClass = category ? TAG_PILL_STYLES[category] : NEUTRAL_PILL;

  return (
    <ul className={`m-0 flex list-none flex-wrap gap-1 p-0 ${className ?? ""}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={`inline-flex items-center rounded-full border border-solid px-1.5 py-px font-mono text-[9px] leading-tight tracking-wide ${pillClass}`}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
