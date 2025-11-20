import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/features/project-card";
import { getProjectsByCategory } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/types/sanity";

export default async function GenerativeProjects() {
  const projects: Project[] = await getProjectsByCategory(
    "generative-projects"
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Generative Projects
        </h1>
        <p className="text-xl text-zinc-400">
          Algorithmic compositions, audiovisual installations, and research
          experiments where code becomes the medium of expression.
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {projects.slice(0, 1).map((project) => (
            <Link
              className="group col-span-1 cursor-pointer md:col-span-2"
              href={`/generative-projects/${project.slug.current}`}
              key={project._id}
            >
              <div className="relative mb-6 h-[60vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                {project.featuredImage ? (
                  <Image
                    alt={project.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                    src={urlFor(project.featuredImage)
                      .width(1200)
                      .height(800)
                      .url()}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/0">
                    <span className="font-thin text-4xl text-zinc-700 tracking-widest group-hover:text-zinc-500">
                      IMMERSIVE INSTALLATION PREVIEW
                    </span>
                  </div>
                )}
              </div>
              <h2 className="mb-2 font-bold text-3xl transition-colors group-hover:text-white">
                {project.title}
              </h2>
              <p className="mb-4 max-w-2xl text-lg text-zinc-400">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
          {projects.slice(1).map((project) => (
            <ProjectCard
              description={project.description || ""}
              href={`/generative-projects/${project.slug.current}`}
              image={project.featuredImage}
              key={project._id}
              tags={project.tags || []}
              title={project.title}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="group col-span-1 cursor-pointer md:col-span-2">
            <div className="relative mb-6 h-[60vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/0">
                <span className="font-thin text-4xl text-zinc-700 tracking-widest group-hover:text-zinc-500">
                  IMMERSIVE INSTALLATION PREVIEW
                </span>
              </div>
            </div>
            <h2 className="mb-2 font-bold text-3xl">Echoes of the Machine</h2>
            <p className="mb-4 max-w-2xl text-lg text-zinc-400">
              An immersive audiovisual environment where machine learning
              algorithms interpret audience movement to generate evolving
              soundscapes and visual geometry.
            </p>
            <div className="flex gap-2">
              <span className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                TouchDesigner
              </span>
              <span className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                Python
              </span>
              <span className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                Sensors
              </span>
            </div>
          </div>
          <ProjectCard
            description="A study on using Conway's Game of Life to drive MIDI note generation and velocity mapping, creating self-organizing musical structures."
            href="/generative-projects/cellular-automata"
            tags={["JavaScript", "Generative Music", "Canvas API"]}
            title="Cellular Automata Sound"
          />
          <ProjectCard
            description="Real-time video processing system that intentionally corrupts digital video data to create artistic glitch aesthetics reacting to audio transients."
            href="/generative-projects/data-moshing"
            tags={["GLSL", "Shaders", "MaxMSP"]}
            title="Data Moshing Visualizer"
          />
        </div>
      )}
    </div>
  );
}
