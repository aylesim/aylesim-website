import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client =
  projectId && projectId !== "placeholder"
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        useCdn: true,
      })
    : null;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!client) {
    notFound();
  }

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      publishedAt,
      body,
      "image": mainImage.asset->url
    }`,
    { slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 content-width md:py-20">
      <Link
        className="mb-8 inline-block text-[var(--text-muted)] text-sm transition-colors hover:text-[var(--foreground)]"
        href="/"
      >
        ← Back
      </Link>
      <p className="mb-2 text-[var(--text-muted)] text-sm">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mb-8 font-bold font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">
        {post.title}
      </h1>
      {post.image && (
        <div className="mb-12 aspect-video w-full overflow-hidden bg-[var(--accent)]/20">
          <Image
            alt={post.title}
            className="h-full w-full object-cover"
            height={400}
            priority
            src={post.image}
            width={800}
          />
        </div>
      )}
      <div className="max-w-3xl font-serif-display text-[var(--text-secondary)] text-lg leading-relaxed [&_a]:text-[var(--accent)] [&_a]:underline [&_h2]:mt-10 [&_h2]:font-bold [&_h2]:text-[var(--foreground)] [&_h3]:mt-8 [&_h3]:font-bold [&_h3]:text-[var(--foreground)] [&_p]:mb-4">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
