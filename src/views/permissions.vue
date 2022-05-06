<template>
  <div>
    <el-row>
      <el-col :span="24" class="title">
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/storement' }"
              >门店管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限组</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="content">
          <el-col :span="24" class="bg_right">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="姓名">
                <el-input
                  v-model="formInline.user"
                  placeholder="请输入负责人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="formInline.region">
                  <el-option
                    label="请选择"
                    disabled
                    el-selected
                    value=""
                  ></el-option>
                  <el-option label="营业中" value="0"></el-option>
                  <el-option label="休息中" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onQuery(formInline)"
                  >查询</el-button
                >
                <el-button type="primary" @click="onAdd = true">新增</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-from >
        
      </el-from> -->
          </el-col>
          <!-- 表格 -->
          <el-col :span="24" class="bg_right">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="adminL" label="权限组"> </el-table-column>

              <el-table-column prop="note" label="备注"> </el-table-column>

              <el-table-column prop="date" label="修改时间"> </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!-- 分页 -->
          <!--  <el-col :span="24" class="bg_right">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
              >
              </el-pagination>
            </div>
          </el-col> -->
          <el-col :span="24" class="page">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagecount"
              >
              </el-pagination>
            </div>
          </el-col>
          <!-- 编辑弹出框 -->
          <el-col :span="24">
            <el-dialog title="权限管理" :visible.sync="dialogFormVisible">
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- 职位管理 -->
                <el-form-item label="职位管理" prop="type">
                  <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="新增" name="type"></el-checkbox>
                    <el-checkbox label="修改" name="type"></el-checkbox>
                    <el-checkbox label="查询" name="type"></el-checkbox>
                    <el-checkbox label="明细" name="type"></el-checkbox>
                    <el-checkbox label="删除" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 销售级别管理 -->
                <el-form-item label="销售级别管理" prop="type">
                  <el-checkbox-group v-model="sales.type">
                    <el-checkbox label="修改" name="type"></el-checkbox>
                    <el-checkbox label="查询" name="type"></el-checkbox>
                    <el-checkbox label="明细" name="type"></el-checkbox>
                    <el-checkbox label="删除" name="type"></el-checkbox>
                    <el-checkbox label="新增" name="type"></el-checkbox>
                    <el-checkbox
                      label="职位查看销售级别"
                      name="type"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 图片管理 -->
                <el-form-item label="图片管理" prop="photo">
                  <el-checkbox-group v-model="photo_one.photo">
                    <el-checkbox label="图片上传" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 资金管理 -->
                <el-form-item label="资金管理" prop="type">
                  <el-checkbox-group v-model="money.type">
                    <el-checkbox label="用户待收" name="type"></el-checkbox>
                    <el-checkbox label="资金记录" name="type"></el-checkbox>
                    <el-checkbox label="充值管理" name="type"></el-checkbox>
                    <el-checkbox label="提现管理" name="type"></el-checkbox>
                    <el-checkbox label="充值审核" name="type"></el-checkbox>
                    <el-checkbox label="提现审核" name="type"></el-checkbox>
                    <el-checkbox label="批量充值审核" name="type"></el-checkbox>
                    <el-checkbox label="批量提现审核" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 组织架构 -->
                <el-form-item label="组织架构" prop="type">
                  <el-checkbox-group v-model="organization.type">
                    <el-checkbox label="新增" name="type"></el-checkbox>
                    <el-checkbox label="查询" name="type"></el-checkbox>
                    <el-checkbox label="明细" name="type"></el-checkbox>
                    <el-checkbox label="编辑" name="type"></el-checkbox>
                    <el-checkbox label="删除" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 组织架构 -->
                <el-form-item label="权限设定" prop="type">
                  <el-checkbox-group v-model="permissionsSet.type">
                    <el-checkbox label="新增" name="type"></el-checkbox>
                    <el-checkbox label="查询" name="type"></el-checkbox>
                    <el-checkbox label="明细" name="type"></el-checkbox>
                    <el-checkbox label="编辑" name="type"></el-checkbox>
                    <el-checkbox label="删除" name="type"></el-checkbox>
                    <el-checkbox
                      label="获取平台全部基本权限"
                      name="type"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Useredit()">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <!-- 新增弹出框 -->
          <el-col :span="24">
            <el-dialog
              title="增加"
              :visible.sync="onAdd"
              class="popup"
              id="chuang"
            >
              <!-- <el-form :model="form"> -->
              <el-col :span="24">
                <el-form
                  :model="ruleForm"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <!-- 权限配置 -->
                  <el-form-item label="权限配置" prop="permissions">
                    <el-select
                      v-model="ruleForm.permissions"
                      placeholder="请选择职位"
                    >
                      <el-option label="员工" value="员工"></el-option>
                      <el-option label="经理" value="经理"></el-option>
                      <el-option
                        label="超级管理员"
                        value="超级管理员"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 备注 -->
                  <el-form-item label="备注" prop="note" class="chuang1">
                    <el-input v-model="ruleForm.note"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addList = false">取 消</el-button>
                <el-button type="primary" @click="addUser"> 添加 </el-button>
              </div>
            </el-dialog>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
    
<script>
import qs from "qs";
export default {
  data() {
    return {
      currentPage: 1,
      pagecount: 0,
      // 权限管理页面内容
      formInline: {
        user: "",
        region: "",
        regionNem: "",
      },

      tableData: [],
      // 弹窗功能代码
      dialogTableVisible: false,
      dialogFormVisible: false,
      addList: false,
      addEditor: false,
      onAdd: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      // 弹窗内容 photo图片 position职位
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      sales: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        photo: "",
        position: "",
      },
      // 图标上传
      photo_one: {
        photo: "",
      },
      //资金管理
      money: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      //组织架构
      organization: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      //权限设定
      permissionsSet: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    //点击编辑按钮
    edit(row) {
       this.dialogFormVisible = true;
       /* this.ruleForm.region = row.store;
      this.ruleForm.permissions = row.adminL;
      this.ruleForm.name = row.name;
      this.ruleForm.state = row.state;
      this.ruleForm.tel = row.cal; */
      sessionStorage.setItem("editId", row.id);
      console.log(row);
    },
    //取消
    dialogVisible() {
      this.dialogFormVisible = false;
      this.$refs["ruleform"].resetFields();
    },

    //编辑
    Useredit(index, data) {
      //this.dialogFormVisible = true;
      this.permissionsSet = data[index];
    },
    //查询
    onQuery(formName) {
      this.$axios({
        url: "/role/getAll",
        method: "get",
        params: {
          page: 1,
          size: 5,
        },
      }).then((data) => {
        console.log(data);
      });
    },
    //添加
    addUser() {
      let obj = {};
      obj.roleName = this.ruleForm.permissions;
      obj.roleRemark = this.ruleForm.note;
      console.log(obj);
      this.$axios({
        url: "/role/add",
        method: "post",
        data: obj,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            let formData = {};
            formData.page = 1;
            formData.size = 5;
            this.$axios({
              url: "/role/getAll",
              method: "get",
              params: formData,
            })
              .then((res) => {
                console.log(res);
                if (res.code === "200") {
                  let tableData = [];
                  res.data.forEach((item) => {
                    let obj = {};
                    obj.adminL = item.roleName;
                    obj.date = item.roleUpdateTime;
                    obj.note = item.roleRemark;
                    obj.id = item.roleId;
                    tableData.push(obj);
                  });
                  this.tableData = tableData;
                  this.pagecount = res.total;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除接口
    handleDelete(index, row) {
      console.log(index, row);
      let userId = row.id;
      this.$axios
        .post("/role/delete", qs.stringify({ id: userId }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            let formData = {};
            formData.page = 1;
            formData.size = 5;
            this.$axios({
              url: "/role/getAll",
              method: "get",
              params: formData,
            })
              .then((res) => {
                console.log(res);
                if (res.code === "200") {
                  let tableData = [];
                  res.data.forEach((item) => {
                    let obj = {};
                    obj.adminL = item.roleName;
                    obj.date = item.roleUpdateTime;
                    obj.note = item.roleRemark;
                    obj.id = item.roleId;
                    tableData.push(obj);
                  });
                  this.tableData = tableData;
                  this.pagecount = res.total;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$axios({
        url: "/role/getAll",
        method: "get",
        params: {
          page: val,
          size: 5,
        },
      }).then((res) => {
        console.log(res);
        if (res.code === "200") {
          let tableData = [];
          res.data.forEach((item, index) => {
            let obj = {};
            obj.adminL = item.roleName;
            obj.date = item.roleUpdateTime;
            obj.note = item.roleRemark;
            obj.id = item.roleId;
            tableData.push(obj);
          });
          this.tableData = tableData;
        }
      });
    },
    // 弹窗内容--代码开始
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    let formData = {};
    formData.page = 1;
    formData.size = 5;
    this.$axios({
      url: "/role/getAll",
      method: "get",
      params: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.code === "200") {
          let tableData = [];
          res.data.forEach((item, index) => {
            let obj = {};
            obj.adminL = item.roleName;
            obj.date = item.roleUpdateTime;
            obj.note = item.roleRemark;
            obj.id = item.roleId;
            tableData.push(obj);
          });
          this.tableData = tableData;
          this.pagecount = res.total;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang='less'>
// el-col组件背景色
.title {
  height: 50px;
  padding: 10px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  height: 600px;
  padding: 20px;
  margin-top: 10px;
  background-color: white;
}
// 弹窗内容样式css
.listcol {
  margin: 10px;
}
.bg_right {
  //background-color: rgb(148, 150, 255);
  border-radius: 5px;
  padding: 10px;
  margin: 3px;
}
.dialog-footer {
  text-align: center;
}

.page {
  margin-top: 15px;
  text-align: center;
}
</style>

