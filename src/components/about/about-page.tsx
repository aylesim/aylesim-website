import ReactMarkdown from "react-markdown";
import { SiteHeader } from "@/components/site-header";
import type { About, SiteConfig } from "@/lib/content";

export function AboutPage({ about, site }: { about: About; site: SiteConfig }) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="about" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="max-w-xl space-y-6">
          <header className="space-y-1">
            <h1 className="text-base">{about.lede}</h1>
            {about.subtitle ? (
              <p className="text-(--text-muted) text-xs">{about.subtitle}</p>
            ) : null}
          </header>

          <div className="text-(--foreground) text-sm leading-relaxed [&_p:last-child]:mb-0 [&_p]:mb-3">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </div>

          <dl className="space-y-3 border-(--index-divider) border-t pt-6 text-sm">
            <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
              <dt className="text-(--text-faint)">Email</dt>
              <dd>
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
              <dt className="text-(--text-faint)">Resume</dt>
              <dd>
                <a href={site.resumeHref}>{site.resumeLabel}</a>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
              <dt className="text-(--text-faint)">Links</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1">
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
              </dd>
            </div>
            {site.pressMentions.length > 0 ? (
              <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
                <dt className="text-(--text-faint)">Press</dt>
                <dd className="space-y-1">
                  {site.pressMentions.map((mention) => (
                    <div key={mention.href}>
                      <a
                        href={mention.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {mention.outlet}
                      </a>
                      <span className="text-(--text-faint)">
                        {" "}
                        · {mention.title}
                        {mention.year ? ` (${mention.year})` : ""}
                      </span>
                    </div>
                  ))}
                </dd>
              </div>
            ) : null}
            <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
              <dt className="text-(--text-faint)">Prizes</dt>
              <dd className="space-y-1">
                {site.awards.map((award) => (
                  <div key={`${award.year}-${award.externalHref}`}>
                    <a
                      href={award.externalHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {award.headline}
                    </a>
                    <span className="text-(--text-faint)">
                      {" "}
                      · {award.title} ({award.year})
                    </span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
