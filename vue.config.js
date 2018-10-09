const fs = require('fs')
const glob = require("glob")
const webpack = require('webpack')
const path = require('path');

const pages = getEntres()

function getEntres() {
  let entries,
    pages = {}
  try {
    // 获取相关入口
    entries = glob('src/pages/*/main.js', {
      sync: true
    })
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
      filename: `pages/${pageName}/${pageName}.html`
    }
  })
  return pages
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

// const inlineLimit = 4096

// const genAssetSubPath = dir => {
//   return getAssetPath(
//     options,
//     `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
//   )
// }

// const genUrlLoaderOptions = dir => {
//   return {
//     limit: inlineLimit,
//     fallback: {
//       loader: 'file-loader',
//       options: {
//         name: `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
//       }
//     }
//   }
// }

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/' : '/',
  pages,
  assetsDir: 'asserts/[name]',
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: 'asserts/[name]/js/[name].[contenthash:8].js',
      chunkFilename: 'asserts/common/js/[name].[contenthash:8].js'
    },
    plugins: [new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })]
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
      .set('$common', resolve('src/art/common'))
    config.module.rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        // options.name = 'asserts/common/fonts/[name].[hash:8].[ext]'
        // console.log(typeof options)
        options.fallback = {
          loader: 'file-loader',
          options: {
            name: 'asserts/common/fonts/[name].[hash:8].[ext]'
          }
        }
        return options
      })
    config.module.rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        // 修改它的选项...
        // options.name = 'asserts/common/fonts/[name].[hash:8].[ext]'
        // console.log(typeof options)
        options.fallback = {
          loader: 'file-loader',
          options: {
            name: 'asserts/common/fonts/[name].[hash:8].[ext]'
          }
        }
        return options
      })
  },
  css: {
    extract: {
      filename: 'asserts/[name]/css/[name].[contenthash:8].css',
      chunkFilename: 'asserts/common/css/[name].[contenthash:8].css'
    }
  }
}