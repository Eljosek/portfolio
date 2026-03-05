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
    // Force a single React instance on the CLIENT bundle only to prevent
    // "Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')"
    // caused by @react-three/fiber loading a separate React copy at runtime.
    // We skip the server bundle so Next.js SSG/RSC internals (e.g. React.cache)
    // resolve correctly via their own server-side entry points.
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
