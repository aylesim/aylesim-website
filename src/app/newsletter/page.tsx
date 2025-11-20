export default function Newsletter() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Newsletter</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Ricevi contenuti esclusivi, aggiornamenti su nuovi progetti, tutorial e approfondimenti sul mondo della creative technology.
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
              Nome (opzionale)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Il tuo nome"
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
              Accetto la{" "}
              <a href="/privacy" className="text-white hover:underline">
                privacy policy
              </a>{" "}
              e il trattamento dei dati personali.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold px-6 py-3 rounded hover:bg-zinc-200 transition-colors"
          >
            Iscriviti
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Cosa riceverai:</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Aggiornamenti su nuovi progetti e installazioni</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tutorial e approfondimenti tecnici</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Dietro le quinte dei processi creativi</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Accesso anticipato a nuovi tool e risorse</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Inviti a eventi e collaborazioni</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-zinc-500">
        <p>
          Puoi disiscriverti in qualsiasi momento. Rispettiamo la tua privacy e non condividiamo i tuoi dati con terze parti.
        </p>
      </div>
    </div>
  );
}

