import ProjectCard from "@/components/features/project-card";
import { getProjectsByCategory } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function InteractiveSystems() {
  const projects: Project[] = await getProjectsByCategory(
    "interactive-systems"
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Interactive Systems
        </h1>
        <p className="text-xl text-zinc-400">
          Custom software instruments, Max for Live devices, and interactive
          tools designed to expand the sonic palette of producers and sound
          artists.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              description={project.description || ""}
              href={`/interactive-systems/${project.slug.current}`}
              image={project.featuredImage}
              key={project._id}
              tags={project.tags || []}
              title={project.title}
            />
          ))
        ) : (
          <>
            <ProjectCard
              description="Advanced parameter control system for Ableton Live. Features multi-destination mapping, custom LFOs, and physics-based modulation sources."
              href="/interactive-systems/knob-studio"
              tags={["MaxMSP", "M4L", "Live API"]}
              title="Knob Studio"
            />
            <ProjectCard
              description="A bridge between the massive Freesound.org database and your DAW. Search by tag, license, or mood, and drag-and-drop directly into Live."
              href="/interactive-systems/freesound4live"
              tags={["API Integration", "Node.js", "MaxMSP"]}
              title="Freesound4Live"
            />
            <ProjectCard
              description="Real-time spectral processing tool that allows users to freeze, blur, and morph between incoming audio signals using FFT analysis."
              href="/interactive-systems/spectral-morph"
              tags={["DSP", "FFT", "Jitter"]}
              title="Spectral Morph"
            />
          </>
        )}
      </div>
    </div>
  );
}
