import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imghippo.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
