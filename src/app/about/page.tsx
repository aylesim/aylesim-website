import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";
export const metadata: Metadata = {
  title: "About | Aylesim",
  description:
    "Frontend engineer and media artist in Berlin. React, TypeScript, performance-first systems, Max for Live, and interactive installations.",
};

export default function About() {
  const { about, site } = getAllContent();
  return <AboutPage about={about} site={site} />;
}
