const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@react-spring/web',
    '@react-spring/core',
    '@react-spring/animated',
    '@react-spring/shared',
    '@react-three/fiber',
    '@react-three/drei',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      }
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
}

module.exports = nextConfig
