import Link from "next/link";
import { Suspense } from "react";
import ArchiveShell from "@/components/home/archive-shell";
import { getAllContent } from "@/lib/content";
import {
  type ProjectSection,
  projectHref,
  projectSection,
  sortProjects,
} from "@/lib/project-routes";

const filters = {
  work: "web-interactive",
  instruments: "devices",
  art: "installations",
} as const;
const intros = {
  work: "Web projects, client sites and proofs of concept.",
  instruments: "My label for Max for Live devices for Ableton Live.",
  art: "Installations and live audiovisual work.",
};

export function SectionPage({ section }: { section: ProjectSection }) {
  const content = getAllContent();
  const projects = sortProjects(
    content.projects.filter((project) => projectSection(project) === section)
  );
  const title =
    section === "instruments"
      ? "Instruments"
      : section.charAt(0).toUpperCase() + section.slice(1);
  const filter = filters[section];
  return (
    <Suspense>
      <ArchiveShell content={content} initialFilter={filter}>
        <section className="stage-intro">
          <h1>{title}</h1>
          <p>{intros[section]}</p>
        </section>
        <nav aria-label={`${title} projects`} className="sr-only">
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={projectHref(project)}>
                  {project.title}, {project.year}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ArchiveShell>
    </Suspense>
  );
}
