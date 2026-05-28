"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryProjectRotator } from "@/components/home/category-project-rotator";
import { ProjectTags } from "@/components/home/project-tags";
import type { Project, ProjectListBadge } from "@/lib/content";
import {
  pressMentions,
  primaryAward,
  projectHasNationalArtsAward,
} from "@/lib/credentials";
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
  maxBerlinCommunityProof,
  maxBerlinCommunitySlug,
  maxBerlinNetworkUrl,
  resumeHref,
  resumeLabel,
  webDeveloperStack,
} from "@/lib/site";

interface FeaturedCard {
  badge: string;
  slug: string;
  title: string;
  tags: readonly string[];
  description: string;
  cover: string;
  rotation: number;
  imageOnRight?: boolean;
}

const FEATURED_CARDS: FeaturedCard[] = [
  {
    badge: "BERGGRUEN INSTITUTE × DARK MATTER LABS",
    slug: "planetary-compendium",
    title: "Planetary Compendium",
    tags: ["Frontend Architecture", "Data Visualization", "React / TypeScript"],
    description:
      "A data-dense research interface built for high-throughput state management and render performance across thousands of concurrent heterogeneous data points.",
    cover: "/planetary.png",
    rotation: -1.5,
    imageOnRight: false,
  },
  {
    badge: "1ST PRIZE: NATIONAL ART AWARD (MUR)",
    slug: "please-set-a-password",
    title: "please set a password",
    tags: ["Media Art", "Spatial Interaction", "System Design"],
    description:
      "Award-winning installation engineering a bridge between physical security rituals and digital authentication. Designed for robust real-time reliability in live public-facing contexts.",
    cover: "/tw2.jpg",
    rotation: 1.8,
    imageOnRight: true,
  },
  {
    badge: "PUBLISHED BY: ISOTONIK STUDIOS",
    slug: "knob-studio",
    title: "Knob Studio",
    tags: ["UI/UX Design", "Audio Engineering", "DSP / MaxMSP"],
    description:
      "Commercial Max for Live instrument optimized for sub-5ms parameter response and zero-latency UI feedback. Actively maintained for 3,600+ musicians worldwide.",
    cover: "/knobstudio.png",
    rotation: -2,
    imageOnRight: false,
  },
];

interface CategoryColumn {
  id: ProjectCategory;
  proof?: string;
  eyebrow: string;
  description: string;
  stack?: string;
  resumeHref?: string;
}

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
    proof: maxBerlinCommunityProof,
    eyebrow:
      "I co-founded, curate, and carry forward Max Berlin Network, a Berlin scene for Max/MSP and creative audio practice.",
    description:
      "Alongside the site and newsletter, I keep the meetups running: rhythm, format, hosting, venues, and communication with other core organizers. The goal is reliable peer learning in the room, not marketing.",
  },
];

function categoryProjects(projects: Project[], category: ProjectCategory) {
  return projects.filter(
    (project) =>
      project.category === category && project.slug !== aylesimDevicesSlug
  );
}

function columnCarouselProjects(
  projects: Project[],
  columnId: ProjectCategory
) {
  if (columnId === "community") {
    return [];
  }
  return categoryProjects(projects, columnId);
}

function FeaturedWorkCard({
  card,
  index,
  onProjectClick,
}: {
  card: FeaturedCard;
  index: number;
  onProjectClick: (slug: string) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imgPanel = (
    <div className="relative aspect-4/3 overflow-hidden md:aspect-auto md:min-h-[480px]">
      <div
        className="fw-card-img absolute inset-0"
        style={{ "--card-rotation": card.rotation } as React.CSSProperties}
      >
        <Image
          alt={card.title}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          src={card.cover}
        />
      </div>
    </div>
  );

  const textPanel = (
    <div className="flex flex-col justify-between p-8 md:p-10 lg:p-14">
      <div>
        <p className="mb-6 font-mono text-(--text-muted) text-[9px] uppercase tracking-widest">
          [ {card.badge} ]
        </p>
        <p className="text-3xl leading-[1.05] tracking-tight transition-colors group-hover:text-(--accent) md:text-4xl lg:text-5xl">
          {card.title}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              className="border border-(--index-divider) px-2.5 py-1 font-mono text-(--text-muted) text-[9px] uppercase tracking-widest"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-sm text-(--text-muted) text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
      <span className="mt-8 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors group-hover:text-(--foreground)">
        View project →
      </span>
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(3.5rem)",
        transition: `opacity 0.7s ease ${index * 130}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 130}ms`,
      }}
    >
      <button
        className="fw-card group w-full cursor-pointer overflow-hidden border border-(--index-divider) text-left"
        onClick={() => onProjectClick(card.slug)}
        type="button"
      >
        <div
          className={`grid ${card.imageOnRight ? "md:grid-cols-[0.9fr_1.1fr]" : "md:grid-cols-[1.1fr_0.9fr]"}`}
        >
          {card.imageOnRight ? (
            <>
              <div>{textPanel}</div>
              <div>{imgPanel}</div>
            </>
          ) : (
            <>
              <div>{imgPanel}</div>
              <div>{textPanel}</div>
            </>
          )}
        </div>
      </button>
    </div>
  );
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

function CommunityHighlight({
  onProjectClick,
}: {
  onProjectClick: (slug: string) => void;
}) {
  const styles = ROLE_STYLES.community;
  return (
    <div className="micro-divider-top pt-3">
      <div className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-3 py-4 first:bg-none md:grid-cols-[1fr_auto_1rem]">
        <div className="flex flex-col gap-2">
          <a
            className="text-(--foreground) text-lg leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-xl"
            href={maxBerlinNetworkUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Max Berlin Network
          </a>
          <p className="max-w-md text-(--text-muted) text-sm leading-relaxed md:text-base">
            Co-founder · curator · ongoing meetup series
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              href={maxBerlinNetworkUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              ↗ maxberlin.network
            </a>
            <button
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              onClick={() => onProjectClick(maxBerlinCommunitySlug)}
              type="button"
            >
              Site case study →
            </button>
            <a
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              href="/about"
            >
              Meetups & format →
            </a>
          </div>
        </div>
        <span
          className={`hidden font-mono text-[10px] uppercase tracking-widest md:block ${styles.labelClass}`}
        >
          2025–ongoing
        </span>
        <span className="text-right text-(--text-muted) text-sm opacity-35 md:col-start-3">
          ↗
        </span>
      </div>
    </div>
  );
}

function ProjectLink({
  project,
  onProjectClick,
  onHover,
}: {
  project: Project;
  onProjectClick: (slug: string) => void;
  onHover?: (slug: string | null) => void;
}) {
  const meta = [
    project.year,
    project.menuLabel?.toLowerCase() === "max4live"
      ? undefined
      : project.menuLabel,
  ]
    .filter(Boolean)
    .join(" / ");
  const hasAward = projectHasNationalArtsAward(project);
  const isPrimaryAudio = PRIMARY_AUDIO_SLUGS.has(project.slug);
  return (
    <button
      aria-label={`Open ${project.title}`}
      className="group micro-divider-top grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 py-4 text-left first:bg-none md:grid-cols-[1fr_auto_1rem]"
      onClick={() => onProjectClick(project.slug)}
      onMouseEnter={() => onHover?.(project.slug)}
      onMouseLeave={() => onHover?.(null)}
      type="button"
    >
      <span className="flex flex-col gap-1">
        <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span
            className={`leading-snug tracking-tight transition-colors group-hover:text-(--accent) ${
              isPrimaryAudio
                ? "text-(--foreground) text-lg md:text-xl"
                : "text-(--foreground) text-base"
            }`}
          >
            {project.title}
          </span>
          {project.listTagline ? (
            <span className="text-(--text-muted) text-xs leading-snug md:text-sm">
              {project.listTagline}
            </span>
          ) : null}
        </span>
        <ProjectTags
          category={project.category}
          className="mt-0.5"
          tags={project.tags}
        />
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

function PracticeColumnSection({
  column,
  items,
  carouselProjects,
  onProjectClick,
}: {
  column: CategoryColumn;
  items: Project[];
  carouselProjects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const styles = ROLE_STYLES[column.id];
  const isWebInteractive = column.id === "web-interactive";
  const showRotator = column.id !== "community";

  const headerText = (
    <>
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
    </>
  );

  const rotator = showRotator ? (
    <CategoryProjectRotator
      activeSlug={hoveredSlug}
      className={isWebInteractive ? "mt-8 md:mt-0" : undefined}
      layout={isWebInteractive ? "aside" : "stacked"}
      onProjectClick={onProjectClick}
      projects={carouselProjects}
    />
  ) : null;

  const headerBlock = isWebInteractive ? (
    <div className="grid gap-8 md:grid-cols-[0.52fr_0.48fr] md:items-center md:gap-x-16 md:gap-y-0">
      <div className={`min-w-0 border-t-2 pt-5 ${styles.borderClass}`}>
        {headerText}
      </div>
      <div className="flex w-full items-center justify-center md:px-6 md:pt-5 lg:px-10">
        {rotator}
      </div>
    </div>
  ) : (
    <div className={`border-t-2 pt-5 ${styles.borderClass}`}>
      {headerText}
      {rotator}
    </div>
  );

  const listBlock = (
    <div
      className={`micro-divider-top pt-3 ${isWebInteractive ? "mt-10" : ""}`}
    >
      {column.id === "community" ? (
        <CommunityHighlight onProjectClick={onProjectClick} />
      ) : null}
      {items.map((project) => (
        <ProjectLink
          key={project.slug}
          onHover={setHoveredSlug}
          onProjectClick={onProjectClick}
          project={project}
        />
      ))}
    </div>
  );

  if (isWebInteractive) {
    return (
      <div
        className="border-(--index-divider) border-b border-dotted py-14 md:py-20"
        id={column.id}
      >
        {headerBlock}
        {listBlock}
      </div>
    );
  }

  return (
    <div
      className="grid gap-10 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.52fr_0.48fr] md:gap-16 md:py-20"
      id={column.id}
    >
      {headerBlock}
      {listBlock}
    </div>
  );
}

export function HomeIdentity({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const carouselByColumn = useMemo(
    () =>
      Object.fromEntries(
        PRACTICE_COLUMNS.map((column) => [
          column.id,
          columnCarouselProjects(projects, column.id),
        ])
      ) as Record<ProjectCategory, Project[]>,
    [projects]
  );

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
          I design and program stable digital systems where code, sound, and
          space converge. My practice bridges the rigor of{" "}
          <strong className="font-normal text-(--foreground)">
            software engineering
          </strong>{" "}
          with the research of{" "}
          <strong className="font-normal text-(--foreground)">media art</strong>
          . I develop complex frontend architectures (React, TypeScript),
          applying the same obsession for performance, latency, and state
          management that I use to engineer spatial installations, generative
          systems, and audio tools (Max for Live) used by thousands of
          musicians. Whether building a web ecosystem or a sensory interaction,
          my goal is to govern technical complexity to create solid logical and
          aesthetic behaviors.
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

      <section className="border-(--index-divider) border-b border-dotted py-14 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
            Selected works
          </p>
          <p className="max-w-xs text-(--text-muted) text-sm leading-relaxed">
            Frontend engineering, media art, and audio product design.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          {FEATURED_CARDS.map((card, index) => (
            <FeaturedWorkCard
              card={card}
              index={index}
              key={card.slug}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        {PRACTICE_COLUMNS.map((column) => (
          <PracticeColumnSection
            carouselProjects={carouselByColumn[column.id]}
            column={column}
            items={categoryProjects(projects, column.id)}
            key={column.id}
            onProjectClick={onProjectClick}
          />
        ))}
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
              {primaryAward.title}, {primaryAward.subtitle} ({primaryAward.year}
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
                        , {mention.title}
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
