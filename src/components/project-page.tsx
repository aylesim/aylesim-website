import Link from "next/link";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { PageFrame } from "@/components/site/site-chrome";
import type { Project, SiteContent } from "@/lib/content";
import { projectSection } from "@/lib/project-routes";

export function ProjectPage({
  project,
  content,
}: {
  project: Project;
  content: SiteContent;
}) {
  const section = projectSection(project) ?? "work";
  return (
    <PageFrame
      brand={content.home.brand}
      contactEmail={content.site.contactEmail}
      current="work"
    >
      <main className="project-page">
        <nav aria-label="Breadcrumb">
          <Link href={`/${section}`}>{section}</Link> / {project.title}
        </nav>
        <ProjectDetail
          projects={[project]}
          site={content.site}
          slug={project.slug}
        />
      </main>
    </PageFrame>
  );
}
