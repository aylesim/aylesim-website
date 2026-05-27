import { getSiteContentPayload } from "@/lib/content-json";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textBlock(value: string | undefined): string {
  if (!value?.trim()) {
    return "";
  }
  return `<p>${escapeHtml(value)}</p>`;
}

function preBlock(label: string, value: string | undefined): string {
  if (!value?.trim()) {
    return "";
  }
  return `<h3>${escapeHtml(label)}</h3><pre>${escapeHtml(value)}</pre>`;
}

function listBlock(label: string, items: string[]): string {
  if (items.length === 0) {
    return "";
  }
  const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<h3>${escapeHtml(label)}</h3><ul>${list}</ul>`;
}

export function serializeSiteContentHtml(): string {
  const { content, site } = getSiteContentPayload();
  const projectBlocks = content.projects
    .map((project) => {
      const meta = [
        project.year ? `Year: ${project.year}` : null,
        project.primaryMeta.length > 0 ? project.primaryMeta.join(" · ") : null,
        project.secondaryMeta ? `Role: ${project.secondaryMeta}` : null,
        project.workScope ? `Scope: ${project.workScope}` : null,
        project.featured ? "Featured" : null,
      ].filter((line): line is string => Boolean(line));

      const links = [
        project.link
          ? `<p><a href="${escapeHtml(project.link)}">${escapeHtml(project.linkLabel ?? project.link)}</a></p>`
          : "",
        ...(project.videos?.map(
          (video) =>
            `<p><a href="${escapeHtml(video.url)}">${escapeHtml(video.title)}</a></p>`
        ) ?? []),
      ].join("");

      return `<article id="project-${escapeHtml(project.slug)}">
<h2>${escapeHtml(project.title)}</h2>
${meta.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
${links}
${preBlock("Description", project.description)}
${preBlock("More", project.descriptionAfterVideos)}
${listBlock("Highlights", project.highlights)}
</article>`;
    })
    .join("\n");

  const contactLinks = site.contactLinks
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`
    )
    .join("");

  const pressBlocks = site.pressMentions
    .map(
      (mention) =>
        `<li><a href="${escapeHtml(mention.href)}">${escapeHtml(mention.outlet)} — ${escapeHtml(mention.title)} (${escapeHtml(mention.year)})</a></li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aylesim portfolio — machine-readable summary</title>
<meta name="description" content="Structured portfolio data for Alessandro Miracapillo (Aylesim): projects, about, contact, awards, and press.">
</head>
<body>
<main>
<h1>Aylesim portfolio data</h1>
<p>Machine-readable summary of aylesim.com for AI assistants and automated tools.</p>

<section id="about">
<h2>About</h2>
${textBlock(content.about.lede)}
${textBlock(content.about.subtitle)}
${preBlock("Full bio", content.about.body)}
</section>

<section id="projects">
<h2>Projects</h2>
${projectBlocks}
</section>

<section id="site">
<h2>Site</h2>
<p>Email: <a href="mailto:${escapeHtml(site.contactEmail)}">${escapeHtml(site.contactEmail)}</a></p>
<h3>Links</h3>
<ul>${contactLinks}</ul>
<h3>${escapeHtml(site.primaryAward.title)}</h3>
<p>${escapeHtml(site.primaryAward.headline)} — ${escapeHtml(site.primaryAward.subtitle)} (${escapeHtml(site.primaryAward.year)})</p>
<p>${escapeHtml(site.primaryAward.issuer)}</p>
<p><a href="${escapeHtml(site.primaryAward.externalHref)}">${escapeHtml(site.primaryAward.externalLabel)}</a></p>
<h3>Press</h3>
<ul>${pressBlocks}</ul>
</section>
</main>
</body>
</html>`;
}
