import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { SiteHeader } from "@/components/site-header";
import type { About, SiteConfig } from "@/lib/content";

export function AboutPage({ about, site }: { about: About; site: SiteConfig }) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg md:pl-16">
      <SiteHeader active="about" />
      <main className="mx-auto w-full max-w-[92rem] flex-1 px-4 py-6 md:px-7 md:py-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(16rem,28rem)_minmax(0,38rem)] lg:gap-12">
          {about.portrait ? (
            <figure className="overflow-hidden bg-(--surface-media)">
              <Image
                alt="Alessandro Miracapillo"
                className="h-auto w-full"
                height={1024}
                priority
                src={about.portrait}
                unoptimized
                width={768}
              />
            </figure>
          ) : null}

          <div className="max-w-xl space-y-8">
            <header className="space-y-2">
              <h1 className="font-medium text-2xl leading-snug sm:text-[1.75rem]">
                {about.lede}
              </h1>
              {about.subtitle ? (
                <p className="text-(--text-muted)">{about.subtitle}</p>
              ) : null}
            </header>

            <div className="max-w-prose leading-relaxed [&_a]:underline [&_a]:underline-offset-3 [&_p:last-child]:mb-0 [&_p]:mb-4">
              <ReactMarkdown>{about.body}</ReactMarkdown>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                <dt className="text-(--text-muted)">Email</dt>
                <dd>
                  <a href={`mailto:${site.contactEmail}`}>
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                <dt className="text-(--text-muted)">Resume</dt>
                <dd>
                  <a href={site.resumeHref}>{site.resumeLabel}</a>
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                <dt className="text-(--text-muted)">Links</dt>
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
                <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                  <dt className="text-(--text-muted)">Press</dt>
                  <dd className="space-y-2">
                    {site.pressMentions.map((mention) => (
                      <div key={mention.href}>
                        <a
                          href={mention.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {mention.outlet}
                        </a>
                        <span className="text-(--text-muted)">
                          {" "}
                          {mention.title}
                          {mention.year ? `, ${mention.year}` : ""}
                        </span>
                      </div>
                    ))}
                  </dd>
                </div>
              ) : null}
              <div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]">
                <dt className="text-(--text-muted)">Recognition</dt>
                <dd className="space-y-2">
                  {site.awards.map((award) => (
                    <div key={`${award.year}-${award.externalHref}`}>
                      <a
                        href={award.externalHref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {award.headline}
                      </a>
                      <span className="text-(--text-muted)">
                        {" "}
                        {award.title}, {award.year}
                      </span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
