const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
    'storybook-addon-apollo-client',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal(config) {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../')
    ]

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin()
    ]

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')]
            }
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    })
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
}
