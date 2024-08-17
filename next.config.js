/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');

const envFiles = {
  development: '.env.development',
  production: '.env.production',
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] || '.env.local' });

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
          pathname: '**',
        },
      ],
    },
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
    },

  }
  
  module.exports = nextConfig

