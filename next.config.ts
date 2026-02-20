import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.polityka.pl" },
      { protocol: "https", hostname: "leclerc-online.pl" },
      { protocol: "https", hostname: "www.przyslijprzepis.pl" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "www.portalmorski.pl" },
      { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
