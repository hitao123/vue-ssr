const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
  devtool: isProd ? false : '#cheap-module-source-map',
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
  },
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'sass-loader'
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    // new SWPrecachePlugin({
    //   cacheId: 'vue-hn',
    //   filename: 'service-worker.js',
    //   minify: true,
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
    //   runtimeCaching: [
    //     {
    //       urlPattern: '/',
    //       handler: 'networkFirst'
    //     },
    //     {
    //       urlPattern: /\/(top|new|show|ask|jobs)/,
    //       handler: 'networkFirst'
    //     },
    //     {
    //       urlPattern: '/item/:id',
    //       handler: 'networkFirst'
    //     },
    //     {
    //       urlPattern: '/user/:id',
    //       handler: 'networkFirst'
    //     }
    //   ]
    // })
    // new VueLoaderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  )
}

module.exports = config
