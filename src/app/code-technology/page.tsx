import Link from "next/link";

export default function CodeTechnology() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl">
            Code & Technology
          </h1>
          <p className="max-w-2xl text-xl text-zinc-400">
            Technical insights, tutorials, resources, open-source contributions,
            and links to repositories.
          </p>
        </div>
        <a
          className="rounded bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-zinc-200"
          href="https://github.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to GitHub Profile
        </a>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-8 border-zinc-800 border-b pb-4 font-bold text-2xl">
            Repository Open Source
          </h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                className="group rounded-lg border border-zinc-800 p-6 transition-colors hover:bg-zinc-900/50"
                key={i}
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-semibold text-white text-xl transition-colors group-hover:text-blue-400">
                    aylesim/generative-utils
                  </h3>
                  <span className="font-mono text-xs text-zinc-500">
                    TypeScript
                  </span>
                </div>
                <p className="mb-4 text-zinc-400">
                  A collection of utility functions for generative art,
                  including noise algorithms, vector math, and color theory
                  helpers.
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
          <h2 className="mb-8 border-zinc-800 border-b pb-4 font-bold text-2xl">
            Tutorials & Technical Insights
          </h2>
          <div className="space-y-6">
            <article className="group cursor-pointer">
              <span className="mb-2 block text-sm text-zinc-500">
                October 12, 2023
              </span>
              <h3 className="mb-2 font-bold text-2xl decoration-zinc-500 underline-offset-4 group-hover:underline">
                Optimizing Max for Live Devices for CPU Performance
              </h3>
              <p className="max-w-3xl text-zinc-400">
                A deep dive into the best practices for patching in MaxMSP to
                ensure your devices run smoothly in a heavy Ableton Live set.
                Covering polyphony, MSP signal flow, and UI refresh rates.
              </p>
              <Link
                className="mt-4 inline-block border-white border-b pb-0.5 text-white transition-colors hover:border-zinc-300 hover:text-zinc-300"
                href="/blog/optimizing-m4l"
              >
                Read Article
              </Link>
            </article>

            <article className="group cursor-pointer">
              <span className="mb-2 block text-sm text-zinc-500">
                September 05, 2023
              </span>
              <h3 className="mb-2 font-bold text-2xl decoration-zinc-500 underline-offset-4 group-hover:underline">
                Building Custom MIDI Controllers with Arduino and Node.js
              </h3>
              <p className="max-w-3xl text-zinc-400">
                How to bridge physical hardware with web technologies. A
                tutorial on using Johnny-Five and standard MIDI protocols to
                control browser-based synths.
              </p>
              <Link
                className="mt-4 inline-block border-white border-b pb-0.5 text-white transition-colors hover:border-zinc-300 hover:text-zinc-300"
                href="/blog/arduino-midi-node"
              >
                Read Article
              </Link>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
