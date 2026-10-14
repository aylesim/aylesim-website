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
      ...Object.entries({
        "/devices": "/instruments",
        "/devices/:path*": "/instruments/:path*",
        "/projects": "/work",
        "/selected-works": "/work",
        "/selected-works/:path*": "/projects/:path*",
        "/generative-projects": "/art",
        "/interactive-systems": "/work",
        "/code-technology": "/work",
        "/community": "/about",
        "/blog": "/archive",
        "/blog/:path*": "/archive",
        "/newsletter": "/contact",
        "/elsewhere": "/contact",
        "/tools": "/instruments",
        "/tools/:path*": "/instruments/:path*",
        "/projects/max-berlin-network": "/work/max-berlin-network-site",
        "/work/max-berlin-network": "/work/max-berlin-network-site",
        "/projects/max-berlin-community": "/about",
        "/projects/la-scuola-open-source": "/about#teaching",
        "/projects/aylesim-devices": "/instruments",
        "/projects/isotonik-studios": "/instruments",
      }).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
