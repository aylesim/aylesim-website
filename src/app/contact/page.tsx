const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/alessandromiracapillo" },
  { label: "GitHub", href: "https://github.com/aylesim" },
  { label: "Instagram", href: "https://instagram.com/aylesim" },
  { label: "Gumroad", href: "https://gumroad.com/aylesim" },
  { label: "Isotonik Studios", href: "https://isotonikstudios.com" },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <h1 className="mb-16 font-serif-display text-4xl md:text-5xl">Contact</h1>

      <a
        className="mb-12 block text-xl text-zinc-300 hover:text-zinc-100 hover:underline md:text-2xl"
        href="mailto:hello@aylesim.com"
      >
        hello@aylesim.com
      </a>

      <div className="mb-12 flex flex-wrap gap-6 text-sm">
        {links.map((link) => (
          <a
            className="text-zinc-400 hover:text-zinc-100 hover:underline"
            href={link.href}
            key={link.label}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mb-12">
        <a
          className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
          href="https://cal.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Book a call
        </a>
      </div>

      <p className="text-sm text-zinc-500">
        Open to studio collaborations, commissions, and freelance projects.
      </p>
    </div>
  );
}
