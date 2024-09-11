/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dev.veritech.mn", "res.cloudinary.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "4000",
        pathname: "/image/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    disableStaticImages: true,
  },
  compiler: {
    // removeConsole: true,
  },
  swcMinify: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  experimental: {
    // runtime: "edge",
    // typedRoutes: true,
    // serverComponents: true,
  },
  experimental: {
    // runtime: "edge",
    typedRoutes: true,
    // serverComponents: true,
    // runtime: "edge",
    // typedRoutes: true,
    // serverComponents: true,
  },
  i18n: {
    localeDetection: false,
    defaultLocale: "mn",
    locales: ["mn", "en"],
  },
  // fontLoaders: [
  //   { loader: "@next/font/google", options: { subsets: ["latin"] } },
  // ],
  async headers() {
    return [
      {
        // matching all API routes
        source: "/",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  // fontLoaders: [
  //   { loader: "@next/font/google", options: { subsets: ["latin"] } },
  // ],
};

module.exports = nextConfig;
