const skills = [
  "Max/MSP",
  "JavaScript / Next.js",
  "Python",
  "Arduino",
  "UI/UX",
  "Creative Coding",
];

const exhibitions = ["TEDx Barletta", "Blackout Festival Turin", "Phonè Bari"];

export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <h1 className="mb-12 font-serif-display text-4xl md:text-5xl">About</h1>

      <p className="mb-12 text-lg text-zinc-300 leading-relaxed">
        I build Max/MSP instruments, interactive experiences, and creative web
        applications. I run Aylesim Devices, founded Max Berlin Network, and
        work at the intersection of sound, code, and installation.
      </p>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 font-mono text-sm text-zinc-500">Skills</h2>
          <p className="text-zinc-400">{skills.join(" · ")}</p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-sm text-zinc-500">Award</h2>
          <p className="text-zinc-300">
            Italian National Arts Award — Electronic Arts (March 2022)
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-sm text-zinc-500">Exhibitions</h2>
          <p className="text-zinc-400">{exhibitions.join(" · ")}</p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-sm text-zinc-500">Publication</h2>
          <p className="text-zinc-400">CDM — Create Digital Music (2020)</p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-sm text-zinc-500">CV</h2>
          <a
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
            download
            href="/cv.pdf"
          >
            Download
          </a>
        </div>

        <p className="text-sm text-zinc-500">
          Alessandro Miracapillo, known as Aylesim.
        </p>
      </div>
    </div>
  );
}
