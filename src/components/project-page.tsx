import Link from "next/link";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { PageFrame } from "@/components/site/site-chrome";
import type { Project, SiteContent } from "@/lib/content";
import {
  projectHref,
  projectSection,
  sortProjects,
} from "@/lib/project-routes";

export function ProjectPage({
  project,
  content,
}: {
  project: Project;
  content: SiteContent;
}) {
  const section = projectSection(project) ?? "work";
  const featured = ["planetary-compendium", "birds", "please-set-a-password"];
  const projects = [
    ...featured.flatMap((slug) =>
      content.projects.filter((entry) => entry.slug === slug)
    ),
    ...sortProjects(
      content.projects.filter((entry) => !featured.includes(entry.slug))
    ),
  ];
  const next =
    project.slug === "planetary-compendium"
      ? projects.find((entry) => entry.slug === "birds")
      : projects[
          (projects.findIndex((entry) => entry.slug === project.slug) + 1) %
            projects.length
        ];
  return (
    <PageFrame
      brand={content.home.brand}
      contactEmail={content.site.contactEmail}
      current={section}
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
        {next ? (
          <nav aria-label="Next project" className="project-next">
            <Link href={projectHref(next)}>Next project: {next.title}</Link>
            <Link href="/">Back to stage</Link>
          </nav>
        ) : null}
      </main>
    </PageFrame>
  );
}
