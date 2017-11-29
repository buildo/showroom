const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [
          path.resolve(__dirname, 'node_modules/buildo-react-components/src'),
          path.resolve(__dirname, 'node_modules/react-autosize-textarea/src'),
          path.resolve(__dirname, 'node_modules/react-input-children/src'),
          path.resolve(__dirname, 'node_modules/react-cookie-banner/src'),
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'styleguide')
        ],
        use: [
          {
          loader: 'babel-loader',
            options: {
              presets: [['buildo', { env: 'react' }]]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: require('path').resolve(__dirname, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
}
