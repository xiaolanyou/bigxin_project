<template>
  <div class="conter">
    <!-- 头部 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>门店奖励</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 表单部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="20">
          <el-form-item label="商品名称:">
            <el-input
              v-model="formInline.productname"
              placeholder="模糊搜索"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属门店:">
            <el-select v-model="formInline.salesstatus" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户id:">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item style="width: 100px">
            <el-button type="primary" @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="订单时间:">
            <el-input
              v-model="formInline.productname"
              placeholder="起始时间控件"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item style="width: 100px">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  表格部分 -->
    <el-row class="btable" style="margin-top: 0">
      <el-col :span="24">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <th style="width: 200px">商品</th>
            <th>商品id</th>
            <th>销售单价</th>
            <th>购买数量</th>
            <th>单品总金额</th>
            <th style="border-right: none">所属门店</th>
          </tr>
          <tr class="second-ssx">
            <td colspan="9">
              <span>2018-08-02 17:43:39</span>
              <span>订单号:2018080298545157</span>
              <span>用户：id:23456</span>
            </td>
          </tr>
          <tr class="three-ssx">
            <td>龙泉山水蜜桃产</td>
            <td>12334</td>
            <td>￥100.00</td>
            <td>2</td>
            <td>￥200.00</td>
            <td style="border-right: none; color: red">xxx门店</td>
          </tr>
          <tr class="three-ssx">
            <td>龙泉山水蜜桃产</td>
            <td>12334</td>
            <td>￥100.00</td>
            <td>2</td>
            <td>￥200.00</td>
            <td style="border-right: none; color: red">xxx门店</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <!-- 尾部 -->
    <el-row class="fmoney">
      <el-col :span="10"
        ><h1>
          金额汇总(元):<span>9999.00</span> 运费汇总(元):<span>66.00</span>
        </h1>
      </el-col>
      <el-col :span="14">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            background
          >
          </el-pagination></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Storestheorder",
  data() {
    return {
      formInline: {
        user: "",
        salesstatus: "",
        supplier: "",
        productname: "",
      },
      currentPage4: 4,
      tableData: [{}],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.conter {
  width: 100%;
  .title {
    margin-right: 100px;
    height: 50px;
    padding: 10px;
    background-color: white;
    font-weight: bold !important;
  }
  .el-form {
    height: 105px;
    margin-right: 100px;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    font-size: 16px;
    .el-form-item {
      width: 230px;
      .el-select {
        width: 120px;
      }
      .el-input {
        width: 150px;
      }
    }
    #lastitem {
      width: 250px;
      margin-right: 0;
    }
  }
  .btable {
    margin-top: 20px;
    margin-right: 100px;
    background: #fff;
    padding: 20px;
    table {
      background: rgba(197, 192, 192, 0.384);
      th {
        width: 160px;
        height: 60px;
        border-top: none;
        border-left: none;
      }
      .second-ssx {
        height: 40px;
        border: none;
        td {
          border: none;
        }
        span {
          float: left;
          height: 40px;
          line-height: 40px;
          margin-left: 30px;
        }
      }
      .three-ssx {
        height: 60px;
        text-align: center;
        td {
          border-left: none;
          border-bottom: none;
        }
      }
    }
  }
  .fmoney {
    margin-right: 100px;
    height: 400px;
    padding: 0 30px;
    background: #fff;
    h1 {
      margin-top: 150px;
    }
    span {
      margin-left: 10px;
      margin-right: 30px;
    }
    .el-pagination {
      float: left;
      margin-top: 150px;
    }
  }
}
</style>
