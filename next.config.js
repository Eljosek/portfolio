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
