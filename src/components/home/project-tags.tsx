export function ProjectTags({
  tags,
  className,
}: {
  tags: string[];
  category?: string | null;
  className?: string;
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul
      className={`m-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-(--text-muted) text-xs ${className ?? ""}`}
    >
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
