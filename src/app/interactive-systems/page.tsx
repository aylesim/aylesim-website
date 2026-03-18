import ProjectCard from "@/components/features/project-card";
import { getProjectsByCategory } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function InteractiveSystems() {
  const projects: Project[] = await getProjectsByCategory(
    "interactive-systems"
  );
  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="max-w-4xl">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Software & Devices
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">
            Interactive Systems
          </h1>
          <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            Custom software instruments, Max for Live devices, and interactive
            tools designed to expand the sonic palette of producers and sound
            artists.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0
          ? projects.map((project, index) => (
              <div
                className={`border-black border-r border-b ${
                  index % 3 === 2 ? "md:border-r-0" : ""
                }`}
                key={project._id}
              >
                <ProjectCard
                  description={project.description || ""}
                  href={`/selected-works/${project.slug.current}`}
                  image={project.featuredImage}
                  tags={project.tags || []}
                  title={project.title}
                />
              </div>
            ))
          : [
              {
                title: "Knob Studio",
                description:
                  "Advanced parameter control system for Ableton Live. Features multi-destination mapping, custom LFOs, and physics-based modulation sources.",
                tags: ["MaxMSP", "M4L", "Live API"],
                href: "/interactive-systems/knob-studio",
              },
              {
                title: "Freesound4Live",
                description:
                  "A bridge between the massive Freesound.org database and your DAW. Search by tag, license, or mood, and drag-and-drop directly into Live.",
                tags: ["API Integration", "Node.js", "MaxMSP"],
                href: "/interactive-systems/freesound4live",
              },
              {
                title: "Spectral Morph",
                description:
                  "Real-time spectral processing tool that allows users to freeze, blur, and morph between incoming audio signals using FFT analysis.",
                tags: ["DSP", "FFT", "Jitter"],
                href: "/interactive-systems/spectral-morph",
              },
            ].map((project, index) => (
              <div
                className={`border-black border-r border-b ${
                  index % 3 === 2 ? "md:border-r-0" : ""
                }`}
                key={project.title}
              >
                <ProjectCard
                  description={project.description}
                  href={project.href}
                  tags={project.tags}
                  title={project.title}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
