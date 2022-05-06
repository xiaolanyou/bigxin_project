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
            <el-breadcrumb-item>订单</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 表单部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="20"
          ><el-form-item label="商品名称:">
            <el-input
              v-model="formInline.productname"
              placeholder="模糊搜索"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商:">
            <el-input
              v-model="formInline.supplier"
              placeholder="请选择"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售状态:">
            <el-select v-model="formInline.salesstatus" placeholder="请选择">
              <el-option label="在售" value="forsale"></el-option>
              <el-option label="停售" value="haltsales"></el-option>
              <el-option label="草稿" value="draft"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户id:">
            <el-input v-model="formInline.userid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="derive">导出</el-button>
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="配送方式:">
            <el-select
              v-model="formInline.distributionway"
              placeholder="请选择"
            >
              <el-option label="驿站自提" value="驿站自提"></el-option>
              <el-option label="快递配送" value="快递配送"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款状态:">
            <el-select v-model="formInline.paymentstatus" placeholder="请选择">
              <el-option label="以付款" value="以付款"></el-option>
              <el-option label="未付款" value="未付款"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货状态:">
            <el-select v-model="formInline.shippingstatus" placeholder="请选择">
              <el-option label="已发货" value="已发货"></el-option>
              <el-option label="未发货" value="未发货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运单号:">
            <el-input v-model="formInline.waybillnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"
          ><el-form-item>
            <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="收货状态:">
            <el-select v-model="formInline.salesstatus" placeholder="请选择">
              <el-option label="以收货" value="ocommodity"></el-option>
              <el-option label="未收货" value="ncommodity"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
            <el-input
              v-model="formInline.time"
              placeholder="起始时间控件"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="formInline.ordernumber"></el-input>
          </el-form-item>
          <el-form-item label="提货码:">
            <el-input v-model="formInline.Pickgoodscode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"
          ><el-form-item
            id="lastitem"
            label="收件人手机号:"
            style="margin-right: 0; width: 220px"
          >
            <el-input
              style="width: 100px"
              v-model="formInline.consigneephone"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <!-- 表格部分 -->
    <el-row class="btable" style="margin-top: 0">
      <el-col :span="24">
        <table class="onetable" border="1" cellspacing="0" cellpadding="0">
          <tr>
            <th style="width: 350px">商品</th>
            <th>单价/数量</th>
            <th>供应商</th>
            <th style="width: 150px">金额</th>
            <th>用户</th>
            <th>付款状态</th>
            <th>发货状态</th>
            <th>收货状态</th>
            <th style="border-right: none">操作</th>
          </tr>
        </table>
        <table
          class="twotable"
          border="1"
          cellspacing="0"
          cellpadding="0"
          v-for="(item, id) in tableData"
          :key="id"
          style="margin-bottom: 30px"
        >
          <tbody>
            <tr class="second-ssx">
              <td colspan="9">
                <span>{{ item.datatime }}</span>
                <span>{{ item.ordernumber }}</span>
                <span>{{ item.distributionway }}</span>
                <span>{{ item.trackingnumber }}</span>
                <span>{{ item.phone }}</span>
              </td>
            </tr>
            <tr class="three-ssx">
              <td style="width: 350px">
                <img src="../assets/logo.png" alt="" />
                <h1>龙泉山水蜜桃产</h1>
                <p>龙泉山水蜜桃产地直采,买三斤送一斤</p>
              </td>
              <td>￥100x2</td>
              <td>龙泉山张牟</td>
              <td>
                ￥200.00
                <p style="text-align: center; margin: 0; width: 150px">
                  (含运费：￥0.00)
                </p>
              </td>
              <td>id:23456</td>
              <td>未付款</td>
              <td>未发货</td>
              <td>未收货</td>
              <td style="border-right: none">
                <el-button @click="amend(id)" type="primary"
                  >订单详情</el-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <!-- 尾部 -->
    </el-row>
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
  name: "Immediatelyshop",
  data() {
    return {
      formInline: {
        productname: "",
        supplier: "",
        salesstatus: "",
        userid: "",
        distributionway: "",
        paymentstatus: "",
        shippingstatus: "",
        waybillnumber: "",
        salesstatus: "",
        time: "",
        ordernumber: "",
        Pickgoodscode: "",
        consigneephone: "",
      },
      tableData: [
        {
          datatime: "2018-08-02 17:43:39",
          ordernumber: "订单号:2018080298545157",
          distributionway: "配送方式:驿站自提/顺丰快递",
          trackingnumber: "运单号:1234546523223",
          phone: " 收件人手机号：1361*****111",
        },
        {
          datatime: "2018-08-02 17:43:39",
          ordernumber: "订单号:2018080298545157",
          distributionway: "配送方式:驿站自提/顺丰快递",
          trackingnumber: "运单号:1234546523223",
          phone: " 收件人手机号：1361*****111",
        },
      ],
      currentPage4: 4,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    tableRowClassName() {
      return "warning-row";
    },
    derive() {},
    inquire() {},
    amend(id) {
      this.$router.push("/comm/theorderdetails");
      console.log(id);
    },
  },
};
</script>

<style lang="less" scoped>
.conter {
  width: 100%;
  .title {
    height: 50px;
    padding: 20px;
    background-color: white;
    font-weight: bold !important;
  }
  .el-form {
    height: 185px;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    font-size: 16px;
    .el-form-item {
      width: 220px;
      margin-right: 20px;
      .el-select {
        width: 110px;
      }
      .el-input {
        width: 130px;
      }
    }
    #lastitem {
      width: 250px;
      margin-right: 0;
    }
  }
  .btable {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    .onetable {
      border-bottom: none;
      th {
        width: 145px;
        height: 60px;
        border-top: none;
        border-left: none;
        border-bottom: none;
      }
    }

    .twotable {
      td {
        width: 145px;
        height: 60px;
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
        height: 170px;
        text-align: center;
        td {
          border-left: none;
          border-bottom: none;
          h1 {
            width: 130px;
            float: right;
            padding-right: 10px;
            font-size: 14px;
            text-align: left;
            margin: 0;
            margin-top: 10px;
          }
          p {
            width: 130px;
            float: right;
            padding-right: 10px;
            text-align: left;
            font-size: 14px;
            font-weight: 100;
          }
          img {
            float: left;
            margin-left: 10px;
            height: 120px;
          }
        }
      }
    }
  }
  .fmoney {
    /*  margin-right: 50px; */
    height: 80px;
    padding: 0 30px;
    background: #fff;
    h1 {
      margin-top: 0;
    }
    span {
      margin-left: 10px;
      margin-right: 30px;
    }
    .el-pagination {
      float: right;
    }
  }
}
</style>
