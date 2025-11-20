import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tighter uppercase block mb-4">Aylesim</span>
            <p className="text-zinc-400 text-sm max-w-md">
              Multidisciplinary Artist & Creative Technologist. Exploring the intersection of humans and technology through generative systems and interactive installations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-zinc-300">Navigation</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
              <li><Link href="/selected-works" className="hover:text-white transition-colors">Selected Works</Link></li>
              <li><Link href="/code-technology" className="hover:text-white transition-colors">Code & Technology</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-zinc-300">Connect</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Aylesim. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-zinc-600">Berlin / South Italy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


