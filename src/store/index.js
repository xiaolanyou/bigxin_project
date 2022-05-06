import Vue from 'vue'
import Vuex from 'vuex'
import liujx from './liujx.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 运费管理表格数据
    tableData: [],
    // 运费管理渲染数据
    rendererData: [],
    // 存放城市名
    cityNames: []
  },
  mutations: {
    // 获取运费管理表格的数据
    formDatax(state, res) {
      // console.log(res)
      state.tableData = res
    },
    // 获取运费管理一行编辑按钮的id
    clickEdit(state, res) {
      state.rendererData = res
    },
    // 将城市名添加到数组
    addTables(state, res) {
      for (let i = 0; i < state.tableData.length; i++) {
        state.tableData[i].bourn = res[i]
      }
    }
  },
  actions: {},
  modules: { liujx: liujx }
})
