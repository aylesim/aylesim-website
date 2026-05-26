"use client";

import Image from "next/image";
import type { AboutData, Project } from "@/lib/content";
import { type ProjectCategory, ROLE_STYLES } from "@/lib/roles";
import { contactEmail, contactLinks, mentionLinks } from "@/lib/site";

interface RoleColumn {
  id: ProjectCategory;
  label: string;
  eyebrow: string;
  description: string;
}

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const SELECTED_SLUGS = [
  "birds",
  "planetary-compendium",
  "tedx-barletta",
] as const;

const SELECTED_COVERS: Record<(typeof SELECTED_SLUGS)[number], string> = {
  birds: "/Birdsgr.png",
  "planetary-compendium": "/planetary.png",
  "tedx-barletta": "https://img.youtube.com/vi/GJUaN92rx-0/hqdefault.jpg",
};

const ROLES: RoleColumn[] = [
  {
    id: "audio",
    label: "Audio Developer",
    eyebrow:
      "Tools for composing and performing: rule systems, mappings, constraints, interfaces that stay playable while they generate variation.",
    description:
      "I build Max/MSP instruments and Ableton Live devices as playable systems: mappable, generative, precise enough for performance, open enough for misuse.",
  },
  {
    id: "web",
    label: "Web Developer",
    eyebrow:
      "Web interfaces as problem-solving: sites, editorial systems, archives, and browser-based tools built around the shape of the content.",
    description:
      "I build web interfaces that can be websites, editorial systems, or browser-based tools. The stack changes with the problem; the constant is making structure, data, and interaction feel clear.",
  },
  {
    id: "creative",
    label: "Creative Technologist",
    eyebrow:
      "Software for situations in space: installations, AV systems, live visuals, sensors, timing, and behavior that has to hold up in front of people.",
    description:
      "I develop installations, AV performances, and digital artworks where software becomes part of a room: timing, sound, bodies, sensors, attention.",
  },
];

function roleProjects(projects: Project[], category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}

function selectedProjects(projects: Project[]) {
  return SELECTED_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug)
  ).filter((project): project is Project => Boolean(project));
}

function projectCover(project: Project): string {
  if (project.slug in SELECTED_COVERS) {
    return SELECTED_COVERS[project.slug as keyof typeof SELECTED_COVERS];
  }
  if (project.canvasCover) {
    return project.canvasCover;
  }
  if (project.images[0]) {
    return project.images[0];
  }
  const videoUrl = project.videos?.[0]?.url;
  if (videoUrl) {
    const match = videoUrl.match(YOUTUBE_ID_REGEX);
    if (match?.[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
  return "/tw1.jpg";
}

function SelectedWorkCard({
  project,
  onProjectClick,
}: {
  project: Project;
  onProjectClick: (slug: string) => void;
}) {
  const category = project.category;
  const styles = category ? ROLE_STYLES[category] : null;
  const cover = projectCover(project);
  const summary = project.highlights[0] ?? project.secondaryMeta;
  const coverIsRemote = cover.startsWith("http");

  return (
    <button
      className="group flex w-full flex-col text-left"
      onClick={() => onProjectClick(project.slug)}
      type="button"
    >
      <div className="mb-4 w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5">
        <Image
          alt={project.title}
          className="aspect-[4/3] w-full object-cover transition-opacity duration-200 group-hover:opacity-85"
          height={900}
          priority={project.slug === "birds"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={cover}
          unoptimized={coverIsRemote}
          width={1200}
        />
      </div>
      {styles && category && (
        <p
          className={`mb-2 font-mono text-[10px] uppercase tracking-widest ${styles.labelClass}`}
        >
          {ROLES.find((role) => role.id === category)?.label ?? category}
        </p>
      )}
      <span className="text-lg leading-snug tracking-tight transition-colors group-hover:text-(--accent)">
        {project.title}
      </span>
      {summary && (
        <span className="mt-2 line-clamp-2 text-(--text-muted) text-sm leading-relaxed">
          {summary}
        </span>
      )}
      <span className="mt-3 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors group-hover:text-(--foreground)">
        View project
      </span>
    </button>
  );
}

function ProjectLink({
  project,
  onProjectClick,
}: {
  project: Project;
  onProjectClick: (slug: string) => void;
}) {
  const meta = [project.year, project.menuLabel].filter(Boolean).join(" / ");

  return (
    <button
      aria-label={`Open ${project.title}`}
      className="group micro-divider-top grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 py-4 text-left first:bg-none md:grid-cols-[1fr_auto_1rem]"
      onClick={() => onProjectClick(project.slug)}
      type="button"
    >
      <span className="text-(--foreground) text-base leading-snug tracking-tight transition-colors group-hover:text-(--accent)">
        {project.title}
      </span>
      <span className="hidden font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:block">
        {meta}
      </span>
      <span className="text-right text-(--text-muted) text-sm opacity-35 transition-opacity group-hover:opacity-100">
        →
      </span>
      <span className="col-span-2 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:hidden">
        {meta}
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

      <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <div>
          <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
            Selected work
          </p>
          <p className="mt-4 max-w-xs text-(--text-muted) text-sm leading-relaxed">
            Three entry points across audio software, web development, and
            spatial work.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {selectedProjects(projects).map((project) => (
            <SelectedWorkCard
              key={project.slug}
              onProjectClick={onProjectClick}
              project={project}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        {ROLES.map((role) => {
          const styles = ROLE_STYLES[role.id];
          const items = roleProjects(projects, role.id);
          return (
            <div
              className="grid gap-10 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.52fr_0.48fr] md:gap-16 md:py-20"
              id={role.id}
              key={role.id}
            >
              <div className={`border-t-2 pt-5 ${styles.borderClass}`}>
                <p
                  className={`mb-5 font-mono text-[11px] uppercase tracking-widest ${styles.labelClass}`}
                >
                  {role.label}
                </p>
                <p className="max-w-md text-2xl leading-[1.15] tracking-tight md:text-3xl">
                  {role.eyebrow}
                </p>
              </div>
              <div className="micro-divider-top pt-3">
                {items.map((project) => (
                  <ProjectLink
                    key={project.slug}
                    onProjectClick={onProjectClick}
                    project={project}
                  />
                ))}
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
