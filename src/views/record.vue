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
            <el-breadcrumb-item>兑换记录</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-row>
        <el-col>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline mtop bg"
            label-width="auto"
            size="small"
          >
            <el-form-item label="商品名称:">
              <el-input
                v-model="formInline.name"
                placeholder="模糊搜索"
              ></el-input>
            </el-form-item>
            <el-form-item label="供应商">
              <el-select v-model="formInline.supplier" placeholder="请选择">
                <el-option label="张三" value="zhangsan"></el-option>
                <el-option label="李四" value="lisi"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select v-model="formInline.status" placeholder="请选择">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="待核销" value="待核销"></el-option>
                <el-option label="已核销" value="已核销"></el-option>
                <el-option label="已过期" value="已过期"></el-option>
                <el-option label="无需核销" value="无需核销"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户id:">
              <el-input v-model="formInline.userID"></el-input>
            </el-form-item>
            <el-form-item label="兑换时间:" class="ttt">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker
            ></el-form-item>
            <el-form-item label="兑换码:">
              <el-input v-model="formInline.convert"></el-input>
            </el-form-item>
            <el-form-item label="核销时间:">
              <el-input v-model="formInline.time"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 880px">
              <el-button size="medium" type="primary" @click="onSubmit"
                >查询</el-button
              >
              <el-button size="medium" type="primary" @click="outexl"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-col class="bg">
          <el-table :data="tables" border style="width: 100%">
            <el-table-column type="index" label="用户" width="100">
            </el-table-column>
            <el-table-column prop="article" label="兑换商品" width="150">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="60">
            </el-table-column>
            <el-table-column prop="supplier1" label="供应商"> </el-table-column>
            <el-table-column prop="address" label="地址" width="180">
            </el-table-column>
            <el-table-column prop="convertdata" label="兑换时间" width="100">
            </el-table-column>
            <el-table-column prop="redeemcode" label="兑换码">
            </el-table-column>
            <el-table-column prop="stateus" label="状态"> </el-table-column>
            <el-table-column prop="removedata" label="核销时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[1, 2]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Number(count)"
            class="acenter"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: "",
      page: {
        pagesize: 0,
        pageconte: 1,
      },
      currentIndex: "",
      currentPage: 1, //初始页
      pagesize: 2, //    每页的数据
      formInline: {
        userID: "",
        status: "",
        supplier: "",
        name: "",
        convert: "",
        time: "",
        convertdata: "",
        limited: "",
        redeemcode: "",
        stateus: "",
        removedata: "",
      },
      value1: "",
      value2: "",
      tableData: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange: function (val) {
      this.page.pagesize = val;
      // console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function (val) {
      this.page.pageconte = val;
      // console.log(this.currentPage) //点击第几页
    },
    // 文件导出
    outexl() {
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning",
      })

        .then(() => {
          this.excelData = this.tableData; //导出的数据list。

          this.exportdata();
        })

        .catch(() => {});
    },
    exportdata: function (event) {
      const that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        const tHeader = [
          "用户",
          "兑换商品",
          "数量",
          "供应商",
          "地址",
          "兑换时间",
          "兑换码",
          "状态",
          "核销时间",
        ];
        const filterVal = [
          "uid",
          "forGoodsName",
          "num",
          "shopName",
          "address",
          "exchangeTime",
          "userPhone",
          "status",
          "checkTime",
        ];
        const list = that.tableData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "用户信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    gitList1() {
      this.$axios
        .post("/forGoods/getByPage", {
          forGoodsName: "",
          supplierId: 1,
          page: 1,
          size: 5,
        })
        .then((res) => {
          if (res.code === "200") {
            this.tableData = res.data;
            this.count = res.count;
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // 渲染表格
    tables() {
      let arr = [];
      this.tableData.forEach((iteam) => {
        if (iteam.status === 0) {
          iteam.status = "待核销";
        } else if (iteam.status === 1) {
          iteam.status = "已核销";
        } else if (iteam.status === 2) {
          iteam.status = "已过期";
        }
        let obj = {
          subscriber: iteam.uid,
          article: iteam.forGoodsName,
          number: iteam.num,
          supplier1: iteam.shopName,
          address: iteam.address,
          convertdata: iteam.exchangeTime,
          redeemcode: iteam.userPhone,
          stateus: iteam.status,
          removedata: iteam.checkTime,
        };
        arr.push(obj);
      });
      return this.showPages(this.page.pageconte, this.page.pagesize, arr);
    },
  },
  created() {
    this.gitList1();
  },
};
</script>

<style lang="less">
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
}
.mtop > .el-form-item {
  margin-top: 15px;
}
.acenter {
  text-align: center;
  margin-top: 10px;
}
.bg {
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  .el-select,
  .el-input,
  .el-input__inner,
  .el-form-item__content {
    width: 180px;
  }
}
.cell {
  text-align: center;
}
</style>
