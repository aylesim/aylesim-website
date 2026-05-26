"use client";

import Image from "next/image";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import { ROLE_STYLES } from "@/lib/roles";

export function ProjectPreview({
  project,
  placement,
}: {
  project: Project;
  placement: "home" | "sidebar";
}) {
  const cover = getProjectCover(project);
  const coverIsRemote = cover.startsWith("http");
  const meta = [project.year, project.menuLabel].filter(Boolean).join(" / ");
  const categoryStyles = project.category
    ? ROLE_STYLES[project.category]
    : null;
  const summary = project.highlights[0] ?? project.secondaryMeta;

  const positionClass =
    placement === "sidebar"
      ? "md:left-[calc(24rem+2.5rem)] md:top-28 md:max-w-[14rem]"
      : "md:right-8 md:top-1/2 md:-translate-y-1/2 md:max-w-[18rem]";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-30 hidden w-64 md:block ${positionClass}`}
    >
      <div className="overflow-hidden border border-(--index-divider) bg-(--foreground)/5">
        <Image
          alt=""
          className="aspect-[4/3] w-full object-cover"
          height={540}
          sizes="18rem"
          src={cover}
          unoptimized={coverIsRemote}
          width={720}
        />
      </div>
      {categoryStyles && project.category && (
        <p
          className={`mt-3 font-mono text-[10px] uppercase tracking-widest ${categoryStyles.labelClass}`}
        >
          {project.menuLabel ?? project.category}
        </p>
      )}
      <p className="mt-2 text-base leading-snug tracking-tight">
        {project.title}
      </p>
      {meta && (
        <p className="mt-1 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          {meta}
        </p>
      )}
      {summary && (
        <p className="mt-2 line-clamp-3 text-(--text-muted) text-sm leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}
