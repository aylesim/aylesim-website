import { groq } from 'next-sanity'

export const postQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  author,
  publishedAt,
  tags
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  author,
  publishedAt,
  body,
  tags
}`

export const projectQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  featuredImage,
  category,
  tags,
  featured,
  link,
  github
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  featuredImage,
  category,
  tags,
  featured,
  link,
  github,
  content
}`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  featuredImage,
  category,
  tags,
  featured
}`

export const projectsByCategoryQuery = groq`*[_type == "project" && category == $category] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  featuredImage,
  category,
  tags,
  featured
}`

