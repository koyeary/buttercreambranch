// next.config.ts
import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "./"),
  typedRoutes: true,
};

export default nextConfig;
