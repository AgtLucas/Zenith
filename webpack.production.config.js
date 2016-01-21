'use strict'

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var lost = require('lost')
var rucksack = require('rucksack-css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')

console.log('Production!')

module.exports = {
  entry: [
    path.join(__dirname, 'src/js/app.js')
  ],

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_END': JSON.stringify('production')
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    })
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
    }, {
      test: /.*\.(gif|png|jpe?g|svg|gif)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }],
    resolve: {
      extensions: ['', '.js', '.styl', '.json']
    }
  },

  postcss: function () {
    return [autoprefixer, precss, lost, rucksack]
  }
}
