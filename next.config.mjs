const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/amelia_portfolio" : "",
  // Remove the trailing slash here
  assetPrefix: isProd ? "/amelia_portfolio" : "", 
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/amelia_portfolio" : "",
  },
};

export default nextConfig;