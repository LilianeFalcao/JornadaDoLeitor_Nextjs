import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["d14d9vp3wdof84.cloudfront.net", "imgs.search.brave.com"]
  }
};

export default nextConfig;
