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
    <>
      {allTags.length > 0 && (
        <div className="mb-12 border-zinc-800 border-b pb-8">
          <div className="flex flex-wrap gap-3">
            <button
              className={`rounded px-4 py-2 font-medium text-sm transition-colors ${
                selectedTag === null
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedTag(null)}
              type="button"
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                className={`rounded px-4 py-2 font-medium text-sm transition-colors ${
                  selectedTag === tag
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
                key={tag}
                onClick={() => setSelectedTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="rounded-lg border border-zinc-800 border-dashed p-12 text-center">
          <p className="text-zinc-500 italic">
            {selectedTag
              ? `No projects found with the tag "${selectedTag}"`
              : "No projects available at the moment."}
          </p>
        </div>
      )}
    </>
  );
}
