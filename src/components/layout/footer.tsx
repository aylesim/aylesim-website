const Footer = () => (
  <footer className="border-zinc-800 border-t px-6 py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
      <span className="text-zinc-500">© 2025 Aylesim</span>
      <div className="flex gap-6">
        <a
          className="text-zinc-500 hover:text-zinc-100 hover:underline"
          href="https://instagram.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-100 hover:underline"
          href="https://linkedin.com/in/alessandromiracapillo"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-100 hover:underline"
          href="https://github.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-100 hover:underline"
          href="https://gumroad.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gumroad
        </a>
        <a
          className="text-zinc-500 hover:text-zinc-100 hover:underline"
          href="mailto:hello@aylesim.com"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
