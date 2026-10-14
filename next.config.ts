import type { NextConfig } from "next";
import { getAllContent } from "./src/lib/content";
import { projectHref } from "./src/lib/project-routes";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      ...getAllContent()
        .projects.filter((project) => project.category !== "community")
        .map((project) => ({
          source: `/projects/${project.slug}`,
          destination: projectHref(project),
          permanent: true,
        })),
      { source: "/devices", destination: "/", permanent: true },
      { source: "/devices/:path*", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/selected-works", destination: "/", permanent: true },
      { source: "/selected-works/:path*", destination: "/", permanent: true },
      { source: "/generative-projects", destination: "/", permanent: true },
      { source: "/interactive-systems", destination: "/", permanent: true },
      { source: "/code-technology", destination: "/", permanent: true },
      { source: "/community", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/newsletter", destination: "/", permanent: true },
      { source: "/elsewhere", destination: "/", permanent: true },
      { source: "/tools", destination: "/", permanent: true },
      { source: "/tools/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
