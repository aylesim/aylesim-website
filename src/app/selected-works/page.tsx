import ProjectCard from "@/components/features/ProjectCard";
import { getProjects } from "@/lib/sanity";
import { Project } from "@/types/sanity";
import FilterableProjects from "@/components/features/FilterableProjects";

export default async function SelectedWorks() {
  const projects: Project[] = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Selected Works</h1>
        <p className="text-xl text-zinc-400">
          Portfolio curato con progetti scelti: artworks, installazioni e collaborazioni. Ogni progetto include descrizioni, media e tag filtrabili.
        </p>
      </div>

      <FilterableProjects projects={projects} />
    </div>
  );
}

