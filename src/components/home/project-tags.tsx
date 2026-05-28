export function ProjectTags({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <span className={`flex flex-wrap gap-x-2 gap-y-1 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          className="font-mono text-(--text-muted)/75 text-[10px] uppercase tracking-widest"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}
