const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:7861/', // 接口的前缀
        ws: true, // 代理websocked
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': ''// 重写路径
        }
      }
    }
  }
})
