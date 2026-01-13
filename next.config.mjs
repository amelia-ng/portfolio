
const isProd = process.env.NODE_ENV === "production";

const repoName = "/amelia_portfolio"; 

const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? repoName : "",
  trailingSlash: true,       // Ensures folders like /blog/ become /blog/index.html
  images: {
    unoptimized: true,       // Required for static sites on GitHub
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
