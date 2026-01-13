const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: "/amelia_portfolio",
  reactStrictMode: true,
  assetPrefix: isProd ? "/amelia_portfolio/" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
