import Link from "next/link";

const MASTHEAD = "aylesim";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/devices", label: "Devices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="flex items-baseline justify-between pt-6 pb-8 content-width md:pt-8 md:pb-10">
        <Link className="block" href="/">
          <h1 className="font-semibold font-serif-display text-5xl text-[var(--foreground)] tracking-wide md:text-6xl lg:text-7xl">
            {MASTHEAD}
          </h1>
        </Link>
        <nav className="flex items-baseline gap-x-4 gap-y-2 md:gap-x-6">
          {navLinks.map((item) =>
            item.external ? (
              <a
                className="font-serif-display text-[var(--text-muted)] text-sm transition-colors duration-300 hover:text-[var(--foreground)] md:text-base"
                href={item.href}
                key={item.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ) : (
              <Link
                className="font-serif-display text-[var(--text-muted)] text-sm transition-colors duration-300 hover:text-[var(--foreground)] md:text-base"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
