"use client";

import Image from "next/image";
import type { Project, ProjectListBadge } from "@/lib/content";
import {
  pressMentions,
  primaryAward,
  projectHasNationalArtsAward,
} from "@/lib/credentials";
import { getProjectCover } from "@/lib/project-cover";
import {
  CATEGORY_LABELS,
  type ProjectCategory,
  ROLE_STYLES,
} from "@/lib/roles";
import {
  audioDeveloperProductLine,
  aylesimDevicesSlug,
  contactAvailability,
  contactEmail,
  contactLinks,
  resumeHref,
  resumeLabel,
  webDeveloperStack,
} from "@/lib/site";

interface CategoryColumn {
  id: ProjectCategory;
  proof?: string;
  eyebrow: string;
  description: string;
  stack?: string;
  resumeHref?: string;
}

const SELECTED_SLUGS = [
  "birds",
  "planetary-compendium",
  "tedx-barletta",
] as const;

const PRIMARY_AUDIO_SLUGS = new Set(["birds", "knob-studio"]);

const PRACTICE_COLUMNS: CategoryColumn[] = [
  {
    id: "devices",
    proof: audioDeveloperProductLine,
    eyebrow:
      "Tools for composing and performing: rule systems, mappings, constraints, interfaces that stay playable while they generate variation.",
    description:
      "I build Max/MSP instruments and Ableton Live devices as playable systems: mappable, generative, precise enough for performance, open enough for misuse.",
  },
  {
    id: "web-interactive",
    eyebrow:
      "Web interfaces as problem-solving: sites, editorial systems, archives, and browser-based tools built around the shape of the content.",
    description:
      "I ship production sites and editorial systems for cultural organizations and research teams: scrollytelling, data-heavy interfaces, community platforms, and browser-based tools where structure and interaction need to hold up under real use.",
    stack: webDeveloperStack,
    resumeHref,
  },
  {
    id: "installations",
    eyebrow:
      "Software for situations in space: installations, AV systems, live visuals, sensors, timing, and behavior that has to hold up in front of people.",
    description:
      "I develop installations, AV performances, and digital artworks where software becomes part of a room: timing, sound, bodies, sensors, attention.",
  },
  {
    id: "community",
    eyebrow:
      "Platforms and networks where people meet around shared practice: directories, events, and tools that keep a scene legible and connected.",
    description:
      "I build community-facing systems for practitioners: member directories, event coordination, and lightweight infrastructure that helps people find each other and keep working together.",
  },
];

function categoryProjects(projects: Project[], category: ProjectCategory) {
  return projects.filter(
    (project) =>
      project.category === category && project.slug !== aylesimDevicesSlug
  );
}

function selectedProjects(projects: Project[]) {
  return SELECTED_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug)
  ).filter((project): project is Project => Boolean(project));
}

function ProjectListBadgeItem({
  badge,
  hidePrefix,
  className,
}: {
  badge: ProjectListBadge;
  hidePrefix?: boolean;
  className?: string;
}) {
  const linkClass =
    "font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)/55";
  const label = <>↗ {badge.label.toUpperCase()}</>;

  return (
    <span
      className={`flex flex-col ${hidePrefix ? "-mt-2" : "gap-0.5"} ${className ?? ""}`}
    >
      {badge.prefix && !hidePrefix ? (
        <span className="font-mono text-(--text-muted) text-[10px] normal-case tracking-wide">
          {badge.prefix}
        </span>
      ) : null}
      {badge.url ? (
        <a
          className={linkClass}
          href={badge.url}
          onClick={(e) => e.stopPropagation()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      ) : (
        <span className={linkClass}>{label}</span>
      )}
    </span>
  );
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
  const cover = getProjectCover(project);
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
          {CATEGORY_LABELS[category]}
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
  const hasAward = projectHasNationalArtsAward(project);
  const isPrimaryAudio = PRIMARY_AUDIO_SLUGS.has(project.slug);
  return (
    <button
      aria-label={`Open ${project.title}`}
      className="group micro-divider-top grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 py-4 text-left first:bg-none md:grid-cols-[1fr_auto_1rem]"
      onClick={() => onProjectClick(project.slug)}
      type="button"
    >
      <span className="flex flex-col gap-1">
        <span
          className={`leading-snug tracking-tight transition-colors group-hover:text-(--accent) ${
            isPrimaryAudio
              ? "text-(--foreground) text-lg md:text-xl"
              : "text-(--foreground) text-base"
          }`}
        >
          {project.title}
        </span>
        {project.listTagline && (
          <span className="text-(--text-muted) text-sm leading-relaxed md:text-base">
            {project.listTagline}
          </span>
        )}
        {project.listBadges.length > 0 && (
          <span className="mt-0.5 flex flex-col gap-2.5">
            {project.listBadges.map((badge, index) => {
              const previous = project.listBadges[index - 1];
              const hidePrefix =
                index > 0 &&
                Boolean(badge.prefix) &&
                badge.prefix === previous?.prefix;
              return (
                <ProjectListBadgeItem
                  badge={badge}
                  hidePrefix={hidePrefix}
                  key={badge.url ?? badge.label}
                />
              );
            })}
          </span>
        )}
        {project.workScope && project.workScope !== "commercial" && (
          <span className="font-mono text-(--foreground)/45 text-[10px] uppercase tracking-widest">
            {project.workScope}
          </span>
        )}
        {hasAward && (
          <span className="font-mono text-(--accent) text-[10px] uppercase tracking-widest">
            MUR · National Arts Award · 1st prize
          </span>
        )}
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
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-8">
      <section className="grid items-start gap-10 border-(--index-divider) border-b border-dotted py-12 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>
          <p className="mb-5 font-mono text-xs tracking-widest">
            <span className="text-(--accent) uppercase">
              Alessandro Miracapillo /{" "}
            </span>
            <span className="text-(--accent)">aylesim</span>
            <span className="text-(--text-muted)"> · </span>
            <span className="text-(--text-muted) uppercase">Berlin</span>
          </p>
          <h1 className="max-w-5xl font-normal text-4xl leading-[0.98] tracking-tight md:text-7xl">
            I design and program systems where sound, interfaces, and human
            behavior meet.
          </h1>
        </div>
        <p className="max-w-xl text-(--text-muted) text-base leading-relaxed md:self-end md:text-lg">
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
        {PRACTICE_COLUMNS.map((column) => {
          const styles = ROLE_STYLES[column.id];
          const items = categoryProjects(projects, column.id);
          return (
            <div
              className="grid gap-10 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.52fr_0.48fr] md:gap-16 md:py-20"
              id={column.id}
              key={column.id}
            >
              <div className={`border-t-2 pt-5 ${styles.borderClass}`}>
                <p
                  className={`mb-5 font-mono text-[11px] uppercase tracking-widest ${styles.labelClass}`}
                >
                  {CATEGORY_LABELS[column.id]}
                </p>
                <p className="mb-4 max-w-md text-2xl leading-[1.15] tracking-tight md:text-3xl">
                  {column.eyebrow}
                </p>
                <p className="max-w-md text-(--text-muted) text-sm leading-relaxed">
                  {column.description}
                </p>
                {column.proof ? (
                  <p className="mt-4 max-w-md text-(--text-muted) text-sm leading-snug">
                    {column.proof}
                  </p>
                ) : null}
                {column.stack ? (
                  <p className="mt-5 max-w-md font-mono text-(--text-muted) text-[10px] uppercase leading-relaxed tracking-widest">
                    {column.stack}
                  </p>
                ) : null}
                {column.resumeHref ? (
                  <a
                    className="mt-4 inline-block font-mono text-(--role-web) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                    download
                    href={column.resumeHref}
                  >
                    {resumeLabel} ↗
                  </a>
                ) : null}
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
        <div>
          <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
            Recognition
          </p>
          <p className="mt-4 max-w-xs text-(--text-muted) text-sm leading-relaxed">
            State-backed award for installation work, plus press on audio tools.
          </p>
        </div>
        <div className="space-y-10">
          <div className="border-(--accent)/35 border-t-2 pt-5">
            <p className="mb-2 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
              {primaryAward.issuer}
            </p>
            <p className="text-2xl leading-snug tracking-tight md:text-3xl">
              {primaryAward.headline}
            </p>
            <p className="mt-2 max-w-2xl text-(--text-muted) text-base leading-relaxed">
              {primaryAward.title} — {primaryAward.subtitle} (
              {primaryAward.year}
              ).
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                className="font-mono text-(--foreground) text-[10px] uppercase tracking-widest transition-colors hover:text-(--accent)"
                onClick={() => onProjectClick(primaryAward.projectSlug)}
                type="button"
              >
                Awarded work:{" "}
                {projects.find((p) => p.slug === primaryAward.projectSlug)
                  ?.title ?? "Please Set a Password"}{" "}
                →
              </button>
              <a
                className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                href={primaryAward.externalHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {primaryAward.externalLabel} ↗
              </a>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
              Press
            </p>
            {pressMentions.map((mention) => {
              const related = mention.projectSlug
                ? projects.find((p) => p.slug === mention.projectSlug)
                : undefined;
              return (
                <div
                  className="micro-divider-top grid gap-2 py-4 first:bg-none md:grid-cols-[1fr_auto]"
                  key={mention.href}
                >
                  <div>
                    <a
                      className="text-base leading-snug tracking-tight transition-colors hover:text-(--accent)"
                      href={mention.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="text-(--foreground)">
                        {mention.outlet}
                      </span>
                      <span className="text-(--text-muted)">
                        {" "}
                        — {mention.title}
                      </span>
                    </a>
                    {related && (
                      <button
                        className="mt-2 block font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                        onClick={() => onProjectClick(related.slug)}
                        type="button"
                      >
                        Related project: {related.title} →
                      </button>
                    )}
                  </div>
                  {mention.year && (
                    <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:text-right">
                      {mention.year}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          Contact
        </p>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-(--text-muted) text-sm leading-relaxed">
              {contactAvailability}
            </p>
            <a
              className="text-2xl leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-4xl"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <a
              className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
              download
              href={resumeHref}
            >
              {resumeLabel}
            </a>
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
