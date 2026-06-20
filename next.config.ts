import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow MDX files to be treated as pages if ever needed and keep
  // page extensions explicit for clarity.
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    // Add remote image hosts here when needed (e.g. avatars, CDN).
    remotePatterns: [],
  },
};

export default nextConfig;


