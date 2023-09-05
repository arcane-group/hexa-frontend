// @ts-check
const withPreconstruct = require('@preconstruct/next')
const withTM = require('next-transpile-modules')(['wagmi', 'react-linkify-it', 'three'])

const { client: clientConfig } = require('./config')
const { version } = require('./package.json')

console.log(clientConfig, version)

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
    removeConsole:
      process.env.NODE_ENV === 'development'
        ? undefined
        : {
            exclude: ['error'],
          },
  },
  trailingSlash: false,
  reactStrictMode: true,
  assetPrefix: clientConfig.cdn || undefined,
  basePath: clientConfig.basePath,
  experimental: { esmExternals: 'loose' },
  publicRuntimeConfig: {
    ...clientConfig,
    version: process.env.APP_VERSION || version,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://serene-sea-77879-baf803fd7d60.herokuapp.com/:path*`,
      },
    ]
  },
  generateBuildId: async () => {
    return `v${(process.env.APP_VERSION || version).replace('.', '_')}__${Date.now()}`
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    })

    return config
  },
}

module.exports = withTM(withPreconstruct(nextConfig))
