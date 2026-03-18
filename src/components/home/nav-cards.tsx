import Link from "next/link";

const cards = [
  { href: "/work", label: "Work", description: "Portfolio for studios" },
  { href: "/devices", label: "Devices", description: "Max4Live instruments" },
  { href: "/about", label: "About", description: "Bio & CV" },
];

export default function NavCards() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            className="group block rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50"
            href={card.href}
            key={card.href}
          >
            <h2 className="mb-1 font-serif-display text-xl text-zinc-100 group-hover:underline md:text-2xl">
              {card.label} →
            </h2>
            <p className="text-sm text-zinc-500">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
