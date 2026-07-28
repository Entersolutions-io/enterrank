import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required by the Cloud Run image: the runner stage copies .next/standalone and runs server.js.
  output: "standalone",
};

export default nextConfig;
