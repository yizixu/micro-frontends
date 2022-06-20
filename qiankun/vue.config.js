const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '9527',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack (config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')) // 注意svg的存储地址
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 注意svg的存储地址
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }

})
