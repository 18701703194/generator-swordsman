'use strict'
/**
 * Created by 藤蔓 on 2016/09/19.
 */
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const STATIC_SRC = require('../f2eci')['static-src']
const DIST_PATH = require('../f2eci').dist
const HTML_PATH = require('../f2eci').output
const CortexRecombinerPlugin = require('cortex-recombiner-webpack-plugin')
const relativeToRootPath = '..'
const env = require('../f2eci').env
const WebpackShellPlugin = require('webpack-shell-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')  //兼容es3

let entries = {
  polyfill: [
    'es5-shim',
    'es5-shim/es5-sham',
    'es6-promise',
    'console-polyfill',
    'babel-polyfill'
  ]
}
const pages = []
const files = glob.sync('./src/js/*.jsx')
files.forEach(file => {
  const name = file.split('/')[file.split('/').length-1].split('.')[0]
  const page = `./src/js/${name}.jsx`
  pages.push(page)
  entries[name] = [page]
})

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, relativeToRootPath, DIST_PATH, STATIC_SRC),
    publicPath: './' + STATIC_SRC + '/',
    chunkFilename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  cache: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      '@component': path.resolve(__dirname, relativeToRootPath, './src/js/components'),
      '@container': path.resolve(__dirname, relativeToRootPath, './src/js/containers'),
      '@action': path.resolve(__dirname, relativeToRootPath, './src/js/actions'),
      '@reducer': path.resolve(__dirname, relativeToRootPath, './src/js/reducers'),
      '@mock': path.resolve(__dirname, relativeToRootPath, './src/js/mock'),
      '@lib': path.resolve(__dirname, relativeToRootPath, './src/js/libs'),
      '@util': path.resolve(__dirname, relativeToRootPath, './src/js/utils'),
      '@img': path.resolve(__dirname, relativeToRootPath, './src/img')
    }
  },
  module: {
    loaders: [{
      //jsx、es6、es7兼容性
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
      loader: env == 'dev' ? 'style!css?-restructuring!postcss' : ExtractTextPlugin.extract('css?-restructuring!postcss')
    }, {
      test: /\.css\.module/,
      loader: env == 'dev' ? 'style!css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss' : ExtractTextPlugin.extract('css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss')
    }, {
      test: /\.less$/,
      loader: env == 'dev' ? 'style!css!postcss!less' : ExtractTextPlugin.extract('css!postcss!less')
    }, {
      test: /\.less\.module/,
      loader: env == 'dev' ? 'style!css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less' : ExtractTextPlugin.extract('css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less')
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader:'url?limit=25000'
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
    ]
  },
  postcss: function () {
    //css后处理
    return [
      require('postcss-initial')({
        reset: 'all' // reset only inherited rules
      }),
      require('autoprefixer')({
        browsers: ['> 5%']
      })]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity //当项目中引用次数超过2次的包自动打入commons.js中,可自行根据需要进行调整优化
    }),
    new ExtractTextPlugin('[name].css', {
      disable: env == 'dev',
      allChunks: true
    }),
    new CortexRecombinerPlugin({
      base: path.resolve(__dirname, relativeToRootPath),
    }),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, relativeToRootPath, './node_modules/@cortex')]), //尽量不要用cortex包,考虑删除
    new WebpackShellPlugin({onBuildStart: ['gulp']}),
    //兼容es3
    new es3ifyPlugin()
  ],
  devServer: {
    contentBase: HTML_PATH,
    historyApiFallback: false,
    hot: true,
    port: 8080,
    publicPath: '/' + STATIC_SRC + '/',
    noInfo: false
  },
}