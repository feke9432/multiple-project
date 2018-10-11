# multiple-project

多页应用脚手架模板，基于 vue-cli 3.0 开发。

添加 art-template 模板处理静态页内公共头脚引入。

此分支采用 分级目录格式 ，打包后目录有所不同，主要通过修改配置完成。

添加了 TypeScript 的支持，如果你还不太了解，看[这里](https://ts.xcatliu.com/)

## 使用

```
// 安装依赖
npm install
// 开发
npm run serve
// 打包
npm run build
```

## 目录结构

```
multiple-project
├─dist // 打包后文件夹，
│  ├───asserts // 静态资源，注意目录结构与pages一一对应
│  │   ├───about
│  │   │   ├───css
│  │   │   └───js
│  │   ├───common // 公共资源，封装好的全局依赖库
│  │   │   ├───css
│  │   │   ├───fonts
│  │   │   ├───img
│  │   │   └───js
│  │   ├───index
│  │   │   ├───css
│  │   │   ├───img
│  │   │   └───js
│  │   └───login
│  │       └───js
│  └───pages
│      ├─about
│      │  └─about.html // 模板文件
│      ├─index
│      │  └─index.html // 模板文件
│      └─login
│         └─login.html // 模板文件
├─public // 公共静态资源，主要处理图片，和某些只有几个页面需要的插件
│    └───asserts // 注意，为了
│        ├───common
│        │   └───img
│        └───index
│            └───img
└─src   // 开发文件夹
    ├─art // art-template 模板
    │  ├─header // 公共头相关文件
    │  ├─footer // 公共脚相关文件
    │  ├─iconfont // 我们自己的字体库
    │  ├─base.scss // 基础 css 变量
    │  ├─common.scss // 公共 css ，bootstrap 的样式覆盖也写在这里
    │  └─common.ts  // 公共 js 入口，总的引入公共样式和 js
    ├─components // vue 公共组件
    └─pages // 多页目录
        ├─about
        │  └─components // 私有 vue 组件
        ├─index
        │  ├─index.html // 模板文件
        │  ├─app.vue    // vue 项目文件
        │  └─main.ts      // 项目入口
        └─login
```