import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/selected-works", destination: "/work", permanent: true },
      {
        source: "/selected-works/:path*",
        destination: "/work/:path*",
        permanent: true,
      },
      { source: "/generative-projects", destination: "/work", permanent: true },
      { source: "/interactive-systems", destination: "/work", permanent: true },
      { source: "/code-technology", destination: "/work", permanent: true },
      { source: "/community", destination: "/work", permanent: true },
      { source: "/tools", destination: "/devices", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/newsletter", destination: "/contact", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
