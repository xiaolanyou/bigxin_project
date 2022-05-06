import axios from './../ulit/http.js'
// import router from './../router'
export default {
  namespaced: true,
  state: {
    isLogin: sessionStorage.getItem('isLogin') ? JSON.parse(sessionStorage.getItem('isLogin')) : false,
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
    menuList:sessionStorage.getItem('menuList') ? JSON.parse(sessionStorage.getItem('menuList')) : {},
  },
  getters: {
    /* getUser(state) {
      console.log(state);
      console.log(state.userInfo);
      return state.userInfo;
    } */
  },
  mutations: {

    mtLogin(state, obj) {
      console.log("mutations被执行");
      state.isLogin = true;
      state.userInfo = obj.userInfo;
      state.menuList = obj.menuList;
    }
  },
  actions: {
    acLogin({ commit }, obj) { 
      console.log("actions被执行");
      commit('mtLogin', obj)
    },
  },
}