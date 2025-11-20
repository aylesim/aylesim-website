import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { getProjectBySlug, getProjects } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/types/sanity";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: Project) => ({
    slug: project.slug.current,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project: Project | null = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const portableTextComponents = {
    types: {
      image: ({
        value,
      }: {
        value: { asset?: { _ref?: string }; alt?: string };
      }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8">
            <Image
              alt={value.alt || "Project image"}
              className="rounded-lg"
              height={800}
              src={urlFor(value).width(1200).height(800).url()}
              width={1200}
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="mt-8 mb-4 font-bold text-4xl">{children}</h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-6 mb-3 font-bold text-3xl">{children}</h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mt-4 mb-2 font-semibold text-2xl">{children}</h3>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-4 text-zinc-300 leading-relaxed">{children}</p>
      ),
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <Link
        className="mb-8 inline-block text-zinc-400 transition-colors hover:text-white"
        href="/selected-works"
      >
        ← Back to works
      </Link>

      {project.featuredImage && (
        <div className="relative mb-12 h-[60vh] overflow-hidden rounded-xl border border-zinc-800">
          <Image
            alt={project.title}
            className="object-cover"
            fill
            src={urlFor(project.featuredImage).width(1200).height(800).url()}
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl">
          {project.title}
        </h1>
        {project.description && (
          <p className="mb-6 text-xl text-zinc-400">{project.description}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {project.link && (
            <a
              className="rounded bg-white px-6 py-2 font-bold text-black transition-colors hover:bg-zinc-200"
              href={project.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              View Project
            </a>
          )}
          {project.github && (
            <a
              className="rounded border border-zinc-700 px-6 py-2 font-bold text-white transition-colors hover:bg-zinc-800"
              href={project.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {project.content && project.content.length > 0 && (
        <div className="prose prose-invert max-w-none">
          <PortableText
            components={portableTextComponents}
            value={project.content}
          />
        </div>
      )}
    </div>
  );
}
