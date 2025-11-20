import FilterableProjects from "@/components/features/filterable-projects";
import { getProjects } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function SelectedWorks() {
  const projects: Project[] = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Selected Works
        </h1>
        <p className="text-xl text-zinc-400">
          Curated portfolio of selected projects: artworks, installations, and
          collaborations. Each project includes descriptions, media, and
          filterable tags.
        </p>
      </div>

      <FilterableProjects projects={projects} />
    </div>
  );
}
