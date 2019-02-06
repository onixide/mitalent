const path = require('path');
// EXTRACT CSS FROM JS PLUGIN
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [{
        // ES6 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        // SASS TO CSS
        test: /\.scss$/,
        use: [
          // IN DEVELOPER MODE USE STYLE-LOADER FOR LIVE RELOADING
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'index.html',
    compress: true,
    port: 9000,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  }
};








// on development use npm run dev
// to build sources into dist use npm run build