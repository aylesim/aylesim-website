import Link from "next/link";

export default function CodeTechnology() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Code & Technology</h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Approfondimenti tecnici, tutorial, risorse, contributi open-source e link ai repository.
          </p>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
        >
          Vai al Profilo GitHub
        </a>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-zinc-800">Repository Open Source</h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border border-zinc-800 rounded-lg hover:bg-zinc-900/50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">aylesim/generative-utils</h3>
                  <span className="text-xs font-mono text-zinc-500">TypeScript</span>
                </div>
                <p className="text-zinc-400 mb-4">
                  A collection of utility functions for generative art, including noise algorithms, vector math, and color theory helpers.
                </p>
                <div className="flex gap-4 text-sm text-zinc-500">
                  <span>★ 124</span>
                  <span>Last updated 3 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-zinc-800">Tutorial & Approfondimenti Tecnici</h2>
          <div className="space-y-6">
            <article className="group cursor-pointer">
              <span className="text-sm text-zinc-500 mb-2 block">October 12, 2023</span>
              <h3 className="text-2xl font-bold mb-2 group-hover:underline decoration-zinc-500 underline-offset-4">Optimizing Max for Live Devices for CPU Performance</h3>
              <p className="text-zinc-400 max-w-3xl">
                A deep dive into the best practices for patching in MaxMSP to ensure your devices run smoothly in a heavy Ableton Live set. Covering polyphony, MSP signal flow, and UI refresh rates.
              </p>
              <Link href="/blog/optimizing-m4l" className="inline-block mt-4 text-white border-b border-white pb-0.5 hover:text-zinc-300 hover:border-zinc-300 transition-colors">
                Leggi Articolo
              </Link>
            </article>
            
            <article className="group cursor-pointer">
              <span className="text-sm text-zinc-500 mb-2 block">September 05, 2023</span>
              <h3 className="text-2xl font-bold mb-2 group-hover:underline decoration-zinc-500 underline-offset-4">Building Custom MIDI Controllers with Arduino and Node.js</h3>
              <p className="text-zinc-400 max-w-3xl">
                How to bridge physical hardware with web technologies. A tutorial on using Johnny-Five and standard MIDI protocols to control browser-based synths.
              </p>
              <Link href="/blog/arduino-midi-node" className="inline-block mt-4 text-white border-b border-white pb-0.5 hover:text-zinc-300 hover:border-zinc-300 transition-colors">
                Leggi Articolo
              </Link>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}


