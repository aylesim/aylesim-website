"use client";

import { useMemo } from "react";
import { ProjectBubbleField } from "@/components/glass/project-bubble-field";
import type { BubbleFocus } from "@/lib/bubble-layout";
import type { Project, SiteConfig } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";

export function ArchiveIndex({
  focus,
  onClose,
  onSelect,
  projects,
  selectedSlug,
  site,
}: {
  focus: BubbleFocus;
  onClose: () => void;
  onSelect: (slug: string) => void;
  projects: Project[];
  selectedSlug: string | null;
  site: SiteConfig;
}) {
  const items = useMemo(
    () =>
      projects.map((project) => ({
        project,
        cover: getProjectCover(project),
      })),
    [projects]
  );

  return (
    <ProjectBubbleField
      focus={focus}
      items={items}
      onClose={onClose}
      onSelect={onSelect}
      projects={projects}
      selectedSlug={selectedSlug}
      site={site}
    />
  );
}
