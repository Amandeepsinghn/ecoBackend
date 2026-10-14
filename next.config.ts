import type { NextConfig } from "next";

const apiProxyTarget = process.env.API_PROXY_TARGET ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep trailing slashes so FastAPI routes like POST /orders/ are not redirected.
  skipTrailingSlashRedirect: true,
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [
      // FastAPI mounts checkout at /orders/ — keep the slash through the proxy.
      {
        source: "/backend/orders",
        destination: `${apiProxyTarget}/orders/`,
      },
      {
        source: "/backend/orders/",
        destination: `${apiProxyTarget}/orders/`,
      },
      {
        source: "/backend/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
