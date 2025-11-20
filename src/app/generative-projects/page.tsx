import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/features/ProjectCard";
import { getProjectsByCategory } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/types/sanity";

export default async function GenerativeProjects() {
  const projects: Project[] = await getProjectsByCategory('generative-projects');
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Generative Projects</h1>
        <p className="text-xl text-zinc-400">
          Algorithmic compositions, audiovisual installations, and research experiments where code becomes the medium of expression.
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.slice(0, 1).map((project) => (
            <Link
              key={project._id}
              href={`/generative-projects/${project.slug.current}`}
              className="col-span-1 md:col-span-2 group cursor-pointer"
            >
              <div className="relative h-[60vh] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-6">
                {project.featuredImage ? (
                  <Image
                    src={urlFor(project.featuredImage).width(1200).height(800).url()}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                    <span className="text-4xl font-thin tracking-widest text-zinc-700 group-hover:text-zinc-500">IMMERSIVE INSTALLATION PREVIEW</span>
                  </div>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2 group-hover:text-white transition-colors">{project.title}</h2>
              <p className="text-zinc-400 text-lg mb-4 max-w-2xl">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
          {projects.slice(1).map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description || ''}
              tags={project.tags || []}
              href={`/generative-projects/${project.slug.current}`}
              image={project.featuredImage}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="col-span-1 md:col-span-2 group cursor-pointer">
            <div className="relative h-[60vh] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-6">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                <span className="text-4xl font-thin tracking-widest text-zinc-700 group-hover:text-zinc-500">IMMERSIVE INSTALLATION PREVIEW</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Echoes of the Machine</h2>
            <p className="text-zinc-400 text-lg mb-4 max-w-2xl">
              An immersive audiovisual environment where machine learning algorithms interpret audience movement to generate evolving soundscapes and visual geometry.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded">TouchDesigner</span>
              <span className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded">Python</span>
              <span className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded">Sensors</span>
            </div>
          </div>
          <ProjectCard 
            title="Cellular Automata Sound"
            description="A study on using Conway's Game of Life to drive MIDI note generation and velocity mapping, creating self-organizing musical structures."
            tags={["JavaScript", "Generative Music", "Canvas API"]}
            href="/generative-projects/cellular-automata"
          />
          <ProjectCard 
            title="Data Moshing Visualizer"
            description="Real-time video processing system that intentionally corrupts digital video data to create artistic glitch aesthetics reacting to audio transients."
            tags={["GLSL", "Shaders", "MaxMSP"]}
            href="/generative-projects/data-moshing"
          />
        </div>
      )}
    </div>
  );
}


