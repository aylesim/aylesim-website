import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug, getProjects } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Project } from "@/types/sanity";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

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
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8">
            <Image
              src={urlFor(value).width(1200).height(800).url()}
              alt={value.alt || "Project image"}
              width={1200}
              height={800}
              className="rounded-lg"
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold mb-4 mt-8">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold mb-3 mt-6">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-semibold mb-2 mt-4">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 text-zinc-300 leading-relaxed">{children}</p>
      ),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <Link
        href="/selected-works"
        className="text-zinc-400 hover:text-white transition-colors mb-8 inline-block"
      >
        ← Torna ai lavori
      </Link>

      {project.featuredImage && (
        <div className="relative h-[60vh] mb-12 rounded-xl overflow-hidden border border-zinc-800">
          <Image
            src={urlFor(project.featuredImage).width(1200).height(800).url()}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {project.title}
        </h1>
        {project.description && (
          <p className="text-xl text-zinc-400 mb-6">{project.description}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-zinc-800 text-sm text-zinc-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
            >
              Vedi Progetto
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-zinc-700 text-white font-bold rounded hover:bg-zinc-800 transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {project.content && project.content.length > 0 && (
        <div className="prose prose-invert max-w-none">
          <PortableText
            value={project.content}
            components={portableTextComponents}
          />
        </div>
      )}
    </div>
  );
}

