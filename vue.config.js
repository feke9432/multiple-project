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
    entries = glob('src/pages/**/main.ts', {
      sync: true
    })
  } catch (err) {
    entries = []
    throw err
  }
  // 格式化生成入口
  entries.forEach((file) => {
    let pathObj = path.parse(file);
    let entryName = pathObj.dir.replace('src/pages/', '')
    let htmlExR = process.env.NODE_ENV === 'production' ?
      'src/' : 'src/pages/'
    let htmlName = pathObj.dir.replace(htmlExR, '')

    pages[entryName] = {
      entry: file,
      template: `${pathObj.dir}/index.html`,
      filename: `${htmlName}/index.html`
    }
  })
  return pages
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/' : '/',
  pages,
  assetsDir: '/',
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: (chunkData) => {
        let name = chunkData.chunk.name;
        let dirArr = name.split('/')
        name = dirArr.length > 1 ? dirArr[dirArr.length - 1] : name
        return `asserts/[name]/js/${name}.[hash:8].js`
      },
      chunkFilename: 'asserts/common/js/[name].[hash:8].js'
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
    config
      .module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.fallback = {
          loader: 'file-loader',
          options: {
            name: 'asserts/common/fonts/[name].[hash:8].[ext]'
          }
        }
        return options
      })
    config
      .module
      .rule('svg')
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options.name = 'asserts/common/fonts/[name].[hash:8].[ext]'
        return options
      })
    config
      .plugin('define')
      .tap(args => {
        // 判断是否 生产环境 使用不同的接口路径
        args[0]['process.env'].BASE_URL = process.env.NODE_ENV === 'production' ?
          '"https://test-api-gateway.51mydao.com"' : '"https://test-api-gateway.51mydao.com"'
        return args
      })
  },
  css: {
    extract: {
      filename: `asserts/[name]/css/[hash:8].css`,
      chunkFilename: 'asserts/common/css/[name].[hash:8].css'
    },
    loaderOptions: {
      sass: {
        data: `@import "src/art/base.scss";`
      }
    }
  },
  devServer: {
    open: true,
    index: 'index/index.html'
  }
}