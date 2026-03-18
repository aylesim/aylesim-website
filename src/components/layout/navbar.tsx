import Link from "next/link";

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full border-zinc-800 border-b bg-zinc-950">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
      <Link
        className="font-serif-display text-xl tracking-tight hover:opacity-80"
        href="/"
      >
        Aylesim
      </Link>
      <div className="flex flex-wrap items-center gap-4 text-sm md:gap-8">
        <Link
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/work"
        >
          Work
        </Link>
        <Link
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/devices"
        >
          Devices
        </Link>
        <Link
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/contact"
        >
          Contact
        </Link>
        <a
          className="text-zinc-400 hover:text-zinc-100"
          href="https://gumroad.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Store
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
