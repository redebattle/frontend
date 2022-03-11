module.exports = {
  webpack5: true,
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.com',
        permanent: true
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com',
        permanent: true
      },
      {
        source: '/facebook',
        destination: 'https://facebook.com',
        permanent: true
      },
      {
        source: '/instagram',
        destination: 'https://instagram.com',
        permanent: true
      },
      {
        source: '/youtube',
        destination: 'https://youtube.com',
        permanent: true
      },
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['redebattle.com.br'],
  },
}
