"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";

const ROTATE_MS = 2500;
const FADE_MS = 700;

export function CategoryProjectRotator({
  projects,
  onProjectClick,
  activeSlug = null,
  className,
  layout = "stacked",
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
  activeSlug?: string | null;
  className?: string;
  layout?: "stacked" | "aside";
}) {
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    if (activeSlug) {
      const index = projects.findIndex(
        (project) => project.slug === activeSlug
      );
      if (index >= 0) {
        setDisplayIndex(index);
      }
      return;
    }

    if (projects.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDisplayIndex((current) => (current + 1) % projects.length);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSlug, projects]);

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[displayIndex] ?? projects[0];
  const isAside = layout === "aside";
  const baseWrapperClass = isAside
    ? "mx-auto w-full max-w-sm"
    : "mt-8 w-full max-w-md";
  const wrapperClass = className
    ? `${baseWrapperClass} ${className}`
    : baseWrapperClass;
  const aspectClass = isAside ? "aspect-4/3" : "aspect-21/9";
  const imageSizes = isAside
    ? "(max-width: 768px) 100vw, 24rem"
    : "(max-width: 768px) 100vw, 28rem";

  return (
    <div className={wrapperClass}>
      <button
        aria-label={`Open ${activeProject.title}`}
        className="group relative block w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5"
        onClick={() => onProjectClick(activeProject.slug)}
        type="button"
      >
        <div className={`relative w-full ${aspectClass}`}>
          {projects.map((project, index) => {
            const cover = getProjectCover(project);
            const coverIsRemote = cover.startsWith("http");
            return (
              <Image
                alt={project.title}
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                fill
                key={project.slug}
                sizes={imageSizes}
                src={cover}
                style={{
                  opacity: index === displayIndex ? 1 : 0,
                  transitionDuration: `${FADE_MS}ms`,
                  transitionProperty: "opacity",
                  transitionTimingFunction: "ease-in-out",
                }}
                unoptimized={coverIsRemote}
              />
            );
          })}
        </div>
      </button>
      <p
        className="mt-2.5 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest"
        key={activeProject.slug}
        style={{
          animationDuration: "400ms",
          animationFillMode: "both",
          animationName: "category-caption-in",
          animationTimingFunction: "ease-out",
        }}
      >
        <span className="text-(--foreground)/70">{activeProject.title}</span>
        {projects.length > 1 ? (
          <span className="text-(--text-muted)">
            {" "}
            · {displayIndex + 1}/{projects.length}
          </span>
        ) : null}
      </p>
    </div>
  );
}
