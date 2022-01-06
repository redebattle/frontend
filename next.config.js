module.exports = {
  webpack5: true,
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.com',
        permanent: true
      }
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true
}
