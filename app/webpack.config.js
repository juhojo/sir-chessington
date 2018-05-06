var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "./src/client/bundle.js"
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  module:{
    rules:[
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ],
        // include: [
        //   path.resolve(_dirname, "/src/client/ui/stylesheets/")
        // ],
        // loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
}
