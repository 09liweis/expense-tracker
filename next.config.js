/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization
  images: {
    domains: [
      'images.pexels.com',
    ],
    formats: ["image/avif", "image/webp"],
  },

  // i18n for multilingual support
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
    ];
  },

  // Compression
  compress: true,

  // Power by header removal for security
  poweredByHeader: false,

  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || "https://samliweisen.dev",
  },
};

module.exports = nextConfig;
