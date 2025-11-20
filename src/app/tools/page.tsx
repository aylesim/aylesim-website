import Link from "next/link";

export default function Tools() {
  const tools = [
    {
      name: "Knob Studio",
      category: "Max for Live Device",
      description:
        "Advanced parameter control system for Ableton Live. Features multi-destination mapping, custom LFOs, and physics-based modulation sources.",
      tech: ["MaxMSP", "Max for Live", "Live API"],
      demo: "/interactive-systems/knob-studio",
      github: "https://github.com/aylesim/knob-studio",
      download: "#",
      featured: true,
    },
    {
      name: "Freesound4Live",
      category: "Max for Live Device",
      description:
        "Seamless integration of the Freesound database directly into Ableton Live. Browse, download, and drop samples instantly.",
      tech: ["MaxMSP", "JavaScript", "API Integration"],
      demo: "/interactive-systems/freesound4live",
      github: "https://github.com/aylesim/freesound4live",
      download: "#",
      featured: true,
    },
    {
      name: "Spectral Morph",
      category: "MaxMSP Device",
      description:
        "Real-time spectral processing tool that allows users to freeze, blur, and morph between incoming audio signals using FFT analysis.",
      tech: ["MaxMSP", "Jitter", "DSP"],
      demo: "#",
      github: "https://github.com/aylesim/spectral-morph",
      download: "#",
      featured: false,
    },
    {
      name: "Generative Utils",
      category: "JavaScript Library",
      description:
        "A collection of utility functions for generative art, including noise algorithms, vector math, and color theory helpers.",
      tech: ["TypeScript", "JavaScript", "Canvas API"],
      demo: "#",
      github: "https://github.com/aylesim/generative-utils",
      download: "npm install generative-utils",
      featured: false,
    },
    {
      name: "Modular Sequencer",
      category: "MaxMSP Patch",
      description:
        "Modular step sequencer with probability gates, pattern variations, and MIDI/CV output for hardware integration.",
      tech: ["MaxMSP", "MIDI", "CV"],
      demo: "#",
      github: "https://github.com/aylesim/modular-sequencer",
      download: "#",
      featured: false,
    },
    {
      name: "Web Audio Synth",
      category: "Web Application",
      description:
        "Browser-based synthesizer with modular architecture, featuring multiple oscillator types, filters, and effects.",
      tech: ["Web Audio API", "React", "TypeScript"],
      demo: "https://synth.aylesim.com",
      github: "https://github.com/aylesim/web-audio-synth",
      download: "#",
      featured: false,
    },
  ];

  const featuredTools = tools.filter((t) => t.featured);
  const otherTools = tools.filter((t) => !t.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Tools
        </h1>
        <p className="text-xl text-zinc-400">
          Catalog of my tools, devices, plugins, and software. Each tool
          includes technical details, demos, and access to repositories.
        </p>
      </div>

      {featuredTools.length > 0 && (
        <section className="mb-20">
          <h2 className="mb-8 border-zinc-800 border-b pb-4 font-bold text-2xl">
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredTools.map((tool) => (
              <div
                className="hover:-translate-y-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-zinc-600"
                key={tool.name}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="mb-2 block font-semibold text-xs text-zinc-500 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <h3 className="mb-3 font-bold text-2xl">{tool.name}</h3>
                  </div>
                </div>
                <p className="mb-6 text-zinc-400 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-xs text-zinc-500 uppercase">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.tech.map((tech) => (
                      <span
                        className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-zinc-800 border-t pt-4">
                  {tool.demo && tool.demo !== "#" && (
                    <Link
                      className="rounded bg-white px-4 py-2 font-bold text-black text-sm transition-colors hover:bg-zinc-200"
                      href={tool.demo}
                    >
                      View Demo
                    </Link>
                  )}
                  {tool.github && (
                    <a
                      className="rounded border border-zinc-700 px-4 py-2 font-bold text-sm text-white transition-colors hover:bg-zinc-800"
                      href={tool.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                  {tool.download && tool.download !== "#" && (
                    <span className="rounded border border-zinc-700 px-4 py-2 font-mono text-sm text-xs text-zinc-400">
                      {tool.download}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 border-zinc-800 border-b pb-4 font-bold text-2xl">
          All Tools
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherTools.map((tool) => (
            <div
              className="hover:-translate-y-1 flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-600"
              key={tool.name}
            >
              <span className="mb-2 block font-semibold text-xs text-zinc-500 uppercase tracking-wider">
                {tool.category}
              </span>
              <h3 className="mb-3 font-bold text-xl">{tool.name}</h3>
              <p className="mb-4 flex-1 text-sm text-zinc-400">
                {tool.description}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tool.tech.slice(0, 3).map((tech) => (
                    <span
                      className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-zinc-800 border-t pt-4">
                {tool.demo && tool.demo !== "#" && (
                  <Link
                    className="text-xs text-zinc-400 transition-colors hover:text-white"
                    href={tool.demo}
                  >
                    Demo →
                  </Link>
                )}
                {tool.github && (
                  <a
                    className="text-xs text-zinc-400 transition-colors hover:text-white"
                    href={tool.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
