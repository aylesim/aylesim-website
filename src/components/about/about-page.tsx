import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PageFrame } from "@/components/site/site-chrome";
import type { About, SiteConfig } from "@/lib/content";

export function AboutPage({
  about,
  brand,
  site,
}: {
  about: About;
  brand: string;
  site: SiteConfig;
}) {
  return (
    <PageFrame brand={brand} contactEmail={site.contactEmail} current="about">
      <article className="page-copy">
        {about.portrait ? (
          <figure className="about-portrait">
            <Image
              alt="Alessandro Miracapillo"
              fill
              priority
              sizes="(min-width: 900px) 36vw, 88vw"
              src={about.portrait}
              unoptimized
            />
          </figure>
        ) : null}

        <div className="page-copy-body">
          <p className="page-kicker">About</p>
          <h1>{about.lede}</h1>
          {about.subtitle ? (
            <p className="page-lede">{about.subtitle}</p>
          ) : null}

          <div className="page-prose">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </div>

          <section className="page-block">
            <h2>Contact</h2>
            <div className="page-links">
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
            <section className="page-block">
              <h2>Recognition</h2>
              <ul className="page-list">
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
            <section className="page-block">
              <h2>Press</h2>
              <ul className="page-list">
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
        </div>
      </article>
    </PageFrame>
  );
}
