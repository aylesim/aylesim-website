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

export type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  image?: string;
};

export async function getLatestPosts(limit = 3): Promise<SanityPost[]> {
  if (!client) {
    return [];
  }
  try {
    const posts = await client.fetch<SanityPost[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        "image": mainImage.asset->url
      }`
    );
    return posts ?? [];
  } catch {
    return [];
  }
}
