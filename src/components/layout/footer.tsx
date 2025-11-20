import Link from "next/link";

const Footer = () => (
  <footer className="mt-auto border-zinc-800 border-t bg-zinc-900">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <span className="mb-4 block font-bold text-xl uppercase tracking-tighter">
            Aylesim
          </span>
          <p className="max-w-md text-sm text-zinc-400">
            Multidisciplinary Artist & Creative Technologist. Exploring the
            intersection of humans and technology through generative systems and
            interactive installations.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-sm text-zinc-300 uppercase tracking-wider">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/tools"
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/selected-works"
              >
                Selected Works
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/code-technology"
              >
                Code & Technology
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/newsletter"
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-sm text-zinc-300 uppercase tracking-wider">
            Connect
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <a
                className="transition-colors hover:text-white"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-white"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-white"
                href="https://linkedin.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-white"
                href="mailto:contact@example.com"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between border-zinc-800 border-t pt-8 md:flex-row">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Aylesim. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <p className="text-xs text-zinc-600">Berlin / South Italy</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
