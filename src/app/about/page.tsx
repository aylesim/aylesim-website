import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">About / Bio</h1>
      
      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">The Journey</h2>
            <p>
              My journey began in Southern Italy, rooted in sound art and music production. This initial fascination with the texture of sound quickly evolved into a deep curiosity for the systems that generate and control it.
            </p>
            <p className="mt-4">
              Moving to Berlin marked a fundamental turning point. Immersed in a city that defines the avant-garde of electronic music and creative technology, I transitioned from being a user of tools to being a creator of them. Today I operate as a <strong>Multidisciplinary Artist, Creative Technologist, and Interactive Systems Developer</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Philosophy & Mission</h2>
            <p>
              My mission is to explore the intersection between humans and technology. I believe that technology should not just be a utility, but a partner in creativity. 
            </p>
            <p className="mt-4">
              Through <strong>generative systems</strong>, <strong>custom musical instruments</strong>, and <strong>interactive installations</strong>, I aim to build bridges that allow complex algorithmic logic to feel organic and expressive in human hands.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Recognition & Community</h2>
            <p>
              I am an active member of the <strong>Max Berlin Network</strong>, regularly collaborating with artists and programmers to push the boundaries of what's possible with MaxMSP and generative code.
            </p>
            <p className="mt-4">
              My work has been recognized in the creative technology community, and I continue to contribute to innovation in open-source and creative coding communities. These recognitions fuel my drive to continue innovating and sharing knowledge.
            </p>
          </section>
          
          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Storytelling</h2>
            <p>
              Every project I create tells a story. Whether it's a Max for Live device that amplifies musical expression, a generative installation that responds to the environment, or open-source code that enables other creators, the common thread is always the same: making technology accessible, expressive, and deeply human.
            </p>
            <p className="mt-4">
              My approach combines technical rigor with artistic sensitivity, exploring how algorithms and systems can become tools for personal and collective expression.
            </p>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-white font-bold mb-6">Technical Skills</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Core Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "JavaScript", "Python", "C++", "Mathematica"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Creative Tech</h4>
                <div className="flex flex-wrap gap-2">
                  {["MaxMSP", "Max for Live", "Jitter", "TouchDesigner", "SuperCollider"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Web & Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {["React / Next.js", "Node.js", "Tailwind CSS", "Web Audio API"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Audio Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {["Ableton Live", "Reaktor", "Hardware Modular"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Interested in collaborations or custom development?
            </p>
            <a href="mailto:contact@aylesim.com" className="block text-center bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition-colors">
              Contact Me
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}


