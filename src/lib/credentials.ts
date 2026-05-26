export const nationalArtsAwardProjectSlug = "please-set-a-password";

export const primaryAward = {
  headline: "First place, Electronic Arts",
  title: "Italian National Arts Award XV",
  subtitle: "Premio Nazionale delle Arti Italiane",
  issuer: "Ministry of University and Research (MUR), Italy",
  year: "2022",
  projectSlug: nationalArtsAwardProjectSlug,
  externalHref:
    "https://www.mur.gov.it/it/news/venerdi-03122021/universita-sono-13-i-giovani-artisti-vincitori-del-premio-nazionale-delle",
  externalLabel: "Official MUR announcement",
} as const;

export const pressMentions = [
  {
    outlet: "Create Digital Music",
    title: "Free sounds and samples in Ableton Live",
    year: "2020",
    projectSlug: "freesound4live",
    href: "https://cdm.link/free-sounds-and-samples-in-ableton-live/",
  },
  {
    outlet: "Attack Magazine",
    title: "Modulation revelation: the future of sound design",
    year: "2024",
    projectSlug: "knob-studio",
    href: "https://www.attackmagazine.com/features/long-read/modulation-revelation-the-future-of-sound-design/",
  },
  {
    outlet: "Rekkerd",
    title: "Knob Studio experimental mapping device for Live",
    year: "2024",
    projectSlug: "knob-studio",
    href: "https://rekkerd.org/aylesim-releases-knob-studio-experimental-mapping-device-for-live/",
  },
] as const;

export function projectHasNationalArtsAward(project: {
  slug: string;
  highlights: string[];
}): boolean {
  if (project.slug === nationalArtsAwardProjectSlug) {
    return true;
  }
  return project.highlights.some((h) =>
    h.toLowerCase().includes("national arts award")
  );
}
