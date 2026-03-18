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
  <Link className="group block border-zinc-800 border-b pb-12" href={href}>
    {image && (
      <div className="relative mb-6 aspect-video w-full overflow-hidden bg-zinc-900">
        <Image
          alt={title}
          className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          fill
          src={urlFor(image).width(800).height(450).url()}
        />
      </div>
    )}
    <h3 className="mb-2 font-serif-display text-2xl text-zinc-100 group-hover:underline md:text-3xl">
      {title}
    </h3>
    <p className="mb-4 max-w-xl text-zinc-400">{description}</p>
    {tags && tags.length > 0 && (
      <p className="text-sm text-zinc-500">{tags.join(" · ")}</p>
    )}
  </Link>
);

export default ProjectCard;
