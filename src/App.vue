<template>
  <div id="app">
    <!-- 公共部分 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import Comm from '@/components/Comm.vue'

export default {
  name: 'App',
  data() {
    return {
      comName: 'Login'
    }
  },
  components: {
    Login,
    Comm
  }
}
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
