const Footer = () => (
  <footer className="py-12">
    <div className="flex flex-col items-center justify-between gap-6 text-sm content-width md:flex-row">
      <span className="text-[var(--text-muted)]">© 2025 Aylesim</span>
      <div className="flex gap-6">
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="https://instagram.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </a>
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="https://linkedin.com/in/alessandromiracapillo"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="https://github.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="mailto:hello@aylesim.com"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
