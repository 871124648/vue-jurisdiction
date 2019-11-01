const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const cloneUrl = require("./src/utils/config.js");  // 引初始化入为空
// console.log(666)
// console.log(cloneUrl, '这是代理路径')

const webpackConfig = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  externals: {
    'echarts': 'echarts'
  },
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue',
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'utils': path.resolve(__dirname, './src/utils'),
      'api': path.resolve(__dirname, './src/api')
    }
  },
  devServer: {
    // host: '192.168.20.65',
    host: 'localhost',
    inline: true,
    port: 3333,
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://47.111.1.69:9898/api', // 测试接口
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader?name=font/[name]-[hash].[ext]' },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }
      // {
      //   loader: 'px2rem-loader',
      //   options: {
      //     remUni: 75,
      //     remPrecision: 8
      //   }
      // }
    ]
  }
}

module.exports = webpackConfig
