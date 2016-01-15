var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BowerWebpackPlugin = require("bower-webpack-plugin");

var loaders = ['babel-loader'];

module.exports = {
  entry: {
    bundle:['./src_client/index.jsx']
  },
  output: {
    // Absolute output directory
    path: __dirname + '/.tmp/public/webpack',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '/webpack/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [],
    loaders: [
    {
      test: /[\.jsx|\.js]$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract('css!sass')
    }
  ]
  },
  resolve: {
     root: [path.join(__dirname, "bower_components")],
    modulesDirectories: ['node_modules',
                         'bower_components',
                          path.join('src_client'),
                          path.join('src_client', 'app')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new BowerWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin("common.js"),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],

  watch: true, // use webpacks watcher
  // You need to keep the grunt process alive

  keepalive: true, // don't finish the grunt task
  // Use this in combination with the watch option
  node: {
    __dirname: true,
  },
  externals: {
  'React': 'React'
  }

};
