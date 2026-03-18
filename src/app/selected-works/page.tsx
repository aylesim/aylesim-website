import Link from "next/link";
import FilterableProjects from "@/components/features/filterable-projects";
import { getProjects } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function SelectedWorks() {
  const projects: Project[] = await getProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="mb-16 font-serif-display text-4xl md:text-5xl">
        Selected Works
      </h1>
      <p className="mb-16 max-w-xl text-zinc-400">
        Installations, web apps, creative coding experiments.
      </p>

      <FilterableProjects projects={projects} />

      <div className="mt-24 border-zinc-800 border-t pt-12">
        <Link
          className="text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/work"
        >
          ← Work
        </Link>
      </div>
    </div>
  );
}
