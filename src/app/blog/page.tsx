import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/sanity';
import { urlFor } from '@/sanity/lib/image';
import { Post } from '@/types/sanity';

export default async function Blog() {
  const posts: Post[] = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Blog</h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
          Thoughts on creative coding, sound design, and the future of art technology.
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="p-12 border border-dashed border-zinc-800 rounded-lg text-center">
          <p className="text-zinc-500 italic">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {post.mainImage && (
                  <div className="relative h-48 bg-zinc-800 overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-zinc-400 mb-4 text-sm line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                    <span className="text-xs text-zinc-500">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs text-zinc-500">
                        {post.tags.length} {post.tags.length === 1 ? 'tag' : 'tags'}
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


