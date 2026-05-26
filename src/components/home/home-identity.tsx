"use client";

import type { Project } from "@/lib/content";

interface RoleColumn {
  id: "audio" | "web" | "creative";
  label: string;
  description: string;
}

const ROLES: RoleColumn[] = [
  {
    id: "audio",
    label: "Audio Developer",
    description:
      "Max/MSP instruments and Ableton Live devices. Software built for performance — generative, mappable, released.",
  },
  {
    id: "web",
    label: "Web Developer",
    description:
      "Sites and platforms for cultural communities and organizations. Tools shaped around how people actually work.",
  },
  {
    id: "creative",
    label: "Creative Technologist",
    description:
      "Installations, AV performances, digital artworks. Systems that respond to space and the people inside it.",
  },
];

export function HomeIdentity({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-between px-8 py-10 md:px-12 md:py-14">
      <div className="flex flex-col gap-10 md:gap-14">
        <div>
          <p className="mb-1 font-mono font-normal text-(--text-muted) text-xs uppercase tracking-widest">
            Alessandro Miracapillo — Berlin
          </p>
          <h1 className="font-normal text-2xl leading-snug tracking-tight md:text-3xl">
            Programmer working across audio software,
            <br className="hidden md:block" /> web development, and creative
            technology.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {ROLES.map((role) => {
            const roleProjects = projects.filter(
              (p) => p.category === role.id && p.showInMenu
            );
            return (
              <div className="flex flex-col gap-3" key={role.id}>
                <div className="border-(--index-divider) border-t pt-3">
                  <span className="font-mono text-(--accent) text-[11px] uppercase tracking-widest">
                    {role.label}
                  </span>
                </div>
                <p className="text-(--text-muted) text-sm leading-relaxed">
                  {role.description}
                </p>
                {roleProjects.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {roleProjects.map((p) => (
                      <li key={p.slug}>
                        <button
                          className="group flex w-full items-baseline gap-2 py-0.5 text-left text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                          onClick={() => onProjectClick(p.slug)}
                          type="button"
                        >
                          <span className="select-none text-(--foreground)/20 text-[10px] transition-colors group-hover:text-(--foreground)/40">
                            →
                          </span>
                          <span>{p.title}</span>
                          {p.menuLabel && (
                            <span className="text-(--foreground)/30 text-[10px] tracking-wide">
                              {p.menuLabel}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-10 flex flex-wrap gap-x-5 gap-y-1 border-(--index-divider) border-t border-dotted pt-4">
        <span className="font-mono text-(--text-muted) text-xs">
          Italian National Arts Award — Electronic Arts, 2022
        </span>
        <span className="font-mono text-(--text-muted) text-xs">
          CDM · Attack Magazine · Rekkerd
        </span>
      </footer>
    </div>
  );
}
