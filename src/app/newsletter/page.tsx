export default function Newsletter() {
  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="max-w-4xl">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Stay Connected
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">
            Newsletter
          </h1>
          <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            Receive exclusive content, updates on new projects, tutorials, and
            insights into the world of creative technology.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <section className="mx-auto max-w-3xl p-6 md:p-12 lg:p-20">
        <div className="border border-black p-8 md:p-12">
          <form className="space-y-6">
            <div>
              <label
                className="mb-2 block font-bold text-xs text-zinc-600 uppercase tracking-wide"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full border border-black bg-white px-4 py-3 text-black transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                type="email"
              />
            </div>

            <div>
              <label
                className="mb-2 block font-bold text-xs text-zinc-600 uppercase tracking-wide"
                htmlFor="name"
              >
                Name (optional)
              </label>
              <input
                className="w-full border border-black bg-white px-4 py-3 text-black transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                id="name"
                name="name"
                placeholder="Your name"
                type="text"
              />
            </div>

            <div className="flex items-start">
              <input
                className="mt-1 mr-3 border-black"
                id="privacy"
                name="privacy"
                required
                type="checkbox"
              />
              <label className="text-sm text-zinc-700" htmlFor="privacy">
                I accept the{" "}
                <a
                  className="border-black border-b text-black transition-colors hover:border-accent hover:text-accent"
                  href="/privacy"
                >
                  privacy policy
                </a>{" "}
                and the processing of personal data.
              </label>
            </div>

            <button
              className="w-full border border-black bg-black px-6 py-3 font-bold text-white uppercase tracking-wide transition-colors hover:border-accent hover:bg-accent"
              type="submit"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-12 border-black border-t pt-8">
            <h3 className="mb-6 font-bold text-xs text-zinc-600 uppercase tracking-wide">
              What you&apos;ll receive:
            </h3>
            <ul className="space-y-3 text-sm text-zinc-800">
              <li className="flex items-start">
                <span className="mr-3 font-bold text-accent">•</span>
                <span>Updates on new projects and installations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold text-accent">•</span>
                <span>Tutorials and technical insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold text-accent">•</span>
                <span>Behind the scenes of creative processes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold text-accent">•</span>
                <span>Early access to new tools and resources</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold text-accent">•</span>
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
      </section>
    </div>
  );
}
