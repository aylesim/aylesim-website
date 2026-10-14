import type { Metadata } from "next";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import { projectHref } from "@/lib/project-routes";

const pageCopy: Record<string, { title: string; description: string }> = {
  "/": {
    title:
      "Alessandro Miracapillo: instruments, installations and web interfaces",
    description:
      "Alessandro Miracapillo designs and builds software for sound and image in Berlin: music instruments and plugins (Aylesim Devices), installations and web interfaces.",
  },
  "/work": {
    title: "Work | Alessandro Miracapillo",
    description:
      "Web projects: Planetary Compendium for the Berggruen Institute, client sites and proofs of concept. Next.js, React, TypeScript.",
  },
  "/work/planetary-compendium": {
    title:
      "Planetary Compendium, North Sea chapter (2025) | Alessandro Miracapillo",
    description:
      "Scrollytelling chapter developed from the designers' Figma files. Honorary Mention, Prix Ars Electronica 2026.",
  },
  "/work/transluoghi-ecomuseo": {
    title: "Transluoghi Ecomuseo website (2024) | Alessandro Miracapillo",
    description:
      "Website for an ecomuseum in Campania, built with Next.js and PayloadCMS.",
  },
  "/instruments": {
    title:
      "Aylesim Devices: Max for Live devices and plugins | Alessandro Miracapillo",
    description:
      "Music software made since 2018: Max for Live devices for Ableton Live (Birds, Knob Studio, Disco, Freesound4Live, Lucky Notes) and plugins.",
  },
  "/instruments/birds": {
    title: "Birds, generative MIDI sequencer for Ableton Live | Aylesim",
    description:
      "A 16-step melody drawn as birds on wires, which drifts from the original within a limit you set. Max for Live.",
  },
  "/instruments/knob-studio": {
    title: "Knob Studio, modulation device for Ableton Live | Aylesim",
    description:
      "Layered functions form one waveform; reading heads send its values to mapped parameters. Max for Live.",
  },
  "/art": {
    title: "Art | Alessandro Miracapillo",
    description:
      "Installations and live visuals about surveillance, data and machine listening.",
  },
  "/art/please-set-a-password": {
    title: "Please Set a Password | Alessandro Miracapillo",
    description:
      "Installation with live feeds from unsecured cameras and sound synthesised from the images. First prize, Premio Nazionale delle Arti 2021.",
  },
  "/about": {
    title: "About | Alessandro Miracapillo",
    description:
      "Trained in electronic music, based in Berlin. Founder of Aylesim Devices and of the Max Berlin Network.",
  },
  "/contact": {
    title: "Contact | Alessandro Miracapillo",
    description: "Email, CV and links. Berlin.",
  },
  "/archive": {
    title: "Archive | Alessandro Miracapillo",
    description: "Earlier community and teaching work.",
  },
};
pageCopy["/ask-ai"] = {
  title: "JSON | Alessandro Miracapillo",
  description: "Structured JSON of this portfolio.",
};
const origin = "https://aylesim.com";

export function pageMetadata(path: string, project?: Project): Metadata {
  const fallbackTitle = project
    ? `${project.title}, ${project.year ?? "[needs year]"} | Alessandro Miracapillo`
    : "Alessandro Miracapillo";
  const copy = pageCopy[path] ?? {
    title: fallbackTitle,
    description: project?.summary ?? "Software for sound and image.",
  };
  const image = project
    ? (getProjectCover(project)?.src ?? "/media/portrait.webp")
    : "/media/portrait.webp";
  const url = new URL(path, origin).href;
  return {
    ...copy,
    alternates: { canonical: url },
    openGraph: {
      ...copy,
      type: "website",
      url,
      images: [
        { url: image, alt: project?.imageAlt ?? "Alessandro Miracapillo" },
      ],
    },
    twitter: { card: "summary_large_image", ...copy, images: [image] },
  };
}

export function projectMetadata(project: Project) {
  return pageMetadata(projectHref(project), project);
}
