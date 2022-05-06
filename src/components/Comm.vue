<template>
  <div class="comm-container">
    <el-container>
      <el-aside width="250px" ref="aside">
        <h1 class="title-sc">XXXX商城</h1>
        <!-- <router-link to="/comm/workbench" class="work-bench"
          >工作台</router-link
        > -->
        <!-- 导航栏 -->
        <el-menu
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#1890ff"
          unique-opened
        >
          <el-submenu :index="`${index + 1}`" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <span>{{item.menuDesc}}</span>
            </template>
             <el-menu-item v-for="(item2,index2) in menuList[index].children"
                   :key="index2" :index="`${index+1}-${index2+1}`" 
                    :route="{ path: `${item2.menuUrl}` }"
                  >{{item2.menuDesc}}</el-menu-item
                >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="20"
              ><i class="el-icon-s-fold oci" @click="ocBtn"></i
            ></el-col>
            <el-col :span="4">
              <img :src="headPhoto" alt="" class="img-tx" />
              <span class="user-name">{{ managerName }}</span>
              <!-- <span class="user-name">{{ $store.getters.getUser.managerName }}</span> -->
              <el-button @click="logout" type="info">退出</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Comm",
  data() {
    return {
      // 控制 aside 展开和收缩
      flag: true,
      managerName: this.$store.state.liujx.userInfo.managerName,
      headPhoto: this.$store.state.liujx.userInfo.headPhoto,
      menuList: [],
    };
  },
  methods: {
    // 控制 aside 展开和收缩
    ocBtn() {
      if (this.flag) {
        this.$refs.aside.$el.style.width = "0";
        this.flag = false;
      } else if (!this.flag) {
        this.$refs.aside.$el.style.width = "250px";
        this.flag = true;
      }
    },
    logout() {
      this.$axios({
        url: "/manager/logout",
        method: "post",
      })
        .then((params) => {
          console.log(params);
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/login");
        });
    },
  },
  created() {
    this.menuList = this.$store.state.liujx.menuList;
  },
};
</script>

<style lang="less" scoped>
// 页面最大盒子
.comm-container {
  width: 100%;
  height: 100%;
  // 选项展开主盒子
  .el-container {
    width: 100%;
    height: 100%;
    // 侧边栏滚动条样式
    ::-webkit-scrollbar-track-piece {
      //滚动条凹槽的颜色，还可以设置边框属性
      background-color: #f8f8f8;
    }
    ::-webkit-scrollbar {
      //滚动条的宽度
      width: 9px;
      height: 9px;
    }
    ::-webkit-scrollbar-thumb {
      //滚动条的设置
      background-color: #ccc;
      background-clip: padding-box;
      border-radius: 8px;
      min-height: 28px;
    }
    // 侧边栏
    .el-aside {
      background-color: #001529;
      .el-menu {
        width: 100%;
      }
    }
    // 标题
    .title-sc {
      margin: 0;
      height: 60px;
      line-height: 60px;
      text-indent: 20px;
      color: #fff;
      font-size: 30px;
      background-color: #00284d;
    }
    // 工作台
    .work-bench {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-indent: 35px;
      text-decoration: none;
      color: #ccc;
      background-color: #1890ff;
    }
    .el-submenu {
      width: 250px;
    }
    // 右侧头部区域
    .el-header {
      line-height: 60px;
      background-color: skyblue;
      .oci {
        font-size: 24px;
        cursor: pointer;
      }
      // 用户头像
      .img-tx {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        background: #000;
      }
      // 用户名
      .user-name {
        margin: 0 15px 0 8px;
      }
    }
    // 右侧内容区域
    .el-main {
      padding-top: 25px;
      background-color: #e3e3e3;
    }
    .el-menu-item {
      > a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
}
</style>
