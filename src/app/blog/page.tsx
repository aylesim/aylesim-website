import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/sanity";

export default async function Blog() {
  const posts: Post[] = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-zinc-400">
          Thoughts on creative coding, sound design, and the future of art
          technology.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 border-dashed p-12 text-center">
          <p className="text-zinc-500 italic">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              className="group block"
              href={`/blog/${post.slug.current}`}
              key={post._id}
            >
              <div className="hover:-translate-y-1 flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-600">
                {post.mainImage && (
                  <div className="relative h-48 overflow-hidden bg-zinc-800">
                    <Image
                      alt={post.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2 font-bold text-xl transition-colors group-hover:text-white">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-zinc-400">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between border-zinc-800 border-t pt-4">
                    <span className="text-xs text-zinc-500">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : ""}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs text-zinc-500">
                        {post.tags.length}{" "}
                        {post.tags.length === 1 ? "tag" : "tags"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
