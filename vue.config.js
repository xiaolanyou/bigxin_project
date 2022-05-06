module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api/goods": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/goods": "/goods",
        },
      },
      "/api/forGoods": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/forGoods": "/forGoods",
        },
      },
      "/api/supplier": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/supplier": "/supplier",
        },
      },
      "/api/workBench": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/workBench": "/workBench",
        },
      },
      // 上传图片
      "/api/uploadToOss": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/uploadToOss": "/uploadToOss",
        },
      },
      "/api/shopGoodsConsume": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/shopGoodsConsume": "/shopGoodsConsume",
        },
      },
      "/api/manager": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/manager": "/manager",
        },
      },
      // 商品管理、门店管理删除接口
      "/api/shop": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/shop": "/shop",
        },
      },
      // 运费管理
      "/api/freight": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/freight": "/freight",
        },
      },
      // 门店库存管理
      "/api/shopInventory": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/shopInventory": "/shopInventory",
        },
      },
      // 运营策略配置相关接口
      "/api/goldRun": {
        target: "http://www.lijianmin.top:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, //允许修改请求的源
        pathRewrite: {
          //重写请求的接口。
          "^/api/goldRun": "/goldRun",
        },
      },
    },
  },
};
