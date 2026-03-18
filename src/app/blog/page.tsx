import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types/sanity";

export default async function Blog() {
  const posts: Post[] = await getPosts();

  return (
    <div className="w-full bg-white text-black">
      {/* Header */}
      <div className="border-black border-b bg-zinc-50 p-6 md:p-12 lg:p-20">
        <div className="max-w-4xl">
          <span className="mb-4 block font-bold text-accent text-xs uppercase tracking-wide">
            Writing & Thoughts
          </span>
          <h1 className="mb-8 font-serif-display text-5xl md:text-7xl">Blog</h1>
          <p className="max-w-2xl font-medium text-xl leading-tight md:text-2xl">
            Thoughts on creative coding, sound design, and the future of art
            technology.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="border-black border-t p-12 text-center">
          <p className="text-zinc-500 italic">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              className={`border-black border-r border-b ${
                index % 3 === 2 ? "md:border-r-0" : ""
              }`}
              key={post._id}
            >
              <Link
                className="group block h-full"
                href={`/blog/${post.slug.current}`}
              >
                <div className="flex h-full flex-col bg-white transition-colors hover:bg-zinc-50">
                  {post.mainImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                      <Image
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        src={urlFor(post.mainImage)
                          .width(800)
                          .height(600)
                          .url()}
                      />
                    </div>
                  )}
                  <div className="flex flex-grow flex-col p-6">
                    <h2 className="mb-3 font-serif-display text-2xl transition-colors group-hover:text-accent md:text-3xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-3 flex-grow text-sm text-zinc-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between border-zinc-200 border-t pt-4">
                      <span className="font-mono text-xs text-zinc-500">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : ""}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="font-mono text-xs text-zinc-500">
                          {post.tags.length}{" "}
                          {post.tags.length === 1 ? "tag" : "tags"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
