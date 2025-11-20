import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  image?: any;
}

const ProjectCard = ({ title, description, tags, href, image }: ProjectCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 h-full hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1">
        <div className="h-48 mb-6 bg-zinc-800 rounded w-full flex items-center justify-center overflow-hidden relative group-hover:bg-zinc-700 transition-colors">
          {image ? (
            <Image
              src={urlFor(image).width(600).height(400).url()}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-zinc-600 text-4xl font-thin group-hover:text-zinc-500">PREVIEW</span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-zinc-400 mb-4 text-sm line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags && tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-800 text-xs rounded text-zinc-400 border border-zinc-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;


