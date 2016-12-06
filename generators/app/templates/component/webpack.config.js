'use strict'
/**
 * Created by 藤蔓 on 2016/10/26.
 */
const path = require('path')
const fs = require('fs')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CortexRecombinerPlugin = require('cortex-recombiner-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')  //兼容es3
const glob = require('glob')

const OUTPUT_PATH = require('./f2eci.json').output
const DIST_PATH = require('./f2eci.json').dist
const STATIC_SRC = require('./f2eci')['static-src']

let entries = {
  polyfill: [
    'es5-shim',
    'es5-shim/es5-sham',
    'console-polyfill',
    'babel-polyfill',
    'react',
    'react-dom'
  ]
}
const files = glob.sync('./demo/src/*.jsx')
files.forEach(file => {
  const name = file.split('/')[file.split('/').length-1].split('.')[0]
  const page = `./demo/src/${name}.jsx`
  entries[name] = [page]
})

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, DIST_PATH, STATIC_SRC),
    publicPath: './' + STATIC_SRC + '/',
    chunkFilename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  cache: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      '@component': path.resolve(__dirname, './src/components')
    }
  },
  module: {
    loaders: [{
      test: /\.(es6|jsx|js)$/,
      exclude: /node_modules\/(?!@gfe)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: [
          'transform-decorators-legacy'   //babel6已经移除了对decorators的转换
        ]
      }
    }, {
      test: /\.css$/,
      loader: 'style!css?-restructuring!postcss'
    }, {
      test: /\.css\.module/,
      loader: 'style!css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss'
    },{
      test: /\.less$/,
      loader: 'style!css!postcss!less'
    }, {
      test: /\.less\.module/,
      loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: 'url?limit=25000'
    }, {
      test: /\.woff|ttf|woff2|eot$/,
      loader: 'url?limit=100000'
    }
    //   ,{
    //   //eslint代码规范检验
    //   test: /\.(es6|jsx|js)$/,
    //   exclude: /node_modules/,
    //   loader: "eslint-loader"
    // }
    ],
  },
  postcss: function () {
    return [
      require('postcss-initial')({
        reset: 'all'
      }),
      require('autoprefixer')({
        browsers: ['> 5%']
      })];
  },
  plugins: [
    new CortexRecombinerPlugin({
      base: path.resolve(__dirname, './'),
    }),
    new WebpackShellPlugin({onBuildStart: ['gulp']}),
    //兼容es3
    new es3ifyPlugin()
  ],
  devServer: {
    contentBase: OUTPUT_PATH,
    historyApiFallback: false,
    hot: true,
    port: 8080,
    publicPath: '/' + STATIC_SRC + '/',
    noInfo: false
  },
}