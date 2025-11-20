import Link from "next/link";
import ProjectCard from "@/components/features/project-card";
import { getFeaturedProjects } from "@/lib/sanity";
import type { Project } from "@/types/sanity";

export default async function Home() {
  const featuredProjects: Project[] = await getFeaturedProjects();
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
          {/* Generative Art Placeholder Background */}
          <div
            className="h-full w-full opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text font-bold text-5xl text-transparent tracking-tighter md:text-7xl">
            Uniting Creativity <br /> & Technology
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-zinc-400 md:text-2xl">
            Multidisciplinary Artist, Creative Technologist & Interactive
            Systems Developer. Exploring the intersection of humans and
            technology through generative systems.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="rounded bg-white px-8 py-3 font-bold text-black transition-colors hover:bg-zinc-200"
              href="/selected-works"
            >
              View Works
            </Link>
            <Link
              className="rounded border border-zinc-700 px-8 py-3 font-bold text-white transition-colors hover:bg-zinc-900"
              href="/about"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-zinc-800 border-y py-12 text-center md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold text-lg text-white">
              Generative Systems
            </h3>
            <p className="text-sm text-zinc-400">
              Creating complex and self-evolving systems that bridge the gap
              between code and artistic expression.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-lg text-white">
              Interactive Tools
            </h3>
            <p className="text-sm text-zinc-400">
              Developing custom Max for Live devices and software that empower
              musicians and artists.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-lg text-white">
              Installations
            </h3>
            <p className="text-sm text-zinc-400">
              Designing immersive physical spaces where digital logic meets
              human perception.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        id="work"
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-bold text-3xl tracking-tight">
              Featured Works
            </h2>
            <p className="text-zinc-400">
              Selected projects, tools, and installations.
            </p>
          </div>
          <Link
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white md:block"
            href="/selected-works"
          >
            View all works →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects && featuredProjects.length > 0 ? (
            featuredProjects
              .slice(0, 3)
              .map((project) => (
                <ProjectCard
                  description={project.description || ""}
                  href={`/selected-works/${project.slug.current}`}
                  image={project.featuredImage}
                  key={project._id}
                  tags={project.tags || []}
                  title={project.title}
                />
              ))
          ) : (
            <>
              <ProjectCard
                description="A revolutionary Max for Live device for advanced parameter control and modulation. Designed for live performance and studio experimentation."
                href="/interactive-systems/knob-studio"
                tags={["MaxMSP", "Ableton Live", "UI/UX"]}
                title="Knob Studio"
              />
              <ProjectCard
                description="Seamless integration of the Freesound database directly into Ableton Live. Browse, download, and drop samples instantly."
                href="/interactive-systems/freesound4live"
                tags={["API Integration", "JavaScript", "M4L"]}
                title="Freesound4Live"
              />
              <ProjectCard
                description="An immersive audiovisual installation exploring algorithmic terrain generation reacting to ambient sound."
                href="/generative-projects/landscapes"
                tags={["TouchDesigner", "Generative Art", "Installation"]}
                title="Generative Landscapes"
              />
            </>
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            href="/selected-works"
          >
            View all works →
          </Link>
        </div>
      </section>

      {/* Social Proof / Collaborations */}
      <section className="bg-zinc-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 font-semibold text-sm text-zinc-500 uppercase tracking-widest">
            Featured In & Collaborations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-opacity duration-500 hover:opacity-80">
            {/* Placeholders for logos - using text for now */}
            <span className="font-bold text-xl">Max Berlin Network</span>
            <span className="font-bold text-xl">CDM.link</span>
            <span className="font-bold text-xl">Isotonik Studios</span>
            <span className="font-bold text-xl">Berlin University of Arts</span>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-3xl px-4 text-center">
        <div className="rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 p-10">
          <h2 className="mb-4 font-bold text-2xl">Newsletter</h2>
          <p className="mb-8 text-zinc-400">
            Receive exclusive content, updates on new projects, tutorials, and
            insights into the world of creative technology.
          </p>
          <Link
            className="inline-block rounded bg-white px-8 py-3 font-bold text-black transition-colors hover:bg-zinc-200"
            href="/newsletter"
          >
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
