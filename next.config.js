module.exports = {
  webpack5: true,
  webpack: function (config, options) {
    console.log('Webpack version: ', options.webpack.version)
    config.experiments = {}
    return config
  },
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
