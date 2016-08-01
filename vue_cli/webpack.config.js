var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    proto: './src/main.js',
    DAT: './src/DAT.js', //day_after_tomorrow 
    tired: './src/tired.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: "[name].js",
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      { test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 1000000000000000000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: [ new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }) ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
