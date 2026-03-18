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
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b p-6 md:p-12 lg:p-20">
        <div className="max-w-4xl">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Software Library
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">
            Tools & Devices
          </h1>
          <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            A catalog of custom Max for Live devices, audio plugins, and
            open-source creative coding tools.
          </p>
        </div>
      </div>

      {/* Featured Tools Grid */}
      {featuredTools.length > 0 && (
        <section>
          <div className="border-black border-b bg-zinc-50 px-6 py-3">
            <h2 className="font-bold text-xs uppercase tracking-wide">
              Featured Releases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {featuredTools.map((tool, i) => (
              <div
                className={`flex h-full flex-col border-black border-b p-8 md:p-12 ${i % 2 === 0 ? "md:border-r" : ""}`}
                key={tool.name}
              >
                <div className="mb-8">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="rounded-full border border-black px-3 py-1 font-bold text-xs uppercase">
                      {tool.category}
                    </span>
                    {tool.download && tool.download !== "#" && (
                      <span className="font-mono text-xs text-zinc-500">
                        v1.0.0
                      </span>
                    )}
                  </div>
                  <h3 className="mb-4 font-serif-display text-4xl">
                    {tool.name}
                  </h3>
                  <p className="mb-6 text-lg text-zinc-600 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {tool.tech.map((tech) => (
                      <span
                        className="font-bold text-xs text-zinc-400 uppercase"
                        key={tech}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  {tool.demo && tool.demo !== "#" && (
                    <Link
                      className="border-black border-b pb-1 font-bold text-sm transition-colors hover:text-accent"
                      href={tool.demo}
                    >
                      View Page
                    </Link>
                  )}
                  {tool.github && (
                    <a
                      className="border-black border-b pb-1 font-bold text-sm transition-colors hover:text-accent"
                      href={tool.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Tools List */}
      <section>
        <div className="border-black border-b bg-zinc-50 px-6 py-3">
          <h2 className="font-bold text-xs uppercase tracking-wide">Archive</h2>
        </div>

        <div className="grid grid-cols-1">
          {otherTools.map((tool) => (
            <div
              className="group grid grid-cols-1 items-center gap-6 border-black border-b p-6 transition-colors hover:bg-zinc-50 md:grid-cols-12"
              key={tool.name}
            >
              <div className="md:col-span-3">
                <span className="mb-1 block font-bold text-xs text-zinc-500 uppercase">
                  {tool.category}
                </span>
                <h3 className="font-serif-display text-2xl">{tool.name}</h3>
              </div>

              <div className="md:col-span-5">
                <p className="text-sm text-zinc-600">{tool.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 md:col-span-2">
                {tool.tech.slice(0, 2).map((tech) => (
                  <span
                    className="rounded border border-zinc-300 bg-white px-2 py-1 text-[10px]"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-4 md:col-span-2">
                {tool.github && (
                  <a
                    className="font-bold text-sm hover:text-accent"
                    href={tool.github}
                  >
                    GitHub ↗
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
