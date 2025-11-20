import { client } from '@/sanity/lib/client'
import * as queries from '@/sanity/lib/queries'

export async function getPosts() {
  return await client.fetch(queries.postQuery)
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(queries.postBySlugQuery, { slug })
}

export async function getProjects() {
  return await client.fetch(queries.projectQuery)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(queries.projectBySlugQuery, { slug })
}

export async function getFeaturedProjects() {
  return await client.fetch(queries.featuredProjectsQuery)
}

export async function getProjectsByCategory(category: string) {
  return await client.fetch(queries.projectsByCategoryQuery, { category })
}

