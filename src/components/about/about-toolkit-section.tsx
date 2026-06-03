import type { AboutSection } from "@/lib/content";

interface ToolkitCategory {
  title: string;
  skills: string[];
}

interface PillarStyle {
  stripe: string;
  label: string;
  chip: string;
}

const PILLAR_STYLES: PillarStyle[] = [
  {
    stripe: "bg-(--role-web)",
    label: "text-(--role-web)",
    chip: "border-(--role-web)/35 bg-(--role-web)/8 text-(--foreground)",
  },
  {
    stripe: "bg-(--accent)",
    label: "text-(--accent)",
    chip: "border-(--accent)/35 bg-(--accent)/8 text-(--foreground)",
  },
  {
    stripe: "bg-(--role-creative)",
    label: "text-(--role-creative)",
    chip: "border-(--role-creative)/35 bg-(--role-creative)/8 text-(--foreground)",
  },
];

const toolkitListPattern = /^- \*\*([^*]+):\*\*\s*(.+)$/gm;
const skillSplitPattern = /,\s*/;

const cardShell =
  "relative overflow-hidden border border-(--index-divider) bg-surface-subtle";

export function parseToolkitCategories(content: string): ToolkitCategory[] {
  const categories: ToolkitCategory[] = [];

  for (const match of content.matchAll(toolkitListPattern)) {
    const title = match[1]?.trim();
    const skillsRaw = match[2]?.trim();
    if (!(title && skillsRaw)) {
      continue;
    }

    categories.push({
      title,
      skills: skillsRaw
        .split(skillSplitPattern)
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  }

  return categories;
}

function sectionId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ToolkitPillar({
  category,
  style,
}: {
  category: ToolkitCategory;
  style: PillarStyle;
}) {
  return (
    <div className="flex flex-col border border-(--index-divider) bg-surface-panel">
      <div className={`h-0.5 w-full ${style.stripe}`} />
      <div className="p-5 md:p-6">
        <h3
          className={`mb-4 font-mono text-[10px] uppercase tracking-widest ${style.label}`}
        >
          {category.title}
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {category.skills.map((skill) => (
            <li key={skill}>
              <span
                className={`inline-block border px-2 py-1 font-mono text-[10px] leading-snug tracking-wide ${style.chip}`}
              >
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AboutToolkitSection({
  section,
  index,
}: {
  section: AboutSection;
  index: number;
}) {
  const categories = parseToolkitCategories(section.content);

  return (
    <article
      className={`${cardShell} scroll-mt-24 border-(--role-audio)/35 border-t-2 px-5 py-6 md:scroll-mt-28 md:px-6 md:py-8`}
      id={sectionId(section.label)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 right-5 select-none font-mono text-(--role-audio)/20 text-3xl leading-none tracking-tighter md:top-5 md:right-6 md:text-4xl"
      >
        {String(index).padStart(2, "0")}
      </span>
      <header className="relative mb-5 md:mb-6">
        <p className="font-mono text-(--role-audio) text-[11px] uppercase tracking-widest">
          {section.label}
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {categories.map((category, pillarIndex) => (
          <ToolkitPillar
            category={category}
            key={category.title}
            style={PILLAR_STYLES[pillarIndex] ?? PILLAR_STYLES[2]}
          />
        ))}
      </div>
    </article>
  );
}
