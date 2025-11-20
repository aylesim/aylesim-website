import Link from "next/link";
import ProjectCard from "@/components/features/ProjectCard";
import { getFeaturedProjects } from "@/lib/sanity";
import { Project } from "@/types/sanity";

export default async function Home() {
  const featuredProjects: Project[] = await getFeaturedProjects();
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>
          {/* Generative Art Placeholder Background */}
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Uniting Creativity <br /> & Technology
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Multidisciplinary Artist, Creative Technologist & Interactive Systems Developer.
            Exploring the intersection of humans and technology through generative systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/selected-works" className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors">
              View Works
            </Link>
            <Link href="/about" className="px-8 py-3 border border-zinc-700 text-white font-bold rounded hover:bg-zinc-900 transition-colors">
            About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-y border-zinc-800 py-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Generative Systems</h3>
            <p className="text-zinc-400 text-sm">Creating complex and self-evolving systems that bridge the gap between code and artistic expression.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Interactive Tools</h3>
            <p className="text-zinc-400 text-sm">Developing custom Max for Live devices and software that empower musicians and artists.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Installations</h3>
            <p className="text-zinc-400 text-sm">Designing immersive physical spaces where digital logic meets human perception.</p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Works</h2>
            <p className="text-zinc-400">Selected projects, tools, and installations.</p>
          </div>
          <Link href="/selected-works" className="text-sm text-zinc-400 hover:text-white transition-colors hidden md:block">
            View all works →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects && featuredProjects.length > 0 ? (
            featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description || ''}
                tags={project.tags || []}
                href={`/selected-works/${project.slug.current}`}
                image={project.featuredImage}
              />
            ))
          ) : (
            <>
              <ProjectCard 
                title="Knob Studio"
                description="A revolutionary Max for Live device for advanced parameter control and modulation. Designed for live performance and studio experimentation."
                tags={["MaxMSP", "Ableton Live", "UI/UX"]}
                href="/interactive-systems/knob-studio"
              />
              <ProjectCard 
                title="Freesound4Live"
                description="Seamless integration of the Freesound database directly into Ableton Live. Browse, download, and drop samples instantly."
                tags={["API Integration", "JavaScript", "M4L"]}
                href="/interactive-systems/freesound4live"
              />
              <ProjectCard 
                title="Generative Landscapes"
                description="An immersive audiovisual installation exploring algorithmic terrain generation reacting to ambient sound."
                tags={["TouchDesigner", "Generative Art", "Installation"]}
                href="/generative-projects/landscapes"
              />
            </>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/selected-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
            View all works →
          </Link>
        </div>
      </section>

      {/* Social Proof / Collaborations */}
      <section className="bg-zinc-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-8">Featured In & Collaborations</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:opacity-80 transition-opacity duration-500">
            {/* Placeholders for logos - using text for now */}
            <span className="text-xl font-bold">Max Berlin Network</span>
            <span className="text-xl font-bold">CDM.link</span>
            <span className="text-xl font-bold">Isotonik Studios</span>
            <span className="text-xl font-bold">Berlin University of Arts</span>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-10 rounded-2xl border border-zinc-700">
          <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
          <p className="text-zinc-400 mb-8">
            Receive exclusive content, updates on new projects, tutorials, and insights into the world of creative technology.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded hover:bg-zinc-200 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
