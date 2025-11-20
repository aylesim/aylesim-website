export default function Newsletter() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Newsletter
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-zinc-400">
          Receive exclusive content, updates on new projects, tutorials, and
          insights into the world of creative technology.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-700 bg-linear-to-br from-zinc-800 to-zinc-900 p-10">
        <form className="space-y-6">
          <div>
            <label
              className="mb-2 block font-medium text-sm text-zinc-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded border border-zinc-600 bg-black/50 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              type="email"
            />
          </div>

          <div>
            <label
              className="mb-2 block font-medium text-sm text-zinc-300"
              htmlFor="name"
            >
              Name (optional)
            </label>
            <input
              className="w-full rounded border border-zinc-600 bg-black/50 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
              id="name"
              name="name"
              placeholder="Your name"
              type="text"
            />
          </div>

          <div className="flex items-start">
            <input
              className="mt-1 mr-3"
              id="privacy"
              name="privacy"
              required
              type="checkbox"
            />
            <label className="text-sm text-zinc-400" htmlFor="privacy">
              I accept the{" "}
              <a className="text-white hover:underline" href="/privacy">
                privacy policy
              </a>{" "}
              and the processing of personal data.
            </label>
          </div>

          <button
            className="w-full rounded bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-zinc-200"
            type="submit"
          >
            Subscribe
          </button>
        </form>

        <div className="mt-8 border-zinc-700 border-t pt-8">
          <h3 className="mb-4 font-semibold text-sm text-zinc-300">
            What you&apos;ll receive:
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Updates on new projects and installations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tutorials and technical insights</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Behind the scenes of creative processes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Early access to new tools and resources</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Invitations to events and collaborations</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-zinc-500">
        <p>
          You can unsubscribe at any time. We respect your privacy and do not
          share your data with third parties.
        </p>
      </div>
    </div>
  );
}
