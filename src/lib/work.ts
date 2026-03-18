export type CaseStudy = {
  slug: string;
  title: string;
  role: string;
  client: string;
  description: string;
  tech: string[];
  year?: string;
  liveLink?: string | null;
  longDescription?: string;
  media?: string;
  link?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "planetary-compendium",
    title: "Planetary Compendium",
    role: "Frontend Developer",
    client: "Berggruen Institute × Dark Matter Labs",
    description:
      "Interactive platform for exploring planetary-scale systems thinking. Live online experience built for collaborative sensemaking.",
    tech: ["Next.js"],
    year: "2025",
    liveLink: null,
    longDescription:
      "A live online experience built for collaborative sensemaking around complex planetary challenges. The platform enables participants to explore interconnected systems, contribute insights, and visualize emergent patterns in real time. Exhibited in Zürich November 2025.",
  },
  {
    slug: "aylesim-devices",
    title: "Aylesim Devices",
    role: "Instrument Builder",
    client: "Product Line",
    description:
      "Max4Live devices for musicians and producers. From concept to release on Gumroad and Isotonik.",
    tech: ["Max4Live", "Product Design", "Music Tech"],
    link: "/devices",
  },
  {
    slug: "max-berlin-network",
    title: "Max Berlin Network",
    role: "Founder & Community Manager",
    client: "Community Initiative",
    description:
      "Monthly meetups in Berlin bringing together Max/MSP practitioners. Since January 2025, at Betahaus Berlin.",
    tech: ["Community", "Events", "Max/MSP", "Berlin"],
    year: "2025",
    liveLink: "https://maxberlin.network",
    longDescription:
      "Founded and managed a community of creative technologists in Berlin. Monthly meetups bring together artists, musicians, and developers working with Max/MSP. The network has grown into a hub for knowledge sharing, collaboration, and live performances.",
  },
  {
    slug: "generative-music-system",
    title: "Generative Music System",
    role: "Creative Technologist",
    client: "Artistic Project",
    description:
      "Algorithmic music system exploring emergent composition. Real-time generative audio with visual feedback. Performed at Blackout Festival Turin.",
    tech: ["Max/MSP", "Generative", "Audio", "Installation"],
    longDescription:
      "A real-time generative audio system that explores emergent composition through algorithmic processes. The installation combines Max/MSP for audio synthesis with visual feedback, creating an immersive experience where sound and image evolve together.",
  },
];

export const caseStudiesBySlug: Record<string, CaseStudy> = Object.fromEntries(
  caseStudies.filter((c) => !c.link).map((c) => [c.slug, c])
);
