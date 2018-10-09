const fs = require('fs')
const glob = require("glob")
const webpack = require('webpack')
const path = require('path');

const pages = {}
let entries
try {
  // 获取相关入口
  entries = glob('src/pages/*/main.js', {sync: true})
} catch (err) {
  entries = []
  throw err
}
// 格式化生成入口
entries.forEach((file) => {
  const fileSplit = file.split('/')
  const pageName = fileSplit[2]
  let pageHtml = fileSplit
    .slice(0, 3)
    .join('/') + '/index.html'
  if (!fs.existsSync(pageHtml)) {
    // 入口如果不配置直接使用 _default.html
    pageHtml = fileSplit
      .slice(0, 2)
      .join('/') + '/_default.html'
  }
  pages[pageName] = {
    entry: file,
    template: pageHtml,
    filename: `${pageName}.html`,
    // filename: `${pageName}/${pageName}.html`, chunks: [`${[pageName]}`]
  }
})

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  pages,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "windows.jQuery": "jquery"})]
  },
  chainWebpack: config => {
    // GraphQL Loader
    config
      .module
      .rule('art')
      .test(/\.art$/)
      .use('art-template-loader')
      .loader('art-template-loader')
      .end()
    config
      .resolve
      .alias
      .set('$art', resolve('src/art'))
  }

}