import Image from "next/image";
import { LazyVideo } from "@/components/lazy-video";
import { Markdown } from "@/components/markdown";
import type { Project, SiteConfig } from "@/lib/content";
import { projectStills } from "@/lib/project-cover";

export function ProjectDetail({
  slug,
  projects,
  site,
}: {
  slug: string;
  projects: Project[];
  site: SiteConfig;
}) {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) {
    return null;
  }
  const stills = projectStills(project);
  const videos = project.videos ?? [];
  let lead = <Markdown>{"[needs: project image]"}</Markdown>;
  if (videos[0]) {
    lead = <LazyVideo video={videos[0]} />;
  } else if (stills[0]) {
    lead = (
      <Image
        alt={project.imageAlt ?? "[needs alt text]"}
        height={1000}
        priority
        sizes="(max-width: 800px) 100vw, 960px"
        src={stills[0]}
        width={1600}
      />
    );
  }
  return (
    <article className="project-prose">
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      {lead}
      <Markdown>{project.description}</Markdown>
      {videos.slice(1).map((video) => (
        <LazyVideo key={video.url} video={video} />
      ))}
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
      <p>
        <a href={`mailto:${site.contactEmail}`}>Email</a> ·{" "}
        <a href={site.resumeHref}>{site.resumeLabel}</a>
      </p>
    </article>
  );
}
