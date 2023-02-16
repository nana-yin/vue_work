const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin') // 去掉console.log、debugger、注释(webpack5以上自带)
const CompressionPlugin = require('compression-webpack-plugin') // 压缩文件
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); // webpack5中移除了nodejs核心模块的polyfill自动引入,所以需要手动引入

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // 配置为相对路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'energyconsumption', // 生成的静态资源的目录
  productionSourceMap: false, // 不需要生产环境的source Map
  // lintOnSave: false, // 保存的时候就检查代码
  lintOnSave: process.env.NODE_ENV === 'development', // 保存的时候就检查代码
  devServer: {
    // 代理
    // disableHostCheck: true,
    port: 8800, // 默认端口号
    compress: true, // 代码是否压缩
    // https: true,
    // open: true, // 自动打开浏览器
    proxy: {
      // 配置跨域
      '/api': {
        secure: false, // 如果是https接口，需要配置这个参数
        proxyTimeout: 20 * 60 * 1000,
        timeout: 20 * 60 * 1000,
        // target: 'http://192.168.191.195:9876', // 刘杰本地
        // target: 'http://192.168.191.195:80/visualization', // 刘杰测试
        // target: "http://10.0.103.112:80", // 测试服
        target: 'http://115.236.62.114:65080', // 外网测试服
        // target: 'http://aiit-zhny.top:80/visualization',
        // target: 'http://aiit-zhny.top', // 正式服
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: false, // websocket
        pathRewrite: {
          '^/api': ''
        }
      },
      '/img-api': {
        secure: false, // 如果是https接口，需要配置这个参数
        proxyTimeout: 20 * 60 * 1000,
        timeout: 20 * 60 * 1000,
        // target: 'http://192.168.191.195:9876', // 刘杰本地
        // target: 'http://192.168.191.195:80/visualization', // 刘杰测试
        // target: "http://10.0.103.112:80", // 测试服        
        target: 'https://upload.qre.com.cn',
        // target: 'http://aiit-zhny.top:80/visualization',
        // target: 'http://aiit-zhny.top', // 正式服
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: false, // websocket
        pathRewrite: {
          '^/img-api': ''
        },
        headers: {
          Referer: 'https://upload.qre.com.cn'
        }
      }
    }
  },
  configureWebpack: {
    name: '企业综合能源管理大脑', // 页面名称重置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: 'energyconsumption/js/[name].[hash:6].js',
      chunkFilename: 'energyconsumption/js/[name].[hash:6].js'
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    plugins: [
      // new NodePolyfillPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.ts$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
        minRatio: 0.8 // 压缩比
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true, // 移除所有的console.*这些函数的调用
              drop_debugger: false, // 移除debugger
              pure_funcs: ['console.log'] // 如果你要移除特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
            }
          }
        })
      ]
    }
  }
})
