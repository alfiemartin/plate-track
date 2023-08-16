/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  serverRuntimeConfig: {
    carApiToken: Math.random()
  }
};

module.exports = nextConfig;
