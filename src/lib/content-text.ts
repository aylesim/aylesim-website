import { getSiteContentPayload } from "@/lib/content-json";

type AskAiProject = ReturnType<
  typeof getSiteContentPayload
>["content"]["projects"][number];

function projectLines(project: AskAiProject): string[] {
  return [
    "",
    `--- ${project.title} (${project.slug}) ---`,
    project.year ? `Year: ${project.year}` : "",
    project.primaryMeta.length > 0
      ? `Meta: ${project.primaryMeta.join(" · ")}`
      : "",
    project.secondaryMeta ? `Role: ${project.secondaryMeta}` : "",
    project.workScope ? `Scope: ${project.workScope}` : "",
    project.featured ? "Featured: yes" : "",
    project.link ? `Link: ${project.link}` : "",
    "",
    project.description,
    project.descriptionAfterVideos ?? "",
    project.highlights.length > 0
      ? `Highlights:\n- ${project.highlights.join("\n- ")}`
      : "",
  ];
}

export function serializeSiteContentText(): string {
  const { content, site } = getSiteContentPayload();
  const lines = [
    "AYLESIM PORTFOLIO DATA",
    "Machine-readable summary of aylesim.com for AI assistants.",
    "",
    "=== ABOUT ===",
    content.about.lede,
    content.about.subtitle ?? "",
    "",
    content.about.body,
    "",
    "=== PROJECTS ===",
    ...content.projects.flatMap(projectLines),
    "",
    "=== SITE ===",
    `Email: ${site.contactEmail}`,
    "",
    "Links:",
    ...site.contactLinks.map((link) => `- ${link.label}: ${link.href}`),
    "",
    site.primaryAward.title,
    site.primaryAward.headline,
    site.primaryAward.subtitle,
    site.primaryAward.issuer,
    site.primaryAward.externalHref,
    "",
    "Press:",
    ...site.pressMentions.map(
      (mention) =>
        `- ${mention.outlet}: ${mention.title} (${mention.year}) ${mention.href}`
    ),
  ];

  return lines.filter((line) => line !== "").join("\n");
}
