const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['file-loader']
      }
    ]
  }, 
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  plugins: [
  
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/index.html', to: 'index.html' }
      ]
    })
  ]
};





