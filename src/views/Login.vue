<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" align="middle" :style="{ height: height }">
        <el-col :span="8">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="ruleForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="resetForm('ruleForm')" class="btn">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <div class="xxo"></div>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      height: window.innerHeight - 41 + 'px',
      ruleForm: {
        userPhone: '',
        password: ''
      },
      rules: {
        userPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((boolean, obj) => {
        if (boolean) {
          let formData = {}
          formData.phone = this.ruleForm.userPhone
          formData.password = this.ruleForm.password
          console.log(formData)
          this.$axios({
            url: '/manager/login',
            method: 'post',
            params: formData
          })
            .then((params) => {
              console.log(params)
              if (params.code == 200) {
                let userInfo = {}
                userInfo.managerName = params.managerName
                userInfo.managerId = params.managerId
                userInfo.headPhoto = params.headPhoto

                sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                sessionStorage.setItem('menuList', JSON.stringify(params.menuList))
                sessionStorage.setItem('isLogin', JSON.stringify(true))
                this.$store.dispatch('liujx/acLogin', { userInfo: userInfo, menuList: params.menuList })
                this.$router.push('/comm')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },

    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.btn {
  width: 100%;
}
.xxo {
  position: absolute;
  bottom: 20px;
  width: 200px;
  height: 100px;
  background: url('../assets/bear.png') no-repeat;
  /* 我们元素可以添加多个动画， 用逗号分隔 */
  animation: bear 0.7s steps(8) infinite, move 3s forwards;
}
@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}

@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
    /* margin-left: -100px; */
    transform: translateX(-50%);
  }
}
</style>
