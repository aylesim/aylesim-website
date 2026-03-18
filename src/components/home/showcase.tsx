import Image from "next/image";
import Link from "next/link";
import { devices } from "@/lib/devices";
import { getLatestPosts } from "@/lib/sanity";

function formatDate(dateStr?: string) {
  if (!dateStr) {
    return "";
  }
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Showcase() {
  const [featured] = devices.filter((d) => d.featured);
  const posts = await getLatestPosts(3);

  return (
    <section className="py-16 content-width md:py-20">
      <h2 className="mb-10 font-bold font-serif-display text-2xl text-[var(--foreground)] md:text-3xl">
        Latest
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured && (
          <Link
            className="group block border border-[var(--border)] bg-[var(--bg-elevated)]/30 shadow-sm transition-all duration-500 hover:bg-[var(--bg-elevated)]/50 hover:shadow-md"
            href={`/devices/${featured.slug}`}
          >
            <div className="aspect-video w-full overflow-hidden bg-[var(--accent)]/20">
              {featured.demoVideo ? (
                <video
                  autoPlay
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loop
                  muted
                  playsInline
                  src={featured.demoVideo}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
                  Demo
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="mb-1 text-[var(--text-muted)] text-sm">Device</p>
              <h3 className="mb-2 font-serif-display text-[var(--foreground)] text-xl transition-all duration-300 group-hover:underline md:text-2xl">
                {featured.name}
              </h3>
              <p className="line-clamp-2 text-[var(--text-secondary)] text-sm leading-relaxed">
                {featured.description}
              </p>
              <span className="mt-3 inline-block font-medium text-[var(--foreground)] text-sm">
                {featured.price} →
              </span>
            </div>
          </Link>
        )}
        {posts.map((post) => (
          <Link
            className="group block border border-[var(--border)] bg-[var(--bg-elevated)]/30 shadow-sm transition-all duration-500 hover:bg-[var(--bg-elevated)]/50 hover:shadow-md"
            href={`/blog/${post.slug.current}`}
            key={post._id}
          >
            <div className="aspect-video w-full overflow-hidden bg-[var(--accent)]/20">
              {post.image ? (
                <Image
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  height={240}
                  src={post.image}
                  width={400}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
                  Blog
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="mb-1 text-[var(--text-muted)] text-sm">
                {formatDate(post.publishedAt)}
              </p>
              <h3 className="mb-2 font-serif-display text-[var(--foreground)] text-xl transition-all duration-300 group-hover:underline md:text-2xl">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-[var(--text-secondary)] text-sm leading-relaxed">
                {post.excerpt || ""}
              </p>
              <span className="mt-3 inline-block font-medium text-[var(--foreground)] text-sm">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
