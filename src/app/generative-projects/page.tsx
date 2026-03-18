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
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="max-w-4xl">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Algorithmic Art & Installations
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">
            Generative Projects
          </h1>
          <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            Algorithmic compositions, audiovisual installations, and research
            experiments where code becomes the medium of expression.
          </p>
        </div>
      </div>

      {/* Projects */}
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {projects.slice(0, 1).map((project) => (
            <div
              className="group col-span-1 border-black border-b md:col-span-2"
              key={project._id}
            >
              <Link
                className="block"
                href={`/selected-works/${project.slug.current}`}
              >
                <div className="relative h-[70vh] overflow-hidden bg-zinc-100">
                  {project.featuredImage ? (
                    <Image
                      alt={project.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      src={urlFor(project.featuredImage)
                        .width(1600)
                        .height(1000)
                        .url()}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-200">
                      <span className="font-serif-display text-4xl text-zinc-400 tracking-widest">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-black border-t p-8 md:p-12 lg:p-16">
                  <h2 className="mb-4 font-serif-display text-3xl transition-colors group-hover:text-accent md:text-5xl">
                    {project.title}
                  </h2>
                  <p className="mb-6 max-w-3xl text-lg text-zinc-700 leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          className="border border-black px-3 py-1 font-mono text-xs uppercase tracking-wider"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
          {projects.slice(1).map((project, index) => (
            <div
              className={`border-black border-r border-b ${
                index % 2 === 1 ? "md:border-r-0" : ""
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
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="group col-span-1 border-black border-b md:col-span-2">
            <div className="relative h-[70vh] overflow-hidden bg-zinc-100">
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-200">
                <span className="font-serif-display text-4xl text-zinc-400 tracking-widest">
                  ECHOES OF THE MACHINE
                </span>
              </div>
            </div>
            <div className="border-black border-t p-8 md:p-12 lg:p-16">
              <h2 className="mb-4 font-serif-display text-3xl md:text-5xl">
                Echoes of the Machine
              </h2>
              <p className="mb-6 max-w-3xl text-lg text-zinc-700 leading-relaxed">
                An immersive audiovisual environment where machine learning
                algorithms interpret audience movement to generate evolving
                soundscapes and visual geometry.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="border border-black px-3 py-1 font-mono text-xs uppercase tracking-wider">
                  TouchDesigner
                </span>
                <span className="border border-black px-3 py-1 font-mono text-xs uppercase tracking-wider">
                  Python
                </span>
                <span className="border border-black px-3 py-1 font-mono text-xs uppercase tracking-wider">
                  Sensors
                </span>
              </div>
            </div>
          </div>
          {[
            {
              title: "Cellular Automata Sound",
              description:
                "A study on using Conway's Game of Life to drive MIDI note generation and velocity mapping, creating self-organizing musical structures.",
              tags: ["JavaScript", "Generative Music", "Canvas API"],
              href: "/generative-projects/cellular-automata",
            },
            {
              title: "Data Moshing Visualizer",
              description:
                "Real-time video processing system that intentionally corrupts digital video data to create artistic glitch aesthetics reacting to audio transients.",
              tags: ["GLSL", "Shaders", "MaxMSP"],
              href: "/generative-projects/data-moshing",
            },
          ].map((project, index) => (
            <div
              className={`border-black border-r border-b ${
                index % 2 === 1 ? "md:border-r-0" : ""
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
      )}
    </div>
  );
}
