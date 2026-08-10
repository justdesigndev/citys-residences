/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin()
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['country-state-city'],
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'panel.citysresidences.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        pathname: '**',
      },
    ],
  },
}

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)))
