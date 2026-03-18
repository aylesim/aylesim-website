import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudiesBySlug } from "@/lib/work";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(caseStudiesBySlug).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesBySlug[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link
        className="mb-12 block text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
        href="/work"
      >
        ← Work
      </Link>

      <p className="mb-1 text-sm text-zinc-500">{study.role}</p>
      <h1 className="mb-6 font-serif-display text-4xl text-zinc-100 md:text-5xl">
        {study.title}
      </h1>
      <p className="mb-8 text-xl text-zinc-400">{study.description}</p>

      {study.longDescription && (
        <p className="mb-8 text-zinc-300 leading-relaxed">
          {study.longDescription}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
        {study.year && <span>{study.year}</span>}
        <span>{study.tech.join(" · ")}</span>
        {study.liveLink && (
          <a
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
            href={study.liveLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
}
