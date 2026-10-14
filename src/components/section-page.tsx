import Link from "next/link";
import { Suspense } from "react";
import ArchiveShell from "@/components/home/archive-shell";
import { Markdown } from "@/components/markdown";
import { getAllContent } from "@/lib/content";
import { editorial } from "@/lib/editorial";
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
          <a href="#section-copy">Read about {title.toLowerCase()}</a>
        </section>
        <article className="section-copy" id="section-copy">
          <h2>About {title.toLowerCase()}</h2>
          {section === "work" ? (
            projects
              .filter((project) =>
                [
                  "eduardo-pesole",
                  "max-berlin-network-site",
                  "glossia",
                  "shapellm",
                ].includes(project.slug)
              )
              .map((project) => (
                <div key={project.slug}>
                  <h2>
                    <Link href={projectHref(project)}>{project.title}</Link>
                  </h2>
                  <Markdown>{project.description}</Markdown>
                </div>
              ))
          ) : (
            <Markdown>{editorial(section)}</Markdown>
          )}
          {section === "instruments" ? (
            <Markdown>{editorial("instrument-blurbs")}</Markdown>
          ) : null}
        </article>
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
