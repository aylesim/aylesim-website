import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { About, SiteConfig } from "@/lib/content";

export function AboutPage({ about, site }: { about: About; site: SiteConfig }) {
  return (
    <main className="about-orbital">
      <div aria-hidden="true" className="about-orbital-atmosphere" />

      <nav aria-label="Primary" className="about-orbital-nav">
        <Link className="about-orbital-brand" href="/">
          aylesim
        </Link>
        <div className="about-orbital-nav-links">
          <Link href="/">Work</Link>
          <span aria-current="page">About</span>
        </div>
      </nav>

      <section className="about-orbital-content">
        <div className="about-orbital-portrait-wrap">
          {about.portrait ? (
            <figure className="about-orbital-portrait">
              <Image
                alt="Alessandro Miracapillo"
                fill
                priority
                sizes="(min-width: 900px) 32vw, 72vw"
                src={about.portrait}
                unoptimized
              />
            </figure>
          ) : null}
        </div>

        <article className="about-orbital-copy">
          <header>
            <p className="about-orbital-kicker">About</p>
            <h1>{about.lede}</h1>
            {about.subtitle ? (
              <p className="about-orbital-subtitle">{about.subtitle}</p>
            ) : null}
          </header>

          <div className="about-orbital-body">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </div>

          <section
            aria-labelledby="contact-heading"
            className="about-orbital-notes"
          >
            <h2 id="contact-heading">Contact</h2>
            <div className="about-orbital-note-grid">
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              <a href={site.resumeHref}>{site.resumeLabel}</a>
              {site.contactLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          {site.awards.length > 0 ? (
            <section
              aria-labelledby="recognition-heading"
              className="about-orbital-notes"
            >
              <h2 id="recognition-heading">Recognition</h2>
              <ul className="about-orbital-list">
                {site.awards.map((award) => (
                  <li key={`${award.year}-${award.externalHref}`}>
                    <a
                      href={award.externalHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {award.headline}
                    </a>
                    <span>
                      {award.title}, {award.year}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {site.pressMentions.length > 0 ? (
            <section
              aria-labelledby="press-heading"
              className="about-orbital-notes"
            >
              <h2 id="press-heading">Press</h2>
              <ul className="about-orbital-list">
                {site.pressMentions.map((mention) => (
                  <li key={mention.href}>
                    <a
                      href={mention.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {mention.outlet}
                    </a>
                    <span>
                      {mention.title}
                      {mention.year ? `, ${mention.year}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </section>
    </main>
  );
}
