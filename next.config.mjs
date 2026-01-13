const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: isProd ? "/amelia_portfolio" : "",
  assetPrefix: isProd ? "/amelia_portfolio/" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
