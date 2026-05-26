"use client";

import type { AboutData, Project } from "@/lib/content";
import { type ProjectCategory, ROLE_STYLES } from "@/lib/roles";
import { contactEmail, contactLinks, mentionLinks } from "@/lib/site";

interface RoleColumn {
  id: ProjectCategory;
  label: string;
  eyebrow: string;
  description: string;
}

const ROLES: RoleColumn[] = [
  {
    id: "audio",
    label: "Audio Developer",
    eyebrow: "Instruments, devices, performance logic",
    description:
      "I build Max/MSP instruments and Ableton Live devices as playable systems: mappable, generative, precise enough for performance, open enough for misuse.",
  },
  {
    id: "web",
    label: "Web Developer",
    eyebrow: "Sites, tools, interfaces, different stacks",
    description:
      "I build web interfaces that can be websites, editorial systems, or browser-based tools. The stack changes with the problem; the constant is making structure, data, and interaction feel clear.",
  },
  {
    id: "creative",
    label: "Creative Technologist",
    eyebrow: "Installations, AV systems, spatial behavior",
    description:
      "I develop installations, AV performances, and digital artworks where software becomes part of a room: timing, sound, bodies, sensors, attention.",
  },
];

function roleProjects(projects: Project[], category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

function ProjectLink({
  project,
  onProjectClick,
}: {
  project: Project;
  onProjectClick: (slug: string) => void;
}) {
  return (
    <button
      className="group grid w-full grid-cols-[1fr_auto] gap-x-4 border-(--index-divider) border-t border-dotted py-3 text-left transition-colors hover:text-(--foreground)"
      onClick={() => onProjectClick(project.slug)}
      type="button"
    >
      <span className="text-(--foreground) text-base leading-snug">
        {project.title}
      </span>
      <span className="pt-1 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors group-hover:text-(--foreground)">
        Open
      </span>
      <span className="col-span-2 mt-1 text-(--text-muted) text-xs leading-relaxed">
        {[project.year, project.menuLabel, project.secondaryMeta]
          .filter(Boolean)
          .join(" / ")}
      </span>
    </button>
  );
}

export function HomeIdentity({
  projects,
  about,
  onProjectClick,
}: {
  projects: Project[];
  about: AboutData;
  onProjectClick: (slug: string) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-8">
      <section className="grid min-h-[calc(100dvh-5rem)] items-end gap-10 border-(--index-divider) border-b border-dotted py-12 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>
          <p className="mb-5 font-mono text-(--accent) text-xs uppercase tracking-widest">
            Alessandro Miracapillo / Aylesim / Berlin
          </p>
          <h1 className="max-w-5xl font-normal text-4xl leading-[0.98] tracking-tight md:text-7xl">
            I design and program systems where sound, interfaces, and human
            behavior meet.
          </h1>
        </div>
        <p className="max-w-xl text-(--text-muted) text-base leading-relaxed md:text-lg">
          My work moves between audio software, web platforms, and spatial
          experiences. Different outputs, same problem: make complex behavior
          understandable enough to perform, use, or inhabit.
        </p>
      </section>

      <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-24">
        <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          How I work
        </p>
        <div className="max-w-4xl space-y-7">
          <p className="text-2xl leading-snug tracking-tight md:text-4xl">
            I do not treat a project as a surface to style. I treat it as a set
            of relations: inputs, constraints, timing, feedback, misuse,
            attention.
          </p>
          <p className="max-w-3xl text-(--text-muted) text-base leading-relaxed md:text-lg">
            I move between media because the underlying questions are often the
            same: what needs to be visible, what behavior should be exposed,
            what should stay quiet, and where a user or performer needs
            leverage.
          </p>
          <p className="max-w-3xl text-(--text-muted) text-base leading-relaxed md:text-lg">
            I like projects where the hard part is not choosing a technology,
            but understanding the shape of the system: what should be fixed,
            what should remain alive, and how much complexity a person can hold
            while still feeling in control.
          </p>
        </div>
      </section>

      <section className="flex flex-col">
        {ROLES.map((role) => {
          const styles = ROLE_STYLES[role.id];
          const items = roleProjects(projects, role.id);
          return (
            <div
              className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20"
              id={role.id}
              key={role.id}
            >
              <div className={`border-t-2 pt-4 ${styles.borderClass}`}>
                <p
                  className={`mb-3 font-mono text-xs uppercase tracking-widest ${styles.labelClass}`}
                >
                  {role.label}
                </p>
                <p className="max-w-xs text-(--text-muted) text-sm leading-relaxed">
                  {role.eyebrow}
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <p className="text-xl leading-snug tracking-tight md:text-2xl">
                  {role.description}
                </p>
                <div>
                  {items.map((project) => (
                    <ProjectLink
                      key={project.slug}
                      onProjectClick={onProjectClick}
                      project={project}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          Notes
        </p>
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-4">
            <p className="max-w-md text-(--text-muted) text-sm leading-relaxed">
              A few references and contexts around the work.
            </p>
            <div className="space-y-2 text-(--text-muted) text-sm leading-relaxed">
              <p>{about.award}</p>
              <p>{about.publication}</p>
              <p>{about.exhibitions.join(" / ")}</p>
            </div>
          </div>
          <div>
            {mentionLinks.map((link) => (
              <a
                className="block border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          Contact
        </p>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <a
            className="text-2xl leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-4xl"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          <div className="grid grid-cols-2 gap-x-6">
            {contactLinks.map((link) => (
              <a
                className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
