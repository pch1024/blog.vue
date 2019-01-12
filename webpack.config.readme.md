# 自定义脚手架流程

```
npm i --save axios fastclick highlight.js marked vue vue-router babel-polyfill babel-runtime

npm i --save-dev vue-loader file-loader html-loader css-loader style-loader  postcss-loader autoprefixer

npm i --save-dev clean-webpack-plugin copy-webpack-plugin html-webpack-plugin mini-css-extract-plugin

npm i --save-dev webpack webpack-cli webpack-dev-server

npm i --save-dev babel-loader babel-core babel-preset-env babel-plugin-transform-runtime

npm i --save-dev node-sass sass-loader vue-template-compiler
```

定义项目基本信息

> npm init

## 使用的工具

- tool:webpack
- html:vue
- css:postcss
- js:ts
- ajax:axios

## Webpack

1.  要安装最新版本，如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```shell
npm i webpack webpack-cli -D
```

2.模块热替换

```shell
npm i webpack-dev-server -D
```

2.  HTML

```shell
npm i -D html-webpack-plugin
```
