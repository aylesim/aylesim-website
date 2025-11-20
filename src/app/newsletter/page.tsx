export default function Newsletter() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Newsletter</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Receive exclusive content, updates on new projects, tutorials, and insights into the world of creative technology.
        </p>
      </div>

      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-10 rounded-2xl border border-zinc-700">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full bg-black/50 border border-zinc-600 rounded px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full bg-black/50 border border-zinc-600 rounded px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 mr-3"
            />
            <label htmlFor="privacy" className="text-sm text-zinc-400">
              I accept the{" "}
              <a href="/privacy" className="text-white hover:underline">
                privacy policy
              </a>{" "}
              and the processing of personal data.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold px-6 py-3 rounded hover:bg-zinc-200 transition-colors"
          >
            Subscribe
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">What you'll receive:</h3>
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
          You can unsubscribe at any time. We respect your privacy and do not share your data with third parties.
        </p>
      </div>
    </div>
  );
}

