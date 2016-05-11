const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src'),
];

const extractTextPlugin = new ExtractTextPlugin('[name].css');

const config = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: {
    nrs_track_demo: [// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
      './nrs_track_demo/index.js',
      './nrs_track_demo/index.sass',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(sassLoaders.join('!')),
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/build',
  },
  plugins: debug
  ? [
    extractTextPlugin,
  ]
  : [
    extractTextPlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    root: [path.join(__dirname, './src')],
  },
};

module.exports = config;
