<template>
  <div class="operation-container">
    <!-- 面包屑导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item>营销配置</el-breadcrumb-item>
            <el-breadcrumb-item>返金币配置</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- from表单 -->
    <el-form :model="rnsForm" :rules="rules" ref="rnsFormRef" label-width="240px" class="demo-ruleForm">
      <el-form-item label="实名完成返状态：" prop="rnstatus">
        <el-select v-model="rnsForm.rnstatus" placeholder="请选择状态">
          <el-option label="开启" value="是"></el-option>
          <el-option label="关闭" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实名完成返金币：" prop="rngold">
        <el-input v-model="rnsForm.rngold"></el-input>
      </el-form-item>
      <el-form-item label="绑定手机完成返状态：" prop="photostatus">
        <el-select v-model="rnsForm.photostatus" placeholder="请选择状态">
          <el-option label="开启" value="是"></el-option>
          <el-option label="关闭" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定手机完成返金币：" prop="photogold">
        <el-input v-model="rnsForm.photogold"></el-input>
      </el-form-item>
      <el-form-item label="邀请好友完成返状态：" prop="friendstatus">
        <el-select v-model="rnsForm.friendstatus" placeholder="请选择状态">
          <el-option label="开启" value="是"></el-option>
          <el-option label="关闭" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请好友完成返金币：" prop="friendgold">
        <el-input v-model="rnsForm.friendgold"></el-input>
      </el-form-item>
      <!-- <el-form-item label="成为合伙人需邀请人数：" prop="partnernums">
        <el-input v-model.number="rnsForm.partnernums"></el-input>
      </el-form-item> -->
      <el-form-item label="客服电话：" prop="servicetel">
        <el-input v-model.number="rnsForm.servicetel"></el-input>
      </el-form-item>
      <el-form-item label="工作时间：" prop="workinghours">
        <el-input v-model.trim="rnsForm.workinghours" placeholder="工作日08:00-21:00"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :plain="true" @click="submitForm('rnsFormRef')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Operation',
  data() {
    // 自定义表单规则
    let goldValidator = (rule, value, callback) => {
      let rul = /^\d{0,8}\.{0,1}(\d{1,2})?$/
      // let rul = /^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/
      if (rul.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的价格,例如: 1.00'))
      }
    }
    // 自定义手机号验证
    let photoValidator = (rule, value, callback) => {
      let rul = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (rul.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    // 自定义时间验证
    let timeValidator = (rule, value, callback) => {
      let rul = /^(([01][0-9])|20|21|22|23):[012345][0-9]$/
      if (rul.test(value.substring(0, 5)) && value.substring(5, 6) === '-' && rul.test(value.substring(6, 11))) {
        // console.log(value.substring(11, 12))
        if (value.substring(11, 12) === '') {
          callback()
        } else {
          callback(new Error('请输入正确的时间格式, 例如: 08:00-21:00'))
        }
      } else {
        callback(new Error('请输入正确的时间格式, 例如: 08:00-21:00'))
      }
    }
    return {
      // 营销策略配置
      rnsForm: {
        goldId: 0,
        rnstatus: '',
        rngold: 0,
        photostatus: '',
        photogold: 0,
        friendstatus: '',
        friendgold: 0,
        // partnernums: '',
        servicetel: '',
        workinghours: '',
        address: ''
      },
      // 营销策略配置 规则
      rules: {
        rnstatus: [{ required: true, message: '请选择返状态', trigger: 'change' }],
        rngold: [
          { required: true, message: '请输入返金币', trigger: 'blur' },
          { validator: goldValidator, trigger: 'blur' }
        ],
        photostatus: [{ required: true, message: '请选择返状态', trigger: 'change' }],
        photogold: [
          { required: true, message: '请输入返金币', trigger: 'blur' },
          { validator: goldValidator, trigger: 'blur' }
        ],
        friendstatus: [{ required: true, message: '请选择返状态', trigger: 'change' }],
        friendgold: [{ required: true, message: '请输入返金币', trigger: 'blur' }],
        rngold: [
          { required: true, message: '请输入返金币', trigger: 'blur' },
          { validator: goldValidator, trigger: 'blur' }
        ],
        /* partnernums: [
          { required: true, message: '请输入人数', trigger: 'blur' },
          { type: 'number', message: '人数必须为数字' }
        ], */
        servicetel: [
          { required: true, message: '请输入客服电话', trigger: 'blur' },
          { validator: photoValidator, trigger: 'blur' }
        ],
        workinghours: [
          { required: true, message: '请输入工作时间', trigger: 'blur' },
          { validator: timeValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 保存按钮 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* let obj = {
            id: this.rnsForm.goldId,
            certificationOpen: this.rnsForm.rnstatus === '是' ? true : false,
            certificationAmount: this.rnsForm.rngold,
            sfzOpen: this.rnsForm.photostatus === '是' ? true : false,
            sfzAmount: this.rnsForm.photogold,
            inviteFriendsOpen: this.rnsForm.friendstatus === '是' ? true : false,
            inviteFriendsAmount: this.rnsForm.friendgold,
            // this.rnsForm.partnernums = 0
            iosTmk: this.rnsForm.servicetel,
            iosCompanyTime: this.rnsForm.workinghours,
            iosSite: this.rnsForm.address
          } */
          // console.log(obj)
          this.$axios({
            url: '/goldRun/save',
            method: 'post',
            data: {
              id: this.rnsForm.goldId,
              certificationOpen: this.rnsForm.rnstatus === '是' ? true : false,
              certificationAmount: this.rnsForm.rngold,
              sfzOpen: this.rnsForm.photostatus === '是' ? true : false,
              sfzAmount: this.rnsForm.photogold,
              inviteFriendsOpen: this.rnsForm.friendstatus === '是' ? true : false,
              inviteFriendsAmount: this.rnsForm.friendgold,
              // this.rnsForm.partnernums = 0
              iosTmk: this.rnsForm.servicetel,
              iosCompanyTime: this.rnsForm.workinghours,
              iosSite: this.rnsForm.address
            }
          }).then((res) => {
            // console.log(res)
            if (res.code === '200') {
              this.$message({
                message: '保存成功!',
                type: 'success',
                duration: 1500
              })
              this.getList()
            } else {
              this.$message({
                message: '保存失败!',
                type: 'error',
                duration: 1500
              })
              return false
            }
          })
        } else {
          this.$message({
            message: '请完成表格的填写!',
            type: 'warning',
            duration: 1500
          })
          return false
        }
      })
    },
    // 获取列表数据
    getList() {
      this.$axios.get('/goldRun/getGoldRun', {}).then((res) => {
        // console.log(res.data)
        if (res.code === '200') {
          // 将获取的运营配置的数据转存到 rnsForm 中
          this.rnsForm.goldId = res.data.id
          this.rnsForm.rnstatus = res.data.certificationOpen === true ? '是' : '否'
          this.rnsForm.rngold = res.data.certificationAmount
          this.rnsForm.photostatus = res.data.sfzOpen === true ? '是' : '否'
          this.rnsForm.photogold = res.data.sfzAmount
          this.rnsForm.friendstatus = res.data.inviteFriendsOpen === true ? '是' : '否'
          this.rnsForm.friendgold = res.data.inviteFriendsAmount
          // this.rnsForm.partnernums = 0
          this.rnsForm.servicetel = res.data.iosTmk
          this.rnsForm.workinghours = res.data.iosCompanyTime
          this.rnsForm.address = res.data.iosSite
          // console.log(this.rnsForm)
        }
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
// 大盒子
.operation-container {
  // 导航面包屑
  .title {
    height: 50px;
    padding: 10px;
    background-color: white;
    font-weight: bold !important;
  }
  // from表单
  .demo-ruleForm {
    margin-top: 15px;
    padding-top: 35px;
    padding-bottom: 10px;
    background-color: #fff;
    // 下拉菜单宽度
    .el-select {
      width: 350px;
    }
    // input 输入框
    .el-input {
      width: 450px;
    }
    // 保存按钮
    .el-button {
      width: 300px;
    }
  }
}
</style>
