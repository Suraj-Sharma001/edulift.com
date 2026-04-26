/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 120,
  experimental: {
    // Skip static generation for pages that need runtime
  }
};

export default nextConfig;
