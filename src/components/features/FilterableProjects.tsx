"use client";

import { useState } from "react";
import ProjectCard from "@/components/features/ProjectCard";
import { Project } from "@/types/sanity";

interface FilterableProjectsProps {
  projects: Project[];
}

export default function FilterableProjects({ projects }: FilterableProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(
      projects.flatMap((project) => project.tags || [])
    )
  ).sort();

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag))
    : projects;

  return (
    <>
      {allTags.length > 0 && (
        <div className="mb-12 pb-8 border-b border-zinc-800">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                selectedTag === null
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                  selectedTag === tag
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description || ""}
              tags={project.tags || []}
              href={`/selected-works/${project.slug.current}`}
              image={project.featuredImage}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 border border-dashed border-zinc-800 rounded-lg text-center">
          <p className="text-zinc-500 italic">
            {selectedTag
              ? `Nessun progetto trovato con il tag "${selectedTag}"`
              : "Nessun progetto disponibile al momento."}
          </p>
        </div>
      )}
    </>
  );
}

