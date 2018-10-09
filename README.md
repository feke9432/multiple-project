# multiple-project

多页应用脚手架模板，基于 vue-cli 3.0 开发。

添加 art-template 模板处理静态页内公共头脚引入。

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
├─dist // 打包后文件夹
│  ├─common // 公共资源
│  ├─css
│  ├─fonts
│  ├─img
│  └─js
├─public // 公共资源，处理图片
│  ├─common
│  └─index
└─src   // 开发文件夹
    ├─art // art-template 模板
    ├─components // vue 公共组件
    └─pages // 多页目录
        ├─about
        │  └─components // 私有 vue 组件
        ├─index
        │  ├─index.html // 模板文件
        │  ├─app.vue    // vue 项目文件
        │  └─main.js      // 项目入口
        └─login
```