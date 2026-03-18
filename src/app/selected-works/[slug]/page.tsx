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
          <div className="my-12">
            <Image
              alt={value.alt || "Project image"}
              className="h-auto w-full"
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
        <h1 className="mt-12 mb-6 font-serif-display text-4xl text-zinc-100 md:text-5xl">
          {children}
        </h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="mt-10 mb-4 font-serif-display text-3xl text-zinc-100 md:text-4xl">
          {children}
        </h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mt-8 mb-3 font-serif-display text-2xl text-zinc-100 md:text-3xl">
          {children}
        </h3>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-6 text-lg text-zinc-300 leading-relaxed">{children}</p>
      ),
    },
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link
        className="mb-12 block text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
        href="/selected-works"
      >
        ← Selected Works
      </Link>

      <h1 className="mb-6 font-serif-display text-4xl text-zinc-100 md:text-5xl">
        {project.title}
      </h1>
      {project.description && (
        <p className="mb-12 text-xl text-zinc-400">{project.description}</p>
      )}

      {project.tags && project.tags.length > 0 && (
        <p className="mb-12 text-sm text-zinc-500">
          {project.tags.join(" · ")}
        </p>
      )}

      <div className="mb-12 flex gap-4">
        {project.link && (
          <a
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            View project
          </a>
        )}
        {project.github && (
          <a
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
            href={project.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        )}
      </div>

      {project.featuredImage && (
        <div className="mb-12">
          <Image
            alt={project.title}
            className="h-auto w-full"
            height={800}
            src={urlFor(project.featuredImage).width(1200).height(800).url()}
            width={1200}
          />
        </div>
      )}

      {project.content && project.content.length > 0 && (
        <div>
          <PortableText
            components={portableTextComponents}
            value={project.content}
          />
        </div>
      )}
    </div>
  );
}
