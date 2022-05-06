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
            <el-breadcrumb-item :to="{ path: '/comm/productList' }"
              >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>门店库存</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-row>
        <el-col>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="18">
              <el-form-item label="商品名称">
                <el-input
                  v-model="formInline.name"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属门店">
                <el-input
                  v-model="formInline.store"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-select
                  v-model="formInline.supplier"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="审核中" value="审核中"></el-option>
                  <el-option label="审核失败" value="审核失败"></el-option>
                  <el-option label="审核成功" value="审核成功"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="exportSubmit">导出</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="content-list">
        <el-col>
          <!-- 表格 -->
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="商品id"></el-table-column>

            <el-table-column
              prop="goodsName"
              label="商品名称"
            ></el-table-column>
            <el-table-column prop="promotionStatement" label="推荐语">
            </el-table-column>
            <el-table-column
              prop="goodsPrice"
              label="销售价格（元）"
            ></el-table-column>
            <el-table-column prop="shopName" label="所属门店"></el-table-column>
            <el-table-column
              prop="consumeNumber"
              label="消耗数量"
            ></el-table-column>
            <el-table-column
              prop="applyName"
              label="申请人账号"
            ></el-table-column>
            <el-table-column
              prop="applyTime"
              label="申请时间"
            ></el-table-column>
            <el-table-column
              prop="applyRemarks"
              label="申请备注"
            ></el-table-column>
            <el-table-column
              prop="auditTime"
              label="审核时间"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="审核状态"
              :formatter="tableState"
            ></el-table-column>
            <el-table-column prop="auditName" label="审核人"></el-table-column>
            <el-table-column
              prop="auditRemarks"
              label="审核备注"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text"
                  >审核</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹窗 -->
          <el-dialog title="审核" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="ruleform">
              <el-form-item
                label="审核"
                :label-width="formLabelWidth"
                class="select"
                prop="audit"
              >
                <el-select v-model="form.audit" placeholder="请选择">
                  <el-option label="审核中" value="审核中"></el-option>
                  <el-option label="审核失败" value="审核失败"></el-option>
                  <el-option label="审核成功" value="审核成功"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="审核备注"
                :label-width="formLabelWidth"
                prop="auditNote"
              >
                <el-input
                  v-model="form.auditNote"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible">取 消</el-button>
              <el-button type="primary" @click="dialogcomfirm">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
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
      page: 1,
      size: 5,
      currentPage: 4,
      pagecount: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        audit: "",
        auditNote: "",
      },
      formLabelWidth: "120px",
      formInline: {
        user: "",
        supplier: "",
        salesStatus: "",
        promotionState: "",
      },
      rules: {
        audit: [
          {
            required: true,
            message: "请输入审核状态",
            trigger: "blur",
          },
        ],
        auditNote: [
          {
            required: true,
            message: "请输入审核备注",
            trigger: "blur",
          },
        ],
      },
      tableData: [],
    };
  },
  methods: {
    //表格中state的状态转换
    tableState: function (row, column, cellValue) {
      var ret = "";
      if (cellValue == 0) {
        ret = "审核中";
      } else if (cellValue == 1) {
        ret = "审核通过";
      } else {
        ret = "审核失败";
      }
      return ret;
    },
    //查询
    onSubmit() {
      console.log("submit!");
      let formData = {};
      formData.name = this.formInline.name;
      formData.shopName = this.formInline.store;
      if (this.formInline.supplier === "审核中") {
        formData.state = 0;
      } else if (this.formInline.supplier === "审核通过") {
        formData.state = 1;
      } else if (this.formInline.supplier === "审核失败") {
        formData.state = 2;
      } else {
        formData.state = null;
      }
      formData.page = this.page;
      formData.size = this.size;
      this.$axios({
        url: "/shopGoodsConsume/getList",
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
    //导出
    exportSubmit() {
      console.log("导出");
      let formData = {};
      formData.name = this.formInline.name;
      formData.shopName = this.formInline.store;
      if (this.formInline.supplier === "审核中") {
        formData.state = 0;
      } else if (this.formInline.supplier === "审核通过") {
        formData.state = 1;
      } else {
        formData.state = 2;
      }
      this.$axios
        .post("/shopGoodsConsume/export", formData, { responseType: "blob" })
        .then((res) => {
          console.log(res);
          const link = document.createElement("a");
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          let num = "";
          for (let i = 0; i < 10; i++) {
            num += Math.ceil(Math.random() * 10);
          }
          link.setAttribute("download", "商品统计" + num + ".xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    },
    //分页
    handleSizeChange(val) {
      this.size = Number(val);
      this.$axios({
        url: "/shopGoodsConsume/getList",
        method: "post",
        data: { size: this.size, page: this.page },
      })
        .then((data) => {
          if (data.code == 200) {
            this.pagecount = data.count;
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
      this.page = Number(val);
      this.$axios({
        url: "/shopGoodsConsume/getList",
        method: "post",
        data: { size: this.size, page: this.page },
      })
        .then((data) => {
          if (data.code == 200) {
            this.pagecount = data.count;
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
    //审核
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      if( row.state == 0){
        this.form.audit = '审核中'
      }else if(row.state == 1){
        this.form.audit = '审核通过'
      }else {
        this.form.audit = '审核失败'
      }
      this.form.auditNote = row.auditRemarks;
      let data = {};
      data.id=row.id;
      data.goodsId=row.goodsId;
      data.consumeNumber=row.consumeNumber;
      data.state=row.state;
      data.auditRemarks=row.auditRemarks;
      sessionStorage.setItem('dataInfo',JSON.stringify(data));
    },
    //取消
    dialogVisible() {
      this.dialogFormVisible = false;
      this.$refs["ruleform"].clearValidate("");
      this.$refs["ruleform"].resetFields();
    },
    //确定弹窗
    dialogcomfirm() {
      this.dialogFormVisible = false;
      // console.log(JSON.parse(sessionStorage.getItem("dataInfo")));
      const formData = JSON.parse(sessionStorage.getItem("dataInfo"));
      formData.auditorId = 1;
      // console.log(formData);
      this.$axios({
        url: "/shopGoodsConsume/audit",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.$axios({
              url: "/shopGoodsConsume/getList",
              method: "post",
              data: { page: this.page, size: this.size },
            })
              .then((data) => {
                if (data.code == 200) {
                  this.pagecount = data.count;
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
  },
  //生命周期钩子函数页面加载自动调用
  created() {
    this.$axios({
      url: "/shopGoodsConsume/getList",
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
  height: 800px;
  padding: 20px;
  margin-top: 10px;
  background-color: white;
  .content-list {
    margin-top: 30px;
  }
  .page {
    margin-top: 15px;
    text-align: center;
  }
}
</style>