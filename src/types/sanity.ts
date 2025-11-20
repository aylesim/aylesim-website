import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: SanityImage;
  author?: string;
  publishedAt?: string;
  body?: PortableTextBlock[];
  tags?: string[];
};

export type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  featuredImage?: SanityImage;
  category?: string;
  tags?: string[];
  featured?: boolean;
  link?: string;
  github?: string;
  content?: PortableTextBlock[];
};
