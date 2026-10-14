import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { getAllContent } from "@/lib/content";
import { type ProjectSection, projectSection } from "@/lib/project-routes";

export function projectParams(section: ProjectSection) {
  return getAllContent()
    .projects.filter((project) => projectSection(project) === section)
    .map((project) => ({ slug: project.slug }));
}

export async function renderProject(
  section: ProjectSection,
  params: Promise<{ slug: string }>
) {
  const { slug } = await params;
  const content = getAllContent();
  const project = content.projects.find(
    (entry) => entry.slug === slug && projectSection(entry) === section
  );
  if (!project) {
    notFound();
  }
  return <ProjectPage content={content} project={project} />;
}
