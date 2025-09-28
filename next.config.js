/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Remove the experimental section as these options are now stable in Next.js 15
};

module.exports = nextConfig;