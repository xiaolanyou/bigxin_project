<template>
  <div>
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/supplierManagement' }"
              >供应商管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>添加供应商</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商名称:" prop="name">
          <el-col :span="8"
            ><el-input
              v-model="ruleForm.name"
              placeholder="请输入供应商名称"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="负责人:" prop="principal">
          <el-col :span="8"
            ><el-input
              v-model="ruleForm.principal"
              placeholder="请输入负责人"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="负责人电话:" prop="principalPhone">
          <el-col :span="8"
            ><el-input
              v-model="ruleForm.principalPhone"
              placeholder="请输入负责人电话"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="地址:" prop="site">
          <el-col :span="8"
            ><el-input
              v-model="ruleForm.site"
              placeholder="请输入地址"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-col :span="8"
            ><el-input
              v-model="ruleForm.remarks"
              placeholder="请输入备注"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        principal: "",
        principalPhone: "",
        site: "",
        remarks: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "blur",
          },
        ],
         principal: [
          {
            required: true,
            message: "请输入负责人",
            trigger: "blur",
          },
        ],
         principalPhone: [
          {
            required: true,
            message: "请输入负责人电话",
            trigger: "blur",
          },
        ],
         site: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur",
          },
        ],
         remarks: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      let formData={};
      formData.name=this.ruleForm.name;
      formData.principal=this.ruleForm.principal;
      formData.principalPhone=this.ruleForm.principalPhone;
      formData.site=this.ruleForm.site;
      formData.remarks=this.ruleForm.remarks;
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$axios({
              url:'/supplier/add',
              method:'post',
              data:formData
            })
            .then(data=>{
              console.log(data);
            })
            .catch(err=>{
              console.log(err);
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>
<style lang="less" scoped>
.title {
  height: 50px;
  padding: 10px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  height: 550px;
  padding: 5px 20px;
  margin-top: 10px;
  background-color: white;
  .dateTime {
    width: 368px !important;
  }
}
</style>