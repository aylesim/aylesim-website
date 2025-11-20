import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tighter uppercase hover:text-zinc-400 transition-colors">
              Aylesim
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                About
              </Link>
              <Link href="/tools" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                Tools
              </Link>
              <Link href="/selected-works" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                Works
              </Link>
              <Link href="/code-technology" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                Code
              </Link>
              <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
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


