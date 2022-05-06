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
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
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
                  v-model="formInline.goodsName"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="供应商">
                <el-input
                  v-model="formInline.supplier"
                  placeholder="模糊搜索"
                  size="small"
                ></el-input>
              </el-form-item>

              <el-form-item label="销售状态">
                <el-select
                  v-model="formInline.salesStatus"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="草稿" value="草稿"></el-option>
                  <el-option label="在售" value="在售"></el-option>
                  <el-option label="停售" value="停售"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推广状态">
                <el-select
                  v-model="formInline.promotionState"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="打开" value="打开"></el-option>
                  <el-option label="关闭" value="关闭"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button size="small" type="primary" @click="querySubmit"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="exportSubmit"
                  >导出</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="sketchSubmit"
                  >草稿</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="addSubmit"
                  >添加</el-button
                >
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="content-list">
        <el-col>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="商品id"> </el-table-column>
            <el-table-column prop="name" label="商品名称" width="100px">
            </el-table-column>
            <el-table-column prop="price" label="销售价格（元）">
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商" width="200px">
            </el-table-column>
            <el-table-column prop="inventory" label="总库存"> </el-table-column>
            <el-table-column prop="sold" label="实际销售量"></el-table-column>
            <el-table-column prop="surplusInventory" label="剩余库存">
            </el-table-column>
            <el-table-column
              prop="state"
              label="平台销售状态"
              :formatter="tableState"
            >
            </el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="170px">
            </el-table-column>
            <el-table-column
              prop="promotion"
              label="推广"
              :formatter="tablePromotion"
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100px">
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
          <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="ruleform">
              <el-form-item
                label="商品名称"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input v-model="form.name" autocomplete="off">{{}}</el-input>
              </el-form-item>
              <el-form-item
                label="销售价格"
                :label-width="formLabelWidth"
                prop="price"
              >
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="供应商"
                :label-width="formLabelWidth"
                prop="supplier"
              >
                <el-input v-model="form.supplier" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="总库存"
                :label-width="formLabelWidth"
                prop="totalInventory"
              >
                <el-input
                  v-model="form.totalInventory"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="剩余库存"
                :label-width="formLabelWidth"
                prop="excessInventory"
              >
                <el-input
                  v-model="form.excessInventory"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="平台销售状态"
                :label-width="formLabelWidth"
                prop="salesStatus"
              >
                <el-input
                  v-model="form.salesStatus"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="推广状态"
                :label-width="formLabelWidth"
                class="select"
                prop="expand"
              >
                <el-select v-model="form.expand" placeholder="请选择">
                  <el-option label="开启" value="开启"></el-option>
                  <el-option label="关闭" value="关闭"></el-option>
                </el-select>
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
      pagecount: 0,
      salesVolume: 0,
      currentPage: 4,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        price: 0,
        supplier: "",
        totalInventory: "",
        excessInventory: "",
        salesStatus: "",
        expand: "",
      },
      formLabelWidth: "120px",
      formInline: {
        goodsName: "",
        supplier: "",
        salesStatus: "",
        promotionState: "",
      },
      tableData: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入销售价格",
            trigger: "blur",
          },
        ],
        supplier: [
          {
            required: true,
            message: "请输入门供应商",
            trigger: "blur",
          },
        ],
        totalInventory: [
          {
            required: true,
            message: "请输入总库存",
            trigger: "blur",
          },
        ],
        excessInventory: [
          {
            required: true,
            message: "请输入剩余库存",
            trigger: "blur",
          },
        ],
        salesStatus: [
          {
            required: true,
            message: "请输入平台销售状态",
            trigger: "blur",
          },
        ],
        expand: [
          {
            required: true,
            message: "请输入推广状态",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //销售状态
    tableState: function (row, column, cellValue) {
      var ret = "";
      if (cellValue == 0) {
        ret = "草稿";
      } else if (cellValue == 1) {
        ret = "在售";
      } else {
        ret = "停售";
      }
      return ret;
    },
    //推广状态
    tablePromotion: function (row, column, cellValue) {
      var ret = "";
      if (cellValue) {
        ret = "开启";
      } else {
        ret = "关闭";
      }
      return ret;
    },
    //查询
    querySubmit() {
      let formData = {};
      formData.name = this.formInline.goodsName;
      formData.principal = this.formInline.supplier;
      if (this.formInline.salesStatus == "草稿") {
        formData.state = 0;
      } else if (this.formInline.salesStatus == "在售") {
        formData.state = 1;
      } else if (this.formInline.salesStatus == "停售") {
        formData.state = 2;
      } else {
        formData.state = null;
      }
      if (this.formInline.promotionState == "开启") {
        formData.promotion = true;
      } else if (this.formInline.promotionState == "关闭") {
        formData.promotion = false;
      } else {
        formData.promotion = null;
      }
      console.log(formData);
      this.$axios({
        url: "/goods/getGoodsList",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
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
      /* this.formInline.goodsName = "";
      this.formInline.supplier = "";
      this.formInline.salesStatus = "";
      this.formInline.promotionState = ""; */
    },
    //导出
    exportSubmit() {
      console.log("导出");
      let formData = {};
      formData.name = this.formInline.goodsName;
      formData.principal = this.formInline.supplier;
      if (this.formInline.salesStatus == "草稿") {
        formData.state = 0;
      } else if (this.formInline.salesStatus == "在售") {
        formData.state = 1;
      } else if (this.formInline.salesStatus == "停售") {
        formData.state = 2;
      } else {
        formData.state = null;
      }
      if (this.formInline.promotionState == "开启") {
        formData.promotion = true;
      } else if (this.formInline.promotionState == "关闭") {
        formData.promotion = false;
      } else {
        formData.promotion = null;
      }
      this.$axios
        .post("/goods/export", formData, { responseType: "blob" })
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
    //草稿
    sketchSubmit() {
      console.log("草稿");
      this.$axios({
        url: "/goods/getGoodsList",
        method: "post",
        data: {},
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.pagecount = data.count;
            let ListData = data.data;
            let arrData = [];
            ListData.forEach((item) => {
              if (item.state == 0) {
                arrData.push(item);
              }
            });
            this.tableData = arrData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //添加
    addSubmit() {
      console.log("添加");
      this.$router.push("/comm/addGoods");
    },
    //修改
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.price = row.price;
      this.form.supplier = row.supplierName;
      this.form.totalInventory = row.inventory;
      this.form.excessInventory = row.surplusInventory;
      if (row.state == 0) {
        this.form.salesStatus = "草稿";
      } else if (row.state == 1) {
        this.form.salesStatus = "在售";
      } else {
        this.form.salesStatus = "停售";
      }
      if (row.promotion) {
        this.form.expand = "开启";
      } else {
        this.form.expand = "关闭";
      }
      sessionStorage.setItem("id", row.id);
    },
    //取消弹窗
    dialogVisible() {
      this.dialogFormVisible = false;
      this.$refs["ruleform"].clearValidate("");
      this.$refs["ruleform"].resetFields();
    },
    //确定弹窗
    dialogcomfirm() {
      this.dialogFormVisible = false;
      let formData = {};
      formData.id = Number(sessionStorage.getItem("id"));

      formData.name = this.form.name;
      formData.price = this.form.price;
      formData.supplierName = this.form.supplier;
      formData.inventory = this.form.totalInventory;
      formData.surplusInventory = this.form.excessInventory;
      if (this.form.salesStatus == "草稿") {
        formData.state = 0;
      } else if (this.form.salesStatus == "在售") {
        formData.state = 1;
      } else {
        formData.state = 2;
      }
      formData.promotion = this.form.expand === "开启" ? true : false;
      console.log(formData);
      this.$axios({
        url: "/goods/update",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            this.$axios({
              url: "/goods/getGoodsList",
              method: "post",
              data: {},
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
    //删除
    deleteClick(index, row) {
      let idData = {};
      idData.id = row.id;

      this.$axios({
        url: "/goods/delete",
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
        url: "/goods/getGoodsList",
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
        url: "/goods/getGoodsList",
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
  },
  created() {
    this.$axios({
      url: "/goods/getGoodsList",
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
  .content-list {
  margin-top: 30px;
}
  .page {
  margin-top: 15px;
  text-align: center;
}
}

</style>