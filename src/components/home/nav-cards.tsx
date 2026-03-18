import Link from "next/link";

const cards = [
  { href: "/work", label: "Work", description: "Portfolio for studios" },
  { href: "/devices", label: "Devices", description: "Max4Live instruments" },
  { href: "/about", label: "About", description: "Bio & CV" },
];

export default function NavCards() {
  return (
    <section className="py-16 content-width md:py-20">
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            className="group block border border-[var(--border)] bg-[var(--bg-elevated)]/30 p-8 transition-all duration-500 hover:bg-[var(--bg-elevated)]/50"
            href={card.href}
            key={card.href}
          >
            <h2 className="mb-2 font-serif-display text-[var(--foreground)] text-xl transition-all duration-300 group-hover:underline md:text-2xl">
              {card.label} →
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
