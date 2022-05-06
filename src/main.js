import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// 导入element-ui的模块和CSS，并使用它。
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//http token验证 axios配置
import http from './ulit/http.js'

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = http

// 自定义时间格式函数
Vue.prototype.timeFormat = function (time) {
  time = time.substring(0, 19).split('T').join(' ')
  // console.log(time)
  return time
}

// 获取时间函数
Vue.prototype.Time = function () {
  let times = new Date()
  // 获取年
  let YYYY = times.getFullYear()
  // 获取月
  let MM = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1
  // 获取日
  let DD = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
  // 获取小时
  let hh = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
  // 获取分钟
  let mm = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
  // 获取秒
  let ss = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
  // 时间格式 例如：2022-01-10 10:15:10
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}

// 分页功能
// pages是当前页, pagings是每页多少条, pageDates是要分页的总数据
Vue.prototype.showPages = function (pages, pagings, pageDates) {
  // 分页功能的实现
  // 当前页
  let page = pages || 1
  // 每页显示多少条
  let paging = pagings || 2
  // 原组件数据数组
  let pageDate = pageDates || []
  // return 出去的数组
  let pageArr = []
  // 用循环处理 分页
  for (let i = page * paging - paging; i < paging * page; i++) {
    if (pageDate[i] === undefined) break
    pageArr.push(pageDate[i])
  }
  return pageArr
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
