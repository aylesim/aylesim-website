export default function Community() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-bold text-4xl">Community & Networking</h1>
        <p className="mx-auto max-w-2xl text-zinc-400">
          A hub for connecting with other creative technologists, sharing
          resources, and showcasing user contributions.
        </p>
      </div>

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
          <h2 className="mb-4 font-bold text-2xl">For Artists</h2>
          <p className="mb-6 text-zinc-400">
            Share your work made with Aylesim tools. Get featured in our
            showcase and join our monthly creative challenges.
          </p>
          <button
            className="w-full rounded border border-zinc-700 py-3 transition-colors hover:bg-zinc-800"
            type="button"
          >
            Join Discord
          </button>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
          <h2 className="mb-4 font-bold text-2xl">For Developers</h2>
          <p className="mb-6 text-zinc-400">
            Contribute to open-source tools, access developer documentation, and
            collaborate on experimental projects.
          </p>
          <button
            className="w-full rounded border border-zinc-700 py-3 transition-colors hover:bg-zinc-800"
            type="button"
          >
            View Documentation
          </button>
        </div>
      </div>

      <div className="border-zinc-800 border-t pt-12">
        <h2 className="mb-6 text-center font-bold text-xl">
          Latest from the Community
        </h2>
        <div className="grid grid-cols-2 gap-4 opacity-50 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              className="flex aspect-square items-center justify-center rounded bg-zinc-900"
              key={i}
            >
              <span className="text-xs text-zinc-600">User Content</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
