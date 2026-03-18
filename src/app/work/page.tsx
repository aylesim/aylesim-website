import Link from "next/link";
import { caseStudies } from "@/lib/work";

export default function Work() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="mb-16 font-serif-display text-4xl md:text-5xl">Work</h1>

      <div className="space-y-16">
        {caseStudies.map((study) => (
          <Link
            className="group block"
            href={study.link ?? `/work/${study.slug}`}
            key={study.slug}
          >
            <p className="mb-1 text-sm text-zinc-500">{study.role}</p>
            <h2 className="mb-2 font-serif-display text-2xl text-zinc-100 group-hover:underline md:text-3xl">
              {study.title}
            </h2>
            <p className="max-w-2xl text-zinc-400">{study.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
