import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">About / Bio</h1>
      
      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Il Percorso</h2>
            <p>
              Il mio percorso è iniziato nel Sud Italia, radicato nell'arte sonora e nella produzione musicale. Questa iniziale fascinazione per la texture del suono si è rapidamente evoluta in una profonda curiosità per i sistemi che lo generano e lo controllano.
            </p>
            <p className="mt-4">
              Il trasferimento a Berlino ha segnato una svolta fondamentale. Immerso in una città che definisce l'avanguardia della musica elettronica e della tecnologia creativa, sono passato dall'essere un utilizzatore di strumenti all'essere un creatore di essi. Oggi opero come <strong>Artista Multidisciplinare, Creative Technologist e Sviluppatore di Sistemi Interattivi</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Filosofia & Missione</h2>
            <p>
              La mia missione è esplorare l'intersezione tra esseri umani e tecnologia. Credo che la tecnologia non debba essere solo un'utilità, ma un partner nella creatività. 
            </p>
            <p className="mt-4">
              Attraverso <strong>sistemi generativi</strong>, <strong>strumenti musicali personalizzati</strong> e <strong>installazioni interattive</strong>, mi propongo di costruire ponti che permettano alla logica algoritmica complessa di sentirsi organica ed espressiva nelle mani umane.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Riconoscimenti & Community</h2>
            <p>
              Sono un membro attivo del <strong>Max Berlin Network</strong>, collaborando regolarmente con artisti e programmatori per spingere i confini di ciò che è possibile con MaxMSP e codice generativo.
            </p>
            <p className="mt-4">
              Il mio lavoro è stato riconosciuto nella comunità della creative technology, e continuo a contribuire all'innovazione nelle comunità open-source e creative coding. Questi riconoscimenti alimentano la mia spinta a continuare a innovare e condividere conoscenza.
            </p>
          </section>
          
          <section>
            <h2 className="text-white font-semibold text-xl mb-4 uppercase tracking-wider text-sm">Storytelling</h2>
            <p>
              Ogni progetto che creo racconta una storia. Che si tratti di un dispositivo Max for Live che amplifica l'espressione musicale, di un'installazione generativa che risponde all'ambiente, o di codice open-source che abilita altri creatori, il filo conduttore è sempre lo stesso: rendere la tecnologia accessibile, espressiva e profondamente umana.
            </p>
            <p className="mt-4">
              Il mio approccio combina rigore tecnico con sensibilità artistica, esplorando come algoritmi e sistemi possano diventare strumenti di espressione personale e collettiva.
            </p>
          </section>
        </div>

        <aside className="space-y-10">
          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-white font-bold mb-6">Skills Tecniche</h3>
            
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
            <h3 className="text-white font-bold mb-4">Contatti</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Interessato a collaborazioni o sviluppo personalizzato?
            </p>
            <a href="mailto:contact@aylesim.com" className="block text-center bg-white text-black font-bold py-2 rounded hover:bg-zinc-200 transition-colors">
              Contattami
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}


