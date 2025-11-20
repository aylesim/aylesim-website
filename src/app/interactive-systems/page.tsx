import ProjectCard from "@/components/features/ProjectCard";
import { getProjectsByCategory } from "@/lib/sanity";
import { Project } from "@/types/sanity";

export default async function InteractiveSystems() {
  const projects: Project[] = await getProjectsByCategory('interactive-systems');
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Interactive Systems</h1>
        <p className="text-xl text-zinc-400">
          Custom software instruments, Max for Live devices, and interactive tools designed to expand the sonic palette of producers and sound artists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description || ''}
              tags={project.tags || []}
              href={`/interactive-systems/${project.slug.current}`}
              image={project.featuredImage}
            />
          ))
        ) : (
          <>
            <ProjectCard 
              title="Knob Studio"
              description="Advanced parameter control system for Ableton Live. Features multi-destination mapping, custom LFOs, and physics-based modulation sources."
              tags={["MaxMSP", "M4L", "Live API"]}
              href="/interactive-systems/knob-studio"
            />
            <ProjectCard 
              title="Freesound4Live"
              description="A bridge between the massive Freesound.org database and your DAW. Search by tag, license, or mood, and drag-and-drop directly into Live."
              tags={["API Integration", "Node.js", "MaxMSP"]}
              href="/interactive-systems/freesound4live"
            />
            <ProjectCard 
              title="Spectral Morph"
              description="Real-time spectral processing tool that allows users to freeze, blur, and morph between incoming audio signals using FFT analysis."
              tags={["DSP", "FFT", "Jitter"]}
              href="/interactive-systems/spectral-morph"
            />
          </>
        )}
      </div>
    </div>
  );
}


