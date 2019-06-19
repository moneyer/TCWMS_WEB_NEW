const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: config => {
    const plugins = []
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    )
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('static', resolve('public'))
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('css', resolve('src/assets/css'))
      .set('js', resolve('src/assets/js'))
      .set('utils', resolve('src/assets/js/utils'))
      .set('http', resolve('src/assets/js/http'))
      .set('stylus', resolve('src/assets/stylus'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/components/base'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
  }
}
