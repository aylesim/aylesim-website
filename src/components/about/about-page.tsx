"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { PageFrame } from "@/components/site/site-chrome";
import type { About, SiteConfig } from "@/lib/content";
import { spiralPoses } from "@/lib/tile-layout";
import type { buildWorkMenu } from "@/lib/work-menu";

gsap.registerPlugin(useGSAP);

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AboutPage({
  about,
  brand,
  site,
  workMenu,
}: {
  about: About;
  brand: string;
  site: SiteConfig;
  workMenu: ReturnType<typeof buildWorkMenu>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const hasNotes = site.awards.length > 0 || site.pressMentions.length > 0;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reducedMotion()) {
        return;
      }
      const cards = gsap.utils.toArray<HTMLElement>(".about-card", root);
      const poses = spiralPoses(cards.length, 108);
      cards.forEach((card, index) => {
        const pose = poses[index] ?? { x: 0, y: 0 };
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            rotation: -8,
            x: pose.x * 0.42,
            y: pose.y * 0.42 + 36,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            duration: 0.32,
            delay: index * 0.07,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <PageFrame brand={brand} current="about" workMenu={workMenu}>
      <article className="about" ref={rootRef}>
        <header className="about-card about-card--hero">
          <div className="about-card-inner">
            <p className="about-kicker">About</p>
            <h1>{about.lede}</h1>
            {about.subtitle ? (
              <p className="about-subtitle">{about.subtitle}</p>
            ) : null}
            <p className="about-availability">{site.contactAvailability}</p>
            <p className="about-stack">{site.webDeveloperStack}</p>
          </div>
        </header>

        <section className="about-card about-card--body">
          <div className="about-card-inner about-prose">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </div>
        </section>

        <section className="about-card about-card--contact" id="contact">
          <div className="about-card-inner">
            <h2 className="about-section-title">Contact</h2>
            <div className="about-chips">
              <a className="about-chip" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
              {site.contactLinks.map((link) => (
                <a
                  className="about-chip"
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

        {hasNotes ? (
          <div className="about-notes">
            {site.awards.length > 0 ? (
              <section className="about-card about-card--note">
                <div className="about-card-inner">
                  <h2 className="about-section-title">Recognition</h2>
                  <ul className="about-entries">
                    {site.awards.map((award) => (
                      <li
                        className="about-entry"
                        key={`${award.year}-${award.externalHref}`}
                      >
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
                </div>
              </section>
            ) : null}

            {site.pressMentions.length > 0 ? (
              <section className="about-card about-card--note">
                <div className="about-card-inner">
                  <h2 className="about-section-title">Press</h2>
                  <ul className="about-entries">
                    {site.pressMentions.map((mention) => (
                      <li className="about-entry" key={mention.href}>
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
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </article>
    </PageFrame>
  );
}
