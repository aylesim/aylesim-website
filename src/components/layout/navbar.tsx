import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-zinc-800 border-b bg-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              className="font-bold text-xl uppercase tracking-tighter transition-colors hover:text-zinc-400"
              href="/"
            >
              Aylesim
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                className="rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-zinc-800"
                href="/about"
              >
                About
              </Link>
              <Link
                className="rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-zinc-800"
                href="/tools"
              >
                Tools
              </Link>
              <Link
                className="rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-zinc-800"
                href="/selected-works"
              >
                Works
              </Link>
              <Link
                className="rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-zinc-800"
                href="/code-technology"
              >
                Code
              </Link>
              <Link
                className="rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-zinc-800"
                href="/blog"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button placeholder - keeping it simple for first pass */}
            <span className="text-xs text-zinc-500">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
