const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  //代理解决跨域
  devServer: {
    proxy: {
      //意思是当前端项目请求带有api的时候就会去找代理服务器 服务器之间是没有跨域问题的
      '/api': {
        //target：获取数据的那个服务器
        target: "http://gmall-h5-api.atguigu.cn ",
        //路径重写 因为本身请求就已经带了api了所以这里不需要
        // pathRewrite: { '^/api': "" }
      }
    }
  }
})
