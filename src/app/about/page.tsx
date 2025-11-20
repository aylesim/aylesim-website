export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-12 font-bold text-4xl tracking-tight md:text-5xl">
        About / Bio
      </h1>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed">
          <section>
            <h2 className="mb-4 font-semibold text-white text-xl uppercase tracking-wider">
              The Journey
            </h2>
            <p>
              My journey began in Southern Italy, rooted in sound art and music
              production. This initial fascination with the texture of sound
              quickly evolved into a deep curiosity for the systems that
              generate and control it.
            </p>
            <p className="mt-4">
              Moving to Berlin marked a fundamental turning point. Immersed in a
              city that defines the avant-garde of electronic music and creative
              technology, I transitioned from being a user of tools to being a
              creator of them. Today I operate as a{" "}
              <strong>
                Multidisciplinary Artist, Creative Technologist, and Interactive
                Systems Developer
              </strong>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-white text-xl uppercase tracking-wider">
              Philosophy & Mission
            </h2>
            <p>
              My mission is to explore the intersection between humans and
              technology. I believe that technology should not just be a
              utility, but a partner in creativity.
            </p>
            <p className="mt-4">
              Through <strong>generative systems</strong>,{" "}
              <strong>custom musical instruments</strong>, and{" "}
              <strong>interactive installations</strong>, I aim to build bridges
              that allow complex algorithmic logic to feel organic and
              expressive in human hands.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-white text-xl uppercase tracking-wider">
              Recognition & Community
            </h2>
            <p>
              I am an active member of the <strong>Max Berlin Network</strong>,
              regularly collaborating with artists and programmers to push the
              boundaries of what&apos;s possible with MaxMSP and generative
              code.
            </p>
            <p className="mt-4">
              My work has been recognized in the creative technology community,
              and I continue to contribute to innovation in open-source and
              creative coding communities. These recognitions fuel my drive to
              continue innovating and sharing knowledge.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-white text-xl uppercase tracking-wider">
              Storytelling
            </h2>
            <p>
              Every project I create tells a story. Whether it&apos;s a Max for
              Live device that amplifies musical expression, a generative
              installation that responds to the environment, or open-source code
              that enables other creators, the common thread is always the same:
              making technology accessible, expressive, and deeply human.
            </p>
            <p className="mt-4">
              My approach combines technical rigor with artistic sensitivity,
              exploring how algorithms and systems can become tools for personal
              and collective expression.
            </p>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-6 font-bold text-white">Technical Skills</h3>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-xs text-zinc-500 uppercase">
                  Core Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "JavaScript",
                    "Python",
                    "C++",
                    "Mathematica",
                  ].map((skill) => (
                    <span
                      className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-xs text-zinc-500 uppercase">
                  Creative Tech
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "MaxMSP",
                    "Max for Live",
                    "Jitter",
                    "TouchDesigner",
                    "SuperCollider",
                  ].map((skill) => (
                    <span
                      className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-xs text-zinc-500 uppercase">
                  Web & Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React / Next.js",
                    "Node.js",
                    "Tailwind CSS",
                    "Web Audio API",
                  ].map((skill) => (
                    <span
                      className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-xs text-zinc-500 uppercase">
                  Audio Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Ableton Live", "Reaktor", "Hardware Modular"].map(
                    (skill) => (
                      <span
                        className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                        key={skill}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-4 font-bold text-white">Contact</h3>
            <p className="mb-4 text-sm text-zinc-400">
              Interested in collaborations or custom development?
            </p>
            <a
              className="block rounded bg-white py-2 text-center font-bold text-black transition-colors hover:bg-zinc-200"
              href="mailto:contact@aylesim.com"
            >
              Contact Me
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
