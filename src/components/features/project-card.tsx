import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  image?: SanityImage;
};

const ProjectCard = ({
  title,
  description,
  tags,
  href,
  image,
}: ProjectCardProps) => (
  <Link className="group block h-full" href={href}>
    <div className="hover:-translate-y-1 h-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-600">
      <div className="relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded bg-zinc-800 transition-colors group-hover:bg-zinc-700">
        {image ? (
          <Image
            alt={title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            src={urlFor(image).width(600).height(400).url()}
          />
        ) : (
          <span className="font-thin text-4xl text-zinc-600 group-hover:text-zinc-500">
            PREVIEW
          </span>
        )}
      </div>
      <h3 className="mb-2 font-bold text-xl transition-colors group-hover:text-white">
        {title}
      </h3>
      <p className="mb-4 line-clamp-3 text-sm text-zinc-400">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <span
            className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

export default ProjectCard;
