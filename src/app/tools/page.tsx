import Link from "next/link";

export default function Tools() {
  const tools = [
    {
      name: "Knob Studio",
      category: "Max for Live Device",
      description: "Advanced parameter control system for Ableton Live. Features multi-destination mapping, custom LFOs, and physics-based modulation sources.",
      tech: ["MaxMSP", "Max for Live", "Live API"],
      demo: "/interactive-systems/knob-studio",
      github: "https://github.com/aylesim/knob-studio",
      download: "#",
      featured: true,
    },
    {
      name: "Freesound4Live",
      category: "Max for Live Device",
      description: "Seamless integration of the Freesound database directly into Ableton Live. Browse, download, and drop samples instantly.",
      tech: ["MaxMSP", "JavaScript", "API Integration"],
      demo: "/interactive-systems/freesound4live",
      github: "https://github.com/aylesim/freesound4live",
      download: "#",
      featured: true,
    },
    {
      name: "Spectral Morph",
      category: "MaxMSP Device",
      description: "Real-time spectral processing tool that allows users to freeze, blur, and morph between incoming audio signals using FFT analysis.",
      tech: ["MaxMSP", "Jitter", "DSP"],
      demo: "#",
      github: "https://github.com/aylesim/spectral-morph",
      download: "#",
      featured: false,
    },
    {
      name: "Generative Utils",
      category: "JavaScript Library",
      description: "A collection of utility functions for generative art, including noise algorithms, vector math, and color theory helpers.",
      tech: ["TypeScript", "JavaScript", "Canvas API"],
      demo: "#",
      github: "https://github.com/aylesim/generative-utils",
      download: "npm install generative-utils",
      featured: false,
    },
    {
      name: "Modular Sequencer",
      category: "MaxMSP Patch",
      description: "Modular step sequencer with probability gates, pattern variations, and MIDI/CV output for hardware integration.",
      tech: ["MaxMSP", "MIDI", "CV"],
      demo: "#",
      github: "https://github.com/aylesim/modular-sequencer",
      download: "#",
      featured: false,
    },
    {
      name: "Web Audio Synth",
      category: "Web Application",
      description: "Browser-based synthesizer with modular architecture, featuring multiple oscillator types, filters, and effects.",
      tech: ["Web Audio API", "React", "TypeScript"],
      demo: "https://synth.aylesim.com",
      github: "https://github.com/aylesim/web-audio-synth",
      download: "#",
      featured: false,
    },
  ];

  const featuredTools = tools.filter(t => t.featured);
  const otherTools = tools.filter(t => !t.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Tools</h1>
        <p className="text-xl text-zinc-400">
          Catalogo dei miei strumenti, device, plugin e software. Ogni tool include dettagli tecnici, demo e accesso ai repository.
        </p>
      </div>

      {featuredTools.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-zinc-800">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTools.map((tool, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                      {tool.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-3">{tool.name}</h3>
                  </div>
                </div>
                <p className="text-zinc-400 mb-6 leading-relaxed">{tool.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                  {tool.demo && tool.demo !== "#" && (
                    <Link
                      href={tool.demo}
                      className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors text-sm"
                    >
                      View Demo
                    </Link>
                  )}
                  {tool.github && (
                    <a
                      href={tool.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-zinc-700 text-white font-bold rounded hover:bg-zinc-800 transition-colors text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {tool.download && tool.download !== "#" && (
                    <span className="px-4 py-2 border border-zinc-700 text-zinc-400 rounded text-sm font-mono text-xs">
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
        <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-zinc-800">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherTools.map((tool, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                {tool.category}
              </span>
              <h3 className="text-xl font-bold mb-3">{tool.name}</h3>
              <p className="text-zinc-400 mb-4 text-sm flex-1">{tool.description}</p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tool.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
                {tool.demo && tool.demo !== "#" && (
                  <Link
                    href={tool.demo}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Demo →
                  </Link>
                )}
                {tool.github && (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
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

