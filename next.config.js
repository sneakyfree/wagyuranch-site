/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_BASE:
      process.env.NEXT_PUBLIC_API_BASE || "https://api.wagyuranch.com",
  },
};

module.exports = nextConfig;
