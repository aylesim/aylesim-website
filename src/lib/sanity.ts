import { client } from "@/sanity/lib/client";
import {
  featuredProjectsQuery,
  postBySlugQuery,
  postQuery,
  projectBySlugQuery,
  projectQuery,
  projectsByCategoryQuery,
} from "@/sanity/lib/queries";

export async function getPosts() {
  return await client.fetch(postQuery);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(postBySlugQuery, { slug });
}

export async function getProjects() {
  return await client.fetch(projectQuery);
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(projectBySlugQuery, { slug });
}

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery);
}

export async function getProjectsByCategory(category: string) {
  return await client.fetch(projectsByCategoryQuery, { category });
}
