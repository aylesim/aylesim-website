import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { About, AboutSection } from "@/lib/content";
import { getAboutSections } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import {
  contactAvailability,
  contactEmail,
  contactLinks,
  resumeHref,
  resumeLabel,
} from "@/lib/site";

const linkClass =
  "underline decoration-(--foreground)/35 underline-offset-[3px] transition-colors hover:text-(--accent)";

const SKIP_SECTIONS = new Set(["Currently"]);

function AboutMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children, href }) => (
          <a
            className={linkClass}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-3 font-mono text-(--accent) text-[10px] uppercase tracking-widest first:mt-0">
            {children}
          </h3>
        ),
        li: ({ children }) => (
          <li className="text-(--text-muted) text-base leading-relaxed md:text-lg">
            {children}
          </li>
        ),
        p: ({ children }) => (
          <p className="max-w-3xl text-(--text-muted) text-base leading-relaxed md:text-lg [&+p]:mt-5">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-normal text-(--foreground)">
            {children}
          </strong>
        ),
        ul: ({ children }) => (
          <ul className="mt-5 list-inside list-disc space-y-2">{children}</ul>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}

function AboutSectionBlock({ section }: { section: AboutSection }) {
  return (
    <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
      <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
        {section.label}
      </p>
      <div className="max-w-4xl">
        <AboutMarkdown source={section.content} />
      </div>
    </section>
  );
}

function AboutEyebrow({ subtitle }: { subtitle: string }) {
  const [namePart, locationPart] = subtitle.split(" · ");
  const [fullName, alias] = (namePart ?? subtitle).split(" / ");

  return (
    <p className="mb-5 font-mono text-xs tracking-widest">
      <span className="text-(--accent) uppercase">{fullName?.trim()} / </span>
      <span className="text-(--accent)">{alias?.trim()}</span>
      {locationPart ? (
        <>
          <span className="text-(--text-muted)"> · </span>
          <span className="text-(--text-muted) uppercase">
            {locationPart.trim()}
          </span>
        </>
      ) : null}
    </p>
  );
}

export function AboutPage({ about }: { about: About }) {
  const sections = getAboutSections(about);
  const bodySections = sections.filter(
    (section) => !SKIP_SECTIONS.has(section.label)
  );
  const currentlySection = sections.find(
    (section) => section.label === "Currently"
  );

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-bg px-4 pt-5 pb-3 md:px-5 md:pt-6 md:pb-4">
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
        >
          <Link className="text-lg tracking-tight md:text-xl" href="/">
            Aylesim
          </Link>
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/?projects"
          >
            Projects
          </Link>
          <Link className="text-sm tracking-tight md:text-base" href="/about">
            About
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-8">
        <section className="grid items-start gap-10 border-(--index-divider) border-b border-dotted py-12 md:grid-cols-[1.15fr_0.85fr] md:py-20">
          <div>
            {about.subtitle ? <AboutEyebrow subtitle={about.subtitle} /> : null}
            <h1 className="max-w-5xl font-normal text-4xl leading-[0.98] tracking-tight md:text-7xl">
              {about.headline}
            </h1>
          </div>
          <p className="max-w-xl text-(--text-muted) text-base leading-relaxed md:self-end md:text-lg">
            {about.lede}
          </p>
        </section>

        {bodySections.map((section) => (
          <AboutSectionBlock key={section.label} section={section} />
        ))}

        <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
          <div>
            <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
              Recognition
            </p>
            <p className="mt-4 max-w-xs text-(--text-muted) text-sm leading-relaxed">
              State-backed award for installation work, plus press on audio
              tools.
            </p>
          </div>
          <div className="space-y-10">
            <div className="border-(--accent)/35 border-t-2 pt-5">
              <p className="mb-2 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                {primaryAward.issuer}
              </p>
              <p className="text-2xl leading-snug tracking-tight md:text-3xl">
                {primaryAward.headline}
              </p>
              <p className="mt-2 max-w-2xl text-(--text-muted) text-base leading-relaxed">
                {primaryAward.title} — {primaryAward.subtitle} (
                {primaryAward.year}).
              </p>
              <a
                className="mt-6 inline-block font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                href={primaryAward.externalHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {primaryAward.externalLabel} ↗
              </a>
            </div>
            <div>
              <p className="mb-3 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
                Press
              </p>
              {pressMentions.map((mention) => (
                <div
                  className="micro-divider-top grid gap-2 py-4 first:bg-none md:grid-cols-[1fr_auto]"
                  key={mention.href}
                >
                  <a
                    className="text-base leading-snug tracking-tight transition-colors hover:text-(--accent)"
                    href={mention.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-(--foreground)">
                      {mention.outlet}
                    </span>
                    <span className="text-(--text-muted)">
                      {" "}
                      — {mention.title}
                    </span>
                  </a>
                  {mention.year ? (
                    <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:text-right">
                      {mention.year}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {currentlySection ? (
          <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
            <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
              {currentlySection.label}
            </p>
            <AboutMarkdown source={currentlySection.content} />
          </section>
        ) : null}

        <section className="grid gap-8 py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
          <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
            Contact
          </p>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div className="flex max-w-xl flex-col gap-3">
              <p className="text-(--text-muted) text-sm leading-relaxed">
                {contactAvailability}
              </p>
              <a
                className="text-2xl leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-4xl"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              <a
                className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                download
                href={resumeHref}
              >
                {resumeLabel}
              </a>
              {contactLinks.map((link) => (
                <a
                  className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
