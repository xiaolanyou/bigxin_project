<template>
  <div>
    <!-- 头部 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }"
              >用户管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索栏 -->
    <div class="content">
      <el-row>
        <el-col>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="18">
              <el-form-item label="供应商名称">
                <el-input
                  v-model="formInline.supplier"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="负责人名称">
                <el-input
                  v-model="formInline.principal"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="负责人电话">
                <el-input
                  v-model="formInline.tel"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="供应商状态">
                <el-select
                  v-model="formInline.salesStatus"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="冻结" value="冻结"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="供应商地址">
                <el-input
                  v-model="formInline.supplierAddress"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <div class="block">
                  <el-date-picker
                    v-model="value"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions"
                    size="small"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="终止时间">
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions"
                    size="small"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addSupplier">添加</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-row class="content-list">
        <el-col>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="供应商名称"> </el-table-column>
            <el-table-column prop="principal" label="负责人"> </el-table-column>
            <el-table-column
              prop="principalPhone"
              label="负责人电话"
            ></el-table-column>
            <el-table-column
              prop="site"
              label="供应商地址"
              width="250px"
            ></el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
            <el-table-column
              prop="state"
              label="供应商状态"
              :formatter="formatBoolean"
            >
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="修改时间"
              width="200px"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  @click="deleteClick(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹窗 -->
          <el-dialog title="修改" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="ruleform">
              <el-form-item
                label="供应商名称"
                :label-width="formLabelWidth"
                prop="supplier"
              >
                <el-input v-model="form.supplier" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="负责人"
                :label-width="formLabelWidth"
                prop="principal"
              >
                <el-input
                  v-model="form.principal"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="负责人电话"
                :label-width="formLabelWidth"
                prop="tel"
              >
                <el-input v-model="form.tel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="供应商地址"
                :label-width="formLabelWidth"
                prop="supplierAddress"
              >
                <el-input
                  v-model="form.supplierAddress"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="备注"
                :label-width="formLabelWidth"
                prop="excessInventory"
              >
                <el-input
                  v-model="form.excessInventory"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="供应商状态"
                :label-width="formLabelWidth"
                prop="supplierState"
              >
                <el-input
                  v-model="form.supplierState"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible">取 消</el-button>
              <el-button type="primary" @click="determine">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <div class="block page">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
      currentPage: 0,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      pagecount: 0,
      page: 1,
      size: 5,
      formInline: {
        supplier: "",
        principal: "",
        tel: "",
        supplierState: "",
        supplierAddress: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      form: {
        supplier: "",
        principal: "",
        tel: "",
        supplierAddress: "",
        excessInventory: "",
        supplierState: "",
      },
      rules: {
        supplier: [
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
        tel: [
          {
            required: true,
            message: "请输入负责人电话",
            trigger: "blur",
          },
        ],
        supplierAddress: [
          {
            required: true,
            message: "请输入供应商地址",
            trigger: "blur",
          },
        ],
        excessInventory: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
        supplierState: [
          {
            required: true,
            message: "请输入供应商状态",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    formatBoolean: function (row, column, cellValue) {
      var ret = "";
      if (cellValue) {
        ret = "正常";
      } else {
        ret = "冻结";
      }
      return ret;
    },
    //查询
    onSubmit() {
      var d = new Date(this.value);
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let day = d.getDate();
      day = day < 10 ? "0" + day : day;
      let h = d.getHours();
      h = h < 10 ? "0" + h : h;
      let f = d.getMinutes();
      f = f < 10 ? "0" + f : f;
      let s = d.getSeconds();
      s = s < 10 ? "0" + s : s;
      const time = y + "-" + m + "-" + day + " " + h + ":" + f + ":" + f;
      d = new Date(this.value1);
      y = d.getFullYear();
      m = d.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      day = d.getDate();
      day = day < 10 ? "0" + day : day;
      h = d.getHours();
      h = h < 10 ? "0" + h : h;
      f = d.getMinutes();
      f = f < 10 ? "0" + f : f;
      s = d.getSeconds();
      s = s < 10 ? "0" + s : s;
      const time1 = y + "-" + m + "-" + day + " " + h + ":" + f + ":" + f;

      let formData = {};
      formData.name = this.formInline.supplier;
      formData.principal = this.formInline.principal;
      if (this.formInline.salesStatus === "正常") {
        this.formInline.salesStatus = true;
      } else if (this.formInline.salesStatus === "冻结") {
        this.formInline.salesStatus = false;
      } else {
        this.formInline.salesStatus = null;
      }
      formData.state = this.formInline.salesStatus;
      formData.principalPhone = this.formInline.tel;
      formData.site = this.formInline.supplierAddress;
      formData.startTime = this.formInline.time;
      formData.endTime = this.formInline.time1;
      formData.page = this.page;
      formData.size = this.size;
      this.$axios({
        url: "/supplier/getList",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.pagecount = Number(data.count);
            let ListData = data.data;
            let arrData = [];
            ListData.forEach((item) => {
              arrData.push(item);
            });
            this.tableData = arrData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //跳转添加供应商
    addSupplier() {
      this.$router.push("/comm/addSupplier");
    },
    //修改
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form.supplier = row.name;
      this.form.principal = row.principal;
      this.form.tel = row.principalPhone;
      this.form.supplierAddress = row.site;
      this.form.excessInventory = row.remarks;
      this.form.supplierState = row.state === true ? "正常" : "冻结";
      sessionStorage.setItem("id", row.id);
    },
    //取消
    dialogVisible() {
      this.dialogFormVisible = false;
      this.$refs["ruleform"].clearValidate("");
      this.$refs["ruleform"].resetFields();
    },
    //确定
    determine() {
      this.dialogFormVisible = false;
      let formData = {};
      formData.id = Number(sessionStorage.getItem("id"));
      formData.name = this.form.supplier;
      formData.principal = this.form.principal;
      formData.principalPhone = this.form.tel;
      formData.site = this.form.supplierAddress;
      formData.remarks = this.form.excessInventory;
      formData.state = this.form.supplierState === "正常" ? true : false;

      this.$axios({
        url: "/supplier/update",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.$axios({
              url: "/supplier/getList",
              method: "post",
              data: {},
            })
              .then((data) => {
                if (data.code == 200) {
                  this.pagecount = Number(data.count);
                  let ListData = data.data;
                  let arrData = [];
                  ListData.forEach((item) => {
                    arrData.push(item);
                  });
                  this.tableData = arrData;
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
    //删除
    deleteClick(index, row) {
      let idData = {};
      idData.id = row.id;
      console.log(idData);
      this.$axios({
        url: "/supplier/delete",
        method: "post",
        params: idData,
      })
        .then((params) => {
          if (params.code == 200) {
            this.tableData.splice(index, 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页
    handleSizeChange(val) {
      this.size = Number(val);
      this.$axios({
        url: "/supplier/getList",
        method: "post",
        data: { size: this.size, page: this.page },
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.pagecount = Number(data.count);
            let ListData = data.data;
            let arrData = [];
            ListData.forEach((item) => {
              arrData.push(item);
            });
            this.tableData = arrData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      console.log(123);
      this.page = Number(val);
      this.$axios({
        url: "/supplier/getList",
        method: "post",
        data: { page: this.page, size: this.size },
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.pagecount = Number(data.count);
            let ListData = data.data;
            let arrData = [];
            ListData.forEach((item) => {
              arrData.push(item);
            });
            this.tableData = arrData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //生命周期钩子函数页面加载自动调用
  created() {
    this.$axios({
      url: "/supplier/getList",
      method: "post",
      data: { page: this.page, size: this.size },
    })
      .then((data) => {
        console.log(data);
        if (data.code == 200) {
          this.pagecount = Number(data.count);
          let ListData = data.data;
          let arrData = [];
          ListData.forEach((item) => {
            arrData.push(item);
          });
          this.tableData = arrData;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
  padding: 20px;
  margin-top: 10px;
  background-color: white;
  .el-select {
    width: 175px;
  }
  .content-list {
    margin-top: 30px;
  }
  .page {
    margin-top: 15px;
    text-align: center;
  }
}
</style>