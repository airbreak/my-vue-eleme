/**
 * Created by jiangjianming@bmkp.cn on 2018/5/2.
 */
module.exports = {
  proxyList: {
    '/v1': {
      // 测试环境
      target: 'http://cangdu.org:8001', // 接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/apis': '' // 需要rewrite重写的,
      }
    },
    '/v2': {
      // 测试环境
      target: 'http://cangdu.org:8001', // 接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/apis': '' // 需要rewrite重写的,
      }
    },
    '/shopping': {
      // 测试环境
      target: 'http://cangdu.org:8001', // 接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/apis': '' // 需要rewrite重写的,
      }
    }
  }
}
