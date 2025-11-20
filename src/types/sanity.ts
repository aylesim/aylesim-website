export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: SanityImage
  author?: string
  publishedAt?: string
  body?: any[]
  tags?: string[]
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  featuredImage?: SanityImage
  category?: string
  tags?: string[]
  featured?: boolean
  link?: string
  github?: string
  content?: any[]
}

