import Image from "next/image";
import { LazyVideo } from "@/components/lazy-video";
import { Markdown, NeedsInline } from "@/components/markdown";
import type { Project, SiteConfig } from "@/lib/content";
import { projectStills } from "@/lib/project-cover";

const sectionBoundary = /\n(?=## )/;
const sectionTitle = /^## ([^\n]+)\n*/;

export function ProjectDetail({
  project,
  site,
}: {
  project: Project;
  site: SiteConfig;
}) {
  const stills = projectStills(project);
  const videos = project.videos ?? [];
  const image = stills[0] ? (
    <Image
      alt={project.imageAlt ?? "[needs alt text]"}
      height={1000}
      priority
      sizes="(max-width: 800px) 100vw, 960px"
      src={stills[0]}
      width={1600}
    />
  ) : null;
  let lead = image ?? <Markdown>{"[needs: project image]"}</Markdown>;
  if (videos[0]) {
    lead = <LazyVideo poster={image} video={videos[0]} />;
  }
  const fields = [
    ["Role", project.secondaryMeta],
    ["Credits", project.credits],
    ["Year", project.year],
    ["Status", project.status],
    ["Stack", project.tags.join(", ")],
    ["Client or context", project.client],
  ];
  return (
    <article className="project-prose">
      <header className="project-title">
        <h1>
          <NeedsInline>{project.title}</NeedsInline>
        </h1>
        <p>
          <NeedsInline>{project.summary ?? ""}</NeedsInline>
        </p>
      </header>
      <div className="project-lead">{lead}</div>
      <dl className="project-fields">
        {fields
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <Markdown>{value ?? ""}</Markdown>
              </dd>
            </div>
          ))}
      </dl>
      {project.description.split(sectionBoundary).map((source) => {
        const heading = source.match(sectionTitle)?.[1];
        const body = source.replace(sectionTitle, "").trim();
        return (
          <section className="project-section" key={heading ?? source}>
            {heading ? <h2>{heading}</h2> : null}
            {heading === "Media" ? (
              <>
                <div className="project-gallery">
                  {stills.map((src) => (
                    <Image
                      alt={project.imageAlt ?? "[needs alt text]"}
                      height={1000}
                      key={src}
                      sizes="(max-width: 800px) 100vw, 600px"
                      src={src}
                      width={1600}
                    />
                  ))}
                </div>
                {videos.slice(1).map((video) => (
                  <LazyVideo key={video.url} video={video} />
                ))}
              </>
            ) : null}
            <Markdown>{body}</Markdown>
          </section>
        );
      })}
      <p className="project-contact">
        <a href={`mailto:${site.contactEmail}`}>Email</a> ·{" "}
        <a href={site.resumeHref}>Download CV</a> ·{" "}
        <a href="/portfolio.pdf">Portfolio (PDF)</a>
      </p>
      <Markdown>{"[needs: CV PDF file]"}</Markdown>
    </article>
  );
}
