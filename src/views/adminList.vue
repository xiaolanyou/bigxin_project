<template>
  <div>
    <el-row>
      <!-- 头部 -->
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
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 导航 -->
    <div class="content">
      <el-row>
        <el-col>
          <el-form
            :inline="true"
            :model="formInline"
            ref="formInline"
            class="demo-form-inline"
          >
            <el-col :span="18">
              <el-form-item label="门店名">
                <el-select v-model="formInline.regionNem" placeholder="请选择">
                  <template v-for="item in shopData">
                    <el-option
                      :label="`${item.regionNem}`"
                      :value="`${item.id}`"
                      :key="item.id"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input
                  v-model="formInline.user"
                  placeholder="请输入负责人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="formInline.region" placeholder="请选择">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="冻结" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="onQuery(formInline)"
                  >查询</el-button
                >
                <el-button size="primary" @click="addList">新增</el-button>
              </el-form-item>
            </el-col>
          </el-form>

          <!-- 表格 -->
          <el-col :span="24" class="bg_right">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="负责人"> </el-table-column>

              <el-table-column prop="cal" label="负责人电话"> </el-table-column>

              <el-table-column prop="store" label="所属门店"> </el-table-column>

              <el-table-column prop="adminL" label="权限组"> </el-table-column>

              <el-table-column prop="date" label="修改日期"> </el-table-column>

              <el-table-column prop="state" label="状态"> </el-table-column>

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

          <!-- 编辑 -->
          <el-dialog title="修改" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" ref="ruleform">
              <!-- 所属门店 -->
              <el-form-item
                label="所属门店"
                prop="region"
                :label-width="formLabelWidth"
              >
                <el-select v-model="ruleForm.region" placeholder="请选择门店">
                  <template v-for="item in shopData">
                    <el-option
                      :label="`${item.regionNem}`"
                      :value="`${item.id}`"
                      :key="item.id"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <!-- 权限配置 -->
              <el-form-item
                label="权限配置"
                prop="permissions"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="ruleForm.permissions"
                  placeholder="请选择职位"
                >
                  <el-option label="员工" value="2"></el-option>
                  <el-option label="超级管理员" value="1"></el-option>
                </el-select>
              </el-form-item>
              <!-- 姓名 -->
              <el-form-item
                label="姓名"
                prop="name"
                :label-width="formLabelWidth"
              >
                <el-input v-model="ruleForm.name" class="inputWidth"></el-input>
              </el-form-item>
              <!-- 账号状态 -->
              <el-form-item
                label="账号状态"
                prop="state"
                :label-width="formLabelWidth"
              >
                <el-select v-model="ruleForm.state" placeholder="请选择状态">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="冻结" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- 电话 -->
              <el-form-item
                label="电话"
                prop="tel"
                :label-width="formLabelWidth"
              >
                <el-input v-model="ruleForm.tel" class="inputWidth"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible">取消</el-button>
              <el-button type="primary" @click="determine">确定</el-button>
            </div>
          </el-dialog>
          <!-- 新增 -->
          <el-dialog
            title="增加"
            :visible.sync="addDialogFormVisible"
            width="30%"
          >
            <el-form
              :model="form"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- 所属门店 -->
              <el-form-item label="所属门店" prop="region">
                <el-select v-model="form.region" placeholder="请选择门店">
                  <template v-for="item in shopData">
                    <el-option
                      :label="`${item.regionNem}`"
                      :value="`${item.id}`"
                      :key="item.id"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <!-- 权限配置 -->
              <el-form-item label="权限配置" prop="permissions">
                <el-select v-model="form.permissions" placeholder="请选择职位">
                  <el-option label="员工" value="2"></el-option>
                  <el-option label="超级管理员" value="1"></el-option>
                </el-select>
              </el-form-item>
              <!-- 姓名 -->
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" class="inputWidth"></el-input>
              </el-form-item>
              <!-- 账号状态 -->
              <el-form-item label="账号状态" prop="state">
                <el-select v-model="form.state" placeholder="请选择活动区域">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="冻结" value="0"></el-option>
                </el-select>
              </el-form-item>
              <!-- 电话 -->
              <el-form-item label="电话" prop="tel">
                <el-input v-model="form.tel" class="inputWidth"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible('ruleForm')">取消</el-button>
              <el-button type="primary" @click="addUser">添加</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
    
<script>
// import qs from "qs";
export default {
  data() {
    return {
      pagecount: 0,
      shopData: [],
      formInline: {
        user: "",
        region: "",
        regionNem: "",
      },
      tableData: [],
      currentPage: 1,
      dialogFormVisible: false,
      //新增
      addDialogFormVisible: false,
      form: {
        name: "",
        tel: "",
        region: "",
        state: "",
        permissions: "",
      },
      formLabelWidth: "120px",
      //state状态，permissions权限，region地区
      ruleForm: {
        name: "",
        tel: "",
        region: "",
        state: "",
        permissions: "",
      },
    };
  },
  methods: {
    //编辑
    edit(row) {
      this.dialogFormVisible = true;
      this.ruleForm.region = row.store;
      this.ruleForm.permissions = row.adminL;
      this.ruleForm.name = row.name;
      this.ruleForm.state = row.state;
      this.ruleForm.tel = row.cal;
      sessionStorage.setItem("editId", row.id);
      console.log(row);
    },
    //取消
    dialogVisible() {
      this.dialogFormVisible = false;
      this.$refs["ruleform"].resetFields();
    },
    //编辑-确定
    determine() {
      this.dialogFormVisible = false;
      let formData = {};
      this.shopData.forEach((item) => {
        if (item.regionNem == this.ruleForm.region) {
          formData.shopId = item.id + "";
        }
      });

      if (this.ruleForm.permissions == "超级管理员") {
        formData.roleId = "1";
      } else if (this.ruleForm.permissions == "员工") {
        formData.roleId = "2";
      } else {
        formData.roleId = "";
      }
      formData.name = this.ruleForm.name;

      /* if (this.ruleForm.state == "正常") {
        formData.state = "1";
      } else{
        formData.state = "0";
      } */
      formData.state = this.ruleForm.state == "正常" ? "1" :"0";
      formData.phone = this.ruleForm.tel;
      formData.id = sessionStorage.getItem("editId") + "";

      console.log(formData);
      this.$axios({
        url: "/manager/update",
        method: "post",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            //table表格渲染。
            this.$axios({
              url: "/manager/getAll",
              method: "get",
              params: {
                page: 1,
                size: 5,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.code === "200") {
                  let tableData = [];
                  let totalNum = res.data.count;

                  res.data.forEach((item, index) => {
                    let obj = {};
                    obj.name = item.managerName;
                    obj.cal = item.phone;
                    obj.store = item.shopName;
                    obj.adminL = item.roleName;
                    obj.date = item.updateTime;
                    obj.state = item.state;
                    obj.id = item.id;
                    tableData.push(obj);
                  });
                  this.tableData = tableData;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加功能
    addList() {
      this.addDialogFormVisible = true;
    },
    //取消
    addDialogVisible(formName) {
      this.addDialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //添加-确定
    addUser() {
      this.addDialogFormVisible = false;
      let formData = {};
      formData.shopId = this.form.region;
      formData.roleId = this.form.permissions;
      formData.name = this.form.name;
      formData.state = this.form.state;
      formData.phone = this.form.tel;
      console.log(formData);
      this.$axios({
        url: "/manager/add",
        method: "post",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            //table表格渲染。
            this.$axios({
              url: "/manager/getAll",
              method: "get",
              params: {
                page: 1,
                size: 5,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.code === "200") {
                  let tableData = [];
                  let totalNum = res.data.count;
                  res.data.forEach((item, index) => {
                    let obj = {};
                    obj.name = item.managerName;
                    obj.cal = item.phone;
                    obj.store = item.shopName;
                    obj.adminL = item.roleName;
                    obj.date = item.updateTime;
                    obj.state = item.state;
                    obj.id = item.id;
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
        .catch((err) => {
          console.log(err);
        });
      this.form.region = "";
      this.form.permissions = "";
      this.form.name = "";
      this.form.state = "";
      this.form.tel = "";
    },
    //查询
    onQuery(formName) {
      let obj = {};
      //门店名
      obj.shopName = formName.regionNem;
      //姓名
      obj.managerName = formName.user;
      //状态
      obj.state = formName.region;
      this.$axios({
        url: "/manager/geListBy",
        method: "get",
        params: {
          name: obj.managerName,
          page: 1,
          shopId: obj.shopName,
          size: 5,
          state: obj.state,
        },
      }).then((res) => {
        console.log(res);
        if (res.code === "200") {
          let tableData = [];
          res.data.forEach((item, index) => {
            let obj = {};
            obj.name = item.managerName;
            obj.cal = item.phone;
            obj.store = item.shopName;
            obj.adminL = item.roleName;
            obj.date = item.updateTime;
            obj.state = item.state;
            obj.id = item.id;
            tableData.push(obj);
          });
          this.tableData = tableData;
          this.pagecount = res.total;
        }
      });
    },
    //删除
    handleDelete(index, row) {
      //这里删除要删除后台的ID，不是当前表格的id，如果表格里没有id，就需要在之前渲染的时候把ID拿到，但是不渲染就行，这个id在row里
      let userId = row.id;
      //遇到post 请求，后面是地址拼接的，就需要用qs转一下。再headers上拼接一个请求头
      /* this.$axios
        .post("/manager/delete", qs.stringify({ id: userId }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log(res);
        }); */
      this.$axios({
        url: "/manager/delete",
        method: "post",
        params: { id: userId },
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            //table表格渲染。
            this.$axios({
              url: "/manager/getAll",
              method: "get",
              params: {
                page: 1,
                size: 5,
              },
            })
              .then((res) => {
                if (res.code === "200") {
                  let tableData = [];
                  let totalNum = res.data.count;

                  res.data.forEach((item, index) => {
                    let obj = {};
                    obj.name = item.managerName;
                    obj.cal = item.phone;
                    obj.store = item.shopName;
                    obj.adminL = item.roleName;
                    obj.date = item.updateTime;
                    obj.state = item.state;
                    obj.id = item.id;
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
        .catch((err) => {
          console.log(err);
        });

      //查询-门店下拉
      this.$axios({
        url: "/manager/getShop",
        method: "get",
        params: {},
      })
        .then((res) => {
          if (res.code === "200") {
            let shopData = [];
            res.data.forEach((item, index) => {
              let obj = {};
              obj.id = item.id;
              obj.regionNem = item.name;
              shopData.push(obj);
            });
            this.shopData = shopData;
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$axios({
        url: "/manager/getAll",
        method: "get",
        params: {
          page: val,
          size: 5,
        },
      })
        .then((resData) => {
          console.log(resData);
          if (resData.code === "200") {
            let tableData = [];
            resData.data.forEach((item) => {
              let obj = {};
              obj.name = item.managerName;
              obj.cal = item.phone;
              obj.store = item.shopName;
              obj.adminL = item.roleName;
              obj.date = item.updateTime;
              obj.state = item.state;
              obj.id = item.id;
              tableData.push(obj);
            });
            this.tableData = tableData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    //table表格渲染。
    this.$axios({
      url: "/manager/getAll",
      method: "get",
      params: {
        page: 1,
        size: 5,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.code === "200") {
          let tableData = [];
          let totalNum = res.data.count;
          res.data.forEach((item, index) => {
            let obj = {};
            obj.name = item.managerName;
            obj.cal = item.phone;
            obj.store = item.shopName;
            obj.adminL = item.roleName;
            obj.date = item.updateTime;
            obj.state = item.state;
            obj.id = item.id;
            tableData.push(obj);
          });
          this.tableData = tableData;
          this.pagecount = res.total;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //查询-门店下拉
    this.$axios({
      url: "/manager/getShop",
      method: "get",
      params: {},
    })
      .then((res) => {
        console.log(res);
        if (res.code === "200") {
          let shopData = [];
          res.data.forEach((item, index) => {
            let obj = {};
            obj.id = item.id;
            obj.regionNem = item.name;
            shopData.push(obj);
          });
          this.shopData = shopData;
          console.log(this.shopData);
        }
      })
      .catch((req) => {
        console.log(req);
      });
  },
};
</script>

<style lang='less' scoped>
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
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}

.dialog-footer {
  display: block;
  clear: both;
  text-align: center;
}

/* #chuang {
  margin: auto;
  width: 800px;
  display: block;
  // text-align: center;
}
.chuang1 {
  width: 320px;
} */
.inputWidth {
  width: 220px !important;
}
.bg_right {
  //background-color: rgb(148, 150, 255);
  border-radius: 5px;
  padding: 10px;
  margin: 3px;
}
.page {
  margin-top: 15px;
  text-align: center;
}
</style>