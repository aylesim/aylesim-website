import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/", permanent: true },
      { source: "/work/:path*", destination: "/", permanent: true },
      { source: "/devices", destination: "/", permanent: true },
      { source: "/devices/:path*", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/projects/:path*", destination: "/", permanent: true },
      { source: "/selected-works", destination: "/", permanent: true },
      { source: "/selected-works/:path*", destination: "/", permanent: true },
      { source: "/generative-projects", destination: "/", permanent: true },
      { source: "/interactive-systems", destination: "/", permanent: true },
      { source: "/code-technology", destination: "/", permanent: true },
      { source: "/community", destination: "/", permanent: true },
      { source: "/tools", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/newsletter", destination: "/", permanent: true },
      { source: "/elsewhere", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
