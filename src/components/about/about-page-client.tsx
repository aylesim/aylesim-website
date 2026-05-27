"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { About, AboutSection } from "@/lib/content";
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

const cardShell =
  "relative overflow-hidden border border-(--index-divider) bg-(--foreground)/[0.03]";

interface SectionAccent {
  border: string;
  label: string;
  h3: string;
  index: string;
}

const SECTION_ACCENT: Record<string, SectionAccent> = {
  "Who I am": {
    border: "border-(--accent)/40",
    label: "text-(--accent)",
    h3: "text-(--accent)",
    index: "text-(--accent)/25",
  },
  "What I do": {
    border: "border-(--role-audio)/35",
    label: "text-(--role-audio)",
    h3: "text-(--role-audio)",
    index: "text-(--role-audio)/20",
  },
  "How I work": {
    border: "border-(--role-web)/35",
    label: "text-(--role-web)",
    h3: "text-(--role-web)",
    index: "text-(--role-web)/20",
  },
  Community: {
    border: "border-(--accent)/40",
    label: "text-(--accent)",
    h3: "text-(--accent)",
    index: "text-(--accent)/25",
  },
};

const DEFAULT_ACCENT: SectionAccent = {
  border: "border-(--index-divider)",
  label: "text-(--text-muted)",
  h3: "text-(--accent)",
  index: "text-(--foreground)/10",
};

const H3_ACCENT: Record<string, string> = {
  "Audio software": "text-(--role-audio)",
  "Web development": "text-(--role-web)",
  "Installations & live AV": "text-(--role-creative)",
};

function sectionAccent(label: string): SectionAccent {
  return SECTION_ACCENT[label] ?? DEFAULT_ACCENT;
}

function sectionId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface IndexItem {
  id: string;
  label: string;
}

function AboutSectionNav({
  items,
  activeId,
}: {
  items: IndexItem[];
  activeId: string | null;
}) {
  return (
    <nav
      aria-label="About sections"
      className="sticky top-24 hidden shrink-0 self-start lg:block"
    >
      <p className="mb-4 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
        Index
      </p>
      <ul className="space-y-2 border-(--index-divider) border-l border-dotted pl-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                className={`block text-sm leading-snug tracking-tight transition-colors ${
                  isActive
                    ? "text-(--accent)"
                    : "text-(--text-muted) hover:text-(--foreground)"
                }`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AboutMarkdown({
  source,
  accent,
}: {
  source: string;
  accent: SectionAccent;
}) {
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
        h3: ({ children }) => {
          let title = "";
          if (typeof children === "string") {
            title = children;
          } else if (Array.isArray(children)) {
            title = children.join("");
          }
          const h3Class = H3_ACCENT[title] ?? accent.h3;

          return (
            <div className="micro-divider-top mt-10 pt-8 first:mt-0 first:border-0 first:bg-none first:pt-0 md:pt-10">
              <h3
                className={`mb-4 font-mono text-[10px] uppercase tracking-widest ${h3Class}`}
              >
                {children}
              </h3>
            </div>
          );
        },
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

function AboutSectionCard({
  section,
  index,
}: {
  section: AboutSection;
  index: number;
}) {
  const accent = sectionAccent(section.label);
  const isWide = section.label === "What I do";

  return (
    <article
      className={`${cardShell} ${accent.border} scroll-mt-24 border-t-2 px-6 py-10 md:scroll-mt-28 md:px-10 md:py-14 lg:px-14 lg:py-16`}
      id={sectionId(section.label)}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute top-5 right-6 select-none font-mono text-5xl leading-none tracking-tighter md:top-6 md:right-10 md:text-7xl ${accent.index}`}
      >
        {String(index).padStart(2, "0")}
      </span>
      <header className="relative mb-8 max-w-2xl md:mb-10">
        <p
          className={`font-mono text-xs uppercase tracking-widest ${accent.label}`}
        >
          {section.label}
        </p>
      </header>
      <div className={isWide ? "max-w-5xl" : "max-w-4xl"}>
        <AboutMarkdown accent={accent} source={section.content} />
      </div>
    </article>
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

export function AboutPageClient({
  about,
  sections,
}: {
  about: About;
  sections: AboutSection[];
}) {
  const bodySections = sections.filter(
    (section) => !SKIP_SECTIONS.has(section.label)
  );
  const currentlySection = sections.find(
    (section) => section.label === "Currently"
  );

  const indexItems = useMemo<IndexItem[]>(() => {
    const items: IndexItem[] = bodySections.map((section) => ({
      id: sectionId(section.label),
      label: section.label,
    }));
    items.push({ id: "recognition", label: "Recognition" });
    if (currentlySection) {
      items.push({
        id: sectionId(currentlySection.label),
        label: currentlySection.label,
      });
    }
    items.push({ id: "contact", label: "Contact" });
    return items;
  }, [bodySections, currentlySection]);

  const [activeId, setActiveId] = useState<string | null>(
    indexItems[0]?.id ?? null
  );

  useEffect(() => {
    const elements = indexItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.35] }
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [indexItems]);

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
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/ask-ai"
          >
            Too lazy to read
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-8">
        <div className="py-10 md:py-14 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-14">
          <AboutSectionNav activeId={activeId} items={indexItems} />
          <div className="flex min-w-0 flex-col gap-5 md:gap-6">
            <section
              className={`${cardShell} grid items-start gap-8 px-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:px-10 md:py-14 lg:px-14 lg:py-16`}
            >
              <div>
                {about.subtitle ? (
                  <AboutEyebrow subtitle={about.subtitle} />
                ) : null}
                <h1 className="max-w-5xl font-normal text-4xl leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
                  {about.headline}
                </h1>
              </div>
              <p className="max-w-xl text-(--text-muted) text-base leading-relaxed md:self-end md:text-lg">
                {about.lede}
              </p>
            </section>

            {bodySections.map((section, index) => (
              <AboutSectionCard
                index={index + 1}
                key={section.label}
                section={section}
              />
            ))}

            <article
              className={`${cardShell} scroll-mt-24 border-(--accent)/40 border-t-2 px-6 py-10 md:scroll-mt-28 md:px-10 md:py-14 lg:px-14 lg:py-16`}
              id="recognition"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-5 right-6 select-none font-mono text-(--accent)/25 text-5xl leading-none tracking-tighter md:top-6 md:right-10 md:text-7xl"
              >
                {String(bodySections.length + 1).padStart(2, "0")}
              </span>
              <header className="relative mb-8 md:mb-10">
                <p className="font-mono text-(--accent) text-xs uppercase tracking-widest">
                  Recognition
                </p>
                <p className="mt-4 max-w-md text-(--text-muted) text-sm leading-relaxed">
                  State-backed award for installation work, plus press on audio
                  tools.
                </p>
              </header>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <div className="border border-(--index-divider) bg-(--foreground)/2 p-6 md:p-8">
                  <p className="mb-2 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                    {primaryAward.issuer}
                  </p>
                  <p className="text-2xl leading-snug tracking-tight md:text-3xl">
                    {primaryAward.headline}
                  </p>
                  <p className="mt-2 text-(--text-muted) text-base leading-relaxed">
                    {primaryAward.title}, {primaryAward.subtitle} (
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
                <div className="border border-(--index-divider) bg-(--foreground)/2 p-6 md:p-8">
                  <p className="mb-4 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
                    Press
                  </p>
                  <div className="space-y-1">
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
                            , {mention.title}
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
              </div>
            </article>

            {currentlySection ? (
              <article
                className={`${cardShell} scroll-mt-24 border-(--accent) border-t-2 bg-(--accent)/6 px-6 py-10 md:scroll-mt-28 md:px-10 md:py-14 lg:px-14 lg:py-16`}
                id={sectionId(currentlySection.label)}
              >
                <p className="mb-6 font-mono text-(--accent) text-xs uppercase tracking-widest">
                  {currentlySection.label}
                </p>
                <AboutMarkdown
                  accent={sectionAccent("Currently")}
                  source={currentlySection.content}
                />
              </article>
            ) : null}

            <article
              className={`${cardShell} scroll-mt-24 px-6 py-10 md:scroll-mt-28 md:px-10 md:py-14 lg:px-14 lg:py-16`}
              id="contact"
            >
              <p className="mb-8 font-mono text-(--text-muted) text-xs uppercase tracking-widest md:mb-10">
                Contact
              </p>
              <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
                <div className="flex max-w-xl flex-col gap-3">
                  <p className="text-(--text-muted) text-sm leading-relaxed">
                    {contactAvailability}
                  </p>
                  <a
                    className="text-3xl leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-5xl"
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-0 self-end">
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
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
