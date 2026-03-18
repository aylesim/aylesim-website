export type Device = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  category: "generative" | "fx" | "utility" | "sequencer";
  featured: boolean;
  demoVideo?: string;
  buyLink: string;
  store: "gumroad" | "isotonik";
};

export const devices: Device[] = [
  {
    id: "birds",
    name: "Birds",
    slug: "birds",
    description:
      "Generative bird call synthesis. Create evolving flocks of sonic creatures that respond to your input. Organic, unpredictable, musical.",
    price: "€29",
    category: "generative",
    featured: true,
    buyLink: "https://gumroad.com/aylesim/birds",
    store: "gumroad",
  },
  {
    id: "knob-studio",
    name: "Knob Studio",
    slug: "knob-studio",
    description:
      "Advanced parameter control for Ableton Live. Multi-destination mapping, custom LFOs, physics-based modulation.",
    price: "€19",
    category: "utility",
    featured: false,
    buyLink: "https://gumroad.com/aylesim/knob-studio",
    store: "gumroad",
  },
  {
    id: "freesound4live",
    name: "Freesound4Live",
    slug: "freesound4live",
    description:
      "Browse and drop samples from the Freesound database directly into your Live set. Instant integration.",
    price: "Free",
    category: "utility",
    featured: false,
    buyLink: "https://github.com/aylesim/freesound4live",
    store: "gumroad",
  },
  {
    id: "spectral-morph",
    name: "Spectral Morph",
    slug: "spectral-morph",
    description:
      "Real-time spectral processing. Freeze, blur, and morph between audio signals using FFT analysis.",
    price: "€24",
    category: "fx",
    featured: false,
    buyLink: "https://gumroad.com/aylesim/spectral-morph",
    store: "gumroad",
  },
  {
    id: "granular-drift",
    name: "Granular Drift",
    slug: "granular-drift",
    description:
      "Generative granular processor. Scatter and reassemble audio into clouds of texture. Perfect for ambient and experimental sound design.",
    price: "€22",
    category: "generative",
    featured: false,
    buyLink: "https://gumroad.com/aylesim/granular-drift",
    store: "gumroad",
  },
  {
    id: "modular-sequencer",
    name: "Modular Sequencer",
    slug: "modular-sequencer",
    description:
      "Step sequencer with probability gates, pattern variations, and MIDI/CV output for hardware integration.",
    price: "€27",
    category: "sequencer",
    featured: false,
    buyLink: "https://gumroad.com/aylesim/modular-sequencer",
    store: "gumroad",
  },
];

export const deviceCategories = [
  { id: "all", label: "All" },
  { id: "generative", label: "Generative" },
  { id: "fx", label: "FX" },
  { id: "utility", label: "Utility" },
  { id: "sequencer", label: "Sequencer" },
] as const;
