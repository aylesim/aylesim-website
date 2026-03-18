export default function Community() {
  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Connect & Collaborate
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">
            Community & Networking
          </h1>
          <p className="mx-auto max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            A hub for connecting with other creative technologists, sharing
            resources, and showcasing user contributions.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <section className="mx-auto max-w-4xl p-6 md:p-12 lg:p-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="border border-black bg-white p-8 transition-colors hover:bg-zinc-50">
            <h2 className="mb-4 font-serif-display text-2xl md:text-3xl">
              For Artists
            </h2>
            <p className="mb-6 text-zinc-700 leading-relaxed">
              Share your work made with Aylesim tools. Get featured in our
              showcase and join our monthly creative challenges.
            </p>
            <button
              className="w-full border border-black bg-black px-6 py-3 font-bold text-sm text-white uppercase tracking-wide transition-colors hover:border-accent hover:bg-accent"
              type="button"
            >
              Join Discord
            </button>
          </div>
          <div className="border border-black bg-zinc-50 p-8 transition-colors hover:bg-white">
            <h2 className="mb-4 font-serif-display text-2xl md:text-3xl">
              For Developers
            </h2>
            <p className="mb-6 text-zinc-700 leading-relaxed">
              Contribute to open-source tools, access developer documentation,
              and collaborate on experimental projects.
            </p>
            <button
              className="w-full border border-black bg-white px-6 py-3 font-bold text-black text-sm uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
              type="button"
            >
              View Documentation
            </button>
          </div>
        </div>

        {/* Community Showcase */}
        <div className="border-black border-t pt-12">
          <h2 className="mb-8 text-center font-serif-display text-2xl md:text-3xl">
            Latest from the Community
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                className="flex aspect-square items-center justify-center border border-black bg-zinc-50 transition-colors hover:bg-white"
                key={i}
              >
                <span className="font-mono text-xs text-zinc-400 uppercase">
                  User Content
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
