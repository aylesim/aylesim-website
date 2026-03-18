import Link from "next/link";

export default function CodeTechnology() {
  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="flex max-w-4xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
              Open Source & Resources
            </span>
            <h1 className="mb-4 font-serif-display text-5xl md:text-7xl">
              Code & Technology
            </h1>
            <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
              Technical insights, tutorials, resources, open-source
              contributions, and links to repositories.
            </p>
          </div>
          <a
            className="inline-block border border-black bg-black px-6 py-3 font-bold text-sm text-white uppercase tracking-wide transition-colors hover:border-accent hover:bg-accent"
            href="https://github.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub Profile →
          </a>
        </div>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-5xl p-6 md:p-12 lg:p-20">
        <div className="space-y-16">
          {/* Repositories Section */}
          <section>
            <h2 className="mb-8 border-black border-b pb-4 font-serif-display text-3xl md:text-4xl">
              Repository Open Source
            </h2>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  className="group border border-black p-6 transition-colors hover:bg-zinc-50"
                  key={i}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-serif-display text-xl transition-colors group-hover:text-accent md:text-2xl">
                      aylesim/generative-utils
                    </h3>
                    <span className="border border-black px-2 py-1 font-mono text-xs uppercase tracking-wide">
                      TypeScript
                    </span>
                  </div>
                  <p className="mb-4 text-zinc-700 leading-relaxed">
                    A collection of utility functions for generative art,
                    including noise algorithms, vector math, and color theory
                    helpers.
                  </p>
                  <div className="flex gap-6 font-mono text-xs text-zinc-500">
                    <span>★ 124</span>
                    <span>Last updated 3 days ago</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tutorials Section */}
          <section>
            <h2 className="mb-8 border-black border-b pb-4 font-serif-display text-3xl md:text-4xl">
              Tutorials & Technical Insights
            </h2>
            <div className="space-y-12">
              <article className="group">
                <span className="mb-3 block font-mono text-xs text-zinc-500 uppercase tracking-wide">
                  October 12, 2023
                </span>
                <h3 className="mb-4 font-serif-display text-2xl transition-colors group-hover:text-accent md:text-3xl">
                  Optimizing Max for Live Devices for CPU Performance
                </h3>
                <p className="mb-4 max-w-3xl text-zinc-700 leading-relaxed">
                  A deep dive into the best practices for patching in MaxMSP to
                  ensure your devices run smoothly in a heavy Ableton Live set.
                  Covering polyphony, MSP signal flow, and UI refresh rates.
                </p>
                <Link
                  className="inline-block border-black border-b pb-1 font-bold text-sm uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
                  href="/blog/optimizing-m4l"
                >
                  Read Article →
                </Link>
              </article>

              <article className="group">
                <span className="mb-3 block font-mono text-xs text-zinc-500 uppercase tracking-wide">
                  September 05, 2023
                </span>
                <h3 className="mb-4 font-serif-display text-2xl transition-colors group-hover:text-accent md:text-3xl">
                  Building Custom MIDI Controllers with Arduino and Node.js
                </h3>
                <p className="mb-4 max-w-3xl text-zinc-700 leading-relaxed">
                  How to bridge physical hardware with web technologies. A
                  tutorial on using Johnny-Five and standard MIDI protocols to
                  control browser-based synths.
                </p>
                <Link
                  className="inline-block border-black border-b pb-1 font-bold text-sm uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
                  href="/blog/arduino-midi-node"
                >
                  Read Article →
                </Link>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
