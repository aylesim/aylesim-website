"use client";

import { useState } from "react";
import ProjectCard from "@/components/features/project-card";
import type { Project } from "@/types/sanity";

type FilterableProjectsProps = {
  projects: Project[];
};

export default function FilterableProjects({
  projects,
}: FilterableProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags || []))
  ).sort();

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag))
    : projects;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-4 text-sm">
          <button
            className={
              selectedTag === null
                ? "font-medium text-zinc-100 underline"
                : "text-zinc-500 hover:text-zinc-100"
            }
            onClick={() => setSelectedTag(null)}
            type="button"
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              className={
                selectedTag === tag
                  ? "font-medium text-zinc-100 underline"
                  : "text-zinc-500 hover:text-zinc-100"
              }
              key={tag}
              onClick={() => setSelectedTag(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <ProjectCard
              description={project.description || ""}
              href={`/selected-works/${project.slug.current}`}
              image={project.featuredImage}
              key={project._id}
              tags={project.tags || []}
              title={project.title}
            />
          ))}
        </div>
      ) : (
        <p className="text-zinc-500">
          {selectedTag
            ? `No projects with "${selectedTag}"`
            : "No projects available."}
        </p>
      )}
    </div>
  );
}
